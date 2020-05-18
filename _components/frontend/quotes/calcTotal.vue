<template>
  <span :style="`${ lineThrough ? 'text-decoration: line-through' : ''}`">
    {{$trc(getTotal|| (product.price || 0), $store.state.qquoteQuotation.options.currency.label)}}
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
      },
	    field:{
        type: String,
		    default: 'price'
	    },
      lineThrough:{
        type: Boolean,
        default: false
      },
      takeIfIncludeInQuotation:{
        type: Boolean,
        default: true
      }
    },
    computed:{
      getTotal(){
        return calTotal([this.product], true, this.takeIfIncludeInQuotation, this.field)
      }
    }
  }
</script>
