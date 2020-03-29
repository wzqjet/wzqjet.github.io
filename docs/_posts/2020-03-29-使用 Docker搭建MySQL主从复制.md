---
category: MySQL
tags:
  - MySQL 主从复制 Dokcer
date: 2020-03-29
title: 使用Docker搭建MySQL主从复制
lang: zh-CN

---

## 使用Docker搭建MySQL主从复制

<!-- more -->

### 1、下载MySQL镜像

我这里直接下载最新版本镜像，版本8.0

```bash
docker pull mysql
```

### 2、创建容器

使用`mysql`镜像创建两个容器，主从分别对应`33061`和`33062`端口

```bash
docker run -p 33061:3306 --name mysql-master -e MYSQL_ROOT_PASSWORD=xxxxxxx -d mysql
docker run -p 33062:3306 --name mysql-slave -e MYSQL_ROOT_PASSWORD=xxxxxxx -d mysql
```

### 3、修改MySQL配置文件

```bash
#查看正在运行的所有容器
docker ps
#分别进入主从MySQL容器
docker exec -it 146ff0765304 /bin/bash
cd /etc/mysql/conf.d/
#vim需要手动安装
vim mysql.cnf
```

修改MySQL配置文件

- 主服务器配置

  ```cnf
  [mysqld]
  ## 设置server_id
  server-id=100
  log-bin=mysql-bin
  ```

- 从服务器配置

  ```cnf
  [mysqld]
  ## 设置server_id,注意要唯一
  server-id=101  
  ## 开启二进制日志功能，以备Slave作为其它Slave的Master时使用
  log-bin=mysql-slave-bin   
  ## relay_log配置中继日志
  relay_log=edu-mysql-relay-bin
  ```

### 4、重启容器

```bash
# 重启主从容器 我这边只写了一个
docker restart 146ff0765304
```

### 5、使用Navicat连接数据库

- 使用客户端连接主从数据库，也可直接在服务器用命令行连接

![](https://i.loli.net/2020/03/29/4C6XYKhwUvaAceP.png)

- 设置主数据库

  新建查询

  ```sql
  -- 创建数据同步用户
  CREATE USER 'reader'@'%' IDENTIFIED BY 'xxxxxxxx';
  -- 授予权限
  GRANT REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'reader'@'%';
  ```

  再执行`SHOW MASTER STATUS`语句查看File和Position字段，记录备用

  ![](https://i.loli.net/2020/03/29/UPvS1JQpEIwYtA6.png)

- 设置从数据库

  新建查询

  ```sql
  -- 设置主节点为33061对应的数据库
  -- MASTER_HOST为服务器内部IP
  CHANGE MASTER TO MASTER_HOST = '192.168.0.229',
  MASTER_USER = 'reader',
  MASTER_PASSWORD = 'xxxxxxxx',
  MASTER_PORT = 33061,
  MASTER_LOG_FILE = 'mysql-bin.000001',
  MASTER_LOG_POS = 155;
  -- 开启从节点
  START SLAVE
  -- 查看从节点状态
  SHOW SLAVE STATUS
  ```

  以下两个状态为Yes即设置成功

  ![](https://i.loli.net/2020/03/29/VoR2B1XkGSmlyOe.png)

### 6、验证

- 在主节点新建数据库test

![](https://i.loli.net/2020/03/29/eICDzOpqZiN48KM.png)

- 主节点成功建立数据库test

![](https://i.loli.net/2020/03/29/9FUQZtXqdRvrcsi.png)

- 从节点也一样建立了test库

  ![](https://i.loli.net/2020/03/29/f6OA2Zk7nMG8caN.png)