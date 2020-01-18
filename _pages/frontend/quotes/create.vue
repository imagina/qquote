<template>
  <div class="row" :style="$q.platform.is.desktop ? 'padding: 13px 19.2%; z-index: 100000;' : '' ">
    <div class="col-md-12" v-if="$q.platform.is.desktop">
      <div class="flex justify-end">
        <q-btn color="primary" round icon="launch" size="xs" class="no-shadow" @click="openSiteUrl"/>
        <b class="text-primary q-ml-sm" style="font-size: 18px;">{{`${siteUrl}/${$store.getters['qsiteSettings/getDefaultLocale']}`}}</b>
      </div>
    </div>
    <div class="col-md-12 q-mt-md" v-if="$q.platform.is.desktop">
      <div class="flex justify-end">
        <q-btn color="light-green-6" class="q-mr-md" push @click="refreshPage">
          <q-icon left name="fas fa-edit" />
          <div> {{this.$tr('qquote.layout.newQuote')}} </div>
        </q-btn>
        <q-btn color="primary" class="q-mr-md" push @click="refreshPage">
          <q-icon name="fas fa-sync-alt" />
        </q-btn>
        <q-input v-model="model" filled type="search" style="width: 372px" :placeholder="`${$tr('qquote.layout.labels.search')} ...`">
          <template v-slot:append>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </div>
    </div>

    <userInformation
      class="col-md-12"
      :fakeFields="fakeFields"/>
    <quotaStepper
      class="col-md-12"
      :fakeFields="fakeFields"/>

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
      this.siteUrl = env("BASE_URL")
      this.$store.dispatch('qquoteQuotation/reset_state')
      this.getFakeFields()
    },
    data () {
      return {
        siteUrl: '',
        model: '',
        step: 1,
        done1: false,
        done2: false,
        done3: false,
        fakeFields: [],
        loading: false,
      }
    },
    methods: {
      openSiteUrl(){
        window.open(`${this.siteUrl}/${this.$store.getters['qsiteSettings/getDefaultLocale']}`, '_blank');
      },
      refreshPage(){
        this.$q.dialog({
          title: this.$tr('qquote.layout.labels.confirm'),
          message: 'Antes de continuar debe tener en cuenta que esto re iniciara los datos del formulario',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.$root.$emit('reset')
        }).onCancel(() => {
        })
      },
      getFakeFields () {
        this.loading = true
        let params = {
          params: {
            filter: {
              entity : 'quote'
            }
          }
        }
        this.$crud.index('apiRoutes.qquote.configs', params ).then( response => {
          this.fakeFields = response.data
          this.loading = false
        }).catch( error => {
          this.$alert.error({message: this.$tr('ui.message.errorRequest'), pos: 'bottom'})
          this.loading = false
        })
      },
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
