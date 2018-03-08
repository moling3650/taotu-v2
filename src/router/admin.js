import routerBuilder from '@/utils/routerBuilder'

const routerConfig = {
  routes: [
    {
      name: 'Admin',
      path: '/',
      children: [
        'Dashboard',
        'Settings',
        'Categories',
        'Albums',
        {
          name: 'Category',
          path: '/categories/:name'
        }
      ]
    }
  ]
}

export default routerBuilder(routerConfig)
