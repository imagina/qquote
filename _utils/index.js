/* Convert String from skane_case or kebab-case to camelCase */
const toCamel = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '')
  })
}

/* Check is array */
const isArray = (a) => {
  return Array.isArray(a)
}

/* Check is Object */
const isObject = (o) =>  {
  return o === Object(o) && !isArray(o) && typeof o !== 'function'
}

/* Convert keys`s object or array to snake case Format */
export const keysToCamel = (o) => {
  if (isObject(o)) {
    const n = {}
    Object.keys(o)
      .forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k])
      })
    return n
  } else if (isArray(o)) {
    return o.map((i) => {
      return keysToCamel(i)
    })
  }
  return o
}

export const translateCurrency = (value, locale, currency) => {
  new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(value)
}

export const calTotal = (products) => {
  let result = 0
  products.forEach( product => {
    if (product.checked){
      result += product.price /* Add product`s price base in this calc */
      product.characteristics.forEach( characteristic => {
        result += sumCharacteristics(characteristic)
      })
    }
  })
  return result
}

const sumCharacteristics = (characteristic) => {

    /*if characteristic is disabled*/
    if(!characteristic.checked){
      return 0
    }

    /*type 1 Select*/
    if( characteristic.type == 1 ){
      let valueSelected = characteristic.children.find( element => element.id == characteristic.model.value) || {price: 0}
      let response = valueSelected.price
      response += sumChildren(valueSelected.children || [])
      return response
    }

    /*type 2 checkbox*/
    if( characteristic.type == 2 && characteristic.model ){
      let response = characteristic.price
      response += sumChildren(characteristic.children || [])
      return response
    }

    /*type 3 value*/
    if( characteristic.type == 3 ){
      let response = characteristic.model || 0
      response += sumChildren(characteristic.children || [])
      return response
    }

    /*type 4 number*/
    if( characteristic.type == 4 ){
      let response = (characteristic.model *  characteristic.price)
      response += sumChildren(characteristic.childrengenerated || [])
      return response
    }

    return 0
}

const sumChildren = ( children ) => {
  let calculate = 0
  children.forEach( element => { calculate += sumCharacteristics( element )})
  return calculate
}
