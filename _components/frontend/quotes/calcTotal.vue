<template>
  <span>
    {{$trc(getTotal|| product.price, $store.state.qquoteQuotation.options.currency.label)}}
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
        return calTotal([this.product], true)
      }
    }
  }
</script>
