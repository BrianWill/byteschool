## UDP (User Datagram Protocol)

When we send an IP packet, we specify in the header the protocol of the packet's data.

One of the most commonly used protocols within IP is UDP. A ***datagram*** is a UDP message sent within an IP packet. Each datagram starts with a header, containing:

- a 16-bit ***source port***, a number meant to uniquely identify the sending program within the sending host
- a 16-bit ***destination port***, a number meant to uniquely identify the receiving program within the receiving host
- a 16-bit length, the number of bytes in the datagram (header included)
- a 16-bit [checksum](https://en.wikipedia.org/wiki/Checksum) of the other elements of the header, the data, plus some elements of the header of the containing IP packet

Because the length is specified with 16 bits, the max size of the datagram is 65535 bytes. (If we need to send more data, we simply send multiple datagrams.)

The checksum is checked by the receiver, and if it doesn't match, the datagram is discarded.

## TCP (Transmission Control Protocol)

Another of the most commonly used protocols within IP is TCP. The chunk of TCP data within an IP packet is called a ***segment***. Like a UDP datagram, each TCP segment has a header containing a source port, a destination port, a length, and a checksum, but the header also has information to enable two things which UDP doesn't do:

 - TCP **verifies that the sent data reaches the destination** by waiting for acknowledgement of receipt. If no acknowledgement comes within a set period of time, the **data is automatically resent** in additional TCP segments. This happens repeatedly until the recipient sends acknowledgement (or until the max number of retries is exceeded: we wouldn't want to keep trying forever). 
 - Because TCP chops sent data into separate segments and resends data, the data might arrive out of order, but TCP ensures the recipient can **reassemble the bytes of data into their intended order**.

When sending data over TCP, we first establish a connection:

 1. program A on source port X requests a connection to program B on destination port Y
 2. program B accepts the request and sends acknowledgment
 3. program A sends acknowledgment of the acknowledgment

(This last step is necessary so that the receiver can know if its messages are reaching the sender.)

Having established a connection, each program can send a sequence of bytes to the other. TCP will chop the sent data into segments, resend any segment for which it doesn't receive acknowledgment, and acknowledging any segments received.

A program should notify the other end of the connection when it has finished sending data. This is called 'closing' the connection. The other side can continue to send data until it closes its side. Only once both sides have been closed does the connection end.

## listening

To receive UDP datagrams or TCP connections, a program tells the OS it wants to 'listen' on a UDP or TCP port, *e.g.* a program listening on TCP port 200 will receive any incoming TCP connections to that port on the host. The OS ensures that no two programs use the same local port at the same time.

## well-known ports

How does a program know which port(s) another program is listening on? Well, it relies on preexisting agreement. By convention, some ports are 'well-known' to be (usually) used for certain purposes, *e.g.* TCP port 80 is the well-known port used by web servers to receive HTTP requests.

Because UDP datagrams and TCP segments include the source port, a listening program always knows what port on the other host to talk back to.

## ICMP (Internet Control Message Protocol)

When a router or host determines that an IP packet cannot reach its destination, it sends an ICMP message back to the packet's sender. ICMP messages state the nature of the error and include the IP packet's header and first eight bytes of data (which will include the UDP and TCP source and destination ports).

## NAT (Network Address Translation)

The main problem with IPv4 is that ~4.3 billion addresses just isn't adequate: most people in the developed world have multiple devices they want to connect to the internet, and even if every person in the world had just one device, there wouldn't be enough IP addresses to go around.

The primary goal of IPv6 is to fix this situation: addresses in IPv6 are 128-bits long, giving us ~3.4 x 10^38 unique addresses. That's ~3400000000000000000000000000000000000000. A **BIG** number. In IPv6, every person on Earth could have trillions of addresses---far more than anyone could ever use. Sadly, it will be at least a decade before IPv6 supplants IPv4. In the meantime, we need some way for multiple devices to share a single IP address.

Enter NAT. The idea of Network Address Translation is that a router shares its IP among the hosts connected to the internet through that router. Each of these hosts is configured to use a private IP address (an address that is only unique within the local network), and the router remaps incoming and outgoing UDP and TCP port numbers such that the port numbers are unique to the local hosts. For example, say two hosts behind the router both send datagrams on UDP port 100:

 1. The router remaps the source IP address on all outgoing packets to its own 'public' IP address. (The private addresses of the two hosts are meaningless outside the local network, so the destination host would have no idea where to send back responses if we sent it the private addresses.)
 2. The router remaps the UDP port of all outgoing datagrams, but to different ports for different hosts: datagrams from port 100 of one host get remapped to, say, 200, while datagrams from port 100 of another host get remapped to, say, 300. The router keeps track of these mappings for some time (usually some number of days).
 3. For incoming packets, the router consults its mapping tables, *e.g.* UDP port A on host X is mapped to UDP port B, so any incoming datagrams addressed to UDP port B get remapped to UDP port A with destination IP address X.

There's a major problem in this arrangement: we can only talk to hosts behind a NAT router if they have recently talked to us! Moreover, if two hosts are behind NAT routers, neither can directly initiate a conversation with the other. (Workarounds do exist, but most require a third host that isn't behind a NAT, and those that don't require a third host are very unreliable. See [*NAT traversal*](https://en.wikipedia.org/wiki/NAT_traversal).)

When running a server, we can't put it behind NAT because then clients wouldn't be able to initiate communication. 

IPv4 addresses are increasingly expensive, so consumer ISP's generally provide their customers just one IP address, and many increasingly use NAT to share IP addresses between their customers. If we have multiple devices to connect, we'll need a NAT router on our end (in which case our devices may be behind multiple layers of NAT).

Hopefully IPv6 will make NAT completely unnecessary sometime in the next decade. Until then, most hosts on the internet cannot directly communicate without help of a third host that isn't behind a NAT, holding back development and adoption of peer-to-peer applications.
