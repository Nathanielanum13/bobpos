import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'

const routes = [{
        path: '/',
        redirect: {
            name: 'Login'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ('@/views/Home'),
        beforeEnter: (to, from, next) => {
            const token = window.sessionStorage.getItem("token") ?? ""
            const userData = window.sessionStorage.getItem("user") ?? ""

            token && userData ? next() : next("/login")
        },
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Checkout',
                component: () => import('@/views/Checkout')
            },
            {
                path: '/home/products',
                name: 'Products',
                component: () => import('@/views/Products')
            },
            {
                path: '/home/products/:id',
                name: 'Product',
                component: () => import('@/views/Product')
            }
        ]
    },
    {
        path: '/:catchAll(.*)',
        name:'Dashboard',
        component: () => import('@/views/NotFound')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router