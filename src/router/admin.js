import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Admin',
      path: '/',
      children: [
        'Dashboard',
        'Settings'
      ]
    }
  ]
}

export default routerBuilder(routerConfig)
