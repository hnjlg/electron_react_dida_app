# dida-app

An Electron application with React

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
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

优化：事项编辑页，需要做分页查询，且编辑之后，做单个修改，而不是调用页面sql重新刷新，且只能看到待完成的
快捷键支持用户修改，需要监听一些键盘功能键，如果有难度，可以先用输入框，存储到数据库