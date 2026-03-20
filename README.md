# Efficient Interface - BWiki 界面代码库

一个用于 BWiki（MediaWiki）的界面代码构建和部署工具。支持代码编译、小工具定义生成和 Github Actions 自动化部署。

## 功能特性

- 🚀 **自动化构建**：使用 SWC 编译 JavaScript/TypeScript 代码
- 📦 **小工具管理**：自动生成 MediaWiki 小工具定义文件
- 🔄 **智能部署**：仅部署有变化的文件，减少 API 调用
- 🔧 **开发友好**：完整的 TypeScript 支持、ESLint 代码检查、Prettier 代码格式化
- 🛡️ **安全可靠**：使用 Cookie 认证，支持批量操作和错误重试

## 项目结构

```
efficient-interface/
├── src/                          # 源代码目录（需要手动创建）
│   ├── gadgets/                  # 小工具代码
│   │   └── [gadget-name]/        # 每个小工具独立目录
│   │       ├── definition.yaml   # 小工具定义文件
│   │       └── Gadget-[name].js  # 小工具主文件
│   └── global/                   # 全局脚本
│       └── *.js                  # 全局 JavaScript 文件
├── dist/                         # 构建输出目录（自动生成）
├── scripts/                      # 构建和部署脚本
│   ├── build/                    # 构建相关脚本
│   ├── deploy/                   # 部署相关脚本
│   └── types/                    # TypeScript 类型定义
├── .vscode/                      # VSCode 配置
└── package.json                  # 项目配置和依赖
```

## 快速开始

### 前置要求

- Node.js 18+ 或更高版本
- pnpm 包管理器
- BWiki 账号（`biligame.com`）的 SESSDATA Cookie

### 安装

1. 克隆本项目
2. 安装依赖：

```bash
git clone git@github.com:Saoutax/BWikiInterface.git
cd BWikiInterface
pnpm install
```

2. 配置环境变量：

复制 `.env.example` 为 `.env` 并填写你的配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
SESSDATA=你的SESSDATA
USERAGENT=你的User-Agent
```

3. 配置 Github Actions

前往对应仓库的设置页面，添加与本地相同的 `SESSDATA` 和 `USERAGENT` 作为 `secret`

### 创建小工具

1. 在 `src/gadgets/` 目录下创建小工具目录：

```bash
mkdir -p src/gadgets/MyGadget
```

2. 创建小工具定义文件 `src/gadgets/MyGadget/definition.yaml`：

```yaml
ResourceLoader: true
hidden: false
default: true
type: general
rights:
    - delete
dependencies: []
enable: true
files:
    - MyGadget.js
```

3. 创建小工具主文件 `src/gadgets/MyGadget/Gadget-MyGadget.js`：

```javascript
// 你的小工具代码
console.log('MyGadget loaded!');
```

### 创建全局脚本

与小工具类似，但应于`src/global/` 目录下按目标页面名称直接创建：

```bash
mkdir -p src/global/Group-sysop.js
```

### 构建项目

```bash
pnpm run build
```

构建完成后，代码将输出到 `dist/` 目录，同时生成 `dist/gadgets/Gadgets-definition` 文件。

### 部署到 BWiki

```bash
pnpm run deploy
```

部署脚本会自动：
1. 构建项目（如果尚未构建）
2. 计算文件哈希值，检测变化
3. 仅上传有变化的文件到 MediaWiki
4. 更新部署状态文件 `MediaWiki:Deployment.json`

一般情况下，此部分将由 Github Actions 完成，无需手动部署。

## 开发指南

### 可用命令

| 命令 | 描述 |
|------|------|
| `pnpm run build` | 构建项目到 `dist/` 目录 |
| `pnpm run deploy` | 构建并部署到 BWiki |
| `pnpm run format` | 使用 Prettier 格式化代码 |
| `pnpm run lint:dev` | 使用 ESLint 检查代码 |

### 环境变量

| 变量名 | 必填 | 描述 |
|--------|------|------|
| `SESSDATA` | 是 | BWiki 登录 Cookie 中的 SESSDATA 值 |
| `USERAGENT` | 是 | 用于 API 请求的 User-Agent 字符串 |

## 故障排除

### 常见问题

**Q：部署时出现认证错误**

A：检查 `.env` 文件中的 `SESSDATA` 是否正确，确保 Cookie 未过期。

**Q：构建失败，提示找不到文件**

A：确保 `src/` 目录结构正确，小工具主文件命名符合 `Gadget-[目录名].js` 格式。

## 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 致谢

- [Mwn](https://github.com/siddharthvp/mwn) - MediaWiki API 客户端库
- [SWC](https://swc.rs/) - 快速的 JavaScript/TypeScript 编译器
- [BWiki 实验室](https://wiki.biligame.com/tools) - 提供平台支持
