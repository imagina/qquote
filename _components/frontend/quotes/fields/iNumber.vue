<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-xs-12 col-md-4 q-pr-md flex content-end">
        <q-slider
          label-always
          v-model="characteristic.model"
          :min="0"
          :max="characteristic.max"/>
      </div>
      <div class="col-xs-12 col-md-4 q-pr-md">
        {{$tr('qquote.layout.labels.quantity')}}
        <q-input
          filled
          :rules="[
            val => val <= characteristic.max || '',
            val => val >= 0 || ''
           ]"
          type="number"
          outlined
          v-model="characteristic.model"
          />
      </div>
      <div class="col-xs-12 col-md-4">
        {{$tr('qquote.layout.labels.total')}}
        <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
          {{$trc((characteristic.model * characteristic.price) || 0 , $store.state.qquoteQuotation.options.currency.label)}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 q-pr-md q-pt-md">
        <q-input
          type="textarea"
          v-if="characteristic.withNotes"
          color="primary"
          outlined
          filled
          :label="$tr('qquote.layout.labels.additionalNotes')"
          v-model="characteristic.notes"
          :disable="!characteristic.withNotes" >
          <template v-slot:prepend>
            <q-icon name="fas fa-comment-dots" color="primary"/>
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-12">

        <div v-for="(item, index) in characteristic.childrengenerated" :key="index">
          <div class="q-mb-md" >
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
    name: "inumber",
    components:{
      fieldContainer
    },
    props:{
      characteristic:{
        type: Object,
        default: () => {}
      }
    },
    watch:{
      /* Each time the value of the model property is changed
      in the characteristic object, the set of children that
      it has as many times as indicated in the variable model
      is rendered*/
      'characteristic.model': function (newValue, oldValue) {
        if(this.characteristic.model < 0){
          this.characteristic.model = 0
        }
        if(this.characteristic.model > this.characteristic.max){
          this.characteristic.model = this.characteristic.max
        }
        
        if (this.characteristic.children){
          this.characteristic.childrengenerated = []
          for (let i = 1; i <= newValue; i++) {
            for (const item of this.characteristic.children) {
              this.characteristic.childrengenerated.unshift(JSON.parse(JSON.stringify(item)))
            }
          }
        }
      }
    },
    data(){
      return {
      }
    },
  }
</script>
