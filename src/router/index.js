import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  mode: 'history',
  routes: [
    {
      name: 'Landing',
      path: '/'
    }
  ]
}

export default routerBuilder(routerConfig)
