# Git

## 版本控制系统

版本控制系统（Version Control System，VCS），提供完备的版本管理功能，用于记录目录、文件的修改历史，以便将来查阅特定版本修订情况。有了版本控制系统，就不用担心文件丢失，错误修改文件等情况，而且可以回到历史记录的某个时刻。

**特点：**

- 记录历史版本信息
- 协同开发

---

**集中式版本控制系统**

- 代表：SVN、CVS 

- 特点：都有一个单一的集中管理的服务器，用于保存所有文件的修订版本，而协同工作的人员都通过客户端连到这台服务器，取出最新的文件或者提交更新

- 弊端：

  - 需要联网
  - 中央服务器一旦出错，所有数据都会丢失
  - 由于是文件传输，所以上传和下载的速度很慢
  
- 原理图：

  <img src="E:\HTML源代码\imagesrc\version1.png" style="zoom:50%;" />

---

**分布式版本控制系统**

- 代表：Git、Mercurial

- 特点：客户端并不是提取最新版本的文件快照，而是把代码仓库完整地镜像下来。当服务器发生故障时，可以用任何一个镜像出来的本地仓库恢复

- 原理图：

  <img src="E:\HTML源代码\imagesrc\version2.png" style="zoom: 67%;" />

---



## Git 概述

Git 是一个开源的分布式版本控制系统（工具、软件）。分布式相比集中式的最大区别是 Git 没有“中央版本库”，每一位开发者都可以通过克隆远程仓库，在本地机器上初始化一个完整的代码版本，开发者可以把代码的修改提交到本地仓库，也可以把本地仓库同步到远程仓库。

**特点：**

- 支持离线操作（不用联网）
- 适合分布式开发、强调个体

---



## 工作流程

**Git 结构：**

- 工作区（working Directory）：项目目录
- 暂存区（Stage）：用于临时存储
- 版本库|本地库（Repository）：用于记录历史版本，就是工作区中的隐藏目录.git

<img src="E:\HTML源代码\imagesrc\timg.jpg" style="zoom: 67%;" />

---



## 配置

Git 的配置文件为 .gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。用于提交到本地库时记录的用户信息。

```shell
$ git config [--global] -l									# 显示当前的 Git 配置

$git config user.name "xxx"									# 当前用户（项目配置）
$git config user.email "x@x.x"

$ git config --global user.name "xxx"				# 系统用户（全局配置）
$ git config --global user.email "x@x.x"
```

---



## 基本操作

- 初始化

  ```shell
  $ git init															# 在当前目录新建一个本地仓库
  ```

- 暂存区

  ```shell
  $ git add .															# 添加当前目录的所有文件到暂存区
  $ git add <file>												# 添加指定文件到暂存区
  $git rm --cached <file>									# 移除暂存区的指定文件 需要再次 add
  ```

- 本地库（每提交一次，就会生成一次版本）

  ```shell
  $ git commit -m "commit description"		# 提交暂存区到本地库
  $ git commit -m "desc" <file>						# 提交暂存区的指定文件到本地库
  ```

- 查看信息

  ```shell
  $ git status														# 显示文件状态，红色：工作区/绿色：暂存区/空：本地库
  $ git log																# 显示当前分支的版本历史
  $ git reflog														# 显示当前分支的提交历史（含版本号）
  $ git diff [<file>]											# 显示工作区和暂存区的[文件]代码差异
  $ git diff HEAD [<file>]								# 显示工作区和本地库最新版本的[文件]代码差异
  $ git 
  ```

- 撤销

  ```shell
  $ git checkout <file>										# 恢复暂存区的指定文件到工作区
  $ git checkout .												# 恢复暂存区的所有文件到工作区
  
  $ git reset	--hard [commitid]						# 移动当前分支的HEAD指针指向commit，同时重置暂存区																				   和工作区为commit版本。通过reflog查看commitid
  $ git reset --hard HEAD^								# 根据log信息，HEAD指向上一个版本，同上
  $ git reset --hard											# 重置暂存区与工作区，与上一次commit保持一致
  ```

---



## 远程仓库

**Git 代码托管中心（远程仓库）：**

- 局域网下
  - GitLab（需要配置服务器）
- 外网下
  - GitHub
  - Gitee（码云）

---



### 命令

- 链接远程仓库

  ```shell
  $ git remote <-v>												# 显示所有远程仓库
  $ git remote add origin [https/ssh地址]	 # 增加一个新的远程仓库连接，并命名，常用origin
  $ git remote rm origin									# 移除指定的远程仓库
  ```

- 推送和拉取

  ```shell
  $ git push [-u] origin master						# -u表示第一次推送master分支所有内容，并把本地																						master分支和远程master分支关联起来，以后可简化命令
  $ git pull origin master								# master分支合并拉取的新内容，pull=fetch+merge
  ```

- 克隆

  ```shell
  $ git clone	[远程库地址]									 # 克隆项目和它的版本历史，=init+remote+pull
  ```

---



### HTTPS/SSH 协议

GitHub 仓库默认其他人只可以克隆和拉取代码，但不能推送。仓库拥有者可以邀请其他人加入团队。这样一来，除了拥有者，加入者也具有推送权限。

---

**推送方式取决于连接远程库的地址是：**

- HTTPS 地址：**所有人每次推送都必须输入账户密码，用于验证提交者的身份**。但由于 Windows 凭据管理器已						经存储了账户密码（每个人只要输入一次，之后就不再需要），这也意味着，如果要推送到其						他的远程仓库，就必须删除该票据。

- SSH地址：可直接推送，GitHub 利用公钥来验证提交者身份

  - 创建SSH Key，`id_rsa`是私钥，`id_rsa.pub`是公钥

    ```shell
    $ ssh-keygen -t rsa -C "GitHub用户邮箱"			# 生成.ssh目录，有id_rsa和id_rsa.pub文件
    ```

  - 在 GitHub 用户页面中添加公钥

---



### 团队协作

- 接受邀请
- 本地克隆远程分支（master 分支）

- 本地只有一个分支master，新建dev分支并切换，在dev分支进行开发工作

- 开发完就可以合并到主分支master
- 使用`git pull origin master`命令查看远程分支是否更新过
  - 是，解决合并冲突，并在本地提交，再推送
  - 否，用`git push origin master `推送到远程分支

---



### 跨团队协作

- fork 别人的仓库
- 本地克隆远程分支（master 分支），创建新分支、添加功能、合并分支
- 推送到远程仓库
- 发起 pull request（拉取请求）
- 别人同意后，就会合并代码（就是在GitHub提交）

---



## 分支管理

在版本控制过程中，可以使用多条线同时推进多个任务。==Git 分支管理的实质是创建和移动指针。==

### 概述

- Git 把每次提交的版本串成一条线，这条线就是一个分支

- **分支的实质是指针。创建分支时，Git 会创建对应的指针（分支名就是指针名），切换分支时，就是改变 HEAD 指针的指向**

- **HEAD 指向的分支（指针）叫做当前分支，还指向当前版本，版本都是提交到当前分支的**

- 在初始化后就存在`master`主分支， HEAD 默认指向 master ，版本会提交到 master 分支，`master`指针自动指向最新提交的版本

  <img src="E:\HTML源代码\imagesrc\0.png" style="zoom:67%;" />

---



### 创建/合并分支

- 创建分支`dev`时，Git 新建一个指针叫`dev`，指向`master`相同的提交点，把当前分支切换到 `dev` 分支时，就是把`HEAD`指向`dev`（log命令输出和master版本一致，可看做新创建的分支默认含有当前分支的所有版本）

  <img src="E:\HTML源代码\imagesrc\l.png" style="zoom: 67%;" />

- 此时提交就是针对`dev`分支了，当提交一次后，`dev`指针往前移动一步，而`master`指针不变

  <img src="E:\HTML源代码\imagesrc\l2.png" style="zoom:67%;" />

- 切换当前分支为 master，再把`master`指向`dev`的当前提交，就可以把`dev`合并到`master`主分支，然后可以删掉 `dev` 分支

  <img src="E:\HTML源代码\imagesrc\00.png" style="zoom:67%;" />

  <img src="E:\HTML源代码\imagesrc\01.png" style="zoom:67%;" />

---



### 解决冲突

- 当不同分支上的版本存在同一个文件被修改时

<img src="E:\HTML源代码\imagesrc\11.png" style="zoom:67%;" />

- 使用 `merge`合并就会产生冲突，需要手动修改文件，然后再提交

  <img src="E:\HTML源代码\imagesrc\12.png" style="zoom:67%;" />

---



### 分支策略

在实际开发中，`master`分支应该是非常稳定的，仅用来发布新版本，平时不能在上面干活；

干活都在新建的分支上，比如`dev`分支，也就是说，`dev`分支是不稳定的。当完成工作时，再把`dev`分支合并到`master`上，在`master`分支发布新版本版本；

团队中每个人都在`dev`分支上干活，每个人都有自己的分支。如果需要开发一个新功能，就在 `dev` 创建一个新的分支，功能完成再往`dev`分支上合并就可以了。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200210145331687.png" alt="image-20200210145331687" style="zoom:67%;" />

---



### 命令

```shell
$ git branch															# 显示本地库所有分支
$ git branch -r														# 显示远程库所有分支
$ git branch <banchname>									# 创建分支
$ git branch -d <branchname>							# 删除分支
$ git push origin --delete [branchname]		# 删除远程分支
$ git switch <branchname>									# 切换分支
$ git merge <otherbranch>									# 将指定分支合并到当前分支，存在冲突时不能使用
```

---



## 其他

### GIT / SVN

- GIT 是分布式的（提交到本地），SVN 是集中式的（提交到服务器）

- GIT 把内容按元数据方式存储，SVN 是按文件
- Git 分支和 SVN 的分支不同
- Git 没有一个全局的版本号，而 SVN 有（这是 Git 缺少的最大的一个特征）
- Git 的内容完整性要优于 SVN

---



### GIT / GitHub

**Git：**是一个安装后就可以在本地使用的版本管理工具（不联网也可以使用）。Git 本身完全可以做到版本控制，		 但其所有内容以及版本记录只能保存在本机，如果想要将文件内容以及版本记录同时保存在远程，则需要结		 合GitHub 来使用。

**GitHub：**是一个基于 Git 的远程文件托管平台，也是一个非常适合程序员交流的网站（最大的开源的托管平台、远程仓库）

**总结：**

- Git 是软件，GitHub 是网站
- Git 是版本控制系统，Github 是基于Git 的在线的代码托管平台

