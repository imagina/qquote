<template>
  <div>
    <div class="desktop-only">
      <img src="statics/layout/thingy-left.png" class="absolute-top-left">
      <img src="statics/layout/thingy-right.png" class="absolute-top-right">
      <img :src="logo" style="position: absolute; left: 370px; top: 12px;">
    </div>
    <q-no-ssr>
      <div class="absolute-top-right text-white" style="top: 10px; right: 10px;">
        <q-btn :to="{name: 'app.admin.home'}" push no-caps v-if="quserState.authenticated" rounded>
          <q-avatar size="25px">
            <img :src="quserState.userData.mainImage">
          </q-avatar>
          <div class="q-ml-xs">
            {{quserState.userData.firstName}}
          </div>
        </q-btn>
      </div>
    </q-no-ssr>
    <div class="mobile-only">
      <q-toolbar class="text-white" style="background-image: linear-gradient(to right, #0059B8 , #008CE1);">
        <img :src="logo" style="width: 20%">
        <q-toolbar-title>{{projectName}}</q-toolbar-title>
      </q-toolbar>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        projectName: this.$store.getters['qsiteSettings/getSettingValueByName']('core::site-name'),
        logo: this.$store.getters['qsiteSettings/getSettingMediaByName']('isite::logo1').path,
      }
    },
    computed: {
      quserState() {
        return this.$store.state.quserAuth
      },
    },
  }
</script>
