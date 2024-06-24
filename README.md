# dida-app

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ 删除 package.json中的sqlite3  然后npm i 再执行 npm i sqlite3@5.1.7
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

# 问题备注

快捷键支持用户修改，需要监听一些键盘功能键，如果有难度，可以先用输入框，存储到数据库
自定义图标右键操作
安装支持选择安装目录，开机自启，桌面快捷图标
工作台打开子窗口
检测更新
调用系统通知
自定义任务栏图标操作
卸载提示