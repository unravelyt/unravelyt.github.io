"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[1243],{1477:(s,i,a)=>{a.r(i),a.d(i,{comp:()=>h,data:()=>p});var n=a(6254);const l={},h=(0,a(1021).A)(l,[["render",function(s,i){return(0,n.uX)(),(0,n.CE)("div",null,i[0]||(i[0]=[(0,n.Fv)('<p>CountDownLatch用于主线程和子线程协同配合，常用2种使用方式：</p><ol><li>主线程等待所有的子线程完成任务后再执行；</li><li>所有的子线程准备，等待主线程发令执行；</li></ol><h2 id="用法一-主线程等子线程" tabindex="-1"><a class="header-anchor" href="#用法一-主线程等子线程"><span>用法一：主线程等子线程</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">private</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> static</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> void</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> m2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> throws InterruptedException </span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">    CountDownLatch</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> countDownLatch2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> CountDownLatch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">    for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> i</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> -&gt;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">            try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">                String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> name</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">currentThread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getName</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">子线程</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> name </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">执行任务中...</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sleep</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1000</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> ThreadLocalRandom</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">current</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">nextInt</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">2000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">));</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">子线程</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;"> name </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">完成任务</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                countDownLatch2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">countDown</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">            }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> (</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">InterruptedException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">)</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> {</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">                e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">printStackTrace</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">            }</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }).</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">    }</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">主线程等待中....</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    countDownLatch2</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">await</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 主线程在阻塞，当计数器==0，就唤醒主线程往下执行。</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">主线程:在所有任务运行完成后，进行结果汇总</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>子线程Thread-0执行任务中...</span></span>\n<span class="line"><span>子线程Thread-2执行任务中...</span></span>\n<span class="line"><span>主线程等待中....</span></span>\n<span class="line"><span>子线程Thread-1执行任务中...</span></span>\n<span class="line"><span>子线程Thread-3执行任务中...</span></span>\n<span class="line"><span>子线程Thread-4执行任务中...</span></span>\n<span class="line"><span>子线程Thread-1完成任务</span></span>\n<span class="line"><span>子线程Thread-0完成任务</span></span>\n<span class="line"><span>子线程Thread-3完成任务</span></span>\n<span class="line"><span>子线程Thread-2完成任务</span></span>\n<span class="line"><span>子线程Thread-4完成任务</span></span>\n<span class="line"><span>主线程:在所有任务运行完成后，进行结果汇总</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="用法二-所有子线程准备-等待主线程发令执行" tabindex="-1"><a class="header-anchor" href="#用法二-所有子线程准备-等待主线程发令执行"><span>用法二：所有子线程准备，等待主线程发令执行</span></a></h2><div class="language-java line-numbers-mode" data-ext="java" data-title="java"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">CountDownLatch</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> countDownLatch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;"> new</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;"> CountDownLatch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">for</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span></span>\n<span class="line"><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">int</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> i</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 0</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">&lt;</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;"> 5</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">i</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">++</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        new</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(()</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> -&gt;{</span></span>\n<span class="line"><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">        try</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">{</span></span>\n<span class="line"><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">        //准备完毕……运动员都阻塞在这，等待号令</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        countDownLatch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">await</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">String</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> parter</span><span style="--shiki-light:#999999;--shiki-dark:#666666;"> =</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">【</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;"> Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">currentThread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">().</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">getName</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">()</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;"> +</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;"> &quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">】</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">;</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">            System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">parter </span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">开始执行……</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span><span style="--shiki-light:#1E754F;--shiki-dark:#4D9375;">catch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">InterruptedException </span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">){</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">        e</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">printStackTrace</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">                }).</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">start</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">    System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">创建线程时间：</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#AB5959;--shiki-dark:#CB7676;">+</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">LocalDateTime</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">now</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">());</span></span>\n<span class="line"><span style="--shiki-light:#999999;--shiki-dark:#666666;">        }</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">        System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">裁判准备发令</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">3</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sleep</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">2</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sleep</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">System</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span><span style="--shiki-light:#B07D48;--shiki-dark:#BD976A;">out</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">println</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#B56959;--shiki-dark:#C98A7D;">1</span><span style="--shiki-light:#B5695977;--shiki-dark:#C98A7D77;">&quot;</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">Thread</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">sleep</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">(</span><span style="--shiki-light:#2F798A;--shiki-dark:#4C9A91;">1000</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">);</span></span>\n<span class="line"><span style="--shiki-light:#393A34;--shiki-dark:#DBD7CAEE;">countDownLatch</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">.</span></span>\n<span class="line"></span>\n<span class="line"><span style="--shiki-light:#59873A;--shiki-dark:#80A665;">countDown</span><span style="--shiki-light:#999999;--shiki-dark:#666666;">();</span><span style="--shiki-light:#A0ADA0;--shiki-dark:#758575DD;">// 发令枪：执行发令</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果：</p><div class="language-plain line-numbers-mode" data-ext="plain" data-title="plain"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>创建线程时间：2022-03-06T19:12:55.077911700</span></span>\n<span class="line"><span>创建线程时间：2022-03-06T19:12:55.077911700</span></span>\n<span class="line"><span>创建线程时间：2022-03-06T19:12:55.077911700</span></span>\n<span class="line"><span>创建线程时间：2022-03-06T19:12:55.077911700</span></span>\n<span class="line"><span>创建线程时间：2022-03-06T19:12:55.077911700</span></span>\n<span class="line"><span>裁判准备发令</span></span>\n<span class="line"><span>3</span></span>\n<span class="line"><span>2</span></span>\n<span class="line"><span>1</span></span>\n<span class="line"><span>【Thread-0】开始执行……</span></span>\n<span class="line"><span>【Thread-2】开始执行……</span></span>\n<span class="line"><span>【Thread-4】开始执行……</span></span>\n<span class="line"><span>【Thread-1】开始执行……</span></span>\n<span class="line"><span>【Thread-3】开始执行……</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ps:</p><ul><li>CountDownLatch的作用就是允许一个或多个线程等待其他线程完成操作，看起来有点类似join()方法，但其提供了比join()更加灵活的API。</li><li>CountDownLatch可以手动控制在n个线程里调用n次countDown()方法使计数器进行减一操作，也可以在一个线程里调用n次执行减一操作。</li><li>Thread.join() 当我们调用某个线程的这个方法时，这个方法会挂起调用线程，直到被调用线程结束执行，调用线程才会继续执行。</li></ul>',12)]))}]]),p=JSON.parse('{"path":"/note_java/w85d9xfa/","title":"CountDownLatch使用","lang":"zh-CN","frontmatter":{"title":"CountDownLatch使用","createTime":"2024/11/05 16:06:15","permalink":"/note_java/w85d9xfa/","description":"CountDownLatch用于主线程和子线程协同配合，常用2种使用方式： 主线程等待所有的子线程完成任务后再执行； 所有的子线程准备，等待主线程发令执行； 用法一：主线程等子线程 运行结果： 用法二：所有子线程准备，等待主线程发令执行 运行结果： ps: CountDownLatch的作用就是允许一个或多个线程等待其他线程完成操作，看起来有点类似jo...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_java/w85d9xfa/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"CountDownLatch使用"}],["meta",{"property":"og:description","content":"CountDownLatch用于主线程和子线程协同配合，常用2种使用方式： 主线程等待所有的子线程完成任务后再执行； 所有的子线程准备，等待主线程发令执行； 用法一：主线程等子线程 运行结果： 用法二：所有子线程准备，等待主线程发令执行 运行结果： ps: CountDownLatch的作用就是允许一个或多个线程等待其他线程完成操作，看起来有点类似jo..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-11T10:56:43.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-11T10:56:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"CountDownLatch使用\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-11T10:56:43.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"用法一：主线程等子线程","slug":"用法一-主线程等子线程","link":"#用法一-主线程等子线程","children":[]},{"level":2,"title":"用法二：所有子线程准备，等待主线程发令执行","slug":"用法二-所有子线程准备-等待主线程发令执行","link":"#用法二-所有子线程准备-等待主线程发令执行","children":[]}],"readingTime":{"minutes":2.28,"words":683},"git":{"createdTime":1730863308000,"updatedTime":1731322603000,"contributors":[{"name":"banxia","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_java/20.thread/CountDownLatch使用.md","bulletin":false}')}}]);