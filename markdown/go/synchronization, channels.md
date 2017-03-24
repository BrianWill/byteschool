## shared state

Multi-threading gets hard when threads share *state* (*i.e.* data that can be modified in the course of execution). If a piece of data accessible in multiple threads is modified by one thread, the other threads may be affected by that modification when they read the data. When a shared piece of data is modified by a thread in a way that the other threads are not expecting, the logic of those threads may break. In other words, shared state can easily cause bugs.

Generally, the whole point of sharing state is to allow changes in one thread to affect other threads. However, there are typically chunks of code during which a thread expects no other thread to modify one or more pieces of state. For example, a thread may expect global variable *foo* to remain unmolested by other threads for the duration of any call to *bar()*. We would say then that *bar()* is a ***critical section***: a chunk of code during which one or more pieces of shared state should not be modified by other threads. A critical section expects to have some chunk of shared state all to itself for its duration.

Enter ***synchronization primitives***, which arrange exclusive access to some chunk of shared state for the duration of a critical section. There are many kinds of synchronization primitives, but the most common is called a ***lock*** or ***mutex*** (as in 'mutual exclusion').

For a piece of shared state, we create a lock to govern its access:

 - before using the state, we *assert* the lock
 - when done with the state, we *release* the lock
 - if another thread has asserted the lock without yet releasing it, asserting the lock fails, in which case our thread should not read or write the data and instead do something else or wait before trying to assert the lock again

Note that 'lock' is a misleading name: in the real world, a lock physically restrains access; in code, a lock merely indicates whether you *should* access the associated state. As long as all threads remember to properly assert and release locks, everything is fine, but doing this in practice is not always easy.

The Go standard library *"sync"* package provides locks and a few other synchronization primitives.

## channels

Go's ***channels*** offer another way to communicate between and coordinate goroutines.

What programmers call a *queue* is a list in which items are read from the list only in the order in which they were added to the list. Think of a checkout line at a store: the first person in line is the first person to make it through; the last person in line is the last person to make it through.

A channel is a queue in which:

 - the queue has a limited capacity
 - if the queue is full, adding an item will block until space is available (because some other goroutine removed a value)
 - if the queue is empty, retrieving a value will block until a value is available (because some other goroutine added a value)

Adding a value to a channel is called *sending*; retrieving a value is called *receiving*.

Like arrays and slices, channels are typed: a channel of `int`'s, for example, can only store `int`'s. A channel variable is merely a reference to a channel; an actual channel is created with the built-in function *make*:

```go
var ch chan int            // create variable 'ch' to reference a channel of ints
ch = make(chan int, 10)    // assign to 'ch' a new channel of ints with a capacity of 10
```

Somewhat confusingly, the **`<-`** symbol is used for both the binary ***send operator*** and the unary ***receive operator***:

```go
ch := make(chan int, 10)
ch <- 3                    // send the value 3 to the channel referenced by 'ch'
ch <- 5                    // send the value 5
ch <- 2                    // send the value 2
a := <-ch                  // receive the value 3 from the channel referenced by 'ch'
b := <-ch                  // receive the value 5
c := <-ch                  // receive the value 2
```

Again, when we send to a full channel, the goroutine in which we do so will block until another goroutine makes space by receiving from the channel. When we receive from an empty channel, the goroutine in which we do so will block until it has a value to retrieve:

```go
func foo(ch chan int) {
    for {
        // this receive will block until it can retrieve a value from the channel
        fmt.Println(<-ch)
    }
}

func main() {
    ch := make(chan int, 2)
    go foo(ch)
    ch <- 3                    
    ch <- 5   
    // at this point the channel may be full, so this third send may block
    ch <- 2                    
}
```

Remember that nothing is guaranteed about how far a goroutine has reached in its execution relative to other goroutines. Above, maybe the channel never gets full because the *foo()* goroutine already receives the first one or two values. But maybe it does get full! This depends on how exactly the goroutines get scheduled. Thanks to the blocking behavior of send and receive, we don't need to worry about the scheduling: this program will always print `3 5 2`.

It's possible---and in fact most common---to create a channel with a capacity of `0`. Such a channel is always empty *and* full, so every send will block until another goroutine receives from the channel, and every receive will block until another goroutine sends a value to the channel:

```go
func foo(ch chan int) {
    for {
        // this receive will block until the other thread sends another value
        fmt.Println(<-ch)
    }
}

func main() {
    ch := make(chan int, 0)   // zero capacity
    go foo(ch)
    // each send will block until the other goroutine receives from the channel
    ch <- 3                    
    ch <- 5   
    ch <- 2                    
}
```

Again, channel variables are merely references. Like other reference types, the zero value for channels is denoted `nil`. Sending or receiving *via* a `nil` reference triggers a panic:

```go
var ch chan int     // 'ch' starts out nil 
ch <- 9             // panic!
```

Be clear that receiving from a channel returns a *copy* of the sent value. Just like assigning a value to a variable actually copies the value to the variable, sending to a channel copies the value into the channel. Now, if the value sent through a channel is a reference of some kind (*e.g.* a slice or a pointer), then the sender and receiver can end up sharing state. Sometimes that's what we want, but more commonly we use channels to communicate and coordinate between threads by sharing copies, not by sharing state.

> ***Sharing copies is safe: I can do whatever I want with my copy without affecting your copy. Sharing state is dangerous: I might change the state in ways you aren't expecting.***

Enumerating all the possible ways channels can be useful would be very difficult. This [blog post](https://blog.golang.org/pipelines) describes some examples.

### send- and receive-only channels

A normal channel reference is *bidirectional*. The compiler lets us send and receive *via* a bidirectional reference.

Send- and receive-only channel references are *unidirectional*: the compiler lets us only send or receive *via* these references, respectively. A send-only type reference is denoted `chan<-`. A receive-only type reference is denoted `<-chan`.

We can cast from a bidirectional reference to a unidirectional reference, but not the other way around. We cannot cast between send-only and receive-only references.

Be clear that a channel itself is always bidirectional: we create an actual channel with *make*, but our channel expressions are just references. A single channel may be referenced by any number of bidirectional and unidirectional channel references.

```go
var bi chan int = make(chan int, 10)              // create a channel

// notice we must surround the chan types in parens to cast
var s chan<- int = (chan<- int)(bi)               // cast to a send-only reference
var r <-chan int = (<-chan int)(bi)               // cast to a receive-only reference

// all three variables reference the same channel
bi <- 3                 // ok
<-bi                    // ok
s <- 3                  // ok
<-s                     // compiler error: cannot receive via send-only reference
r <- 3                  // compile error: cannot send via receive-only reference
<-r                     // ok
```

We can leave casts from bidirectional to unidirectional references implicit:

```go
var bi chan int = make(chan int, 10)              
var send chan<- int = bi                   // cast is implicit
var receive <-chan int = bi                // cast is implicit
```

So why use unidirectional references? Very commonly, we intend for a particular goroutine to only send to a particular channel *or* only receive from that channel. Unidirectional references help us enforce that intention. When we spawn a new goroutine, we can pass it only a unidirectional reference, thereby ensuring the goroutine will only read *or* write the channel, not both.

## closing channels

The built-in function *close* closes a channel. We can still receive from a closed channel, but sending to a closed channel triggers a panic. Once a closed channel has no more values to receive, any subsequent receive operations will return the zero value of the type without ever blocking:

```go
ch := make(chan int, 3)
ch <- 1
ch <- 2
ch <- 3
close(ch)
a := <-ch   // 1
b := <-ch   // 2
c := <-ch   // 3
d := <-ch   // 0
e := <-ch   // 0
```

To distinguish between a zero value sent through a channel and a zero value indicating the channel has closed, the receive operator can return two values. The first returned value is the value read from the channel, and the second is a boolean (`true` indicating the value was sent):

```go
ch := make(chan int, 3)
// ...
val, ok := <-ch      // 'ok' will be true if the value was sent
```

Closing a channel *via* a receive-only reference triggers a panic. (This makes sense because generally only senders know when there is no more stuff to send.)

Closing a channel which has already been closed triggers a panic.

## `for-range` with channels

A `for-range` value loop is a convenient way to read from a channel until it closes. Each iteration receives a value from the channel (and will block accordingly, like any normal receive operation). Once the channel is closed and empty, the loop ends.

```go
ch := make(chan int, 10)
ch <- 6
ch <- 4
close(ch)

// after two iterations, loop ends because the channel is closed
for v := range ch {
    fmt.Println(v)
}
```

The loop above is simply a more compact way to write the below:

```
for v, ok := <-ch; ok; v, ok = <-ch {
    fmt.Println(v)
}
```

## `select` statements

A `select` statement allows a goroutine to wait for multiple send or receive operations until one of them stops blocking. Only one of the awaited operations completes.

Each case in a `select` has a send or receive operation. Unlike in a `switch`, there is no significance to the order of the cases. Execution blocks until one of the send or receive operations is ready to run. If multiple operations are ready to run, `select` picks one to run at 'random'. (Well, more accurately, it's random *from our perspective*: Go makes no guarantees about which of multiple ready cases will run.)

```go
var ch chan int
var ch2 chan int
var ch3 chan int

// ... 

select {
case v := <-ch:   // assign to new variable 'v' a value received from 'ch'
    // 'v' belongs to the scope of this case (each case is its own scope) 
    // ... do stuff with value received from 'ch'
case ch2 <- 7:
    // ... do stuff after having sent 7 to 'ch2'
case v := <-ch3:
    // this case has its own 'v' separate from 'v' of the first case
    // ... do stuff with value received from 'ch3'
}
```

A `switch` with a `default` case will never block. If no case operation is ready when the `select` is reached, the `default` case will immediately execute:

```
select {
case v := <-ch:
    // ...
case ch2 <- 7:
    // ...
case v := <-ch3:
    // ...
default:
    // will immediately execute if the three operations all block
}
```

So if we wish to send or receive on a single channel without blocking, we can use `select` with a `default` case:

```
var ch chan int
// ...
select {
case i := <-ch:
    // ... read the channel
default: 
    // ... didn't read the channel because it was blocked
}
```

## channels of channels

Understand that...

 - channels are values
 - we can send values of any type through channels

Therefore, we can create channels of channels:

```go
var ch chan chan int = make(chan chan int, 4)
var ich chan int = make(chan int, 17)
ch <- ich                                 // send this int channel through the channel 'ch'
```

In fact, just like we can have arrays, slices, and pointers of any degree, we can have channels of any degree:

```go
var ch chan chan chan chan chan int       // a channel of channels of channels of channels of channels of ints
```

In practice, 2-degree channels are occasionally useful, and someone somewhere has probably used a 3-degree channel once or twice. It's unlikely anyone has ever used a channel of more than 3 degrees.