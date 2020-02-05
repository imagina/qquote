<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qquote.quotes',
          permission: 'iquote.quotes',
          create: false,
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'firstName', label: this.$tr('ui.form.firstName'), field: 'firstName'},
              {name: 'lastName', label: this.$tr('ui.form.lastName'), field: 'lastName'},
              {name: 'email', label: this.$tr('ui.form.email'), field: 'email'},
              {name: 'phone', label: this.$tr('ui.form.phone'), field: 'phone'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'left', style: 'width: 50px'},
            ],
            requestParams: {}
          },
          update: {
            title: this.$tr('qquote.layout.updateQuote'),
            to : 'qquote.admin.quotesShow'
          },
          delete: true,
        }
      }
    }
  }
</script>
