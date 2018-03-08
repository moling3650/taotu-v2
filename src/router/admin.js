import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Admin',
      path: '/',
      children: [
        'Dashboard',
        'Settings',
        'Categories'
      ]
    }
  ]
}

export default routerBuilder(routerConfig)
