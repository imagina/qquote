<template>
  <div class="row relative-position">
    <!--select products or package-->
    <div class="col-md-12">
      <div class="q-mb-md">{{$tr('qquote.layout.labels.whatWantQuote')}} ? </div>
      <q-radio
        v-model="productOrPackage"
        val="product"
        :rules="[val => !!val || $tr('ui.message.fieldRequired')]"
        :label="`${$tr('qquote.layout.labels.products')}`"/>
      <q-radio
        v-model="productOrPackage"
        val="package"
        :label="`${$tr('qquote.layout.labels.package')}`"/>
    </div>
    <!--render select products or package-->
    <div class="col-md-12 q-my-md">
      <q-select
        @input="handleselectChanged"
        v-if="productOrPackage === 'package'"
        outlined
        v-model="package"
        :options="packages"
        label="packages" />
      <q-select
        @input="handleselectChanged"
        v-if="productOrPackage === 'product'"
        multiple
        outlined
        use-chips
        v-model="productsSelected"
        :options="products"
        label="products" />
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    name: 'productOrPackage',
    data () {
      return {
        loading: false,
        products: [],
        packages: [],
      }
    },
    created(){
      if (this.$store.state.qquoteQuotation.productOrPackage == 'product'){
        this.getProducts()
      }
      if (this.$store.state.qquoteQuotation.productOrPackage == 'package'){
        this.getPackages()
      }
    },
    computed:{
      productOrPackage: {
        get: function () {
          return this.$store.state.qquoteQuotation.productOrPackage
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_product_or_package', newValue)
        }
      },
      package: {
        get: function () {
          return this.$store.state.qquoteQuotation.package
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_package', newValue)
        }
      },
      productsSelected: {
        get: function () {
          return this.$store.state.qquoteQuotation.productsSelected
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_products_selected', newValue)
        }
      },
    },
    watch:{
      productOrPackage: function (val) {
        if (val === 'package'){
          this.getPackages()
        }
        if (val === 'product'){
          this.getProducts()
        }
      },
    },
    methods:{
      getProducts () {
        let params = {
          params:{
            filter:{}
          }
        }
        this.loading = true
        this.$crud.index('apiRoutes.qquote.products', params).then( response => {
          this.products = response.data.map( product => ({label: product.name, value: product.id}))
          this.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.loading = false
        })
      },
      getPackages () {
        let params = {
          params:{
            filter:{}
          }
        }
        this.loading = true
        this.$crud.index('apiRoutes.qquote.packages', params).then( response => {
          this.packages = response.data.map( product => ({label: product.name, value: product.id}))
          this.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.loading = false
        })
      },
      handleselectChanged(){
        this.$emit('selectChanged')
      }
    }
  }
</script>
