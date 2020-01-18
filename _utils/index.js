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
