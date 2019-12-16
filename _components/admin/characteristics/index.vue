<template>
  <div class="relative-position">
    <div class="row q-mb-md">
      <div class="col-md-4">
        <q-input
          @input="getCharacteristics"
          clearable
          v-model="table.filter.search"
          dense
          outlined
          debounce="800"
          :placeholder="`${$tr('ui.label.search',{capitalize : true})}...`">
          <template v-slot:append>
            <q-icon name="search"/>
          </template>
        </q-input>
      </div>
      <div class="col-md-8 flex justify-end">
        <createCharacteristics
          :productId="productId"
          :parentId="parentId"
          @created="getCharacteristics" />
        <div>
          <q-btn
            @click="getCharacteristics(true)"
            icon="fas fa-sync-alt"
            color="info"
            class="q-ml-xs"/>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <q-list bordered >
          <q-item >
            <q-item-section>
              <div class="row">

                <div class="col-md-2 flex items-center">
                  {{$tr('ui.form.name')}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{$tr('ui.form.type')}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{$tr('ui.form.price')}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{$tr('ui.form.status')}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{$tr('ui.form.required')}}
                </div>
                <div class="col-md-2 flex justify-end items-center">
                  {{$tr('ui.form.actions')}}
                </div>

              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list bordered separator>

          <q-item v-for="(characteristic, index) in table.data" :key="index">
            <q-item-section >
              <div class="row">
                <div class="col-md-2 flex items-center">
                  {{characteristic.name}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{characteristic.typeName}}
                </div>
                <div class="col-md-2 flex items-center">
                  {{$trc(characteristic.price)}}
                </div>
                <div class="col-md-2 flex items-center">
                  <q-chip
                    icon="bookmark"
                    :color="`${characteristic.active ? 'positive' : 'grey-4'}`"
                    text-color="white">
                    {{characteristic.active ? $tr('ui.label.enabled') : $tr('ui.label.disabled')}}
                  </q-chip>

                </div>
                <div class="col-md-2 flex items-center">
                  <q-chip
                    icon="bookmark"
                    :color="`${characteristic.required ? 'positive' : 'grey-4'}`"
                    text-color="white">
                    {{characteristic.required ? $tr('ui.label.yes') : $tr('ui.label.no')}}
                  </q-chip>
                </div>
                <div class="col-md-2 flex justify-end items-center">
                  <div>
                    <q-btn
                      v-if="$auth.hasAccess(`iquote.characteristics.edit`)"
                      :to="{name: 'qquote.admin.characteristicEdit', params:{characteristicId: characteristic.id}}"
                      size="sm"
                      class="q-mr-sm"
                      icon="fas fa-pen"
                      color="positive"/>
                    <q-btn
                      v-if="$auth.hasAccess(`iquote.characteristics.destroy`)"
                      @click="itemIdToDelete = characteristic; dialogDeleteItem = true"
                      size="sm"
                      icon="fas fa-trash-alt"
                      color="negative"/>
                  </div>
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
    <q-dialog v-model="dialogDeleteItem">
      <q-card class="backend-page">
        <q-card-section>
          <h5 class="q-ma-none text-negative">{{itemIdToDelete.name}}</h5>
          {{$tr('ui.message.deleteRecord')}}
        </q-card-section>

        <q-card-actions align="right">
          <!--Button cancel-->
          <q-btn color="blue-grey" label="Cancel" @click="dialogDeleteItem = false"/>
          <!--Button confirm delete category-->
          <q-btn color="negative" icon="fas fa-trash-alt" :loading="loading"
                 label="Delete" @click="deleteItem()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import createCharacteristics from '@imagina/qquote/_components/admin/characteristics/create'

  export default {
    name: 'indexCharacteristics',
    components:{
      createCharacteristics
    },
    props:{
      filter:{
        type:Object,
        required:true
      },
      productId:{
        default: '',
      },
      parentId:{
        default: '',
      },
    },
    data () {
      return {
        loading: false,
        table: {
          data: [],
          filter: {
            search: null
          }
        },
        dialogDeleteItem: false,
        itemIdToDelete: {},
      }
    },
    watch: {
      '$route.params': function (to, from) {
        this.getCharacteristics(true)
      }
    },
    created(){
      this.getCharacteristics(true)
    },
    methods:{
      getCharacteristics(refresh = false){
        let params = {
          refresh: refresh,
          params:{
            filter: this.filter
          }
        }
        params.params.filter.search = this.table.filter.search
        this.loading = true
        this.$crud.index('apiRoutes.qquote.characteristics', params).then( response => {
          this.table.data = response.data
          this.loading = false
        }).catch( error =>{
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
      deleteItem(){
        this.loading = true
        this.$crud.delete('apiRoutes.qquote.characteristics', this.itemIdToDelete.id).then( response => {
          this.$alert.info({message: this.$tr('ui.message.recordDeleted')})
          this.getCharacteristics(true)
          this.loading = false
          this.dialogDeleteItem = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      }
    }
  }
</script>
