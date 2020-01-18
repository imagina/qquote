export default {
  quotesCreate: {
    permission: null,
    activated: true,
    path: '/',
    name: 'qquote.frontend.quotesCreate',
    page: () => import('@imagina/qquote/_pages/frontend/quotes/create'),
    layout: () => import('src/layouts/custom/master.vue'),
    title: 'qquote.sidebar.adminQuotes',
    icon: 'fas fa-calculator',
    authenticated: null,
  },
}
