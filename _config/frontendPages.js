export default {
  quotesCreate: {
    permission: null,
    activated: true,
    path: '/',
    name: 'qquote.frontend.quotesCreate',
    page: () => import('@imagina/qquote/_pages/frontend/quotes/create'),
    layout: () => import('@imagina/qquote/_layouts/master.vue'),
    title: 'qquote.sidebar.adminQuotes',
    icon: 'fas fa-calculator',
    authenticated: null,
  },
}
