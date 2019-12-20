<template>
  <div>
    <quotaStepper/>
  </div>
</template>

<script>
  import quotaStepper from '@imagina/qquote/_components/frontend/quotes/quotaStepper'
  export default {
    components:{
      quotaStepper
    },
    created(){
      this.$store.dispatch('qquoteQuotation/reset_state')
    },
  }
</script>
