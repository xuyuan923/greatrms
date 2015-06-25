# 资源管理系统 GreatRMS
- 基于Nodejs + Express + Mongodb + Mongoose构建
- 项目结构采用[MEAN](http://meanjs.org/)架构
- 线上地址[https://greatrms.herokuapp.com/](https://greatrms.herokuapp.com/)

## GreatRMS可以做什么
在较大规模的公司里，对于复杂业务，业务线里会有多个产品经理、前端工程师、后端工程师等成员，需求的变更和人力资源的不透明是企业开发过程中的顽疾。
为了管理需求，让人力资源的占用更加透明，所以开发了这个系统。

本系统要解决的问题可以从下面两张图展示出来，图1展示了公司各业务线内成员的分布情况，图2展示了企业内多业务线人力资源分配的实际应用场景。
![图1 业务线下成员分布图](/screenshots/1.png)
![图2 多业务线人力资源分配实际应用场景图](/screenshots/2.png)

## 用户角色及角色拥有的功能

### 管理员
- 创建、修改、删除业务线和需求
- 删除用户

### 普通用户
#### 产品经理(PD)
- 创建业务线、需求
- 修改TA所创建的业务线
- 修改TA所创建的或认领的需求
- 认领TA所在业务线下的需求
- 退出业务线

#### 视觉设计师/交互设计师/前端工程师/后端工程师/测试工程师
- 认领TA所在业务线下的需求
- 修改TA所创建的或认领的需求
- 退出业务线

## 使用
- 创建业务线
![](/screenshots/67298F4B-FE40-4714-938A-B449DE364015.png)
- 创建需求
![](/screenshots/121DD40A-BA8B-47CD-A076-2EAD40AE9E59.png)
- 查看我的任务
![](/screenshots/renwu.png)
- 我的业务线模块
![](/screenshots/myline.png)
- 发现模块
![](/screenshots/faxian.png)
- 查看资源占用情况
![](/screenshots/zhanyong.png)
- 更多模块
![](/screenshots/gengduo.png)
- 管理员界面
![](/screenshots/admin.png)

## 快速上手
- git clone https://github.com/xuyuan923/mean.git
- (sudo) npm install packages
- 安装mongodb,mac下执行`mongod`
- 执行`grunt`

## 开源许可证
MIT