<template>
  <div>
    <div class="row q-mt-md">
      <div class="col-xs-12 col-md-8 q-pr-md">
        {{characteristic.name}}
        <q-input
          v-model.number="characteristic.model"
          type="number"
          outlined />
      </div>
      <div class="col-xs-12 col-md-4">
        {{$tr('qquote.layout.labels.total')}}
        <div style="border-radius: 5px; border: 1px solid silver; padding: 9px; font-size: 24px" class="text-primary text-bold">
          {{$trc(characteristic.model || 0 )}}
        </div>
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
