<template>
  <div class="row">
    <div class="col-xs-12 col-md-12 q-mt-xl">
      <div class="q-mt-sm q-px-md flex justify-center text-h5 heading-1">
        <span class="text-grey q-px-md"> {{$tr('qquote.layout.labels.make')}} <span class="text-bold text-primary">{{$tr('qquote.layout.labels.quotation')}} </span> </span>
      </div>
    </div>
    <div class="col-md-12">
      <q-stepper
        :vertical="$q.platform.is.mobile"
        class="no-shadow"
        v-model="step"
        ref="stepper"
        color="primary"
        animated>
        <q-step
          :name="1"
          prefix="1"
          :title="`${$tr('qquote.layout.labels.choosePackage')}`">
          <selectPackages @next="handeNext"/>
        </q-step>
        <q-step
          :name="2"
          prefix="2"
          :title="`${$tr('qquote.layout.labels.selectQuote')}`">
          <quotation :products="products"/>

          <div class="q-ma-none q-pa-none q-mt-sm flex justify-between" v-if="$q.platform.is.desktop">

            <div>
              <q-btn
                v-if="step == 2"
                @click="showConfirmNextStep"
                color="red"
                push
                size="lg">
                <q-icon left name="keyboard_backspace" class=""/>
                <div>{{$tr('qquote.layout.labels.back')}}</div>
              </q-btn>
            </div>

            <div class="flex justify-end items-center">
              <!--if total > 0-->
              <div class="q-pr-md text-primary text-bold" style="font-size: 18px">
                {{$tr('qquote.layout.labels.totalToPay')}}
              </div>

              <div class="q-pr-md" style="min-width: 300px">
                <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
                  {{$trc(total || 0 )}}
                </div>
              </div>

              <q-btn
                v-if="step == 2"
                :disable="total == 0"
                @click="$refs.stepper.next()"
                :label="$tr('qquote.layout.labels.finish')"
                color="light-green-6"
                push
                size="lg"
                icon="check" />
              </div>
            </div>

          <q-toolbar
            class="bg-grey-3 fixed-bottom"
            v-if="$q.platform.is.mobile"
            style="z-index: 2000000">
            <q-btn
              v-if="step == 2"
              @click="$refs.stepper.previous()"
              color="red"
              icon="keyboard_backspace"
              push />
            <q-toolbar-title>
              <div class="q-pr-md text-primary text-bold" >
                {{$trc(total || 0 )}}
              </div>
            </q-toolbar-title>
            <q-btn
              v-if="step == 2"
              :disable="total == 0"
              @click="$refs.stepper.next()"
              color="light-green-6"
              push
              icon="check" />
          </q-toolbar>

          <inner-loading :visible="loading"/>

        </q-step>
        <q-step
          :name="4"
          prefix="3"
          :title="`${$tr('qquote.layout.labels.quotationSummary')}`">
          <summaryQutation :products="products"/>

          <div class="q-ma-none q-pa-none q-mt-sm flex justify-between" v-if="$q.platform.is.desktop">
            <div>
              <q-btn
                v-if="step == 4"
                @click="$refs.stepper.previous()"
                color="red"
                push
                size="lg">
                <q-icon left name="keyboard_backspace" class=""/>
                <div>{{$tr('qquote.layout.labels.back')}}</div>
              </q-btn>
            </div>

            <div class="flex justify-end items-center">
              <!--if total > 0-->
              <div class="q-pr-md text-primary text-bold" style="font-size: 18px">
                {{$tr('qquote.layout.labels.totalToPay')}}
              </div>

              <div class="q-pr-md" style="min-width: 300px">
                <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
                  {{$trc(total || 0 )}}
                </div>
              </div>

              <q-btn
                size="lg"
                push
                icon="mail_outline"
                type="submit"
                v-if="step == 4"
                class="q-mr-md"
                :label="$tr('qquote.layout.labels.send')"
                color="primary"/>

              <q-btn
                size="lg"
                push
                icon="fas fa-download"
                type="submit"
                v-if="step == 4"
                :label="$tr('qquote.layout.labels.download')"
                color="red"/>

            </div>
          </div>

          <q-toolbar class="bg-grey-3 fixed-bottom" v-if="$q.platform.is.mobile" style="z-index: 2000000">

            <q-btn
              v-if="step == 4"
              @click="$refs.stepper.previous()"
              color="red"
              push
              icon="keyboard_backspace" />

            <q-toolbar-title>
              <div class="q-pr-md text-primary text-bold" >
                {{$trc(total || 0 )}}
              </div>
            </q-toolbar-title>
            <q-btn
              push
              icon="mail_outline"
              type="submit"
              v-if="step == 4"
              class="q-mr-md"
              color="primary"/>

            <q-btn
              push
              icon="fas fa-download"
              type="submit"
              v-if="step == 4"
              color="red"/>
          </q-toolbar>


        </q-step>
      </q-stepper>
      <q-separator />
    </div>
    <div class="col-xs-12 q-px-sm">
      <p class="q-mt-md" align="justify">
        <span class="text-primary text-bold" style="font-size: 15px">{{$tr('qquote.layout.labels.important')}}: </span>
        {{$tr('qquote.layout.labels.subImportant')}}.
      </p>
    </div>
  </div>
</template>

<script>
  import quotation from '@imagina/qquote/_components/frontend/quotes/quotation'
  import productOrPackage from '@imagina/qquote/_components/frontend/quotes/productOrPackage'
  import summaryQutation from '@imagina/qquote/_components/frontend/quotes/summaryQutation'
  import userInformation from '@imagina/qquote/_components/frontend/quotes/userInformation'
  import selectPackages from '@imagina/qquote/_components/frontend/quotes/selectPackage'
  import { keysToCamel } from '@imagina/qquote/_utils/index'

  export default {
    name: 'quotaStepper',
    components:{
      userInformation,
      quotation,
      productOrPackage,
      summaryQutation,
      selectPackages
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
    created(){
      this.$root.$on('reset', this.resetData)
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
      handeNext(){
        this.$refs.stepper.next()
        this.getProducts()
      },
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
          params.params.filter['package'] = this.$store.state.qquoteQuotation.package.id
        }
        this.products = []
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
      createItem(){},
      previousStep(){
        this.$refs.stepper.previous()
      },
      showConfirmNextStep(){

        this.$q.dialog({
          title: this.$tr('qquote.layout.labels.confirm'),
          message: this.$tr('qquote.layout.labels.confirmMessage'),
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.previousStep()
        }).onCancel(() => {

        })
      },
      resetData(){
        this.step = 1
      }
    }
  }
</script>

<style>
  .q-stepper__dot{
    font-size: 18px;
    width: 40px;
    height: 40px;
  }
  .q-stepper__title{
    font-size: 18px;
  }
  .q-stepper__header{
    padding: 0 18px;
  }
</style>
