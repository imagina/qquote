<template>
  <q-form
    ref="formContent"
    class="row q-gutter-y-md"
    autocomplete="off"
    @validation-error="$alert.error($tr('ui.message.formInvalid'))">
    <div class="col-xs-12 col-md-12 q-mt-xl">
      <div class="q-mt-sm q-px-md flex justify-center text-h5 heading-1">
        <span class="text-grey q-px-md">
          {{$tr('qquote.layout.labels.profile')}}
          <span class="text-bold text-primary">
            {{$tr('qquote.layout.labels.customer')}}
          </span>
        </span>
      </div>
    </div>
    <div class="col-md-12 q-mt-lg">
      <div :class="`row ${$q.platform.is.desktop ? 'q-col-gutter-md' : 'q-mx-md'}`">
        <div class="col-xs-12" v-if="$store.state.quserAuth.userId && hasPermissionToIndexUsers">
          <q-select
            filled
            v-model="user"
            use-input
            hide-selected
            fill-input
            input-debounce="0"
            label="Usuarios"
            :options="users">
            <template v-slot:prepend>
              <q-icon name="fas fa-users" color="primary"/>
            </template>
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  {{ $tr('qquote.layout.labels.noResults') }}
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-input
            filled
            v-model="firstName"
            :label="$tr('qquote.layout.form.firstName')"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="person" color="primary"/>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-input
            filled
            v-model="lastName"
            :label="$tr('qquote.layout.form.lastName')"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="person_outline" color="primary"/>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3" v-if="false">
          <q-input
            filled
            v-model="identification"
            :label="$tr('qquote.layout.form.identification')">
            <template v-slot:prepend>
              <q-icon name="fas fa-address-card" color="primary"/>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-input
            filled
            v-model="birthday"
            mask="date"
            :label="$tr('qquote.layout.form.dateBirth')"
            :rules="[/*val => !!val || $tr('ui.message.fieldRequired')*/]">
            <template v-slot:prepend>
              <q-icon name="event" class="cursor-pointer" color="primary">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="birthday" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-select
            :loading="dataCountries.loading"
            filled
            v-model="country"
            :options="dataCountries.countries"
            :label="$tr('qquote.layout.form.country')"
            @input="getProvinces(country.value)"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="fas fa-globe-asia" color="primary"/>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <div class="col-md-12 q-mt-none">
      <div :class="`row ${$q.platform.is.desktop ? 'q-col-gutter-md' : 'q-mx-md'}`">
        <div class="col-xs-12 col-md-3" v-if="false">
          <q-select
            :loading="dataProvinces.loading"
            filled
            v-model="department"
            :options="dataProvinces.provinces"
            :label="$tr('qquote.layout.form.department')"
            @input="getCities(department.value)">
            <template v-slot:prepend>
              <q-icon name="fas fa-map-marker-alt" color="primary"/>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-md-3" v-if="false">
          <q-select
            :loading="dataCities.loading"
            filled
            v-model="city"
            :options="dataCities.cities"
            :label="$tr('qquote.layout.form.city')">
            <template v-slot:prepend>
              <q-icon name="gps_fixed" color="primary"/>
            </template>
          </q-select>
        </div>
        <div class="col-xs-12 col-md-6">
          <q-input
            filled
            v-model="email"
            :label="$tr('qquote.layout.form.email')"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="email" color="primary"/>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-input
            mask="(###) ### - ####"
            unmasked-value
            filled
            v-model="phone"
            :label="$tr('qquote.layout.form.phone')"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="phone_android" color="primary"/>
            </template>
          </q-input>
        </div>
        <div class="col-xs-12 col-md-3">
          <q-select
            :loading="dataCountries.loading"
            filled
            v-model="currency"
            :options="dataCurrencies.currencies"
            :label="$tr('qquote.layout.form.currencyQuoted')"
            @input="emitEventChangeCurrency"
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <template v-slot:prepend>
              <q-icon name="attach_money" color="primary"/>
            </template>
          </q-select>
        </div>
      </div>
    </div>
    <div class="col-md-12 q-mt-none">
      <div :class="`row ${$q.platform.is.desktop ? 'q-col-gutter-md' : 'q-mx-md'}`">
        <div class="col-xs-12 col-md-12">
          <q-editor
            flat
            toolbar-bg="grey-2"
            content-class="bg-grey-2"
            v-model="notes"
            min-height="5rem" />
        </div>
      </div>
    </div>
    <div class="col-md-12 q-mt-none">
      <div :class="`row ${$q.platform.is.desktop ? 'q-col-gutter-md' : 'q-mx-md'}`">
        <div v-for="(field, key) in fakeFields" :key="key" :ref="key" :class="field.className">
          <dynamic-field
            :filled="true"
            :key="key"
            v-model="field.value"
            :field="field" />
        </div>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </q-form>
</template>

<script>
  export default {
    name: "userInformation",
    props:{
      fakeFields: {
        default: () => []
      }
    },
    computed:{
      firstName: {
        get: function () {
          return this.$store.state.qquoteQuotation.firstName
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_first_name', newValue)
        }
      },
      lastName: {
        get: function () {
          return this.$store.state.qquoteQuotation.lastName
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_last_name', newValue)
        }
      },
      email: {
        get: function () {
          return this.$store.state.qquoteQuotation.email
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_email', newValue)
        }
      },
      phone: {
        get: function () {
          return this.$store.state.qquoteQuotation.phone
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_phone', newValue)
        }
      },
      notes: {
        get: function () {
          return this.$store.state.qquoteQuotation.notes
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_notes', newValue)
        }
      },
      value: {
        get: function () {
          return this.$store.state.qquoteQuotation.iValue
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_value', newValue)
        }
      },
      userId: {
        get: function () {
          return this.$store.state.qquoteQuotation.userId
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_user_id', newValue)
        }
      },
      customerId: {
        get: function () {
          return this.$store.state.qquoteQuotation.customerId
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_customer_id', newValue)
        }
      },
      identification: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.identification
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_identification', newValue)
        }
      },
      birthday: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.birthday
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_birthday', newValue)
        }
      },
      country: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.country
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_country', newValue)
        }
      },
      department: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.department
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_department', newValue)
        }
      },
      city: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.city
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_city', newValue)
        }
      },
      currency: {
        get: function () {
          return this.$store.state.qquoteQuotation.options.currency
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_currency', newValue)
        }
      },
      user: {
        get: function () {
          return this.$store.state.qquoteQuotation.user
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_user', newValue)
        }
      },
      hasPermissionToIndexUsers(){
        return this.getRole(['Admin', 'Superdmin'])
      },
    },
    async created(){
      this.getUsers()
      this.getCurrencies()
      this.$root.$on('reset', this.resetData)
      this.$root.$on('validateUserInformation', this.validateData)
      this.validateIsAdmin()
      this.getCountries()
      this.isRoleUserCompleteDatabase()
    },
    watch: {
      user: function (val){
        this.firstName = this.user.value.firstName
        this.lastName = this.user.value.lastName
        this.email = this.user.value.email
        this.customerId = this.user.value.id
      },
      'options.country': function (val) {
        this.options.department = ''
        this.options.city = ''
      },
      'options.department': function (val) {
        this.options.city = ''
      },
      currency: function (val, oldVal) {
        this.oldCurrency = oldVal
      }
    },
    data () {
      return {
        loading: false,
        users: [],

        dataCountries: {
          countries:[],
          loading: false,
        },
        dataProvinces: {
          provinces:[],
          loading: false,
        },
        dataCurrencies: {
          currencies:[],
          loading: false,
        },
        dataCities: {
          cities:[],
          loading: false,
        },
        model: '',
        oldCurrency: '',
      }
    },
    methods:{
      getUsers(){
        if (this.$store.state.quserAuth.userId && this.hasPermissionToIndexUsers) {
          this.loading = true
          this.$crud.index('apiRoutes.quser.users', { params: {} } ).then( response => {
            this.users = Object.freeze(response.data.map( user => ({label: user.fullName, value: user})))
            this.loading = false
          }).catch( error => {
            this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
            console.warn( error )
            this.loading = false
          })
        }
      },
      getCurrencies(){
        this.dataCurrencies.loading = true
        let params = {
          params: {
            filter: {
              status : 1
            }
          }
        }
        this.$crud.index('apiRoutes.qcurrency.currencies', params ).then( response => {
          let currencies = Object.freeze(response.data.map( currency => ({label: currency.code, value: currency.id, defaultCurrency: currency.defaultCurrency})))
          this.dataCurrencies.currencies = currencies
          this.$store.dispatch('qcurrencyMaster/set_currencies', currencies)
          this.currency = this.$store.state.qcurrencyMaster.defaultCurrency
          this.dataCurrencies.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.dataCurrencies.loading = false
        })
      },
      emitEventChangeCurrency(){
        this.$q.dialog({
          title: this.$tr('qquote.layout.labels.confirm'),
          message: 'Antes de continuar debe tener en cuenta que esto re iniciara los datos del formulario',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$root.$emit('changeCurrency', this.currency)
          this.$store.dispatch('qquoteQuotation/set_currency', this.currency)
        }).onCancel(() => {
          this.currency = this.oldCurrency
          this.$store.dispatch('qquoteQuotation/set_currency', this.oldCurrency)
        })
      },
      getCountries(){
        this.dataCountries.loading = true
        this.$crud.index('apiRoutes.qlocations.countries', { params: {} } ).then( response => {
          this.dataCountries.countries = Object.freeze(response.data.map( item => ({label: item.name, value: item.id})))
          this.dataCountries.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.dataCountries.loading = false
        })
      },
      getProvinces(countryId){
        this.dataProvinces.loading = true
        let params =  {
          params: {
            filter:{
              country: countryId
            }
          }
        }
        this.$crud.index('apiRoutes.qlocations.provinces', params).then( response => {
          this.dataProvinces.provinces = Object.freeze(response.data.map( item => ({label: item.name, value: item.id})))
          this.dataProvinces.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.dataProvinces.loading = false
        })
      },
      getCities(provinceId){
        this.dataCities.loading = true
        let params =  {
          params: {
            filter:{
              province_id: provinceId
            }
          }
        }
        this.$crud.index('apiRoutes.qlocations.cities', params).then( response => {
          this.dataCities.cities = Object.freeze(response.data.map( item => ({label: (item.name).toLowerCase(), value: item.id})))
          this.dataCities.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.dataCities.loading = false
        })
      },
      validateIsAdmin(){
        let resultVerifyPermission = this.$store.state.quserAuth.userId && this.hasPermissionToIndexUsers
        if (resultVerifyPermission){
          this.userId = parseInt(this.$store.state.quserAuth.userId)
        } else {
          this.userId = null
        }
      },
      getRole(rolesToFind){
        let rolesUser = this.$store.getters['quserAuth/userRolesSelect']
        return rolesUser.find( role => role.label == rolesToFind[0] || role.label == rolesToFind[1]  ) || false
      },
      isRoleUserCompleteDatabase(){
        if (this.getRole(['User']) && this.$store.state.quserAuth.userId ){
          this.firstName = this.$store.state.quserAuth.userData.firstName
          this.lastName = this.$store.state.quserAuth.userData.lastName
          this.email = this.$store.state.quserAuth.userData.email
        }
      },
      resetData(){
        this.$refs.formContent.resetValidation()
        this.firstName = ''
        this.lastName = ''
        this.email = ''
        this.phone = ''
        this.notes = ''
        this.value = ''
        this.userId = ''
        this.customerId = ''
        this.identification = ''
        this.dateBirth = ''
        this.country = ''
        this.department = ''
        this.city = ''
        this.currency = this.$store.state.qcurrencyMaster.defaultCurrency
        console.warn('reseting data in user information component')
      },
      validateData(){
        this.$refs.formContent.validate()
      },
    }
  }
</script>
