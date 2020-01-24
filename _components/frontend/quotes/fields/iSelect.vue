<template>
  <div>
    <div class="row">
      <div class="col-xs-12 col-md-8 q-pr-md">
        <br>
        <q-select
          outlined
          v-model="characteristic.model"
          :options="options"
          :label="`${characteristic.name}`" />
      </div>
      <div class="col-xs-12 col-md-4">
        {{$tr('qquote.layout.labels.total')}}
        <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
          {{$trc(characteristic.model.price || 0 , $store.state.qquoteQuotation.options.currency.label)}}
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-8 q-pr-md q-pt-md">
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
      <div class="col-md-4 q-pr-md q-pt-md">

      </div>
    </div>
    <div class="row q-mt-md">
      <div class="col-md-12">
        <div v-if="characteristic.children">
          <div v-for="(item, index) in characteristic.children">
            <div v-for="(character, index) in item.children">
              <div v-if="character.parentId == characteristic.model.value">
                <fieldContainer
                  :characteristic="character"/>
              </div>
            </div>
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
    props:{
      characteristic:{
        type: Object,
        default: () => ({
          children: []
        })
      }
    },
    computed:{
      options(){
        return this.characteristic.children.filter(item => item.type == this.typeOption).map( item => {
          return {label: `${item.name}`, value: item.id, price: item.price}
        })
      },
    },
    data (){
      return {
        model: '',
        typeOption: 5,
      }
    }
  }
</script>
