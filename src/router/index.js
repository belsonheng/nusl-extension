// /// Not in use
//
// import Vue from 'vue'
// import Router from 'vue-router'
// // import store from '../store'
//
// import Login from '../pages/login/Index.vue'
// import AlumniLogin from '../pages/login/Alumni.vue'
// import MemberLogin from '../pages/login/Member.vue'
// import Dashboard from '../pages/dashboard/Index.vue'
//
// Vue.use(Router)
//
// const pageWhiteList = ['/', '/alumni', 'member']
//
// const router = new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/',
//       redirect: 'alumni',
//       name: 'root',
//       component: Login,
//       meta: {
//         requiresAuth: false
//       },
//       children: [
//         {
//           path: 'alumni',
//           name: 'alumni',
//           component: AlumniLogin,
//           meta: {
//             requiresAuth: false
//           }
//         },
//         {
//           path: 'member',
//           name: 'member',
//           component: MemberLogin,
//           meta: {
//             requiresAuth: false
//           }
//         }
//       ]
//     },
//     {
//       path: '/dashboard',
//       name: 'dashboard',
//       component: Dashboard,
//       meta: {
//         requiresAuth: true
//       }
//     }
//   ]
// })
//
// router.beforeEach((to, from, next) => {
//   let _accessToken = store.state.auth.accessToken || ''
//   let _isAuthorise = store.state.auth.isAuthorise || false
//
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (_accessToken && _isAuthorise) {
//       next()
//     } else {  // not authorised, please login
//       next({
//         path: '/',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//       next()  // todo
//   }
// })
//
// router.afterEach((to, from) => {
//
// })
//
// export default router
