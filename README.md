# Node.js实战开发(此项目附有前端taro.js项目：[taro-dva-lazyNotebook](https://github.com/ruralist-siyi/taro-dva-lazyNotebook))

### 应用截图
<img src="https://github.com/ruralist-siyi/taro-dva-lazyNotebook/blob/master/src/assets/img/lp1.gif" width="200"/><img src="https://github.com/ruralist-siyi/taro-dva-lazyNotebook/blob/master/src/assets/img/lp2.gif" width="200"/><img src="https://github.com/ruralist-siyi/taro-dva-lazyNotebook/blob/master/src/assets/img/WechatIMG6.jpeg" width="200"/><img src="https://github.com/ruralist-siyi/taro-dva-lazyNotebook/blob/master/src/assets/img/WechatIMG9.jpeg" width="200"/><img src="https://github.com/ruralist-siyi/taro-dva-lazyNotebook/blob/master/src/assets/img/WechatIMG7.jpeg" width="200"/>

### 一. 技术栈
#### 1. Koa2
#### 2. sequelize and mysql（ORM框架 and 数据库）
#### 3. log4js（日志记录）
#### 4. jsonwebtoken （权限认证）


### 二. 启动项目
#### 1. yarn / npm install（安装依赖）

#### 2. start mysql(安装、创建database：test)

#### 3. 开发环境：yarn/npm run dev; 生产环境： yarn/npm run prd;

### 三. 接口文档(token无论request或者responed均放在请求头`authorization`中，文档中不再体现)
#### 1. 新增用户
- 接口说明：创建一个新user

- 接口地址：/user/create (POST)

- 请求示例
```
// request body
{"userName":"测试一下","userPassword":"123123","email":"3743738@qq.com","phone":"13333333333"}

// response
{
  "code": "000000",
  "msg": "创建成功",
  "data": {
    "createTime": "2019-12-23 16:26:45",
    "updateTime": "2019-12-23 16:26:45",
    "userId": 6,
    "userName": "测试一下",
    "userPassword": "123123",
    "phone": "13333333333",
    "email": "3743738@qq.com"
  }
}
```
#### 2. 登录
- 接口说明：用户登录

- 接口地址：/user/login (POST)

- 请求示例
```
// request body
{"userName":"测试一下","userPassword":"123123"}

// response
{
  "code": "000000",
  "data": {
    "userId": 6,
    "userName": "测试一下",
    "userPassword": "123123",
    "phone": "13333333333",
    "email": "3743738@qq.com",
    "createTime": "2019-12-23 16:45:00",
    "updateTime": "2019-12-23 16:45:00"
  },
  "msg": "登录成功"
}
```

#### 3. 查询用户详情
- 接口说明：用户详情的查询

- 接口地址：/user/queryDetail (GET)

- 请求示例
```
// request query string params
userId=6

// response
{
  "code": "000000",
  "msg": "查询成功",
  "data": {
    "createTime": "2019-12-23 16:45:01",
    "updateTime": "2019-12-23 16:45:01",
    "userId": 6,
    "userName": "测试一下",
    "userPassword": "123123",
    "phone": "13333333333",
    "email": "3743738@qq.com"
  }
}
```

#### 3. 查询用户详情
- 接口说明：用户详情的查询

- 接口地址：/user/queryDetail (GET)

- 请求示例
```
// request query string params
userId=6

// response
{
  "code": "000000",
  "msg": "查询成功",
  "data": {
    "createTime": "2019-12-23 16:45:01",
    "updateTime": "2019-12-23 16:45:01",
    "userId": 6,
    "userName": "测试一下",
    "userPassword": "123123",
    "phone": "13333333333",
    "email": "3743738@qq.com"
  }
}
```
#### 4. 创建目标
- 接口说明：创建一个目标

- 接口地址：/objective/create (POST)

- 请求示例
```
// request body
{"startTime":"2019-12-23","endTime":"2019-12-24","weight":5,"content":"这是内容"}

// response
{
  "code": "000000",
  "msg": "创建成功",
  "data": {
    "startTime": "2019-12-23 16:52:12",
    "endTime": "2019-12-23 16:52:12",
    "createTime": "2019-12-23 16:52:12",
    "updateTime": "2019-12-23 16:52:12",
    "objectiveId": 9,
    "weight": 5,
    "content": "这是内容",
    "userId": 6,
    "status": 1
  }
}
```

#### 5. 目标分页查询
- 接口说明：创建一个目标

- 接口地址：/objective/queryForPage (GET)

- 请求示例
```
// request query string params
page=1&size=10

// response
{
  "code": "000000",
  "msg": "创建成功",
  "data": {
    "count": 3,
    "rows": [
      {
        "startTime": "2019-12-23 16:52:12",
        "endTime": "2019-12-23 16:52:12",
        "createTime": "2019-12-23 16:52:12",
        "updateTime": "2019-12-23 16:52:12",
        "objectiveId": 7,
        "weight": "5",
        "content": "先赚他一个亿，然后花很多钱哈哈哈哈哈哈哈哈哈哈",
        "status": 1,
        "userId": 1,
        "isTop": true,
        "destroyTime": null
      },
      {
        "startTime": "2019-12-23 16:52:12",
        "endTime": "2019-12-23 16:52:12",
        "createTime": "2019-12-23 16:52:12",
        "updateTime": "2019-12-23 16:52:12",
        "objectiveId": 8,
        "weight": "4",
        "content": "先挣一个亿没毛病啊老铁",
        "status": 1,
        "userId": 1,
        "isTop": false,
        "destroyTime": null
      },
      {
        "startTime": "2019-12-23 16:52:12",
        "endTime": "2019-12-23 16:52:12",
        "createTime": "2019-12-23 16:52:12",
        "updateTime": "2019-12-23 16:52:12",
        "objectiveId": 9,
        "weight": "5",
        "content": "这是内容",
        "status": 1,
        "userId": 6,
        "isTop": null,
        "destroyTime": null
      }
    ]
  }
}
```

#### 6. 置顶一个目标
- 接口说明：创建一个目标

- 接口地址：/objective/setTop (POST)

- 请求示例
```
// request body
{"objectiveId":8}

// response
{
  "code": "000000",
  "msg": "置顶成功",
  "data": null
}
```

#### 7. 删除一个目标
- 接口说明： 删除一个目标

- 接口地址：/objective/delete (DELETE)

- 请求示例
```
// request body
{"objectiveId":9}

// response
{
  "code": "000000",
  "msg": "删除成功",
  "data": null
}
```

#### 8. 退出登录
- 接口说明： 用户退出登录

- 接口地址：/user/logout (DELETE)

- 请求示例
```
// request body
{}

// response
{
  "code": "000000",
  "msg": "退出成功",
  "data": null
}
```

