<template>
  <div>
    <q-dialog
      v-model="show"
      persistent
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card>
        <q-bar class="bg-primary text-white">
          <q-space />
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">
            {{$tr('qquote.layout.labels.quotation')}} {{quote.id}}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <summaryQutation :products="quote.value"/>
        </q-card-section>

      </q-card>
    </q-dialog>
  </div>
</template>

<script>
  import summaryQutation from '@imagina/qquote/_components/frontend/quotes/summaryQutation'
  export default {
    components:{
      summaryQutation
    },
    props:{
      quote:{
        type: Object,
        default: () => {
          return {
            id: null,
            value: []
          }
        }
      },
      dialog:{
        type: Boolean,
        default: false
      }
    },
    watch:{
      dialog: function (newValue) {
        this.show = newValue
      }
    },
    data () {
      return {
        loading: false,
        maximizedToggle: true,
        show: false,
      }
    }
  }
</script>
