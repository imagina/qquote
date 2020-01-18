const moduleName = 'iquote'
const moduleVersion = 'v1'
const urlBase = `/${moduleName}/${moduleVersion}`

export default {
  urlBase : urlBase,
  version: moduleVersion,
  packages: `${urlBase}/packages`,
  products: `${urlBase}/products`,
  packagesProducts: `${urlBase}/packages-products`,
  characteristics: `${urlBase}/characteristics`,
  types: `${urlBase}/types`,
  quotes: `${urlBase}/quotes`,
  send: `${urlBase}/quotes/send`,
  download: `${urlBase}/quotes/download`,
  configs: `${urlBase}/configs`,
}
