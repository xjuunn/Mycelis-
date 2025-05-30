# 贡献指南

## 欢迎贡献

感谢您有兴趣为我们的项目贡献代码！以下是参与项目开发的指南。

## 项目结构

本项目采用 monorepo 结构：

```
mycelis/
├── apps/
│ ├── frontend/    # Nuxt3 前端应用
│ └── backend/     # NestJS 后端服务
├── packages/
│ ├── cli/         # 命令行管理工具
│ ├── config/      # 共享配置
│ ├── database/    # Prisma 数据库模块
│ ├── types/       # 共享类型定义
│ └── utils/       # 公共工具函数
│ └── ...          # 其他 packages
```

## 开发流程

1. Fork 并创建新分支 `git checkout -b feat/你的分支名`
2. 编写代码
3. 提交更改 `git commit -m "feat:添加新功能描述"`
4. 推送分支并创建 Pull Request

## 代码规范

* 前端使用 `<script setup>`语法
* 所有对接后端的API，在 `/api` 中定义
* 优先使用 **TypeScript**
* 后端使用Swagger文档

## 联系我
* [Telegram\: @xjuunn](https://t.me/xjuunn)
* wechat: \_xjuunn

感谢您的贡献！🚀
