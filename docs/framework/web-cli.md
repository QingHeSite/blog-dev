---
head:
  - - meta
    - name: description
      content: 如何搭建前端脚手架, 如何开发一个自己的脚手架
  - - meta
    - name: keywords
      content: 前端脚手架, 开发脚手架, 开发web cli, web-cli开发
---

# web cli 脚手架开发

1. 灵活性高
2. 可扩展性强
3. 可维护性高
4. 可复用性强

### 使用到的插件库
- commander@12.1.0: 命令行解析工具
- inquirer@10.1.8: 命令行交互工具
- chalk@4.1.2: 命令行输出颜色工具
- ora@5.4.1: 命令行loading工具
- download-git-repo: 下载github public仓库
- ora: 命令行loading工具

### 核心代码

##### js代码
```ts
#!/usr/bin/env node
// import { program } from "commander";
// import download from 'download-git-repo'
import { input,select } from '@inquirer/prompts';
import ora from "ora"; //3.4.0 8.1.0
import chalk from 'chalk'
import { execSync }  from 'child_process';
import path from "node:path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import process from 'process'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const log = console.log;

process.on('SIGINT', () => {
  console.log('Received SIGINT. Gracefully shutting down...');

  // 这里可以添加你希望在退出之前执行的清理操作
  // 例如关闭数据库连接、保存状态等
  process.exit(0); // 成功退出，使用 exit code 0 表示正常退出
});
process.on('uncaughtException', (err) => {
  console.error('exit code 1');
  process.exit(1); // 使用非 0 值表示异常退出
});


log(chalk.blue('安装步骤') + ' 开始');

// program
//   .option('-d, --debug', 'output extra debugging')
//   .option('-s, --small', 'small pizza size')
//   .option('-p, --pizza-type <type>', 'flavour of pizza');
// 1. 文件名
const dirName = await input({ message: '请输入文件名!', required: true });

// 2. 选择模板
const templateType = await select({
  message: '请选择模板>',
  choices: [
    {
      name: 'default(h5)',
      value: 'default',
      description: '',
    },]
})

// 3. 开启loading
const spinner = ora('downloading template...').start();


// 仅限于公共仓库代码拉取
// download('github/******', dirName,{}, (err: any) => {
//   console.log('download', err);
// 	spinner.succeed('成功')
// })


// 4. 克隆仓库(此方式可用户下载私有仓库)
  const templateH5 = `https://github.com/**/**`
  const targetPath = path.join(process.cwd(), dirName)
  execSync(`git clone ${templateH5} ${targetPath}`, {
    stdio: [0, 1, 2],
  })

  process.chdir(targetPath);

//5. 删除.git目录
  const dirToDelete = path.join(targetPath, '.git');
  fs.rmSync(dirToDelete, { recursive: true, force: true }); // 递归删除文件夹及其内容

  spinner.succeed('模板下载成功!')
// 提示需要进入目录进行pnpm
log(chalk.blue('cd ') + chalk.green(`./${dirName}`) + chalk.blue(' && pnpm install'));

```

##### rollup配置
```js
import resolve from '@rollup/plugin-node-resolve'
import path from 'node:path'
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';
import process from 'node:process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const env = process.env.NODE_ENV
console.log('env', env)

const config = {
  // 入口
  // input: path.join('../src/index.ts'),
  input: path.resolve(__dirname, '../src/index.ts'),
  output:  [
    // {
    //   file: 'dist/index.cjs.js',
    //     format: 'cjs',
    // },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true // 生成 sourcemap 文件
    }
  ],
  plugins: [typescript(), babel({
    babelHelpers: 'bundled',
    // 过滤文件
    exclude: "node_modules/**",
  }),commonjs(), resolve({preferBuiltins: true,}), json()],
  external: ['electron'],
}
if (env === 'production') {
  config.plugins.push(terser({
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      warnings: false
    }
  }))
}
export default config
```

##### package.json配置
```json
{
  "name": "vf-template",
  "version": "1.0.1",
  "description": "",
  "author": "wangtao <skymrwt@gmail.com>",
  "main": "index.js",
  "bin": {
    "vf-template": "./dist/index.esm.js"
  },
  "type": "module",
  "scripts": {
    "test": "node ./__tests__/vf-common.test.js",
    "build:dev": "cross-env NODE_ENV=development rollup  -c ./config/rollup.config.js",
    "build": "cross-env NODE_ENV=production rollup  -c ./config/rollup.config.js",
    "start": "cross-env NODE_ENV=development rollup -w -c ./config/rollup.config.js",
    "prepublishOnly": "pnpm build"
  },
  "files": [
    "dist"
  ],
  "keywords": [],
  "license": "ISC",
  "devDependencies": {
    "@rollup/plugin-json": "^6.1.0",
    "@types/commander": "^2.12.2",
    "@types/inquirer": "^9.0.7",
    "rollup": "^4.21.2"
  },
  "dependencies": {
    "@inquirer/prompts": "^5.3.8",
    "@rollup/plugin-babel": "^6.0.4",
    "@rollup/plugin-commonjs": "^26.0.1",
    "@rollup/plugin-node-resolve": "^15.2.3",
    "@rollup/plugin-terser": "^0.4.4",
    "commander": "^12.1.0",
    "cross-env": "^7.0.3",
    "download-git-repo": "^3.0.2",
    "electron": "^32.0.1",
    "inquirer": "^10.1.8",
    "ora": "5.4.1",
    "rollup-plugin-typescript2": "^0.36.0",
    "chalk": "^4.1.2"
  }
}
```
