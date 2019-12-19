<template>
  <div class="row">

    <div class="col-8 q-pr-md">
      <div class="row">
        <div class="col-12 box relative-position">

          <q-list bordered>
            <q-expansion-item
              default-opened
              v-for="(product, index) in products"
              :key="index"
              expand-separator>
              <template v-slot:header>
                <q-item-section avatar class="q-py-md q-px-md">
                  <q-avatar>
                    <img :src="product.mainImage.path">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  {{product.name}}
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  {{product.description}}
                </q-card-section>
                <q-card-section>

                  
                  
                  <fieldContainer
                    v-for="(characteristic, index) in product.characteristics"
                    :key="index"
                    :characteristic="characteristic"/>

                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>

          <inner-loading :visible="loading"/>
        </div>
      </div>
    </div>


    <div class="col-md-4">
      <div class="row">
        <div class="col-12 box relative-position">

          <p class="text-h6">Total</p>

          <inner-loading :visible="loadingTotal"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import fieldContainer from '@imagina/qquote/_components/frontend/quotes/fieldContainer'

  export default {
    name: 'quotation',
    components:{
      fieldContainer
    },
    props:{
      product:{
        default: null
      },
      package: {
        default: null
      }
    },
    data () {
      return {
        loadingTotal: false,
        loading: false,
        products: []
      }
    },
    created(){
      this.getProducts( )
    },
    methods:{
      getProducts(filter = {}){
        let params = {
          params: {
            include: 'characteristics',
            filter: filter
          }
        }
        if (this.productId){
          params.params.filter['id'] = this.product
        }
        if (this.packageId){
          params.params.filter['package'] = this.package
        }
        this.loading = true
        this.$crud.index( 'apiRoutes.qquote.products', params ).then( response => {
          this.products = this.formatProducts(response.data)
          console.warn(this.products)
          this.loading = false
        }).catch( error => {
          this.$alert.error({
            message: this.$tr( 'ui.message.errorRequest' ),
            pos: 'bottom'
          })
          this.loading = false
        })
      },
      formatProducts(products){
        return products.map( product => ({ ...product , characteristics: this.$array.builTree( product.characteristics )}))
      }
    }
  }
</script>
