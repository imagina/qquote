<template>
  <div class="row relative-position">
    <pre>{{products}}</pre>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    name: 'quotationPackages',
    props: {
      packageId: {
        default: true
      }
    },
    data () {
      return {
        loading: false,
        products: []
      }
    },
    created() {
      this.getProducts()
    },
    methods:{
      getProducts() {
        let params = {
          params:{
            include: 'characteristics',
            filter:{
              package: this.packageId
            },
          }
        }
        this.loading = true
        this.$crud.index( 'apiRoutes.qquote.products', params ).then( response => {
          this.products = response.data
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr('ui.message.errorRequest'),
            pos: 'bottom'
          })
          this.loading = false
        })
      }
    }
  }
</script>
