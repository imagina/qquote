<template></template>
<script>
  export default {
    computed: {
      crudData() {
        return {
          apiRoute: 'apiRoutes.qquote.packages',
          permission: 'iquote.packages',
          create: {
            title: this.$tr('qquote.layout.newPackage'),
          },
          read: {
            columns: [
              {name: 'id', label: this.$tr('ui.form.id'), field: 'id', style: 'width: 50px'},
              {name: 'name', label: this.$tr('ui.form.name'), field: 'name', align: 'left'},
              {name: 'actions', label: this.$tr('ui.form.actions'), align: 'right'},
            ],
            requestParams: {
              include:'products'
            }
          },
          update: {
            title: this.$tr('qquote.layout.updatePackage'),
            requestParams: {
              include:'products'
            }
          },
          delete: true,
          formLeft: {
            name: {
              label: `${this.$tr('ui.form.name')}*`,
              value: '',
              type: 'input',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            description: {
              label: `${this.$tr('ui.form.description')}*`,
              value: '',
              type: 'input',
              isTranslatable: true,
              rules: [
                val => !!val || this.$tr('ui.message.fieldRequired')
              ],
            },
            products: {
              label: this.$trp('qquote.layout.products'),
              value: [],
              type: 'multiSelect',
              loadOptions: {
                apiRoute: 'apiRoutes.qquote.products',
                select: {label: 'name', id: 'id'},
              },
            },
          },
          formRight: {},
        }
      }
    }
  }
</script>
