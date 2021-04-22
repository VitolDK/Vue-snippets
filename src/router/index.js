import Vue from 'vue'
import Router from 'vue-router'
import i18n from '@/i18n'

const _import = view => () => import('@/views/' + view)

Vue.use(Router)

export const authRouterMap = [{
  path: '/login',
  name: 'Login',
  component: _import('Login'),
  hidden: true
}]

export const constRouterMap = []

export const asyncRouterMap = []

export function createRoute({ name, path, props = false, icon = null, defaultParams = null, componentLink = null, children = null, links = null, component, groups }) {
  const title = (props && JSON.parse(props).title) ? JSON.parse(props).title : name.split(/(?=[A-Z])/).join('_').toUpperCase()
  return {
    path: path,
    name: name,
    meta: { title: i18n.t(`MENU.ITEM.${title}`), icon: icon, linked: true },
    component: component || _import(componentLink || name),
    groups,
    children,
    links,
    defaultParams,
    props
  }
}

export const createRouter = (routes = []) => (
  new Router({
    mode: 'history',
    routes
  })
)

const router = createRouter(authRouterMap)

export const updateRouter = (newRoutes) => {
  const newRouter = createRouter(newRoutes)
  router.matcher = newRouter.matcher
}

// Default auth path
export default router
