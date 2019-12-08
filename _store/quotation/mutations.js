export const SET_USER = ( state, payload ) => (
  state.user = payload
)

export const SET_FIRST_NAME = ( state, payload ) => (
  state.firstName = payload
)

export const SET_LAST_NAME  = ( state, payload ) => (
  state.lastName = payload
)

export const SET_EMAIL = ( state, payload ) => (
  state.email = payload
)

export const SET_PHONE = ( state, payload ) => (
  state.phone = payload
)

export const SET_NOTES = ( state, payload ) => (
  state.notes = payload
)

export const SET_VALUE = ( state, payload ) => (
  state.value = payload
)

export const SET_USER_ID = ( state, payload ) => (
  state.userId = payload
)

export const SET_CUSTOMER_ID = ( state, payload ) => (
  state.customerId = payload
)

export const SET_PRODUCT_OR_PACKAGE  = ( state, payload ) => (
  state.productOrPackage = payload
)

export const SET_PACKAGE = ( state, payload ) => (
  state.package = payload
)

export const SET_PRODUCTS_SELECTED = ( state, payload ) => (
  state.productsSelected = payload
)

export const SET_PRODUCTS = ( state, payload ) => (
  state.products = payload
)

export const RESET_STATE = ( state ) => {
  state.productOrPackage = null
  state.package = {}
  state.productsSelected = []
  state.firstName = ''
  state.lastName = ''
  state.email = ''
  state.phone = ''
  state.notes = ''
}
