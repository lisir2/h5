

export default [
    // 学习模块路由
    {
        path: '/StudyArticle',
        name: 'StudyArticle',
        component: resolve => require(['@/components/StudyModule/StudyArticle'], resolve),
        meta: {
            title: '文章详情',
            allowShare: true
        }
    },
    // 进入公众号继续阅读
    {
        path: '/ToReadofFirst',
        name: 'ToReadofFirst',
        component: resolve => require(['@/components/StudyModule/ToReadofFirst'], resolve)
    },
    // 获取微信二维码页面
    {
        path: '/getWeixinCode',
        name: 'getWeixinCode',
        component: resolve => require(['@/components/StudyModule/getWeixinCode'], resolve)
    },
    // 文章投诉列表页面
    {
        path: '/Report',
        name: 'Report',
        component: resolve => require(['@/components/StudyModule/Report'], resolve)
    },
    // 文章投诉填写页面
    {
        path: '/ReportInput',
        name: 'ReportInput',
        component: resolve => require(['@/components/StudyModule/ReportInput'], resolve)
    }
    
]