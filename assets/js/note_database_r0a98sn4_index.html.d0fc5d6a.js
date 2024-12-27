"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[9513],{3373:(s,i,a)=>{a.r(i),a.d(i,{comp:()=>e,data:()=>t});var n=a(6254);const l={},e=(0,a(1021).A)(l,[["render",function(s,i){return(0,n.uX)(),(0,n.CE)("div",null,i[0]||(i[0]=[(0,n.Fv)('<h2 id="_1-mysql" tabindex="-1"><a class="header-anchor" href="#_1-mysql"><span>1. MySQL</span></a></h2><p>MySQL数据库只需要在目标字段上添加<strong>AUTO_INCREMENT</strong>，并且为表设置<strong>AUTO_INCREMENT=x</strong>。 <strong>x</strong>：自增开始的数字。</p><p>参考示例：</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">CREATE</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> TABLE</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> `</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">dictionary</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">` (</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">id</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">10</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) unsigned </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">NOT NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> AUTO_INCREMENT COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">ID</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">parent_id</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> int</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">10</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) unsigned </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">NOT NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">父ID</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">type</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> varchar</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">50</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">NOT NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">元数据类型</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">item_name</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> varchar</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">100</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">NOT NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">元数据项显示名</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">item_value</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> varchar</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">100</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">DEFAULT</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">元数据项存储值</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">comment</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> varchar</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">200</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">DEFAULT</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NULL</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">备注</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">deleted</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> tinyint</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) </span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">NOT NULL</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> DEFAULT</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">0</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">删除标记</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">  `</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">create_time</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> timestamp</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> NOT NULL</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> DEFAULT</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> CURRENT_TIMESTAMP COMMENT </span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">创建时间</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">,</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">  PRIMARY KEY</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> (</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">id</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">`</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">)</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">) ENGINE</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">InnoDB AUTO_INCREMENT</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> DEFAULT</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> CHARSET</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">utf8 COMMENT</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">=</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">数据字典</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&#39;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-oracle" tabindex="-1"><a class="header-anchor" href="#_2-oracle"><span>2. Oracle</span></a></h2><p>Oracle数据库常用的设置自增字段的两种方法：</p><ol><li>创建SEQUENCE</li><li>IDENTITY，要求Oracle数据库版本是12c或以上</li></ol><p>12c版本示例：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>create table &quot;dictionary&quot; (</span></span>\n<span class="line"><span>   &quot;id&quot;                 INTEGER  generated as identity ( start with 1 nocycle noorder)  not null,</span></span>\n<span class="line"><span>   &quot;parent_id&quot;          INTEGER               not null,</span></span>\n<span class="line"><span>   &quot;type&quot;               VARCHAR2(50)          not null,</span></span>\n<span class="line"><span>   &quot;item_name&quot;          VARCHAR2(100)         not null,</span></span>\n<span class="line"><span>   &quot;item_value&quot;         VARCHAR2(100),</span></span>\n<span class="line"><span>   &quot;comment&quot;            VARCHAR2(200),</span></span>\n<span class="line"><span>   &quot;deleted&quot;            SMALLINT             default 0  not null,</span></span>\n<span class="line"><span>   &quot;create_time&quot;        TIMESTAMP            default CURRENT_TIMESTAMP  not null,</span></span>\n<span class="line"><span>   constraint &quot;PK_dictionary&quot; primary key (&quot;id&quot;)</span></span>\n<span class="line"><span>);</span></span>\n<span class="line"><span>1234567891011</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>11g版本示例：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>-- 建表</span></span>\n<span class="line"><span>create table &quot;dictionary&quot; (</span></span>\n<span class="line"><span>   &quot;id&quot;                 INTEGER               not null,</span></span>\n<span class="line"><span>   &quot;parent_id&quot;          INTEGER               not null,</span></span>\n<span class="line"><span>   &quot;type&quot;               VARCHAR2(50)          not null,</span></span>\n<span class="line"><span>   &quot;item_name&quot;          VARCHAR2(100)         not null,</span></span>\n<span class="line"><span>   &quot;item_value&quot;         VARCHAR2(100),</span></span>\n<span class="line"><span>   &quot;comment&quot;            VARCHAR2(200),</span></span>\n<span class="line"><span>   &quot;deleted&quot;            SMALLINT             default 0  not null,</span></span>\n<span class="line"><span>   &quot;create_time&quot;        TIMESTAMP            default CURRENT_TIMESTAMP  not null,</span></span>\n<span class="line"><span>   constraint &quot;PK_dictionary&quot; primary key (&quot;id&quot;)</span></span>\n<span class="line"><span>);</span></span>\n<span class="line"><span>-- 创建序列</span></span>\n<span class="line"><span>CREATE SEQUENCE DICTIONARY_ID_SEQ</span></span>\n<span class="line"><span>INCREMENT BY 1</span></span>\n<span class="line"><span>START WITH 1;</span></span>\n<span class="line"><span>-- 创建触发器，非必须</span></span>\n<span class="line"><span>CREATE OR REPLACE TRIGGER DICTIONARY_ID_SEQ_TRG</span></span>\n<span class="line"><span>BEFORE INSERT ON &quot;dictionary&quot;</span></span>\n<span class="line"><span>FOR EACH ROW</span></span>\n<span class="line"><span>WHEN (NEW.&quot;id&quot; IS NULL)</span></span>\n<span class="line"><span>BEGIN</span></span>\n<span class="line"><span>  SELECT DICTIONARY_ID_SEQ.NEXTVAL</span></span>\n<span class="line"><span>  INTO :NEW.&quot;id&quot;</span></span>\n<span class="line"><span>  FROM DUAL;</span></span>\n<span class="line"><span>END;</span></span>\n<span class="line"><span>1234567891011121314151617181920212223242526</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-mssql" tabindex="-1"><a class="header-anchor" href="#_3-mssql"><span>3. MsSQL</span></a></h2><p>MsSQL即SQL Server数据库，使用<strong>IDENTITY</strong>即可。</p><p>参考示例：</p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>create table dictionary (</span></span>\n<span class="line"><span>   id                   int                  identity,</span></span>\n<span class="line"><span>   parent_id            int                  not null,</span></span>\n<span class="line"><span>   type                 varchar(50)          not null,</span></span>\n<span class="line"><span>   item_name            varchar(100)         not null,</span></span>\n<span class="line"><span>   item_value           varchar(100)         null,</span></span>\n<span class="line"><span>   comment              varchar(200)         null,</span></span>\n<span class="line"><span>   deleted              smallint             not null default 0,</span></span>\n<span class="line"><span>   create_time          datetime             not null default CURRENT_TIMESTAMP,</span></span>\n<span class="line"><span>   constraint PK_dictionary primary key (id)</span></span>\n<span class="line"><span>);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>',15)]))}]]),t=JSON.parse('{"path":"/note_database/r0a98sn4/","title":"创建递增序列","lang":"zh-CN","frontmatter":{"title":"创建递增序列","createTime":"2024/11/17 01:18:53","permalink":"/note_database/r0a98sn4/","description":"1. MySQL MySQL数据库只需要在目标字段上添加AUTO_INCREMENT，并且为表设置AUTO_INCREMENT=x。 x：自增开始的数字。 参考示例： 2. Oracle Oracle数据库常用的设置自增字段的两种方法： 创建SEQUENCE IDENTITY，要求Oracle数据库版本是12c或以上 12c版本示例： 11g版本示例：...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_database/r0a98sn4/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"创建递增序列"}],["meta",{"property":"og:description","content":"1. MySQL MySQL数据库只需要在目标字段上添加AUTO_INCREMENT，并且为表设置AUTO_INCREMENT=x。 x：自增开始的数字。 参考示例： 2. Oracle Oracle数据库常用的设置自增字段的两种方法： 创建SEQUENCE IDENTITY，要求Oracle数据库版本是12c或以上 12c版本示例： 11g版本示例：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-27T10:04:03.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-27T10:04:03.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"创建递增序列\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-27T10:04:03.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1. MySQL","slug":"_1-mysql","link":"#_1-mysql","children":[]},{"level":2,"title":"2. Oracle","slug":"_2-oracle","link":"#_2-oracle","children":[]},{"level":2,"title":"3. MsSQL","slug":"_3-mssql","link":"#_3-mssql","children":[]}],"readingTime":{"minutes":1.39,"words":416},"git":{"createdTime":1735120084000,"updatedTime":1735293843000,"contributors":[{"name":"banxia","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_database/2.MySQL/创建递增序列.md","bulletin":false}')}}]);