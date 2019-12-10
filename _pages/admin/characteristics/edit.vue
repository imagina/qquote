<template>
  <div class="q-layout-page layout-padding">
    <div class="q-mb-lg backend-page">
      <div class="row q-gutter-y-md">
        <div class="col-12">
          <div class="box">
            <formCharacteristics
              :characteristicId="$route.params.characteristicId"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import formCharacteristics from '@imagina/qquote/_components/admin/characteristics/form'

  export default {
    components:{
      formCharacteristics
    },
  }
</script>
