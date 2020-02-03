<template></template>
<script>
   export default {
      data() {
         return {
            crudId: this.$uid()
         }
      },
      computed: {
         crudData() {
            return {
               crudId: this.crudId,
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
                     include: 'products'
                  }
               },
               update: {
                  title: this.$tr('qquote.layout.updatePackage'),
                  requestParams: {
                     include: 'products'
                  }
               },
               delete: true,
               formLeft: {
                  id: {value: null},
                  name: {
                     props: {
                        label: `${this.$tr('ui.form.name')}`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                     },
                     value: null,
                     type: 'input',
                     isTranslatable: true,

                  },
                  description: {
                     props: {
                        label: `${this.$tr('ui.form.description')}*`,
                        rules: [
                           val => !!val || this.$tr('ui.message.fieldRequired')
                        ],
                     },
                     value: null,
                     type: 'html',
                     isTranslatable: true,
                  },
               },
               formRight: {
                  products: {
                     value: [],
                     type: 'multiSelect',
                     props: {
                        label: this.$trp('qquote.layout.products'),
                     },
                     loadOptions: { //Async load options form request, only in types [select, multiSelect]
                        apiRoute: 'apiRoutes.qquote.products', //apiRoute to request
                        select: {label: 'name', id: 'id'}, //Define fields to config select
                     },
                  },
               },
            }
         },
         //Crud info
         crudInfo() {
            return this.$store.state.qcrudComponent.component[this.crudId] || {}
         }
      },
   }
</script>
