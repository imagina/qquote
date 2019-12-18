<template>
  <div class="row">
    <div class="col-md-8 q-pr-md flex content-end">
      <q-checkbox
        dense
        v-model="characteristic.model"
        :label="`${characteristic.name} (${this.$trc(characteristic.price)})`" />
    </div>
    <div class="col-md-4">
      Total
      <q-input
        dense
        filled
        outlined
        v-model="characteristic.model * characteristic.price"
        disable
        prefix="$" />
    </div>
    <div class="col-md-12 q-mt-md">
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
