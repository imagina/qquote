<template>
  <div>
    <div class="desktop-only">
      <img src="statics/layout/thingy-left.png" class="absolute-top-left">
      <img src="statics/layout/thingy-right.png" class="absolute-top-right">
      <img :src="logo" style="position: absolute; left: 370px; top: 12px;">
    </div>
    <div class="mobile-only">
      <q-toolbar class="bg-primary text-white">
        <img :src="logo" style="width: 20%">
        <q-toolbar-title>{{projectName}}</q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
</template>
<script>
  import menuList from "@imagina/qsite/_components/master/recursiveItem";

  export default {
    props: {},
    components: {
      menuList
    },
    watch: {},
    mounted() {
      this.$nextTick(function () {
      })
    },
    data() {
      return {
        projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        drawer: {
          menu: false
        },
        menu: config('sidebar'),
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
        modal: {
          show: true,
          search: ''
        },
        phones: [],//this.$store.getters['qsiteSettings/getSettingValueByName']('isite::phones')
      }
    },
    computed: {
      getImageUrl() {
        return config('apiRoutes.api.base_url') + '/' + this.userData.smallImage;
      },
      userData() {
        return []//this.$store.state.quserAuth.userData
      },
      socialNetworks() {
        let response = {}
        let socialNetworks = []//this.$store.getters['qsiteSettings/getSettingValueByName']('isite::socialNetworks')
        //format social networks
        socialNetworks.forEach(item => {
          if (item.label == 'facebook') response[item.label] = `https://facebook.com/${item.value}`
          if (item.label == 'instagram') response[item.label] = `https://instagram.com/${item.value}`
        })

        return response//Response
      }
    },
    methods: {
      //Show drawer specific
      toggleDrawer(name, show) {
        //Hidden all drawers
        for (var drawer in this.drawer) {
          this.drawer[drawer] = false
        }
        this.drawer[name] = show//Show only drawer specific
      },
      //open URL
      openUrl(url) {
        window.open(url, '_blank')
      }
    }
  }
</script>
<style lang="stylus">
  #masterHeader
    .q-layout-drawer-delimiter
      box-shadow $shadow-1

    .q-toolbar
      #menuDesktop
        .q-item
          display inline-block
          border 0px !important

          .q-item-main
            font-size 17px !important

          &.router-link-active
            background transparent !important

            .q-item-main
              transition .1s
              padding-bottom 3px
              border-bottom 2px solid white
</style>
