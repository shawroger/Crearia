# 入门 

> a light library to post ajax

Crearia是一个轻量的Ajax方法库

拥有极少的API和简单易操作的特性

# 快速上手

Crearia的操作十分简单，完整的文件也只有70行，但拥有Ajax的所有功能

## 安装模块

```CMD
npm install crearia --save
```

也可以直接在浏览器内引入

```HTML
<script type="text/javascript" src="./crearia.js"></script>
```

## 在vue中使用

我们不推荐在vue全局上绑定Crearia，因为Crearia作为一个小插件，更适合与绑定在单个模块上。

```javascript
import Crearia from 'crearia'
export default {
		data() {
			return {
				crearia: Crearia
			}
		},
}

```

# 基本教程

> Crearia只有一个方法 **Crearia.ajax**

在**Crearia.ajax**中需要传入一个对象即可，你将获得一个回调函数。

Crearia传入对象的基本参数：

* url
* get
* post
* random

## url参数

接受一个目标地址，Ajax请求将发送到该地址处。

## get参数

接受一个对象，Crearia在发送Ajax时会把该对象的数据直接绑定到url上。

```javascript
Crearia.ajax({
	url: 'example.website',
	get: {param: 'value'},
	},(res)=>{});

```

Crearia会直接发起一个指向 **http://example.website?param=value** 地址的请求。

## post参数

接受一个对象，Crearia在发送Ajax时会把该对象的数据以post形式发送。

> get参数和post参数可以同时发送，其中Crearia在发送Ajax时会把get对象的数据直接绑定到url上，而把post在header中发送。

## random参数

random参数会在get参数之后附加一个随机参数，以强制地址发生刷新。

random参数也是一个对象，只有**name**和**digit**参数。

* random.name 是一个字符串，作为随机参数的参数名。

* random.digit 是一个整数，作为随机参数随机值的数位。