<template>
  <div class="row" style="min-height: 100px">
    <q-list class="col-12 rounded-borders no-border bg-grey-2 text-grey-7 border-bottom-inactive">
      <q-item
        v-for="(item, index) in packages"
        :key="index"
        clickable
        :active="link === item.id"
        @click="handleClick(item)"
        active-class="bg-primary text-white"
        class="rounded-borders border-bottom-inactive"
        v-ripple >
        <q-item-section class="q-py-md q-px-md">
          <div style="font-size: 18px">
            {{item.name}}
            <q-icon name="fas fa-chevron-right"/>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <inner-loading :visible="loading"/>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        packages: [],
        link: null
      }
    },
    computed:{
      package: {
        get: function () {
          return this.$store.state.qquoteQuotation.package
        },
        set: function (newValue) {
          this.$store.dispatch('qquoteQuotation/set_package', newValue)
        }
      },
    },
    created(){
      this.$store.dispatch('qquoteQuotation/set_product_or_package', 'package')
      this.getPackages()
    },
    methods:{
      getPackages () {
        let params = {
          params:{
            filter:{}
          }
        }
        this.loading = true
        this.$crud.index('apiRoutes.qquote.packages', params).then( response => {
          this.packages = response.data
          this.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          console.warn( error )
          this.loading = false
        })
      },
      handleClick(item){
        this.link = item.id
        this.package = item
        this.$emit('next', item)
      }
    }
  }
</script>

<style>
  .border-bottom-inactive{
    border-bottom: 2px solid #9e9e9e42;
  }
  .border-bottom{
  
  }
</style>
