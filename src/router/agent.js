// 路由懒加载，到这个路由之后进行加载组件 require是运行时调用，所以可以随处引入 import是编译时调用，必须放在文件开头引入
// resolve => require(['@/components/agent/AgentFirst'], resolve)

let agent = [
    // 代理人首页
    {
        path: '/agent',
        name: 'AgentFirst',
        component: resolve => require(['@/components/agent/AgentFirst'], resolve)
    },
    // 代理人学习
    {
        path: '/agentLearn',
        name: 'AgentLearn',
        component: resolve => require(['@/components/agent/AgentLearn'], resolve)
    },
    // 代理人考试
    {
        path: '/agentExam',
        name: 'AgentExam',
        component: resolve => require(['@/components/agent/AgentExam'], resolve)
    },
    // 考试结果
    {
        path: '/AgentExaminationResult',
        name: 'AgentExaminationResult',
        component: resolve => require(['@/components/agent/AgentExaminationResult'], resolve)
    },
    // 考试答案
    {
        path: '/AgentAnswerAnalysis',
        name: 'AgentAnswerAnalysis',
        component: resolve => require(['@/components/agent/AgentAnswerAnalysis'], resolve)
    },
    // 代理人信息提交页面
    {
        path: '/AgentAuthentication',
        name: 'AgentAuthentication',
        component: resolve => require(['@/components/agent/AgentAuthentication'], resolve)
    },
    // 代理人签名页面
    {
        path: '/Canvas',
        name: 'Canvas',
        component: resolve => require(['@/components/agent/Canvas'], resolve)
    },
    // 代理人申请成功页面
    {
        path: '/AgentApplication',
        name: 'AgentApplication',
        component: resolve => require(['@/components/agent/AgentApplication'], resolve)
    },
    // 代理人注册页面
    {
        path: '/AgentRegister',
        name: 'agentRegister',
        component: resolve => require(['@/components/agent/agentRegister'], resolve)
    },
    // 代理人邀请好友页面
    {
        path: '/inviteFriends',
        name: 'inviteFriends',
        component: resolve => require(['@/components/agent/inviteFriends'], resolve),
        meta: {
            title: '邀请好友',
            allowShare: true
        }
    },
    // 我的团队
    {
        path: '/AgentTeam',
        name: 'AgentTeam',
        component: resolve => require(['@/components/agent/AgentTeam'], resolve)
    },
    // 客户保单
    {
        path: '/CustomerOrder',
        name: 'CustomerOrder',
        component: resolve => require(['@/components/agent/CustomerOrder/CustomerOrder'], resolve),
        redirect: '/clientInsurancePolicy',
        children:[
            {
                path: '/clientInsurancePolicy',
                name: 'clientInsurancePolicy',
                component: resolve => require(['@/components/agent/CustomerOrder/insurancePolicy'], resolve),
            },
            {
                path: '/clientIndustryPolicy',
                name: 'clientIndustryPolicy',
                component: resolve => require(['@/components/agent/CustomerOrder/IndustryPolicy'], resolve),
            },
            {
                path: '/clientCarInsurancePolicy',
                name: 'clientCarInsurancePolicy',
                component: resolve => require(['@/components/agent/CustomerOrder/CarInsurancePolicy'], resolve),
            }
        ]
    },
    // 代理人注册成功页面
    {
        path: '/agentRegisterSuccess',
        name: 'agentRegisterSuccess',
        component: resolve => require(['@/components/agent/agentRegisterSuccess'], resolve)
    },
    // 代理人执业证
    {
        path: '/practicingCertificate',
        name: 'practicingCertificate',
        component: resolve => require(['@/components/agent/practicingCertificate'], resolve)
    },
    // 保险顾问信息
    {
        path: '/InsuranceAdvisor',
        name: 'InsuranceAdvisor',
        component: resolve => require(['@/components/agent/InsuranceAdvisor'], resolve)
    },
    // 代理人执业证审核中
    {
        path: '/practicingCertificateAudit',
        name: 'practicingCertificateAudit',
        component: resolve => require(['@/components/agent/practicingCertificateAudit'], resolve)
    }
];
export default agent;