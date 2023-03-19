// import express from 'express';
// const app = express();

// app.get('/message', (req, res) => {
//     res.send('这是来自node服务端的信息');
// });

// app.post('/message', (req, res) => {
//     if (req) {
//         res.send(req + '--来自node');
//     }
// });

// export default app;

// 引入必要库
import { createExpressServer } from 'routing-controllers';
import controllers from '../database/controllers';
console.log('=====控制器', controllers);


// 创建express应用，注册所有控制器路由并返回express实例
const app = createExpressServer({
    controllers, //声明需要使用的控制器
});

export default app;