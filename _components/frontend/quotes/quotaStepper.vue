<template>
  <div>
    <q-checkbox
      v-if="this.$store.getters['qsiteSettings/getSettingValueByName']('iquote::allow_register_new_users') &&
      Object.keys(this.$store.state.qquoteQuotation.user).length === 0"
      v-model="registerNewUser"
      :label="$tr('qquote.layout.registerAsUser')" />
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
            <quotation :products="products" showSearch/>

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
                    {{$trc(total || 0 , $store.state.qquoteQuotation.options.currency.label)}}
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
                  {{$trc(total || 0 , $store.state.qquoteQuotation.options.currency.label)}}
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
                    {{$trc(total || 0 , $store.state.qquoteQuotation.options.currency.label)}}
                  </div>
                </div>

                <q-btn
                  size="lg"
                  push
                  @click="saveQuote('send')"
                  icon="mail_outline"
                  type="submit"
                  v-if="step == 4"
                  class="q-mr-md"
                  :label="$tr('qquote.layout.labels.send')"
                  color="primary"/>

                <q-btn
                  size="lg"
                  push
                  @click="saveQuote('download')"
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
                  {{$trc(total || 0 , $store.state.qquoteQuotation.options.currency.label)}}
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
      <modalShow
        :quote="quoteSaved"
        :dialog="showQuoteSaved"/>
    </div>
  </div>
</template>

<script>
  import quotation from '@imagina/qquote/_components/frontend/quotes/quotation'
  import productOrPackage from '@imagina/qquote/_components/frontend/quotes/productOrPackage'
  import summaryQutation from '@imagina/qquote/_components/frontend/quotes/summaryQutation'
  import userInformation from '@imagina/qquote/_components/frontend/quotes/userInformation'
  import selectPackages from '@imagina/qquote/_components/frontend/quotes/selectPackage'
  import modalShow from '@imagina/qquote/_components/frontend/quotes/show'
  import { keysToCamel, calTotal } from '@imagina/qquote/_utils/index'

  export default {
    name: 'quotaStepper',
    props:{
      fakeFields: {
        default: () => []
      }
    },
    components:{
      userInformation,
      quotation,
      productOrPackage,
      summaryQutation,
      selectPackages,
      modalShow
    },
    data () {
      return {
        loading: false,
        step: 1,
        products: [],
        itemId: false,
        quoteSaved: {},
        showQuoteSaved: false,
        registerNewUser: false
      }
    },
    mounted(){
      this.initForm()
    },
    created(){
      this.$root.$on('reset', this.resetData)
      this.$root.$on('changeCurrency', this.changeCurrency)
    },
    computed:{
      total() {
        return calTotal(this.products, false, false)
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
        this.getProducts(this.$store.state.qquoteQuotation.options.currency.label)
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
      getProducts(currency = this.$store.state.qcurrencyMaster.defaultCurrency.label){
        let params = {
          params: {
            include: 'characteristics',
            filter: {
              currency: currency
            }
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
      /* This method generates a new array with the products in the package, adding a feature tree. */
      formatProducts(products){
        return products.map( product => ({ ...product , characteristics: this.$array.builTree( product.characteristics )}))
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
      saveQuote( sendOrDownload = null ){
        // this emit global event for validate form with user data informations
        this.$root.$emit('validateUserInformation')

        // If any of the follow attributes is empty, cut flow in this methods.
        if (
          this.$store.state.qquoteQuotation.firstName  == ''||
          this.$store.state.qquoteQuotation.lastName  == ''||
          this.$store.state.qquoteQuotation.options.dateBirth  == ''||
          this.$store.state.qquoteQuotation.options.country  == ''||
          this.$store.state.qquoteQuotation.options.currency  == ''||
          this.$store.state.qquoteQuotation.email  == ''||
          this.$store.state.qquoteQuotation.phone == ''
        ){
          return
        }
        // Organize data for send
        let data = {
          firstName: this.$store.state.qquoteQuotation.firstName,
          lastName: this.$store.state.qquoteQuotation.lastName,
          email: this.$store.state.qquoteQuotation.email,
          phone: this.$store.state.qquoteQuotation.phone,
          notes: this.$store.state.qquoteQuotation.notes,
          options: this.$store.state.qquoteQuotation.options,
          value: this.products,
          userId: this.$store.state.qquoteQuotation.userId,
          customerId: this.$store.state.qquoteQuotation.customerId,
        }

        for( let item of Object.keys(this.fakeFields)){
          data.options[item] = this.fakeFields[item].value
        }

        if (sendOrDownload == 'send'){
          data['isSending'] = true
        }
        if(sendOrDownload == 'download'){
          data['IsDownloading'] = true
        }

        this.loading = true

        // call request to server for send data
        this.$crud.create( 'apiRoutes.qquote.quotes', data ).then( response => {
          this.postSavedQuote(response, sendOrDownload)
          this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}` })
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          this.loading = false
        })
        
        if(this.registerNewUser &&
          this.$store.getters['qsiteSettings/getSettingValueByName']('iquote::allow_register_new_users') &&
          Object.keys(this.$store.state.qquoteQuotation.user).length === 0 ){
          this.registerUser()
        }
      },
      postSavedQuote(response, sendOrDownload = null){

        /* Send quote */
        if(sendOrDownload == 'send'){
            // Show alert with information for send email
        }
        /* Download quote */
        if(sendOrDownload == 'download'){
          window.open(`${response.isDownloading}`, '_blank');
        }

        /* User with session */
        if (this.$store.state.quserAuth.userId){
          this.$router.push({ name: 'qquote.admin.quotes' })
        }

        /*User no Session*/
        if (!this.$store.state.quserAuth.userId){
          this.quoteSaved = response.data
          this.showQuoteSaved = true
        }
        this.$root.$emit('reset')
      },
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
      },
      changeCurrency(event){
        this.getProducts(event.label)
      },
      registerUser(){
        let password = this.generatePass()
        let data = {
          firstName: this.$store.state.qquoteQuotation.firstName,
          lastName: this.$store.state.qquoteQuotation.lastName,
          email: this.$store.state.qquoteQuotation.email,
          password: password,
          fields: [],
          passwordConfirmation: password,
        }
        this.$crud.create( 'apiRoutes.quser.register', data ).then( response => {
          this.$alert.success({ message: `${this.$tr('ui.message.recordCreated')}` })
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
        })
      },
      generatePass() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"·$%&/()=?¿;:_@#~€,.-ç';
        var charactersLength = characters.length;
        for (var i = 0; i < 12; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result
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
