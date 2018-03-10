import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  mode: 'history',
  routes: [
    {
      name: 'Landing',
      path: '/'
    },
    {
      name: 'Category',
      path: '/Category/:name'
    },
    {
      name: 'Album',
      path: '/album/:title'
    }
  ]
}

export default routerBuilder(routerConfig)
