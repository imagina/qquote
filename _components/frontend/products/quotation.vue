<template>
  <div class="row relative-position">
    <pre>{{product}}</pre>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    name: 'quotationProducts',
    props:{
      productId:{
        default: true
      }
    },
    data () {
      return {
        loading: false,
        product: {}
      }
    },
    created(){
      this.getProduct()
    },
    methods:{
      getProduct(){
        let params = {
          params: {
            include: 'characteristics'
          }
        }
        this.loading = true
        this.$crud.show( 'apiRoutes.qquote.products', this.productId, params ).then( response => {
          this.product = response.data
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          this.loading = false
        })
      }
    }
  }
</script>
