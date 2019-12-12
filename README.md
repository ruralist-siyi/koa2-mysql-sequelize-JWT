####  log4js

1. Level: 日志的分级，分级展示更容易让我们区分bug，更好的进行debug，也是日志区分的纬度之一；

2. category（类型）： 自定义的一个日志区分纬度，你可以将他设置为每条日志附上对应的类型标记；

3. appender（输出源）：定义我们日志保存的type（console、file等），还有输出的filePath或者SMTP(邮件)等；

4. layout（格式）：通过layout自定义配置日志输出的格式；

#### jwt





#### koa

1. ctx.state: 推荐的命名空间，用于通过中间件传递信息和你的前端视图。（ssr、jwt等都有用到）