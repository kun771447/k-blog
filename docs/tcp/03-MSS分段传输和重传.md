## 数据传输与 MSS 分段

TCP 是基于字节流的协议，它不限制应用层传输的长度，但是它底层的网络层和数据链路层的发送报文使用内存是有限的，所以它们一定会限制报文的长度，因此 TCP 必须把应用层的任意长数据切分成报文段

<img src="\tcp\03\2023-02-11-19-18-07-image.png" />

应用程序可能是直接从 1 发送到 22 字节，我们实际发送的是个流，拆分成了很多个Segment 段

- 流分段的依据
  - MSS(最大报文段的大小)，如果 TCP 不分段，那么 IP 层一定会分段，而 IP 层分段效率非常低，所以要根据 MSS 防止 IP 层分段

### MSS: Max Segment Size

- 定义：仅指 TCP 承载数据，不包含 TCP 头部的大小，参见 RFC 879

- MSS选择目的
  
  - 尽量每个Segment报文段携带更多的数据，以减少头部空间占用比率
  
  - 防止Segment被某个设备的IP层基于MTU拆分
    
    - IP 层基于MTU拆分，非常没有效率，丢失报文，所有报文都要重传

- 默认MSS: 536字节(默认MTU576字节, 20字节IP头部，20字节TCP头部)

- 握手阶段协商MSS

- MSS分类
  
  - 发送方最大报文段SMSS: SENDER MAXIMUM SEGMENT SIZE
  
  - 接收方最大报文段RMSS: RECEIVER MAXIMUM SEGMENT SIZE

### TCP 握手常用选项

<img src="\tcp\03\2023-02-11-19-31-13-image.png" />

## 重传和确认

TCP 将每个消息拆成多个 Segment 段，TCP 就需要保证每个 Segment 段一定会到达对方，这个保证机制就是重传和确认

### 报文有可能丢失

<img src="\tcp\03\2023-02-12-07-41-05-image.png" />

### PAR：Positive Acknowledgment with Retransmission

积极的确认与重传

<img src="\tcp\03\2023-02-12-07-42-57-image.png" />


设置定时器，发送出去的报文段后，在固定时内没有收到 Ack, 就认为这个报文段丢失重传这个报文段，在等待这个时间不能发送其他报文段

- 问题：效率低，必须一个消息一个消息的发，后面消息必须等前面消息发完，丢包后长时间等待

### 提升并发能力的 PAR 改进版

<img src="\tcp\03\2023-02-12-07-53-03-image.png" />


每次发送都会携带上编号，确认也会返回编号，这样就可以一次发送多条消息，定时器就可以判断那条消息没有收到



但是 设备B 的内存和处理能力都是有限的，所以我们要限制发送消息的数量，这个 Limit 就是告诉设备 A 我还有几个缓冲区



- 接收缓冲区的管理
  
  - Limit 限制发送方



### Sequence 序列号/Ack 序列号

- 设计目的：解决用用层字节流的可靠发送
  
  - 跟踪应用层的发送端数据是否送达
  
  - 确定接收端有序的接收到字节流

- 序列号的值针对的是字节而不是报文

### 确认序号

<img src="\tcp\03\2023-02-12-08-04-03-image.png" />

<img src="\tcp\03\2023-02-12-08-08-45-image.png" />

TCP Segment Len(段的长度)是 1328， Sequence number(序列号) 是 569，Next sequence number 就是 TCP Segment Len + Sequence number 等于 1897


Acknowledgment number 确认的是上一条

### TCP 序列号复用问题

<img src="\tcp\03\2023-02-12-08-29-40-image.png" />


当我们发送超过 2^ 32字节(4G) 这个连接还继续使用的话，就会复用重新开始计算 

### 防止序列号回绕 PAWS(Protect Against Wrapped Sequence numbers)

<img src="\tcp\03\2023-02-12-08-35-39-image.png" />

以上图为例，我们传送 1G:2G 的时候丢包了，后面我们传输到 5G:6G 开始复用之前的序列号 1G:2G，就无法确认是重传的包还是新发送的包。



为了避免这个问题我们就要把时间戳带上，比较时间戳来判断包的先后顺序

### BDP 网络中的问题

- TCP timestamp
  
  - 不仅可以解决 PAWS
  
  - 还可以更精准的计算 RTO
  
<img src="\tcp\03\2023-02-12-08-48-40-image.png" />

## RTO 重传定时器的计算

在计算 RTO 前，我们先来讲一下什么 RTT(Round-Trip Time)往返时延

### 如何测量 RTT？

<img src="\tcp\03\2023-02-12-09-00-33-image.png" />

### 如何在重传下有效测量 RTT?

<img src="\tcp\03\2023-02-12-09-04-36-image.png" />

### RTO (Retransmission TimeOut) 应当设多大

- RTO 应当略大于 RTT

<img src="\tcp\03\2023-02-12-09-07-15-image.png" />

RTO 如果比 RTT 小的话，接收端返回 ack 还没到达发送端，定时器就已经触发重传了

RTO 如果比 RTT 大太多的话，发送端就不能及时重传



### 平滑 RTO: REF793，降低瞬时变化

- SRTT (smoothed round-trip time) = (α * SRTT) + ((1- α) * RTT)
  
  - α 从 0 到 1 (RFC推荐0.9)，越大越平滑

- RTO = min[UBOUND, max[LBOUND, (β * SRTT)]]
  
  - 如UBOUND为1份钟，LBOUND为1秒钟，β从1.3到2之间

- 如果 RTT 变化很大，那 RTO 计算总是慢一步不是过小就是过大，所以大多操作系统没采用这种方案

- **不适用于RTT波动大(方差大)的场景**



### 追踪 RTT 方差

linux 目前就采用这种方案

**RFC6298(RFC 2988)，其中 其中a= 1/8，β= 1/4, K= 4, G为最小时间颗粒:**

- 首次计算RTO, R为第1次测量出的RTT
  
  - SRTT (smoothed round-trip time) = R
  
  - RTTVAR (round-trip time variation) = R/2
  
  - RTO= SRTT + max (G, K * RTTVAR)

- 后续计算RTO, R' 为最新测量出的RTT
  
  - SRTT = (1-a) * SRTT + a * R'
  
  - RTTVAR = (1- β) * RTTVAR + β * |SRTT - R'|
  
  - RTO= SRTT + max (G, K * RTTVAR)