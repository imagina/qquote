<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 q-pr-md flex content-end">
      <q-checkbox
        dense
        v-model="characteristic.model"
        :label="`${characteristic.name} (${$trc(characteristic.price, $store.state.qquoteQuotation.options.currency.label)})`" />
    </div>
    <div class="col-xs-12 col-md-4">
      {{$tr('qquote.layout.labels.total')}}

      <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
        {{$trc( (characteristic.model * characteristic.price) || 0 , $store.state.qquoteQuotation.options.currency.label)}}
      </div>

    </div>
    
    <div v-if="characteristic.searcheable" class="col-xs-12 col-md-12 q-mt-md">
      
      <q-select
        use-input
        filled
        use-chips
        @filter="filterFn"
        v-model="model"
        :options="options"
        label="Select Options"
        multiple
        map-options>
       
      </q-select>
    </div>
    
    <div class="col-xs-12 col-md-12 q-mt-md">
      <div v-if="characteristic.children">
        <div v-for="(item, index) in characteristic.children">
          <div v-if="characteristic.model && showCharacteristic(item)">
            <fieldContainer
              :characteristic="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fieldContainer from '@imagina/qquote/_components/frontend/quotes/fieldContainer'
  export default {
    components:{
      fieldContainer
    },
    name: "icheckbox",
    props:{
      characteristic:{
        type: Object,
        default: () => {
          searcheable: false
        }
      }
    },
    data () {
      return {
        model: [],
        options: []
      }
    },
    computed:{
      formatOptions() {
        return this.characteristic.children.map( item => ({label: item.name, value: item.id}))
      }
    },
    methods:{
      showCharacteristic(characteristic){
        if(this.characteristic.searcheable == false){
          return true
        }
        
        if (this.model.find( item => item.value == characteristic.id )){
          return true
        }
        return false
      },
      filterFn(val, update) {
        if (val === '') {
          update(() => {
            this.options = this.characteristic.children.map( item => ({label: item.name, value: item.id}))
          })
          return
        }
        update(() => {
          const needle = val.toLowerCase()
          this.options = this.formatOptions.filter( v => v.label.toLowerCase().indexOf(needle) > -1 )
        })
      }
    }
  }
</script>
