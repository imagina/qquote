<template>
  <div class="relative-position">

    <div class="row">
      <div class="col-xs-12 bg-grey-2 text-primary q-px-sm q-py-lg q-mb-sm rounded-borders">
        <div class="flex justify-start">
          <div>
            <q-icon name="arrow_right_alt" size="xl"/>
          </div>
          <div class="q-pt-xs">
            <div class="text-h5 text-bold">
              {{$store.state.qquoteQuotation.package.name}}
              <q-icon name="info" color="grey-7">
                <q-tooltip>
                  <span v-html="$store.state.qquoteQuotation.package.description"></span>
                </q-tooltip>
              </q-icon>
            </div>
            <div class="text-bold">{{$tr('qquote.layout.labels.selectedPackage')}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="row" v-if="showSearch">
      <div class="col-md-12 q-mb-sm">
        <q-input
          v-model="search"
          filled
          type="search"
          :placeholder="`${$tr('qquote.layout.labels.search')} ...`">
          <template v-slot:append>
            <q-icon
              name="search"
              color="primary" />
          </template>
        </q-input>
      </div>
    </div>
    
    <div class="row">
      <div class="col-12 q-ma-none q-pa-none">
        <q-list class="rounded-borders">
          <div
            v-for="(product, index) in productsFounded"
            :key="index">
            <q-list >
            <q-expansion-item
              header-class="bg-primary text-white rounded-borders"
              expand-icon-class="text-white">
              <template v-slot:header>
                <q-item-section avatar class="q-py-md q-px-md" v-if="false">
                  <q-avatar>
                    <img :src="product.mainImage.path">
                  </q-avatar>
                </q-item-section>
                <q-checkbox v-model="product.checked" :dark="true"/>
                <q-item-section class="q-py-md q-px-md">
                  <div class="text-bold">{{product.name}}</div>
                  <div>{{$tr('qquote.layout.labels.price')}} <calcTotal :product="product" /></div>
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div>
                    <p v-html="product.description"></p>
                  </div>
                  <div
                    v-for="(characteristic, index) in product.characteristics"
                    :key="index">
                    <fieldContainer
                      :characteristic="characteristic"/>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            </q-list>
            <q-separator />
          </div>
        </q-list>
      </div>
    </div>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  import fieldContainer from '@imagina/qquote/_components/frontend/quotes/fieldContainer'
  import calcTotal from '@imagina/qquote/_components/frontend/quotes/calcTotal'

  export default {
    props:{
      products:{
        type: Array,
        default: () => []
      },
      showSearch:{
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        loading: false,
        model: true,
        search: '',
      }
    },
    components:{
      fieldContainer,
      calcTotal
    },
    created() {

    },
    computed:{
      productsFounded(){
        /* Is the prop showSearch is false, return all products */
        if (!this.showSearch){
          return this.products
        }
        return this.products.filter( product => {
          return product.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
    },
    methods:{
    
    }
  }
</script>

<style>
  .border-top{
    border-top: 1px solid #ffff;
  }
  .border-bottom{
    border-bottom: 1px solid #ffff;
  }
  .all-border{
    border: 1px solid #ffff;
  }
</style>
