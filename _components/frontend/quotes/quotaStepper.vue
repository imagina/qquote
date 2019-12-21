<template>
  <q-form
    @submit="createItem()"
    ref="formContent"
    class="row q-gutter-y-md full-width"
    autocomplete="off"
    @validation-error="$alert.error($tr('ui.message.formInvalid'))">
    <div class="col-md-12 box">
      <userInformation />
    </div>
    <div class="col-md-12">
      <q-stepper
      :keep-alive="false"
      class="box"
      v-model="step"
      ref="stepper"
      color="primary"
      animated>
      <q-step
        :name="1"
        prefix="1"
        :title="`${$tr('qquote.layout.labels.selectProductsOrPackage')}`"
        icon="one"
        :done="step > 1">
        <productOrPackage @selectChanged="getProducts"/>
      </q-step>
      <q-step
        :name="2"
        prefix="2"
        :title="`${$tr('qquote.layout.labels.quotation')}`"
        icon="create_new_folder"
        :done="step > 2">
        <div class="row">
          <div class="col-12">
            <quotation :products="products"/>
          </div>
        </div>
      </q-step>
      <q-step
        :name="4"
        prefix="3"
        :title="`${$tr('qquote.layout.labels.resumeAndSend')}`"
        icon="add_comment">
        <summaryQutation :products="products"/>
      </q-step>
      <template v-slot:navigation>
        <q-stepper-navigation class="q-ma-none q-pa-none flex justify-end">

          <!--if total > 0-->
          <div class="q-pr-md flex items-center justify-end" v-if="total > 0">
            {{$tr('qquote.layout.labels.totalToPay')}}
          </div>
          <div class="q-pr-md" v-if="total > 0">
            <q-input
              dense
              color="primary"
              outlined
              v-model="total"
              disable/>
          </div>

          <!--if step 1-->
          <q-btn
            v-if="step == 1"
            @click="nextStep"
            color="primary"
            :label="$tr('qquote.layout.labels.continue')"/>

          <!--if step 2-->
          <q-btn
            v-if="step == 2"
            @click="$refs.stepper.next()"
            :label="$tr('qquote.layout.labels.finish')"
            color="green"
            size="md"
            icon="check" />

          <!--if step 4-->
          <q-btn
            icon="mail_outline"
            type="submit"
            @click="saveQuote"
            v-if="step == 4"
            class="q-mr-md"
            :label="$tr('qquote.layout.labels.send')"
            color="primary"/>

          <q-btn
            icon="fas fa-download"
            type="submit"
            @click="saveQuote"
            v-if="step == 4"
            :label="$tr('qquote.layout.labels.download')"
            color="red"/>

        </q-stepper-navigation>
      </template>
    </q-stepper>
    </div>
  </q-form>
</template>

<script>
  import quotation from '@imagina/qquote/_components/frontend/quotes/quotation'
  import productOrPackage from '@imagina/qquote/_components/frontend/quotes/productOrPackage'
  import summaryQutation from '@imagina/qquote/_components/frontend/quotes/summaryQutation'
  import userInformation from '@imagina/qquote/_components/frontend/quotes/userInformation'
  import { keysToCamel } from '@imagina/qquote/_utils/index'

  export default {
    name: 'quotaStepper',
    components:{
      userInformation,
      quotation,
      productOrPackage,
      summaryQutation
    },
    data () {
      return {
        loading: false,
        step: 1,
        products: [],
        itemId: false,
      }
    },
    mounted(){
      this.initForm()
    },
    computed:{
      total() {
        let result = 0
        this.products.forEach( product => {
          product.characteristics.forEach( characteristic => {
            result += this.sumCharacteristics(characteristic)
          })
        })
        return result
      },
      productOrPackage: {
        get: function () {
          return this.$store.state.qquoteQuotation.productOrPackage
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_product_or_package', newValue)
        },
      },
    },
    methods:{
      async initForm(){
        this.loading = true
        if (this.$route.params.id){
          await this.getData()
          this.step = 2
        }
        this.loading = false
      },
      getData(){
        this.$crud.show( 'apiRoutes.qquote.quotes', this.$route.params.id, {params: ''} ).then( response => {
          this.setDataForEdit(response.data)
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          console.error( error )
          this.loading = false
        })
      },
      setDataForEdit(data){
        this.products = keysToCamel(data.value)
        this.$store.dispatch('qquoteQuotation/set_first_name', data.firstName)
        this.$store.dispatch('qquoteQuotation/set_last_name', data.lastName)
        this.$store.dispatch('qquoteQuotation/set_email', data.email)
        this.$store.dispatch('qquoteQuotation/set_phone', data.phone)
        this.$store.dispatch('qquoteQuotation/set_notes', data.notes)
        this.$store.dispatch('qquoteQuotation/set_user_id', data.userId)
        this.$store.dispatch('qquoteQuotation/set_customer_id', data.customerId)
      },
      getProducts(){
        let params = {
          params: {
            include: 'characteristics',
            filter: {}
          }
        }
        if (this.$store.state.qquoteQuotation.productOrPackage == 'product'){
          params.params.filter['ids'] = this.$store.state.qquoteQuotation.productsSelected.map( item => (item.value))
        }
        if (this.$store.state.qquoteQuotation.productOrPackage == 'package'){
          params.params.filter['package'] = this.$store.state.qquoteQuotation.package.value
        }
        this.loading = true
        this.$crud.index( 'apiRoutes.qquote.products', params ).then( response => {
          this.products = this.formatProducts(response.data)
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          this.loading = false
        })
      },
      formatProducts(products){
        return products.map( product => ({ ...product , characteristics: this.$array.builTree( product.characteristics )}))
      },
      sumChildren( children ){
        let calculate = 0
        children.forEach( element => { calculate += this.sumCharacteristics( element )})
        return calculate
      },
      sumCharacteristics( characteristic ){

        /*if characteristic is disabled*/
        if(!characteristic.checked){
          return 0
        }

        /*type 1 Select*/
        if( characteristic.type == 1 ){
          let valueSelected = characteristic.children.find( element => element.id == characteristic.model.value) || {price: 0}
          let response = valueSelected.price
          response += this.sumChildren(valueSelected.children || [])
          return response
        }

        /*type 2 checkbox*/
        if( characteristic.type == 2 && characteristic.model ){
          let response = characteristic.price
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        /*type 3 value*/
        if( characteristic.type == 3 ){
          let response = characteristic.model || 0
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        /*type 4 number*/
        if( characteristic.type == 4 ){
          let response = (characteristic.model *  characteristic.price)
          response += this.sumChildren(characteristic.childrengenerated || [])
          return response
        }

        return 0
      },
      nextStep(){
        /*Validate if the var productOrPackage has data*/
        if (this.step == 1 && this.productOrPackage == null){
          this.$alert.error(this.$tr('ui.message.formInvalid'))
          return
        }
        
        /*Validate if var productOrPackage is equal to 'package' and validate if package has data*/
        if ( this.productOrPackage == 'package') {
          if ( Object.keys(this.$store.state.qquoteQuotation.package).length === 0 ){
            this.$alert.error(this.$tr('ui.message.formInvalid'))
            return
          }
        }

        /*Validate if var productOrPackage is equal to 'product' and validate if productsSelected has data*/
        if (this.productOrPackage == 'product') {
          if (this.$store.state.qquoteQuotation.productsSelected.length === 0) {
            this.$alert.error(this.$tr('ui.message.formInvalid'))
            return
          }
        }
        /*If all is OK pass to next step*/
        this.$refs.stepper.next()
      },
      saveQuote(){
        let data = {
          firstName: this.$store.state.qquoteQuotation.firstName,
          lastName: this.$store.state.qquoteQuotation.lastName,
          email: this.$store.state.qquoteQuotation.email,
          phone: this.$store.state.qquoteQuotation.phone,
          notes: this.$store.state.qquoteQuotation.notes,
          value: this.products,
          userId: this.$store.state.qquoteQuotation.userId,
          customerId: this.$store.state.qquoteQuotation.customerId,
        }
        this.loading = true
        this.$crud.create( 'apiRoutes.qquote.quotes', data ).then( response => {
          this.$router.push({ name: 'qquote.admin.quotes' })
          this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          this.loading = false
        })
      },
      createItem(){}
    }
  }
</script>
