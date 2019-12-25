<template>
  <div class="row" :style="$q.platform.is.desktop ? 'padding: 13px 19.2%; z-index: 100000;' : '' ">
    <div class="col-md-12" v-if="$q.platform.is.desktop">
      <div class="flex justify-end">
        <q-btn push color="primary" round icon="launch" size="xs" class="no-shadow "/>
        <b class="text-primary q-ml-md" style="font-size: 18px;">www.migrate-au.com/es</b>
      </div>
    </div>
    <div class="col-md-12 q-mt-md" v-if="$q.platform.is.desktop">
      <div class="flex justify-end">
        <q-btn color="light-green-6" class="q-mr-md" push>
          <q-icon left name="fas fa-edit" class="q-px-md q-mx-md"/>
          <div>Nueva Cotizacion</div>
        </q-btn>
        <q-btn color="primary" class="q-mr-md" push>
          <q-icon name="fas fa-sync-alt" />
        </q-btn>
        <q-input v-model="model" filled type="search" style="width: 372px" placeholder=" Búsqueda ... ">
          <template v-slot:append>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </div>
    </div>
    <userInformation class="col-md-12"/>
    <quotaStepper class="col-md-12"/>
  </div>
</template>

<script>
  import userInformation from '@imagina/qquote/_components/frontend/quotes/userInformation'
  import quotaStepper from '@imagina/qquote/_components/frontend/quotes/quotaStepper'
  export default {
    components:{
      quotaStepper,
      userInformation
    },
    created(){
      this.$store.dispatch('qquoteQuotation/reset_state')
    },
    data () {
      return {
        model: '',
        step: 1,
        done1: false,
        done2: false,
        done3: false
      }
    },
    methods: {

    }
  }
</script>

<style>
  .heading-1{
    position:relative;
    text-align: center
  }
  .heading-1:before {
    content: "";
    display: block;
    border-top: solid 1px #ececec;
    width: 100%;
    height: 2px;
    position: absolute;
    top: 50%;
    z-index: 0;
  }
  .heading-1 span {
    background: #fff;

    position: relative;
    z-index: 1;
  }
</style>
