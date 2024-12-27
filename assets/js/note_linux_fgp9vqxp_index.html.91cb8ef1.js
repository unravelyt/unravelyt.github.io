"use strict";(self.webpackChunkunravely_blog=self.webpackChunkunravely_blog||[]).push([[8570],{9840:(n,e,s)=>{s.r(e),s.d(e,{comp:()=>l,data:()=>t});var a=s(6254);const i={},l=(0,s(1021).A)(i,[["render",function(n,e){return(0,a.uX)(),(0,a.CE)("div",null,e[0]||(e[0]=[(0,a.Fv)('<h2 id="常见的网络连接方式" tabindex="-1"><a class="header-anchor" href="#常见的网络连接方式"><span>常见的网络连接方式：</span></a></h2><h3 id="_1、nat-network-address-translation-网络地址转换" tabindex="-1"><a class="header-anchor" href="#_1、nat-network-address-translation-网络地址转换"><span>1、NAT （Network Address Translation，网络地址转换）</span></a></h3><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>Guest访问网络的所有数据都是由主机提供的，Guest并不真实存在于网络中，主机与网络中的任何机器都不能查看和访问到Guest的存在。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>Guest可以访问主机能访问到的所有网络，但是对于主机以及主机网络上的其他机器，Guest又是不可见的，甚至主机也访问不到Guest。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与主机的关系：只能单向访问，虚拟机可以通过网络访问到主机，主机无法通过网络访问到虚拟机。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与网络中其他主机的关系：只能单向访问，虚拟机可以访问到网络中其他主机，其他主机不能通过网络访问到虚拟机。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与虚拟机的关系：相互不能访问，虚拟机与虚拟机各自完全独立，相互间无法通过网络访问彼此。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2、bridged-adapter-网桥模式" tabindex="-1"><a class="header-anchor" href="#_2、bridged-adapter-网桥模式"><span>2、Bridged Adapter（网桥模式）</span></a></h3><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>它是通过主机网卡，架设了一条桥，直接连入到网络中了。因此，它使得虚拟机能被分配到一个网络中独立的IP，所有网络功能完全和在网络中的真实机器一样。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>网桥模式下的虚拟机，你把它认为是真实计算机就行了。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与主机的关系：可以相互访问，因为虚拟机在真实网络段中有独立IP，主机与虚拟机处于同一网络段中，彼此可以通过各自IP相互访问。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机于网络中其他主机的关系：可以相互访问，同样因为虚拟机在真实网络段中有独立IP，虚拟机与所有网络其他主机处于同一网络段中，彼此可以通过各自IP相互访问。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与虚拟机的关系：可以相互访问，原因同上。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3、internal-内网模式" tabindex="-1"><a class="header-anchor" href="#_3、internal-内网模式"><span>3、Internal（内网模式）</span></a></h3><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>内网模式，顾名思义就是内部网络模式：</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与外网完全断开，只实现虚拟机于虚拟机之间的内部网络模式。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与主机的关系：不能相互访问，彼此不属于同一个网络，无法相互访问。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与网络中其他主机的关系：不能相互访问，理由同上。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与虚拟机的关系：可以相互访问，前提是在设置网络时，两台虚拟机设置同一网络名称。如上配置图中，名称为intnet。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4、host-only-adapter-主机模式" tabindex="-1"><a class="header-anchor" href="#_4、host-only-adapter-主机模式"><span>4、Host-only Adapter（主机模式）</span></a></h3><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes vitesse-light vitesse-dark vp-code"><code><span class="line"><span>主机模式，这是一种比较复杂的模式，需要有比较扎实的网络基础知识才能玩转。可以说前面几种模式所实现的功能，在这种模式下，通过虚拟机及网卡的设置都可以被实现。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>我们可以理解为Guest在主机中模拟出一张专供虚拟机使用的网卡，所有虚拟机都是连接到该网卡上的，我们可以通过设置这张网卡来实现上网及其他很多功能，比如（网卡共享、网卡桥接等）。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与主机的关系：默认不能相互访问，双方不属于同一IP段，host-only网卡默认IP段为192.168.56.X 子网掩码为255.255.255.0，后面的虚拟机被分配到的也都是这个网段。通过网卡共享、网卡桥接等，可以实现虚拟机于主机相互访问。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与网络主机的关系：默认不能相互访问，原因同上，通过设置，可以实现相互访问。</span></span>\n<span class="line"><span></span></span>\n<span class="line"><span>虚拟机与虚拟机的关系：默认可以相互访问，都是同处于一个网段。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="vmware支持三种类型的网络-nat-bridged-host-only。" tabindex="-1"><a class="header-anchor" href="#vmware支持三种类型的网络-nat-bridged-host-only。"><span>VMware支持三种类型的网络：NAT，Bridged，Host-only。</span></a></h2><h3 id="_1、nat" tabindex="-1"><a class="header-anchor" href="#_1、nat"><span>1、NAT</span></a></h3><p>这种方式下，虚拟机的网卡连接到宿主的 VMnet8 上。此时系统的 VMWare NAT Service 服务就充当了路由器的作用，负责将虚拟机发到 VMnet8 的包进行地址转换之后发到实际的网络上，再将实际网络上返回的包进行地址转换后通过 VMnet8 发送给虚拟机。VMWare DHCP Service 负责为虚拟机提供 DHCP 服务。</p><p><img src="https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454532.3w1ypfg2i240.webp" alt=""></p><h3 id="_2、bridged" tabindex="-1"><a class="header-anchor" href="#_2、bridged"><span>2、Bridged</span></a></h3><p>这种方式下，虚拟机就像一台真正的计算机一样，直接连接到实际的网络上，与宿主机没有任何联系。</p><p><img src="https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454533.4739l5jodhe0.webp" alt=""></p><h3 id="_3、host-only" tabindex="-1"><a class="header-anchor" href="#_3、host-only"><span>3、Host-only</span></a></h3><p>这种方式下，虚拟机的网卡连接到宿主的 VMnet1 上，但系统并不为虚拟机提供任何路由服务，因此虚拟机只能和宿主机进行通信，而不能连接到实际网络上。</p><p><img src="https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454534.3kmducjiip20.webp" alt=""></p>',19)]))}]]),t=JSON.parse('{"path":"/note_linux/fgp9vqxp/","title":"虚拟机的网络连接方式","lang":"zh-CN","frontmatter":{"title":"虚拟机的网络连接方式","tags":["VMware"],"createTime":"2024/11/16 22:57:24","permalink":"/note_linux/fgp9vqxp/","description":"常见的网络连接方式： 1、NAT （Network Address Translation，网络地址转换） 2、Bridged Adapter（网桥模式） 3、Internal（内网模式） 4、Host-only Adapter（主机模式） VMware支持三种类型的网络：NAT，Bridged，Host-only。 1、NAT 这种方式下，虚拟机的网...","head":[["meta",{"property":"og:url","content":"https://www.unravely.press/note_linux/fgp9vqxp/"}],["meta",{"property":"og:site_name","content":"Unravely"}],["meta",{"property":"og:title","content":"虚拟机的网络连接方式"}],["meta",{"property":"og:description","content":"常见的网络连接方式： 1、NAT （Network Address Translation，网络地址转换） 2、Bridged Adapter（网桥模式） 3、Internal（内网模式） 4、Host-only Adapter（主机模式） VMware支持三种类型的网络：NAT，Bridged，Host-only。 1、NAT 这种方式下，虚拟机的网..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454532.3w1ypfg2i240.webp"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-16T17:28:23.000Z"}],["meta",{"property":"article:tag","content":"VMware"}],["meta",{"property":"article:modified_time","content":"2024-11-16T17:28:23.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"虚拟机的网络连接方式\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454532.3w1ypfg2i240.webp\\",\\"https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454533.4739l5jodhe0.webp\\",\\"https://cdn.jsdelivr.net/gh/unravelyt/image-hosting@master/2022/05/161210210454534.3kmducjiip20.webp\\"],\\"dateModified\\":\\"2024-11-16T17:28:23.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"常见的网络连接方式：","slug":"常见的网络连接方式","link":"#常见的网络连接方式","children":[{"level":3,"title":"1、NAT （Network Address Translation，网络地址转换）","slug":"_1、nat-network-address-translation-网络地址转换","link":"#_1、nat-network-address-translation-网络地址转换","children":[]},{"level":3,"title":"2、Bridged Adapter（网桥模式）","slug":"_2、bridged-adapter-网桥模式","link":"#_2、bridged-adapter-网桥模式","children":[]},{"level":3,"title":"3、Internal（内网模式）","slug":"_3、internal-内网模式","link":"#_3、internal-内网模式","children":[]},{"level":3,"title":"4、Host-only Adapter（主机模式）","slug":"_4、host-only-adapter-主机模式","link":"#_4、host-only-adapter-主机模式","children":[]}]},{"level":2,"title":"VMware支持三种类型的网络：NAT，Bridged，Host-only。","slug":"vmware支持三种类型的网络-nat-bridged-host-only。","link":"#vmware支持三种类型的网络-nat-bridged-host-only。","children":[{"level":3,"title":"1、NAT","slug":"_1、nat","link":"#_1、nat","children":[]},{"level":3,"title":"2、Bridged","slug":"_2、bridged","link":"#_2、bridged","children":[]},{"level":3,"title":"3、Host-only","slug":"_3、host-only","link":"#_3、host-only","children":[]}]}],"readingTime":{"minutes":4.07,"words":1221},"git":{"createdTime":1731778103000,"updatedTime":1731778103000,"contributors":[{"name":"unravely","email":"yutong9717@163.com","commits":1}]},"autoDesc":true,"filePathRelative":"notes/note_linux/60.network/虚拟机的网络连接方式.md","bulletin":false}')}}]);