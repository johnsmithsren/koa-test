const router = require('koa-router')()
const exec = require('child_process').exec;
const util = require('util');
let user_controller = require('../controller/user')
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


router.post('/hello', async (ctx, next) => {
  ctx.body = {
    msg: 'this is koa response'
  }
})


router.post('/get_local_pwd', async (ctx, next) => {
  let result = await exec('ls;pwd', function (error, stdout, stderr) {
    if (error) {
      console.error('error: ' + error);
      return;
    }
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + typeof stderr);
    return stdout
  });
  ctx.body = {
    msg: 'success'
  }

})


module.exports = router
