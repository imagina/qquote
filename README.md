## QQUOTE  | 1.0.10

_Nota: Backend vérsion compatible [asgard_cms-iquote 1.0.8](https://github.com/imagina/asgardcms-iquote/tree/1.0.8)_

## Installation

`` npm i @imagina/qquote``

## API Routes

| ENTITY  | ROUTE |
| ------------- | ------------- |
| packages | apiRoutes.qquote.packages |
| products | apiRoutes.qquote.products |
| packagesProducts | apiRoutes.qquote.packagesProducts |
| characteristics | apiRoutes.qquote.characteristics |
| types | apiRoutes.qquote.types |
| quotes | apiRoutes.qquote.quotes |

## Pages

- #### Front-End

  | PAGE | NAME | PARAMS |
  | ------------- | ------------- | ------------- |
  | quotesCreate | qquote.frontend.quotesCreate | |
  

- ### Back-End

  | PAGE | NAME | PARAMS |
  | ------------- | ------------- | ------------- |
  | packages | qquote.admin.packages |  |
  | products | qquote.admin.products |  |
  | productsCreate | qquote.admin.productsCreate |  |
  | productsEdit | qquote.admin.productsEdit | id |
  | characteristicEdit | qquote.admin.characteristicEdit | characteristicId |
  | quotes | qquote.admin.quotes |  |
  | quotesCreate | qquote.admin.quotesCreate |  |
  | quotesShow | qquote.admin.quotesShow | id |


## Default values

If you want values by default in client´s profile form, add your field in config app file.


``src/config/app.js``

```js
...
  qquote:{
    defatultValues:{
      country: {
        "label": "Colombia",
        "value": 297
      }
    }
  }
...
```
