<template>
  <div id="footer" style="padding-top: 150px">
    <img src="statics/layout/thingy-left-bottom.png" class="absolute-bottom-left">
    <img src="statics/layout/thingy-right-bottom.png" class="absolute-bottom-right">
    <!-- Copi right -->
    <div class="q-hide q-md-show text-center q-caption text-gre-1 absolute-bottom">
      <img src="statics/footerLogos/logos-certificaciones1.jpg" >
      <img src="statics/footerLogos/logos-certificaciones2.jpg" >
      <img src="statics/footerLogos/logos-certificaciones3.jpg" >
      <img src="statics/footerLogos/logos-certificaciones4.jpg" >
      <img src="statics/footerLogos/logos-certificaciones5.jpg" >
      <img src="statics/footerLogos/logos-certificaciones6.jpg" >
      <img src="statics/footerLogos/logos-certificaciones7.jpg" >
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
      return {}
    },
    computed: {
      menu() {
        let menu = config('sidebar')
        let menufooter = ['app.home', 'app.reservations', 'app.branchOffices', 'app.contact']
        let response = []
        //Get just menufooter items
        menu.forEach(item => {
          if(menufooter.indexOf(item.name) != -1) response.push(item)
        })
        return response//Response
      }
    },
    methods: {
    }

  }
</script>
<style lang="stylus">
  #footer
    @media screen and (max-width: $breakpoint-md)
      padding-bottom 50px
    .menuFooter
      text-align center
      background-color $dark
      color white
      padding 5px 0
      @media screen and (max-width: $breakpoint-md)
        padding 2px 0
        position fixed
        bottom 0
        width 100%
      @media screen and (max-width: $breakpoint-sm)
        padding 0
      
      .q-item
        display inline-block
        border 0px !important
        
        .q-item-side
          display inline-block
          
          .q-icon
            font-size 17px
            color white
            @media screen and (max-width: $breakpoint-sm)
              font-size 10px !important
        
        .q-item-main
          display inline-block
          margin-left 5px
          font-size 17px !important
          @media screen and (max-width: $breakpoint-sm)
            font-size 10px !important
        
        &.router-link-active
          background transparent !important
</style>
