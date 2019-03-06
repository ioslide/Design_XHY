const util      = require('./util');
const http      = require('http');
const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');
const koaBody   = require('koa-body');
const webpush   = require('web-push');

const port = process.env.PORT || 8085;
const app = new Koa();
const router = new Router();

/* ===================== */
/* 使用web-push进行消息推送 */
/* ===================== */
const options = {
    // proxy: 'http://localhost:1087' // 使用FCM（Chrome）需要配置代理
};

/**
 * VAPID值
 */
const vapidKeys = {
    publicKey: 'BA2Z_4a8gbhQDYNjmga8zFwBwYXSzwZfzUnQIHQ3aH9ReCCo3Qux16ekbhB92C54gsHdv0w4UYg8gnacy3NLaQY',
    privateKey: '7hkpmR1G1n4cEC34_188sRorQj5Hf2MhaMD2yuAzPJc'
};

// 设置web-push的VAPID值
webpush.setVapidDetails(
    'mailto:353939483@qq.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

/**
 * 提交subscription信息，并保存
 */
router.post('/subscription', koaBody(), async ctx => {
    let body = ctx.request.body;
    await util.saveRecord(body);
    ctx.response.body = {
        status: 0
    };
});


/**
 * 向push service推送信息
 * @param {*} subscription 
 * @param {*} data
 */
function pushMessage(subscription, data = {}) {
    webpush.sendNotification(subscription, data, options).then(data => {
        console.log('push service的相应数据:', JSON.stringify(data));
        return;
    }).catch(err => {
        // 判断状态码，440和410表示失效
        if (err.statusCode === 410 || err.statusCode === 404) {
            return util.remove(subscription);
        }
        else {
            console.log(subscription);
            console.log(err);
        }
    })
}

/**
 * 消息推送API，可以在管理后台进行调用
 */
router.post('/push', koaBody(), async ctx => {
    let {uniqueid, payload} = ctx.request.body;
    let list = uniqueid ? await util.find({uniqueid}) : await util.findAll();
    let status = list.length > 0 ? 0 : -1;

    for (let i = 0; i < list.length; i++) {
        let subscription = list[i].subscription;
        pushMessage(subscription, JSON.stringify(payload));
    }

    ctx.response.body = {
        status
    };
});
/* ===================== */

app.use(router.routes());
app.use(serve(__dirname + '/public'));
app.listen(port, () => {
    console.log(`listen on port: ${port}`);
});