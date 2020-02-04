<template>
  <span>
    {{$trc(getTotal|| 0 , $store.state.qquoteQuotation.options.currency.label)}}
  </span>
</template>

<script>
  import { calTotal } from '@imagina/qquote/_utils/index'
  export default {
    props:{
      product:{
        type: Object,
        required: true,
        default: () => {}
      }
    },
    computed:{
      getTotal(){
        return calTotal([this.product])
      }
    }
  }
</script>
