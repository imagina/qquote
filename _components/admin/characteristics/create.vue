<template>
  <div>
    <q-btn
      v-if="$auth.hasAccess(`iquote.characteristics.create`)"
      @click="show = true"
      icon="fas fa-edit"
      :label="$tr('qquote.layout.newCharacteristic')"
      color="positive"/>
    <q-dialog
      full-width
      v-model="show"
      no-esc-dismiss
      no-backdrop-dismiss>
      <q-card :class="`bg-grey-1 backend-page row`">
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>
            <label>{{  $tr('qquote.layout.newCharacteristic') }}</label>
          </q-toolbar-title>
          <q-btn flat v-close-popup icon="fas fa-times"/>
        </q-toolbar>
        <q-card-section class="relative-position col-12">
          <formCharacteristics
            :productId="productId"
            :parentId="parentId"
            @created="emitEventCreateData"
            :redirect="false"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import formCharacteristics from '@imagina/qquote/_components/admin/characteristics/form'

  export default {
    name: 'createCharacteristics',
    props:{
      productId:{
        default: '',
      },
      parentId:{
        default: '',
      },
    },
    components:{
      formCharacteristics
    },
    data () {
      return {
        show: false
      }
    },
    methods:{
      emitEventCreateData(event){
        this.$emit('created', event)
        this.show = false
      }
    }
  }
</script>

<style scoped>

</style>
