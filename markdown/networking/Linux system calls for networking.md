# Linux system calls for networking

A ***socket*** is an open file descriptor that represents a network connection from which we can read and write a stream of bytes (TCP) or a sequence of datagrams (UDP). Connections are formed by clients connecting to listening servers.

For a client, the general pattern of system calls is:

 - call `socket` to create a socket
 - call `connect` to establish a connection with the socket
 - read and write data by calling `send` and/or `recv` on the socket
 - when done with the connection, close the socket with `close`

For a server, the general pattern of system calls is:

 - call `socket` to create a socket
 - call `bind` on the socket
 - call `listen` on the socket
 - call `accept` on the socket to get a new socket,
 - read and write data by calling `send` and/or `recv` on the socket returned by `accept`
 - when done with the connection, we close the sockets with `close`

### socket

The `socket` system call returns a socket through which servers can `bind` and `listen` or through which clients can `connect`.

### bind 

The `bind` system call associates a socket with an address and port. (If the address and port combination is already bound to another socket on the system, `bind` returns an error.)

### listen

The `listen` system call enables a bound socket to receive incoming connections. The OS will internally keep a 'backlog queue' of incoming connections (up to a specified number).

### accept

The `accept` system call takes a listening socket and returns another socket representing an incoming connection and returns the new connection's source address and port. The connection is taken from the backlog queue, unless the queue is empty, in which case `accept` will block until a connection comes in (or until a timeout is exceeded).

### connect

The `connect` system returns a file descriptor representing an outgoing connection. The destination address and port are passed as argument, but the source address is always the local IP address, and the port is automatically selected. (We generally don't care about the outgoing port, but you can get it after calling `connect` by calling `getsockname`.) 

### send

The `send` system call is just like `write`, but it only works on sockets, and it allows us to specify networking-specific options. (Calling `write` on a socket is the same as calling `send` with none of these options.)

### recv

The `recv` ('receive') system call is just like `read`, but it only works on sockets, and it allows us to specify networking-specific options. (Calling `read` on a socket is the same as calling `read` with none of these options.)

### shutdown

The `shutdown` system call closes the local half of a TCP connection. In other words, it signals to the other side of the connection that we will be sending no more data.

### close

Once we're done with a socket, we should use the `close` system call to close it like any other file.