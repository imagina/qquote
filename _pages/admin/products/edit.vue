<template>
  <div class="q-layout-page layout-padding">
    <div class="q-mb-lg backend-page">
      <div class="row q-gutter-y-md">
        <div class="col-12">
          <div class="box">
            <productForm />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import productForm from '@imagina/qquote/_components/admin/products/form'
  
  export default {
    components:{
      productForm,
    },
  }
</script>
