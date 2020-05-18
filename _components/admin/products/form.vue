<template>
  <div id="productFormPage" ref="productFormPage">
    <div class="row relative-position"  v-if="success">
      <div class="col-12 q-mb-md">
        <locales v-model="locale" ref="localeComponent" :form="$refs.formContent"/>
      </div>
      <q-form
        @submit="itemId ? updateItem() : createItem()"
        ref="formContent"
        class="row q-col-gutter-x-md full-width"
        autocomplete="off"
        @validation-error="$alert.error($tr('ui.message.formInvalid'))">
        <!--Form left-->
        <div class="col-7 q-gutter-y-md" v-if="locale.success">
          <q-input
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
            :label="`${$tr('ui.form.name')} (${locale.language}) `"
            type="text" v-model="locale.formTemplate.name" outlined dense/>
          <q-editor
            :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
            :label="`${$tr('ui.form.description')} (${locale.language}) `"
            type="textarea" v-model="locale.formTemplate.description" outlined dense/>
          <q-input
            :label="`${$tr('ui.form.price')}`"
            v-bind="moneyFormatForComponent"
            type="number" v-model="locale.formTemplate.price" outlined dense/>
	        <q-input
		        :label="`${$tr('qquote.layout.discount')}`"
		        v-bind="moneyFormatForComponent"
		        type="number" v-model="locale.formTemplate.discount" outlined dense/>
          <q-checkbox
            :label="`${$tr('qquote.layout.includeInQuotation')}`"
            v-model="locale.formTemplate.includeInQuotation" />
        </div>
        <!--Form Right-->
        <div class="col-5 q-gutter-y-md" v-if="locale.success">
          <q-select
            :label="`${$tr('ui.form.status')}`"
            v-model="locale.formTemplate.active" outlined dense
            emit-value map-options
            :options="[
              {label : $tr('ui.label.enabled'), value : true},
              {label : $tr('ui.label.disabled'), value : false},
            ]"/>
          <div class="input-title">{{`${$tr('ui.form.image')}`}}</div>
          <mediaForm
            entity="Modules\Iquote\Entities\Product"
            :entity-id="itemId ? itemId : ''"
            v-model="locale.formTemplate.mediasSingle"
            zone="mainimage"
            :key="mediaKey"
          />
        </div>
        <!--Actio Btn-->
        <div class="col-12 text-right">
          <q-btn
            v-if="itemId" color="positive"
            :loading="loading"
            icon="fas fa-edit"
            :label="$tr('ui.label.update')"
            type="submit"
            />
          <q-btn
            v-else color="positive"
            :loading="loading"
            icon="fas fa-edit"
            :label="$tr('ui.label.create')"
            type="submit" />
        </div>
      </q-form>
    </div>
    <div v-if="$route.params.id" class="box q-mt-lg">
      <indexCharacteristics
        :productId="$route.params.id"
        :parentId="0"
        :filter="{product: $route.params.id, parent: 0}"/>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import mediaForm from '@imagina/qmedia/_components/form'
  import indexCharacteristics from '@imagina/qquote/_components/admin/characteristics/index'

  export default {
    components:{
      mediaForm,
      indexCharacteristics
    },
    watch: {
      $route(to, from) {
        this.initForm()
      }
    },
    mounted() {
      this.$nextTick( () => {
        this.initForm()
      })
    },
    data () {
      return {
        locale: {},
        loading: false,
        success: false,
        itemId: false,
        mediaKey: this.$uid(),
        moneyFormatForComponent: {
          decimal: '.',
          thousands: ',',
          prefix: '$ ',
          suffix: '',
          precision: 2,
          masked: true
        }
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            active: false,
            price: 0,
            mediasSingle: {},
            includeInQuotation: true,
	          discount: 0
          },
          fieldsTranslatable:{
            name:'',
            description:'',
          }
        }
      },
      canManageRecordMaster () {
        let response = true
        return response
      }
    },
    methods: {
      async initForm() {
        this.loading = true
        this.success = false
        this.locale = this.$clone(this.dataLocale)
        this.itemId = this.$route.params.id
        if (this.locale.success) this.$refs.localeComponent.vReset()
        await this.getData()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qquote.products'
            //Params
            let params = {
              refresh: true,
              params: {
                filter: {allTranslations: true}
              }
            }
            //Request
            this.$crud.show(configName, itemId, params).then(response => {
              this.orderDataItemToLocale(response.data)
              resolve(true)//Resolve
            }).catch(error => {
              this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
              this.loading = false
              reject(false)//Resolve
            })
          } else {
            resolve(true)//Resolve
          }
        })
      },
      orderDataItemToLocale(data) {
        let orderData = this.$clone(data)
        this.locale.form = this.$clone(orderData)
      },
      async createItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qquote.products'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            this.$router.push({name: 'qquote.admin.productsEdit', params:{id: response.data.id}})
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoCreated'), pos: 'bottom'})
          })
        }
      },
      async updateItem() {
        if (await this.$refs.localeComponent.validateForm()) {
          this.loading = true
          let configName = 'apiRoutes.qquote.products'
          this.$crud.update(configName, this.itemId, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordUpdated')}`})
            //this.initForm()
            this.loading = false
          }).catch(error => {
            this.loading = false
            this.$alert.error({message: this.$tr('ui.message.recordNoUpdated'), pos: 'bottom'})
          })
        }
      },
      getDataForm() {
        let response = this.locale.form
        for (var item in response) {
          let valueItem = response[item]
          if (valueItem == null || valueItem == undefined)
            delete response[item]
        }
        response.selectable = JSON.stringify(response.selectable)
        return response
      }
    }
  }
</script>
