## the Internet Protocol

A *network* is a collection of devices connected to exchange data amongst each other. There are many standards for the hardware and the software protocols that connect the devices on a network. Most small-to medium-sized networks today use one of the [Ethernet](https://en.wikipedia.org/wiki/Ethernet) standards. If you have an internet connection at home, your computers, your router, your modem, and your other devices are almost certainly connected *via* Ethernet.

An *internet* is a system of connected networks. Whereas each network is owned and operated by one private individual or organization, no one party owns and operates the internet which encompasses them. An internet is the sum of its parts.

To connect two networks, we simply need a computer connected to both networks simultaneously to act as a ***router***. Data sent from a computer on one network can be sent to a computer on the other network *via* any router connecting the two networks.

***'The*** **internet'** is the global internet connecting virtually all networks in the world. To connect our device to the internet, we need someone with a network that is part of the internet to let us connect our device to their network. For individual users and small organizations, this means paying an ISP (Internet Service Provider) monthly fees. The ISP provides a modem connected to their network, and we connect our small home network to the modem.

Whereas each network uses its own choice of hardware and protocols to exchange data within itself, a device on the internet must use the standard Internet Protocol (IP) to talk to computers on *other* networks. There are two major versions of IP currently in use: IPv4 and the newer IPv6. (There never was an IPv5!) It is hoped that IPv6 will eventually replace IPv4, but in 2017, worldwide internet traffic is estimated to still be less than 15% IPv6 (starting from 0% in 2009). (We'll cover only IPv4.)

## IPv4 (Internet Protocol version 4)

In IPv4, each ***host*** (a device on the internet) is known by a unique 32-bit address. With 32-bits, we have ~4.3 billion unique IPv4 addresses, and thus, up to ~4.3 billion hosts can have their own IPv4 address. The addresses are written with each byte separated by dots and expressed as a positive decimal number (0 to 255), *e.g.*:

```
102.84.240.19        (first byte is 102, second is 84, third is 240, fourth is 19)
```

From one host, we can send discrete chunks of data called IP ***packets*** to any other host. In addition to its data, each packet starts with a header containing meta-information about the packet, including the packet's source address and destination address.

 1. In an Ethernet network, a host will simply broadcast its packets to every other host on the local network. Each host examines every packet sent on the local network, and if the destination address matches a host's own IP address, the host knows it was meant to receive the packet.
 2. The routers on the network also look at every packet. If a packet's destination address falls within a range of addresses configured for a router, that router rebroadcasts the packet on the adjacent network to which it is also connected. Different routers on the network are configured to filter for different address ranges, thus packets sent to different addresses may get sent to different adjacent networks.
 3. When rebroadcast on an adjacent network, a packet is handled there the same way as on the original network: a host with the IP address matching the packet's destination knows it was meant to receive the packet, and a router will rebroadcast the packet on another adjacent network if the destination address is in a certain range.

As long as the routing tables on each network are configured correctly, a sent packet will make its way from network-to-network, router-to-router, until eventually it is read by the host meant to receive it.

(Routing table configuration is the concern of network operators, so we won't go into details, but suffice it to say the configuration is partly automatic and partly manual.)

Now, what if something goes wrong in transmission? What if the contents of a packet get garbled in transmission? What if a network, for whatever reason, fails to properly rebroadcast a packet? What if a malicious router snoops on our data or tampers with it? All sorts of things can go wrong! Well...IP doesn't care. IP itself makes no guarantees that any sent packet will reach its destination in tact or even reach its destination at all, nor does it protect your packets from snooping or tampering. To solve those problems, we'll need TCP and TLS (discussed in the next lesson).

## DNS (the Domain Name System)

Humans don't want to read, write, and remember a bunch of IP addresses, so DNS was created. The Domain Name System is a global registry that maps IP addresses to unique names, *e.g.* the domain name `google.com` maps to some IP address. The ICANN (Internet Corporation for Assigned Names and Numbers) is the authority that ultimately decides what name maps to what. For a fee, anyone can lease an as-of-yet unused domain name and thus control what IP address that name maps to.

Domain names are hierarchically organized, back-to-front. For example, in the domain name `foo.google.com`, `foo` is a subdomain of `google.com`, and `google` is a subdomain of the top-level domain `com`.

The ICANN itself creates the top-level domains, like `com`, `net`, `org`, and `edu`. Some top-level domains are restricted such that not just anyone can register subdomains. The `gov` domain, for example, is owned by the United States federal government's General Services Administration, which only gives `gov` subdomains to entities of American goverment. Other top-level domains, like `com`, allow anyone to lease subdomains.

A ***DNS server*** is a server program that keeps its own copy of the global registries. Hosts can ask a DNS server to lookup the IP address associated with a domain name.

Periodically, a DNS server will check for updates from the global registries. When we register new domain names (or modify existing ones), it may take some hours for the change to filter out from the global registries to all the DNS servers in the world.

A host is configured with the IP address of a default DNS server, such that the host will use that server for lookups. Most ISP's run a DNS server, and devices will typically use the DNS server of the ISP they are connected to. Hosts will typically cache lookups for some time so as to avoid needless lookups.
