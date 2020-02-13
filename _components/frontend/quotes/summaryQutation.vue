<template>
<div>
  <div class="row">
    <div class="col-md-6 q-mb-xl text-grey-7" v-for="(product, index) in productsChecked" :key="index" style="font-size: 15px">
      <div class="text-primary">
        <b>{{product.name}}</b>
      </div>
      <summaryDetailNested :children="product.characteristics" />
    </div>
  </div>
</div>
</template>

<script>
  import summaryDetailNested from '@imagina/qquote/_components/frontend/quotes/quotation/summaryDetailNested'
  
  export default {
    props:{
      products:{
        type: Array,
        default: () => []
      }
    },
    computed:{
      /* This computed property filter product and return only products with property checked equal to true */
      productsChecked(){
        return this.products.filter( product => product.checked)
      },
      notes: {
        get: function () {
          return this.$store.state.qquoteQuotation.notes
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_notes', newValue)
        }
      },
    },
    components:{
      summaryDetailNested
    },
    methods:{
      sumChildren( children ){
        let calculate = 0
        children.forEach( element => { calculate += this.sumCharacteristics( element )})
        return calculate
      },
      sumCharacteristics( characteristic ){
        // type 1 Select
        if( characteristic.type == 1 ){
          let valueSelected = characteristic.children.find( element => element.id == characteristic.model.value) || {price: 0}
          let response = valueSelected.price
          response += this.sumChildren(valueSelected.children || [])
          return response
        }

        // type 2 checkbox
        if( characteristic.type == 2 && characteristic.model ){
          let response = characteristic.price
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        // type 3 value
        if( characteristic.type == 3 ){
          let response = characteristic.model || 0
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        // type 4 number
        if( characteristic.type == 4 ){
          let response = (characteristic.model *  characteristic.price)
          response += this.sumChildren(characteristic.children || [])
          return response
        }

        return 0
      },
    }
  }
</script>

<style>
  .tree,
  .tree ul {
    margin:0 0 0 1em; /* indentation */
    padding:0;
    list-style:none;
    position:relative;
  }
  
  .tree ul {margin-left:.5em} /* (indentation/2) */
  
  .tree:before,
  .tree ul:before {
    content:"";
    display:block;
    width:0;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    border-left:1px solid #e0e0e0;
  }
  
  .tree li {
    margin:0;
    padding:0 1.5em; /* indentation + .5em */
    line-height:2em; /* default list item's `line-height` */
    position:relative;
  }
  
  .tree li:before {
    content:"";
    display:block;
    width:10px; /* same with indentation */
    height:0;
    border-top:1px solid #e0e0e0;
    margin-top:-1px; /* border top width */
    position:absolute;
    top:1em; /* (line-height/2) */
    left:0;
  }
  
  .tree li:last-child:before {
    background:white; /* same with body background */
    height:auto;
    top:1em; /* (line-height/2) */
    bottom:0;
  }
</style>
