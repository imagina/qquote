const pages = config('pages') // Get Pages from config

//Places
export default [
  {
    title: 'qquote.sidebar.adminQuotations',
    icon: 'fas fa-calculator',
    children: [
      pages.qquote.packages,
      pages.qquote.products,
      pages.qquote.quotes,
    ]
  },
]
