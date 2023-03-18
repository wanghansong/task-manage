import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    { path: '/:pathMatch(.*)*', component: () => import('@renderer/views/404.vue') },
    { path: '/', name: '入口', redirect: '/home/daily' },
    {
        path: '/home',
        name: '首页',
        component: () => import('@renderer/layout/home/index.vue'),
        redirect: '/home/daily',
        children: [
            {
                path: 'daily',
                name: '日程',
                component: () => import('@renderer/views/daily/index.vue'),
            },
            {
                path: 'okr',
                name: 'OKR',
                component: () => import('@renderer/views/okr/index.vue'),
            },
            {
                path: 'clock',
                name: '番茄时钟',
                component: () => import('@renderer/views/clock/index.vue'),
            },
        ],
    },
    // { path: '/', name: '总览', component: () => import('@renderer/components/LandingPage.vue') },
    // { path: '/Print', name: '打印', component: () => import('@renderer/views/Print.vue') },
];

export default routes;