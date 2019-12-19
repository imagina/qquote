<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-md-8 q-pr-md">
        {{characteristic.name}}
        <q-input
          dense
          v-model.number="characteristic.model"
          type="number"
          outlined />
      </div>
      <div class="col-md-4">
        Total
        <q-input
          dense
          outlined
          v-model="characteristic.model"
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
          label="Notas Adicionales"
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
  </div>
</template>

<script>
  export default {
    name: "ivalue",
    props:{
      characteristic:{
        type: Object,
        default: () => {}
      }
    },
    data () {
      return {
        model: ''
      }
    }
  }
</script>

<style scoped>

</style>
