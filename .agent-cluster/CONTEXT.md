# 减肥助手系统 - 业务上下文

## 项目概述
一个减肥追踪 Web 应用，帮助用户记录饮食、体重和获取健康建议。

## 技术栈
- **前端**: Next.js 16 + React 19 + Tailwind CSS 4
- **后端**: Next.js API Routes
- **数据库**: Prisma 5 + SQLite
- **Node.js**: v22

## 数据模型
- **Profile**: 用户档案（目标体重、身高、年龄等）
- **Weight**: 体重记录
- **Diet**: 饮食记录（食物、卡路里、时间）

## 页面结构
- `/` - 首页（今日概览）
- `/diet` - 饮食记录
- `/weight` - 体重追踪
- `/advice` - 健康建议
- `/profile` - 个人设置

## 待开发功能
1. 体重追踪图表/数据可视化
2. 首页"今日概览"实时统计
3. 饮食和体重历史记录查看
4. 生产部署（PM2 或 systemd）

## 开发规范
- 使用 pnpm 作为包管理器
- 提交前确保 `pnpm build` 成功
- 遵循 Next.js App Router 模式
