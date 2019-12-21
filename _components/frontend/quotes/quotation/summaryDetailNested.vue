<template>
  <div>
    <ul class="tree">
      <li v-for="(item, index) in children" :key="index">
        
        <div v-if="item.model != false  || item.type != 2">
          <div v-if="item.type == 1">
            <div class="text-primary text-bold">
              <q-icon name="fas fa-square" size="6px"/>
              {{item.name}} <small>{{item.model.label}}</small>
            </div>
            <div class="">{{$tr('qquote.layout.labels.valueUnit')}}: {{$trc(item.model.price)}} </div>
            <div class="">{{$tr('qquote.layout.labels.quantity')}}: 1 </div>
            <div><b>{{$tr('qquote.layout.labels.total')}}:</b> {{$trc(sumCharacteristics(item))}}</div>
            <div v-if="item.children">
              <div v-for="(item, index) in item.children">
                <summaryDetailNested :children="item.children"/>
              </div>
            </div>
          </div>
          
          <div v-else-if="item.type == 2">
            <div class="text-primary text-bold">
              <q-icon name="fas fa-square" size="6px"/>
              {{item.name}}
            </div>
            <div class="">{{$tr('qquote.layout.labels.valueUnit')}}: {{$trc(item.price)}} </div>
            <div class="">{{$tr('qquote.layout.labels.quantity')}}: 1 </div>
            <div><b>{{$tr('qquote.layout.labels.total')}}:</b> {{$trc(item.price)}}</div>
            <div v-if="item.children">
              <summaryDetailNested :children="item.children"/>
            </div>
          </div>
          
          <div v-if="item.type == 3">
            <div class="text-primary text-bold">
              <q-icon name="fas fa-square" size="6px"/>
              {{item.name}}
            </div>
            <div class="">{{$tr('qquote.layout.labels.valueUnit')}}: {{$trc(sumCharacteristics(item))}} </div>
            <div class="">{{$tr('qquote.layout.labels.quantity')}}: 1 </div>
            <div><b>{{$tr('qquote.layout.labels.total')}}:</b> {{$trc(sumCharacteristics(item))}}</div>
            <div v-if="item.children">
              <summaryDetailNested :children="item.children"/>
            </div>
          </div>
          
          <div v-if="item.type == 4">
            <div class="text-primary text-bold">
              <q-icon name="fas fa-square" size="6px"/>
              {{item.name}}
            </div>
            <div class="">{{$tr('qquote.layout.labels.valueUnit')}}: {{$trc(item.price)}} </div>
            <div class="">{{$tr('qquote.layout.labels.quantity')}}: {{item.model}} </div>
            <div><b>{{$tr('qquote.layout.labels.total')}}:</b> {{$trc(sumCharacteristics(item))}}</div>
            <div v-if="item.children">
              <summaryDetailNested :children="item.childrenGenerated"/>
            </div>
          </div>
  
          <div v-if="item.withNotes">
            <b>{{$tr('qquote.layout.labels.additionalNotes')}}: </b> {{item.notes}}
          </div>
          
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'summaryDetailNested',
    props:{
      children:{
        type: Array,
        default: () => []
      }
    },
    methods:{
      sumChildren( children ){
        let calculate = 0
        children.forEach( element => { calculate += this.sumCharacteristics( element )})
        return calculate
      },
      sumCharacteristics( characteristic ){
        // type 1 Select
        if( characteristic.type == 1 ){
          let valueSelected = characteristic.children.find( element => element.id == characteristic.model.value) || {price: 0}
          let response = valueSelected.price
          response += this.sumChildren(valueSelected.children || [])
          return response
        }

        // type 2 checkbox
        if( characteristic.type == 2 && characteristic.model ){
          let response = characteristic.price
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        // type 3 value
        if( characteristic.type == 3 ){
          let response = characteristic.model || 0
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        // type 4 number
        if( characteristic.type == 4 ){
          let response = (characteristic.model *  characteristic.price)
          response += this.sumChildren(characteristic.childrenGenerated || [])
          return response
        }

        return 0
      },
    }
  }
</script>
