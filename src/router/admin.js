import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Admin',
      path: '/',
      children: [
        'Dashboard'
      ]
    }
  ]
}

export default routerBuilder(routerConfig)
