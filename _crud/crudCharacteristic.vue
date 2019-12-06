<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qquote.characteristics',
          permission: 'iquote.characteristics',
          create: {
            title: this.$tr('qquote.layout.newCharacteristic'),
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
              {name: 'typeName', label: this.$tr('ui.form.type'), field: 'typeName', align: 'left'},
              {
                name: 'created_at', label: this.$tr('ui.form.createdAt'), field: 'createdAt', align: 'left',
                format: val => val ? this.$trd(val) : '-',
              },
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {
              filter:{
                product: this.$route.params.id,
                parent: 0,
              },
              include:'parent'
            }
          },
          update: {
            title: this.$tr('qquote.layout.updateCharacteristic'),
          },
          delete: true,
        }
      }
    }
  }
</script>
