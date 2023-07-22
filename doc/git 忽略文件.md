## 1、.gitignore 禁用当前目录下指定文件的提交

要在`.gitignore`文件中禁止提交当前目录下的所有 `package-lock.json` 文件，您可以按照以下步骤进行操作：

1. 在项目根目录下找到或创建`.gitignore`文件。

2. 在`.gitignore`文件中添加以下内容：

```
**/package-lock.json
```

这将匹配项目中所有目录下的`package-lock.json`文件，并禁止它们被提交到Git版本控制。

3. 保存`.gitignore`文件。

现在，当您执行Git提交操作时，Git将忽略匹配`**/package-lock.json`模式的文件，从而禁止提交它们。

请注意，`.gitignore`文件对于新的未跟踪文件才有效。如果您之前已经将`package-lock.json`文件提交到版本控制中，您需要先将它们从Git历史记录中移除，然后再应用`.gitignore`规则。可以使用以下命令将它们从Git历史记录中移除：

```shell
git rm --cached **/package-lock.json
```

然后，将更改提交到版本控制：

```shell
git commit -m "Remove package-lock.json files from Git history"
```

这样，`.gitignore`文件中指定的规则将开始生效，并且`package-lock.json`文件将不再被提交到版本控制中。