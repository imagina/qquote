<template>
  <div class="q-gutter-y-md relative-position">
    <div class="row">
      <div class="col-md-12 text-h6">
        <q-avatar color="primary" text-color="white" icon="person" size="sm"/>
        {{ $tr('qquote.layout.labels.informationUser') }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-select
          filled
          v-model="user"
          use-input
          hide-selected
          fill-input
          input-debounce="0"
          label="Usuario"
          :options="users">
          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-grey">
                {{ $tr('qquote.layout.labels.noResults') }}
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-mb-md">
      <div class="col-md-6 q-pr-sm q-gutter-y-sm">
        <q-input
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          :label="`${$tr('qquote.layout.form.firstName')}`"
          filled
          v-model="firstName" />
        <q-input
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          :label="`${$tr('qquote.layout.form.email')}`"
          filled
          v-model="email" />
      </div>
      <div class="col-md-6 q-gutter-y-sm">
        <q-input
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          :label="`${$tr('qquote.layout.form.lastName')}`"
          filled
          v-model="lastName" />
        <q-input
          :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
          :label="`${$tr('qquote.layout.form.phone')}`"
          filled
          v-model="phone" />
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    name: "userInformation",
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
    },
    async created(){
      this.getUsers()
      this.validateIsAdmin()
    },
    watch: {
      user: function (val){
        this.firstName = this.user.value.firstName
        this.lastName = this.user.value.lastName
        this.email = this.user.value.email
        this.customerId = this.user.value.id
      }
    },
    data () {
      return {
        loading: false,
        users: [],
        user: {},
      }
    },
    methods:{
      getUsers(){
        this.loading = true
        this.$crud.index('apiRoutes.quser.users', { params: {} } ).then( response => {
          this.users = Object.freeze(response.data.map( user => ({label: user.fullName, value: user})))
          this.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.loading = false
        })
      },
      validateIsAdmin(){
        let resultVerifyRole = this.getRole('Admin')
        if (resultVerifyRole){
          this.userId = parseInt(this.$store.state.quserAuth.userId)
        } else {
          this.userId = null
        }
      },
      getRole(roleName){
        let roles = this.$store.getters['quserAuth/userRolesSelect']
        return roles.find( role => role.label == roleName ) || false
      },
    }
  }
</script>
