<template>
  <div class="relative-position">
    <div class="row">
      <div class="col-12 q-ma-none q-pa-none">
        <q-list class="rounded-borders">
          <div
            v-for="(product, index) in products"
            :key="index">
            <q-list bordered>
            <q-expansion-item
              header-class="bg-primary text-white"
              expand-icon-class="text-white">
              <template v-slot:header>
                <q-item-section avatar class="q-py-md q-px-md" v-if="false">
                  <q-avatar>
                    <img :src="product.mainImage.path">
                  </q-avatar>
                </q-item-section>
                <q-item-section class="q-py-md q-px-md">
                  {{product.name}}
                </q-item-section>
              </template>
              <q-card>
                <q-card-section>
                  <div>
                    <p>{{product.description}}</p>
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

  export default {
    props:{
      products:{
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        loading: false,
        model: true
      }
    },
    components:{
      fieldContainer
    },
    created() {

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
