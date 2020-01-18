<template>
  <q-list bordered>
    <q-expansion-item
      dense-toggle
      header-class="text-primary bg-grey-3"
      expand-icon-class="text-primary">
      <template v-slot:header>
        <q-checkbox v-model="characteristic.checked" />
        <q-item-section class="q-py-md">
          <b>{{characteristic.name}}
          <q-icon name="info" color="grey-7">
            <q-tooltip>
              <span v-html="characteristic.description"></span>
            </q-tooltip>
          </q-icon>
          </b>
        </q-item-section>
      </template>
      <q-card>
        <q-card-section>
          <selectionQuote
            :characteristic="characteristic"
            v-if="characteristic.type == 1"/>
          <checkboxQuote
            :characteristic="characteristic"
            v-if="characteristic.type == 2"/>
          <valueQuote
            :characteristic="characteristic"
            v-if="characteristic.type == 3"/>
          <numberQuote
            :characteristic="characteristic"
            v-if="characteristic.type == 4"/>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>

<script>
  export default {
    name: 'fieldContainer',
    props:{
      characteristic:{
        type: Object,
        default: () => {}
      }
    },
    components:{
      selectionQuote: () => import('@imagina/qquote/_components/frontend/quotes/fields/iSelect'),
      checkboxQuote: () => import('@imagina/qquote/_components/frontend/quotes/fields/iCheckbox'),
      valueQuote: () => import('@imagina/qquote/_components/frontend/quotes/fields/iValue'),
      numberQuote: () => import('@imagina/qquote/_components/frontend/quotes/fields/iNumber'),
      optionsQuote: () => import('@imagina/qquote/_components/frontend/quotes/fields/iOption')
    },
  }
</script>

<style>
  .bg-primary-lighten{
    background-color: var(--q-color-primary);
    
    background-image: linear-gradient(
      0deg,
      rgba(255,255,255,0.88) 0%,
      rgba(255,255,255,0.88) 100%);
  }
  
  

</style>
