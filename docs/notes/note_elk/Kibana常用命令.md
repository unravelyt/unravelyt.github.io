---
title: Kibana常用命令
createTime: 2024/11/17 00:41:31
permalink: /note_elk/w7ujpwhs/
---


> 新建一条记录的话就用post
> 更新一条记录的话就用put


## POST和PUT区别

1.更新：PUT会将新的json值完全替换掉旧的；而POST方式只会更新相同字段的值，其他数据不会改变，新提交的字段若不存在则增加。

2.PUT和DELETE操作是幂等的。所谓幂等是指不管进行多少次操作，结果都一样。比如用PUT修改一篇文章，然后在做同样的操作，每次操作后的结果并没有什么不同，DELETE也是一样。

3.POST操作不是幂等的，比如常见的POST重复加载问题：当我们多次发出同样的POST请求后，其结果是创建了若干的资源。

4.创建操作可以使用POST，也可以使用PUT，区别就在于POST是作用在一个集合资源(/articles)之上的，而PUT操作是作用在一个具体资源之上的(/articles/123)。

- put需要精确到某一个资源文件，这样才能进行对数据的更新和创建操作；
- post能对整个资源集合进行操作，如果没有指定具体修改的文件id，那么post指令会自动生成一个唯一的id进行文件的创建，并将数据写入该文件中。如果指定了文件id，那么就会根据填写的参数对数据进行创建和更新操作；


##1. 查看集群的健康情况

GET /_cat/health?v

##2. 查看节点的情况
GET /_cat/nodes?v

##3. 查询各个索引状态
GET /_cat/indices?v

##4. 创建索引
PUT /movie_index

##5. 查看某一个索引的分片情况
GET /_cat/shards/movie_index?v

##6. 删除索引
DELETE /movie_index

##7. 创建文档
```shell
PUT /movie_index/movie/1
{ "id":100,
  "name":"operation red sea",
  "doubanScore":8.5,
  "actorList":[  
  {"id":1,"name":"zhang yi"},
  {"id":2,"name":"hai qing"},
  {"id":3,"name":"zhang han yu"}
  ]
}


PUT /movie_index/movie/2
{
  "id":200,
  "name":"operation meigong river",
  "doubanScore":8.0,
  "actorList":[  
{"id":3,"name":"zhang han yu"}
]
}

PUT /movie_index/movie/3
{
  "id":300,
  "name":"incident red sea",
  "doubanScore":5.0,
  "actorList":[  
{"id":4,"name":"zhang san feng"}
]
}
```

##8. 查询某一个索引中的全部文档
GET /movie_index/_search

##9. 根据id查询某一个文档
GET /movie_index/movie/3

##10. 根据文档id，删除某一个文档
DELETE /movie_index/_doc/3

POST /_forcemerge

##11. put 对已经存在的文档进行替换(幂等性)

```shell
PUT /movie_index/_doc/3
{
  "id":300,
  "name":"incident red sea",
  "doubanScore":5.0,
  "actorList":[  
{"id":4,"name":"zhang cuishan"}
]
}

```

## 12. post 进行新增操作，无法保证幂等性
### 1. 根据主键保证幂等性

```shell
POST /movie_index/_doc/
{
  "id":300,
  "name":"incident red sea",
  "doubanScore":5.0,
  "actorList":[  
{"id":4,"name":"zhang cuishan111"}
]
}


GET /movie_index/_search

GET /movie_index/movie/1

POST /movie_index/movie/1/_update
{
  "doc":  { "name": "新的字段值" }
}

POST /movie_index/_update_by_query
{
	"query": {
	  "match":{
	    "actorList.id":1
	  }  
	},
	"script": {
	  "lang": "painless",
	  "source":"for(int i=0;i<ctx._source.actorList.length;i++){if(ctx._source.actorList[i].id==3){ctx._source.actorList[i].name='tttt'}}"
	}
}


GET /movie_index/_search

POST /movie_index/_delete_by_query
{
  "query": {
    "match_all": {}
  }
}
```


##21. 创建索引，并创建文档

POST movie_test_202010/_doc
{
  "id":"333",
  "name":"zhang3"
}

GET /movie_test_202010-query/_mapping


GET /_cat/templates

GET /_template/template_movie*