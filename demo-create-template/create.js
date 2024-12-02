#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import chalk from 'chalk';
import path from 'path';

const createVueProject = async () => {
  // 提示用户输入项目名称
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: '请输入你的项目名称:',
      default: 'demo',
    },
    {
      type: 'list',
      name: 'useTypeScript',
      message: '你想使用 TypeScript 吗?',
      choices: ['Yes', 'No'],
      default: 'Yes',
    }
  ]);

  // 项目目录路径
  const projectPath = path.resolve(answers.projectName);

  // 检查目录是否已经存在
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red('目录已经存在，请选择一个不同的名称。'));
    return;
  }

  // 创建项目文件夹
  fs.ensureDirSync(projectPath);

  // 模板文件内容（你可以根据选择添加不同的模板文件）
  const templateFiles = [
    { name: 'index.html', content: '<!DOCTYPE html>\n<html>\n<head>\n<title>Vue Project</title>\n</head>\n<body>\n<div id="app"></div>\n</body>\n</html>' },
    { name: 'main.js', content: `import { createApp } from 'vue';\nimport App from './App.vue';\n\ncreateApp(App).mount('#app');` },
    { name: 'App.vue', content: `<template>\n  <div>\n    <h1>Hello, Vue!</h1>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'App',\n};\n</script>` },
  ];

  // 根据选择来修改模板文件内容
  if (answers.useTypeScript === 'Yes') {
    templateFiles.push({ name: 'main.ts', content: `import { createApp } from 'vue';\nimport App from './App.vue';\n\ncreateApp(App).mount('#app');` });
  }

  // 创建文件并写入内容
  templateFiles.forEach(file => {
    fs.outputFileSync(path.join(projectPath, file.name), file.content);
  });

  // 复制 package.json 模板，增加依赖
  const packageJson = {
    name: answers.projectName,
    version: '1.0.0',
    scripts: {
      dev: 'vite',
      build: 'vite build',
      serve: 'vite preview',
    },
    dependencies: {
      vue: '^3.2.0',
    },
    devDependencies: {
      vite: '^2.0.0',
    },
  };

  // 如果用户选择了 TypeScript，还需要更新依赖
  if (answers.useTypeScript === 'Yes') {
    packageJson.devDependencies['typescript'] = '^4.0.0';
    packageJson.devDependencies['@vue/compiler-sfc'] = '^3.2.0';
  }

  // 创建并写入 package.json
  fs.outputFileSync(path.join(projectPath, 'package.json'), JSON.stringify(packageJson, null, 2));

  console.log(chalk.green(`Vue 项目 ${answers.projectName} 创建成功！`));
  console.log(`\n步骤：\n1. 进入项目目录: ${chalk.cyan(`cd ${answers.projectName}`)}\n2. 安装依赖: ${chalk.cyan('npm install')}`);
};

createVueProject();
