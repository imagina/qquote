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
  
          <div class="input-title">{{`${$tr('ui.form.description')} (${locale.language})*`}}</div>
          <q-field v-model="locale.formTemplate.description" borderless
                   :rules="[val => !!val || $tr('ui.message.fieldRequired')]">
            <q-editor v-model="locale.formTemplate.description" class="full-width"
                      :toolbar="editorText.toolbar" content-class="text-grey-9" toolbar-text-color="grey-9"/>
          </q-field>

          <q-select
            :label="`${$tr('ui.form.type')}`"
            v-model="locale.formTemplate.type" outlined dense
            emit-value map-options
            :options="types"/>
          <q-input
            :rules="locale.formTemplate.type == 4 && [val => !!val || $tr('ui.message.fieldRequired')]"
            v-if="locale.formTemplate.type == 4"
            :label="`${$tr('qquote.layout.min')}`"
            type="number" v-model="locale.formTemplate.min" outlined dense/>
          <q-input
            :rules="locale.formTemplate.type == 4 && [val => !!val || $tr('ui.message.fieldRequired')]"
            v-if="locale.formTemplate.type == 4"
            :label="`${$tr('qquote.layout.max')}`"
            type="number" v-model="locale.formTemplate.max" outlined dense/>
          <q-checkbox
            :label="`${$tr('qquote.layout.withNotes')}`"
            v-model="locale.formTemplate.withNotes" />
          <br>
          <q-checkbox
            :label="`${$tr('qquote.layout.searcheable')}`"
            v-if="locale.formTemplate.type == 2"
            v-model="locale.formTemplate.searcheable" />
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
          <q-input
            :label="`${$tr('ui.form.price')}`"
            type="number" v-model="locale.formTemplate.price" outlined dense/>
          <q-select
            :label="`${$tr('ui.form.required')}`"
            v-model="locale.formTemplate.required" outlined dense
            emit-value map-options
            :options="[
              {label : $tr('ui.label.yes'), value : true},
              {label : $tr('ui.label.no'), value : false},
            ]"/>
          <div class="input-title">{{`${$tr('ui.form.image')}`}}</div>
          <mediaForm
            entity="Modules\Iquote\Entities\Characteristic"
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
            type="submit"
          />
        </div>
      </q-form>
      <div v-if="characteristicId" class="col-12 q-mt-lg">
        <div class="box">
          <indexCharacteristics
            v-if="locale.success"
            :productId="locale.formTemplate.productId"
            :parentId="characteristicId"
            :filter="{parent: characteristicId}"/>
        </div>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import mediaForm from '@imagina/qmedia/_components/form'

  export default {
    name: 'formCharacteristics',
    props:{
      characteristicId:{
        default: null
      },
      redirect:{
        default: true
      },
      productId:{
        default: '',
      },
      parentId:{
        default: '',
      },
    },
    components:{
      mediaForm,
      indexCharacteristics: () => import('@imagina/qquote/_components/admin/characteristics/index')
    },
    watch: {
      $route(to, from) {
        this.initForm()
      }
    },
    mounted() {
      this.$nextTick( () => {
        this.initForm()
        this.getTypes()
      })
    },
    data () {
      return {
        locale: {},
        loading: false,
        success: false,
        itemId: false,
        mediaKey: this.$uid(),
        types: [],
        editorText: {
          toolbar: [
            ['bold', 'italic', 'strike', 'underline', 'removeFormat'],
            ['link'],
            [
              {
                label: 'Font Size',
                icon: 'format_size',
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: ['size-1', 'size-2', 'size-3', 'size-4', 'size-5', 'size-6', 'size-7']
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['fullscreen']
          ]
        },
      }
    },
    computed: {
      dataLocale() {
        return {
          fields: {
            productId: this.productId,
            type: '',
            parentId: this.parentId,
            price: '0',
            active: true,
            position: '0',
            required: false,
            mediasSingle: {},
            max: 0,
            min: 0,
            withNotes: false,
            searcheable: false
          },
          fieldsTranslatable:{
            name: '',
            description: '',
            options: '',
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
        this.itemId = this.characteristicId
        if (this.locale.success) this.$refs.localeComponent.vReset()
        await this.getData()
        this.success = true
        this.loading = false
      },
      getData() {
        return new Promise((resolve, reject) => {
          const itemId = this.$clone(this.itemId)
          if (itemId) {
            let configName = 'apiRoutes.qquote.characteristics'
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
          let configName = 'apiRoutes.qquote.characteristics'
          this.$crud.create(configName, this.getDataForm()).then(response => {
            this.$alert.success({message: `${this.$tr('ui.message.recordCreated')} ID: ${response.data.id}`})
            if (this.redirect){
              this.$router.push({name: 'qquote.admin.productsEdit', params:{id: response.data.id}})
            }
            this.$emit('created', response.data)
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
          let configName = 'apiRoutes.qquote.characteristics'
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
      },
      getTypes(){
        let params = {
          params:{}
        }
        this.$crud.index('apiRoutes.qquote.types', params).then( response => {
          this.types = response.data
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
        })
      }
    }
  }
</script>
