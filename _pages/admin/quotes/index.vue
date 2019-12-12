<template>
  <div id="pageId">
    <!---Component CRUD-->
    <crud :crud-data="import('@imagina/qquote/_crud/crudQuotes')" />
  </div>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>

</style>
