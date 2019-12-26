<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 q-pr-md flex content-end">
      <q-checkbox
        dense
        v-model="characteristic.model"
        :label="`${characteristic.name} (${this.$trc(characteristic.price)})`" />
    </div>
    <div class="col-xs-12 col-md-4">
      {{$tr('qquote.layout.labels.total')}}

      <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
        {{$trc( (characteristic.model * characteristic.price) || 0 )}}
      </div>

    </div>
    <div class="col-xs-12 col-md-12 q-mt-md">
      <div v-if="characteristic.children">
        <div v-for="(item, index) in characteristic.children">
          <div v-if="characteristic.model">
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
        default: () => {}
      }
    },
    data () {
      return {
        model: false
      }
    }
  }
</script>
