const Koa = require('koa');
const Router = require('@koa/router')
const path = require('path')
const fs = require('fs')

const app = new Koa();
const router = new Router();


function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`<script>console.log(1)</script>`);
        }, 2000)
    })

}
function test1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(`<script>console.log(2)</script>`);
        }, 2000)
    })
}

router.get('/', async (ctx, next) => {
    // ctx.body = 123
    let html = fs.readFileSync('index.html');
    ctx.response.status = 200
    ctx.res.write(html);
    let res = await test()
    console.log(res)
    ctx.res.write(res);
    let res1 = await test1();
    ctx.res.write(res1);
    ctx.res.end()
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3002, () => {
    console.log(123)
})