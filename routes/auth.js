/**
 * Created by renjm on 2018/06/02.
 */


const router = require('koa-router')()
// const jwt = require("jsonwebtoken")
// const uuid = require("node-uuid")
const user_controller = require('../controller/user')
const _ = require('lodash')
const config = require("../config.json")
const error = require('../util/error')
// const checkPermission = require('../util/check')
// const redis = require("../util/store.js");
// router.prefix('/users')



router.post('/mock/usercenter/login', async (ctx, next) => {
    // let user_name = _.get(ctx.request.body, 'user_name', '')
    // let password = _.get(ctx.request.body, 'password', '')
    // let user = new user_controller();
    // let acecessToken = null
    // result = await user.auth(user_name, password, ctx)
    // if (result) {
    //     acecessToken = await user.getAcecessToken(ctx.user_info.unique_id)
    //     ctx.body = {
    //         data: {
    //             ticket: 'ticket',
    //             accessToken: acecessToken,
    //             expireTime: config.expires,

    //         },
    //         msg: '操作成功',
    //         status: 1,
    //         err: 0
    //     }
    // } else {
    //     ctx.body = error.UserInfoNotCorrect
    // }
    ctx.body = {
        data: {
            ticket: 'ticket',
            token: '11111',
        },
        msg: '操作成功',
        status: 1,
    }

    return
})

router.post('/logout', async (ctx, next) => {
    // let user_name = _.get(ctx.request.body, 'user_name', '')
    // let password = _.get(ctx.request.body, 'password', '')
    // let user = new user_controller();
    // let acecessToken = null
    // result = await user.auth(user_name, password, ctx)
    // if (result) {
    //     acecessToken = await user.getAcecessToken(ctx.user_info.unique_id)
    //     ctx.body = {
    //         data: {
    //             ticket: 'ticket',
    //             accessToken: acecessToken,
    //             expireTime: config.expires,

    //         },
    //         msg: '操作成功',
    //         status: 1,
    //         err: 0
    //     }
    // } else {
    //     ctx.body = error.UserInfoNotCorrect
    // }
    ctx.body = {
        data: {
        },
        msg: '退出成功！',
        status: 1,
    }
    return
})
router.post('/mock/usercenter/user/userMenu', async (ctx, next) => {
    ctx.body = {
        data: {
            list: [
                {
                    id: 10060,
                    resName: '工作台',
                    children: [
                        {
                            id: 10063,
                            resName: '概览',
                            resKey: 'desk$/index',
                            resIcon: '',
                        },
                        {
                            id: 600110233,
                            resName: '图表',
                            resKey: 'echarts',
                            resIcon: '',
                        },
                        {
                            id: 100631,
                            resName: '编辑器',
                            resKey: 'editor',
                            resIcon: '',
                        },
                        {
                            id: 100632,
                            resName: '消息中心',
                            resKey: 'message',
                            resIcon: '',
                        },
                    ],
                    resKey: 'desk$',
                    resIcon: 'home',
                },
                {
                    id: 10062,
                    resName: '设置中心',
                    children: [
                        {
                            id: 10108,
                            resName: '用户管理',
                            resKey: 'set$/userManage',
                            resIcon: 'userManage',
                        },
                    ],
                    resKey: 'set$',
                    resIcon: 'set',
                },
            ],
        },
        msg: '操作成功',
        status: 1,
    }

    // let user = new user_controller()
    // ctx.body = await user.list_user()
    return
})
router.get('/refresh', async (ctx, next) => {
    // let user = new user_controller()
    // ctx.body = await user.list_user()
    return
})

router.post('/mock/usercenter/role/list', async (ctx, next) => {
    ctx.body = {
        data: {
            list: [
                {
                    id: 1,
                    roleName: '超级管理员',
                    sort: 0,
                    type: 0,
                    resources: [],
                },
                {
                    id: 10080,
                    roleName: '开发账号',
                    sort: 2,
                    resources: [],
                },
                {
                    id: 10060,
                    roleName: '测试',
                    sort: 3,
                    resources: [],
                },
                {
                    id: 10100,
                    roleName: '演示账号',
                    sort: 3,
                    resources: [],
                },
            ],
        },
        msg: '',
        errorCode: '',
        status: 1,
    }
})

router.post('/mock/usercenter/dept/list', async (ctx, next) => {
    // let user = new user_controller()
    // ctx.body = await user.list_user()
    ctx.body = {
        data: {
            list: [
                {
                    id: '1',
                    children: [
                        {
                            id: '10416',
                            parentCode: '370200000000',
                            children: [
                                {
                                    id: '10541',
                                    parentCode: '370202000000',
                                    deptName: '文一路',
                                    deptCode: '370202140000',
                                },
                                {
                                    id: '10401',
                                    parentCode: '370202000000',
                                    deptName: '文二路',
                                    deptCode: '370202150000',
                                },
                                {
                                    id: '10398',
                                    parentCode: '370202000000',
                                    children: [
                                        {
                                            id: '10628',
                                            parentCode: '370202230000',
                                            deptName: '文三路',
                                            deptCode: '370202230001',
                                        },
                                        {
                                            id: '10629',
                                            parentCode: '370202230000',
                                            deptName: '文晖路',
                                            deptCode: '370202230002',
                                        },
                                    ],
                                    deptName: '古翠路',
                                    deptCode: '370202230000',
                                },
                                {
                                    id: '10537',
                                    parentCode: '370202000000',
                                    deptName: '丰潭路',
                                    deptCode: '370202240000',
                                },
                            ],
                            deptName: '下城区',
                            deptCode: '370202000000',
                        },
                    ],
                    deptName: '杭州市',
                    deptCode: '370200000000',
                },
            ],
        },
        msg: '',
        errorCode: '',
        status: 1,
    }

    return
})


router.post('/mock/usercenter/user/list', async (ctx, next) => {
    ctx.body = {
        data: {
            pageSize: 10,
            pageNo: 1,
            totalCount: 8,
            list: [
                {
                    id: 10240,
                    username: 'tgramxs',
                    password: '123456',
                    chineseName: '销售部',
                    idcardNo: '332527198010230505',
                    deptCode: '370200000000',
                    phoneNo: '18969784568',
                    status: 0,
                    roles: [
                        {
                            id: 10100,
                            roleName: '演示账号',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 10198,
                    username: 'qingdaosj',
                    password: '888888',
                    chineseName: '市局',
                    idcardNo: '412722196302151222',
                    deptCode: '370200000000',
                    phoneNo: '15236985623',
                    status: 0,
                    roles: [
                        {
                            id: 1,
                            roleName: '超级管理员',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 10184,
                    username: 'sjsjsj',
                    password: '888888',
                    chineseName: '测试sj',
                    idcardNo: '332623196801254521',
                    deptCode: '370200000000',
                    phoneNo: '15821456854',
                    type: 0,
                    status: 0,
                    roles: [
                        {
                            id: 1,
                            roleName: '超级管理员',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 10180,
                    username: 'sj666',
                    password: '888888',
                    chineseName: 'sj-admin',
                    idcardNo: '612527199310150000',
                    deptCode: '370200000000',
                    phoneNo: '15522223333',
                    type: 0,
                    status: 0,
                    roles: [
                        {
                            id: 1,
                            roleName: '超级管理员',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 10178,
                    username: 'zhlsj1',
                    password: '888888',
                    chineseName: 'zhlsj1',
                    idcardNo: '330881187609090044',
                    deptCode: '370200000000',
                    phoneNo: '13200000000',
                    type: 0,
                    status: 0,
                    roles: [
                        {
                            id: 1,
                            roleName: '超级管理员',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 10177,
                    username: 'zhlsj',
                    password: '888888',
                    chineseName: 'zhlsj',
                    idcardNo: '330881187609090033',
                    deptCode: '370200000000',
                    phoneNo: '15600000000',
                    type: 0,
                    status: 0,
                    roles: [
                        {
                            id: 1,
                            roleName: '超级管理员',
                            resources: [],
                        },
                    ],
                    gxdwdm: '370200000000',
                },
                {
                    id: 2,
                    username: '111111',
                    password: '111111',
                    chineseName: '管理员',
                    idcardNo: '000000000000000001',
                    policeCode: '000000',
                    deptCode: '370200000000',
                    gender: 1,
                    email: 'abc@abc.com',
                    phoneNo: '15100000000',
                    type: 0,
                    status: 0,
                    gxdwdm: '370200000000',
                },
            ],
            totalPage: 1,
        },
        msg: '',
        errorCode: '',
        status: 1,
    }

    // let user = new user_controller()
    // ctx.body = await user.list_user()
    return
})

module.exports = router
