<template>
  <div>
    <div class="row">
      <div class="col-md-8 q-pr-md">
        <br>
        <q-select
          dense
          outlined
          v-model="characteristic.model"
          :options="options"
          :label="`${characteristic.name}`" />
      </div>
      <div class="col-md-4" color="primary">
        {{$tr('qquote.layout.labels.total')}}
        <q-input
          dense
          color="primary"
          outlined
          v-model="characteristic.model.price"
          disable
          prefix="$"/>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 q-pr-md q-pt-md">
        <q-input
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
          return {label: `${item.name} (${this.$trc(item.price)})`, value: item.id, price: item.price}
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
