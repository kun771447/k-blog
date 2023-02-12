import{_ as e,c as i,o as t,a as l}from"./app.80fd2797.js";const a="/k-blog/tcp/03/2023-02-11-19-18-07-image.png",r="/k-blog/tcp/03/2023-02-11-19-31-13-image.png",n="/k-blog/tcp/03/2023-02-12-07-41-05-image.png",s="/k-blog/tcp/03/2023-02-12-07-42-57-image.png",p="/k-blog/tcp/03/2023-02-12-07-53-03-image.png",c="/k-blog/tcp/03/2023-02-12-08-04-03-image.png",d="/k-blog/tcp/03/2023-02-12-08-08-45-image.png",h="/k-blog/tcp/03/2023-02-12-08-29-40-image.png",o="/k-blog/tcp/03/2023-02-12-08-35-39-image.png",m="/k-blog/tcp/03/2023-02-12-08-48-40-image.png",u="/k-blog/tcp/03/2023-02-12-09-00-33-image.png",T="/k-blog/tcp/03/2023-02-12-09-04-36-image.png",g="/k-blog/tcp/03/2023-02-12-09-07-15-image.png",O=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"数据传输与 MSS 分段","slug":"数据传输与-mss-分段","link":"#数据传输与-mss-分段","children":[{"level":3,"title":"MSS: Max Segment Size","slug":"mss-max-segment-size","link":"#mss-max-segment-size","children":[]},{"level":3,"title":"TCP 握手常用选项","slug":"tcp-握手常用选项","link":"#tcp-握手常用选项","children":[]}]},{"level":2,"title":"重传和确认","slug":"重传和确认","link":"#重传和确认","children":[{"level":3,"title":"报文有可能丢失","slug":"报文有可能丢失","link":"#报文有可能丢失","children":[]},{"level":3,"title":"PAR：Positive Acknowledgment with Retransmission","slug":"par-positive-acknowledgment-with-retransmission","link":"#par-positive-acknowledgment-with-retransmission","children":[]},{"level":3,"title":"提升并发能力的 PAR 改进版","slug":"提升并发能力的-par-改进版","link":"#提升并发能力的-par-改进版","children":[]},{"level":3,"title":"Sequence 序列号/Ack 序列号","slug":"sequence-序列号-ack-序列号","link":"#sequence-序列号-ack-序列号","children":[]},{"level":3,"title":"确认序号","slug":"确认序号","link":"#确认序号","children":[]},{"level":3,"title":"TCP 序列号复用问题","slug":"tcp-序列号复用问题","link":"#tcp-序列号复用问题","children":[]},{"level":3,"title":"防止序列号回绕 PAWS(Protect Against Wrapped Sequence numbers)","slug":"防止序列号回绕-paws-protect-against-wrapped-sequence-numbers","link":"#防止序列号回绕-paws-protect-against-wrapped-sequence-numbers","children":[]},{"level":3,"title":"BDP 网络中的问题","slug":"bdp-网络中的问题","link":"#bdp-网络中的问题","children":[]}]},{"level":2,"title":"RTO 重传定时器的计算","slug":"rto-重传定时器的计算","link":"#rto-重传定时器的计算","children":[{"level":3,"title":"如何测量 RTT？","slug":"如何测量-rtt","link":"#如何测量-rtt","children":[]},{"level":3,"title":"如何在重传下有效测量 RTT?","slug":"如何在重传下有效测量-rtt","link":"#如何在重传下有效测量-rtt","children":[]},{"level":3,"title":"RTO (Retransmission TimeOut) 应当设多大","slug":"rto-retransmission-timeout-应当设多大","link":"#rto-retransmission-timeout-应当设多大","children":[]},{"level":3,"title":"平滑 RTO: REF793，降低瞬时变化","slug":"平滑-rto-ref793-降低瞬时变化","link":"#平滑-rto-ref793-降低瞬时变化","children":[]},{"level":3,"title":"追踪 RTT 方差","slug":"追踪-rtt-方差","link":"#追踪-rtt-方差","children":[]}]}],"relativePath":"tcp/03-MSS分段传输和重传.md"}'),R={name:"tcp/03-MSS分段传输和重传.md"},S=l('<h2 id="数据传输与-mss-分段" tabindex="-1">数据传输与 MSS 分段 <a class="header-anchor" href="#数据传输与-mss-分段" aria-hidden="true">#</a></h2><p>TCP 是基于字节流的协议，它不限制应用层传输的长度，但是它底层的网络层和数据链路层的发送报文使用内存是有限的，所以它们一定会限制报文的长度，因此 TCP 必须把应用层的任意长数据切分成报文段</p><img src="'+a+'"><p>应用程序可能是直接从 1 发送到 22 字节，我们实际发送的是个流，拆分成了很多个Segment 段</p><ul><li>流分段的依据 <ul><li>MSS(最大报文段的大小)，如果 TCP 不分段，那么 IP 层一定会分段，而 IP 层分段效率非常低，所以要根据 MSS 防止 IP 层分段</li></ul></li></ul><h3 id="mss-max-segment-size" tabindex="-1">MSS: Max Segment Size <a class="header-anchor" href="#mss-max-segment-size" aria-hidden="true">#</a></h3><ul><li><p>定义：仅指 TCP 承载数据，不包含 TCP 头部的大小，参见 RFC 879</p></li><li><p>MSS选择目的</p><ul><li><p>尽量每个Segment报文段携带更多的数据，以减少头部空间占用比率</p></li><li><p>防止Segment被某个设备的IP层基于MTU拆分</p><ul><li>IP 层基于MTU拆分，非常没有效率，丢失报文，所有报文都要重传</li></ul></li></ul></li><li><p>默认MSS: 536字节(默认MTU576字节, 20字节IP头部，20字节TCP头部)</p></li><li><p>握手阶段协商MSS</p></li><li><p>MSS分类</p><ul><li><p>发送方最大报文段SMSS: SENDER MAXIMUM SEGMENT SIZE</p></li><li><p>接收方最大报文段RMSS: RECEIVER MAXIMUM SEGMENT SIZE</p></li></ul></li></ul><h3 id="tcp-握手常用选项" tabindex="-1">TCP 握手常用选项 <a class="header-anchor" href="#tcp-握手常用选项" aria-hidden="true">#</a></h3><img src="'+r+'"><h2 id="重传和确认" tabindex="-1">重传和确认 <a class="header-anchor" href="#重传和确认" aria-hidden="true">#</a></h2><p>TCP 将每个消息拆成多个 Segment 段，TCP 就需要保证每个 Segment 段一定会到达对方，这个保证机制就是重传和确认</p><h3 id="报文有可能丢失" tabindex="-1">报文有可能丢失 <a class="header-anchor" href="#报文有可能丢失" aria-hidden="true">#</a></h3><img src="'+n+'"><h3 id="par-positive-acknowledgment-with-retransmission" tabindex="-1">PAR：Positive Acknowledgment with Retransmission <a class="header-anchor" href="#par-positive-acknowledgment-with-retransmission" aria-hidden="true">#</a></h3><p>积极的确认与重传</p><img src="'+s+'"><p>设置定时器，发送出去的报文段后，在固定时内没有收到 Ack, 就认为这个报文段丢失重传这个报文段，在等待这个时间不能发送其他报文段</p><ul><li>问题：效率低，必须一个消息一个消息的发，后面消息必须等前面消息发完，丢包后长时间等待</li></ul><h3 id="提升并发能力的-par-改进版" tabindex="-1">提升并发能力的 PAR 改进版 <a class="header-anchor" href="#提升并发能力的-par-改进版" aria-hidden="true">#</a></h3><img src="'+p+'"><p>每次发送都会携带上编号，确认也会返回编号，这样就可以一次发送多条消息，定时器就可以判断那条消息没有收到</p><p>但是 设备B 的内存和处理能力都是有限的，所以我们要限制发送消息的数量，这个 Limit 就是告诉设备 A 我还有几个缓冲区</p><ul><li><p>接收缓冲区的管理</p><ul><li>Limit 限制发送方</li></ul></li></ul><h3 id="sequence-序列号-ack-序列号" tabindex="-1">Sequence 序列号/Ack 序列号 <a class="header-anchor" href="#sequence-序列号-ack-序列号" aria-hidden="true">#</a></h3><ul><li><p>设计目的：解决用用层字节流的可靠发送</p><ul><li><p>跟踪应用层的发送端数据是否送达</p></li><li><p>确定接收端有序的接收到字节流</p></li></ul></li><li><p>序列号的值针对的是字节而不是报文</p></li></ul><h3 id="确认序号" tabindex="-1">确认序号 <a class="header-anchor" href="#确认序号" aria-hidden="true">#</a></h3><img src="'+c+'"><img src="'+d+'"><p>TCP Segment Len(段的长度)是 1328， Sequence number(序列号) 是 569，Next sequence number 就是 TCP Segment Len + Sequence number 等于 1897</p><p>Acknowledgment number 确认的是上一条</p><h3 id="tcp-序列号复用问题" tabindex="-1">TCP 序列号复用问题 <a class="header-anchor" href="#tcp-序列号复用问题" aria-hidden="true">#</a></h3><img src="'+h+'"><p>当我们发送超过 2^ 32字节(4G) 这个连接还继续使用的话，就会复用重新开始计算</p><h3 id="防止序列号回绕-paws-protect-against-wrapped-sequence-numbers" tabindex="-1">防止序列号回绕 PAWS(Protect Against Wrapped Sequence numbers) <a class="header-anchor" href="#防止序列号回绕-paws-protect-against-wrapped-sequence-numbers" aria-hidden="true">#</a></h3><img src="'+o+'"><p>以上图为例，我们传送 1G:2G 的时候丢包了，后面我们传输到 5G:6G 开始复用之前的序列号 1G:2G，就无法确认是重传的包还是新发送的包。</p><p>为了避免这个问题我们就要把时间戳带上，比较时间戳来判断包的先后顺序</p><h3 id="bdp-网络中的问题" tabindex="-1">BDP 网络中的问题 <a class="header-anchor" href="#bdp-网络中的问题" aria-hidden="true">#</a></h3><ul><li><p>TCP timestamp</p><ul><li><p>不仅可以解决 PAWS</p></li><li><p>还可以更精准的计算 RTO</p></li></ul></li></ul><img src="'+m+'"><h2 id="rto-重传定时器的计算" tabindex="-1">RTO 重传定时器的计算 <a class="header-anchor" href="#rto-重传定时器的计算" aria-hidden="true">#</a></h2><p>在计算 RTO 前，我们先来讲一下什么 RTT(Round-Trip Time)往返时延</p><h3 id="如何测量-rtt" tabindex="-1">如何测量 RTT？ <a class="header-anchor" href="#如何测量-rtt" aria-hidden="true">#</a></h3><img src="'+u+'"><h3 id="如何在重传下有效测量-rtt" tabindex="-1">如何在重传下有效测量 RTT? <a class="header-anchor" href="#如何在重传下有效测量-rtt" aria-hidden="true">#</a></h3><img src="'+T+'"><h3 id="rto-retransmission-timeout-应当设多大" tabindex="-1">RTO (Retransmission TimeOut) 应当设多大 <a class="header-anchor" href="#rto-retransmission-timeout-应当设多大" aria-hidden="true">#</a></h3><ul><li>RTO 应当略大于 RTT</li></ul><img src="'+g+'"><p>RTO 如果比 RTT 小的话，接收端返回 ack 还没到达发送端，定时器就已经触发重传了</p><p>RTO 如果比 RTT 大太多的话，发送端就不能及时重传</p><h3 id="平滑-rto-ref793-降低瞬时变化" tabindex="-1">平滑 RTO: REF793，降低瞬时变化 <a class="header-anchor" href="#平滑-rto-ref793-降低瞬时变化" aria-hidden="true">#</a></h3><ul><li><p>SRTT (smoothed round-trip time) = (α * SRTT) + ((1- α) * RTT)</p><ul><li>α 从 0 到 1 (RFC推荐0.9)，越大越平滑</li></ul></li><li><p>RTO = min[UBOUND, max[LBOUND, (β * SRTT)]]</p><ul><li>如UBOUND为1份钟，LBOUND为1秒钟，β从1.3到2之间</li></ul></li><li><p>如果 RTT 变化很大，那 RTO 计算总是慢一步不是过小就是过大，所以大多操作系统没采用这种方案</p></li><li><p><strong>不适用于RTT波动大(方差大)的场景</strong></p></li></ul><h3 id="追踪-rtt-方差" tabindex="-1">追踪 RTT 方差 <a class="header-anchor" href="#追踪-rtt-方差" aria-hidden="true">#</a></h3><p>linux 目前就采用这种方案</p><p><strong>RFC6298(RFC 2988)，其中 其中a= 1/8，β= 1/4, K= 4, G为最小时间颗粒:</strong></p><ul><li><p>首次计算RTO, R为第1次测量出的RTT</p><ul><li><p>SRTT (smoothed round-trip time) = R</p></li><li><p>RTTVAR (round-trip time variation) = R/2</p></li><li><p>RTO= SRTT + max (G, K * RTTVAR)</p></li></ul></li><li><p>后续计算RTO, R&#39; 为最新测量出的RTT</p><ul><li><p>SRTT = (1-a) * SRTT + a * R&#39;</p></li><li><p>RTTVAR = (1- β) * RTTVAR + β * |SRTT - R&#39;|</p></li><li><p>RTO= SRTT + max (G, K * RTTVAR)</p></li></ul></li></ul>',57),_=[S];function k(b,P,x,f,M,v){return t(),i("div",null,_)}const C=e(R,[["render",k]]);export{O as __pageData,C as default};
