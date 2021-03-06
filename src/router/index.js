import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                // {
                //     path: '/memberList',
                //     component: () => import(/* webpackChunkName: "memberList" */ '../components/page/MemberList.vue'),
                //     meta: { title: '基础表格' }
                // },
                // {
                //     path: '/icon',
                //     component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                //     meta: { title: '自定义图标' }
                // },
                // {
                //     path: '/table',
                //     component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                //     meta: { title: '基础表格' }
                // },
                // {
                //     path: '/tabs',
                //     component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                //     meta: { title: 'tab选项卡' }
                // },
                // {
                //     path: '/form',
                //     component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                //     meta: { title: '基本表单' }
                // },
                // {
                //     // 富文本编辑器组件
                //     path: '/editor',
                //     component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                //     meta: { title: '富文本编辑器' }
                // },
                // {
                //     // markdown组件
                //     path: '/markdown',
                //     component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                //     meta: { title: 'markdown编辑器' }
                // },
                // {
                //     // 图片上传组件
                //     path: '/upload',
                //     component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                //     meta: { title: '文件上传' }
                // },
                // {
                //     // vue-schart组件
                //     path: '/charts',
                //     component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                //     meta: { title: 'schart图表' }
                // },
                // {
                //     // 拖拽列表组件
                //     path: '/drag',
                //     component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                //     meta: { title: '拖拽列表' }
                // },
                // {
                //     // 拖拽Dialog组件
                //     path: '/dialog',
                //     component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                //     meta: { title: '拖拽弹框' }
                // },
                // {
                //     // 国际化组件
                //     path: '/i18n',
                //     component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                //     meta: { title: '国际化' }
                // },
                // {
                //     // 权限页面
                //     path: '/permission',
                //     component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                //     meta: { title: '权限测试', permission: true }
                // },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/good/list',
                    component: () => import(/* webpackChunkName: "addGood" */ '../components/page/GoodList.vue'),
                    meta: { title: '服务列表' }
                },
                {
                    path: '/good/type',
                    component: () => import(/* webpackChunkName: "goodType" */ '../components/page/GoodType.vue'),
                    meta: { title: '服务类型管理' }
                },
                {
                    path: '/addGood',
                    component: () => import(/* webpackChunkName: "addGood" */ '../components/page/AddGood.vue'),
                    meta: { title: '添加服务' }
                },
                {
                    path: '/user/list',
                    component: () => import(/* webpackChunkName: "addGood" */ '../components/page/UserList.vue'),
                    meta: { title: '会员列表' }
                },
                {
                    path: '/user/level/list',
                    component: () => import(/* webpackChunkName: "addGood" */ '../components/page/UserLevelList.vue'),
                    meta: { title: '会员等级列表' }
                },
                {
                    path: '/user/level/add',
                    component: () => import(/* webpackChunkName: "addGood" */ '../components/page/AddUserLevel.vue'),
                    meta: { title: '添加会员等级' }
                },
                {
                    path: '/memberConsumption',
                    component: () => import(/* webpackChunkName: "memberConsumption" */ '../components/page/MemberConsumption.vue'),
                    meta: { title: '会员消费' }
                },
                {
                    path: '/logs',
                    component: () => import(/* webpackChunkName: "logs" */ '../components/page/Logs.vue'),
                    meta: { title: '操作日志' }
                },
                {
                    path: '/translog',
                    component: () => import(/* webpackChunkName: "translog" */ '../components/page/TransLogs.vue'),
                    meta: { title: '交易记录' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
