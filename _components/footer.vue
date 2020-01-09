<template>
<div>
  <div id="footer" style="padding-top: 100px" class="desktop-only">
    <img src="statics/layout/thingy-left-bottom.png" class="absolute-bottom-left">
    <img src="statics/layout/thingy-right-bottom.png" class="absolute-bottom-right">
    <div class="q-hide q-md-show text-center q-caption text-gre-1 absolute-bottom">
      <div class="flex items-center flex-center">
        <div class="text-primary text-bold" style="font-size: 15px">
          <span>{{$tr('qquote.layout.labels.accreditations')}}: </span>
        </div>
        <img src="statics/footerLogos/logos-certificaciones1.jpg" >
        <img src="statics/footerLogos/logos-certificaciones2.jpg" >
        <img src="statics/footerLogos/logos-certificaciones3.jpg" >
        <img src="statics/footerLogos/logos-certificaciones4.jpg" >
        <img src="statics/footerLogos/logos-certificaciones5.jpg" >
        <img src="statics/footerLogos/logos-certificaciones6.jpg" >
        <img src="statics/footerLogos/logos-certificaciones7.jpg" >
      </div>
    </div>
  </div>
  <div class="mobile-only">
    <q-toolbar class="bg-primary q-mt-sm"/>
  </div>
</div>
</template>
<script>
  export default {
    data () {
      return {
      
      }
    }
  }
</script>
