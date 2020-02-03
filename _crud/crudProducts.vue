<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qquote.products',
          permission: 'iquote.products',
          create: {
            title: this.$tr('qquote.layout.newProduct'),
            to: '/quote/products/create',
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {
                name: 'price', label: this.$tr('ui.form.price'), field: 'price', align: 'left',
                format: val => val ? this.$trc(val) : this.$trc(0)
              },
              {
                name: 'active', label: this.$tr('ui.form.status'), field: 'active', align: 'left',
                format: val => val ? this.$tr('ui.label.enabled') : this.$tr('ui.label.disabled')
              },
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left'},
            ],
            requestParams: {}
          },
          update: {
            title: this.$tr('qquote.layout.updateProduct'),
            to : 'qquote.admin.productsEdit'
          },
          delete: true,
        }
      }
    }
  }
</script>
