## multi-threading

As we've discussed earlier, a process starts off with one thread of execution, but *via* system calls, a process can spawn additional threads of execution. These threads all share the same process memory, but the OS schedules these threads independently. 

Each CPU core can run one thread at a time, *e.g.* given a 4 core CPU, the CPU can run 4 threads simultaneously. At any moment, the running threads may or may not be from the same process. (It all depends on which threads the OS deems most worthy to currently use the CPU.)

 - given *N* CPU cores, *N* threads can run simultaneously
 - while one thread blocks, the OS scheduler will generally let another thread run in its place

If computers were infinitely fast---if any amount of code could be fully executed instantaneously---we'd have no real reason to parcel out the work of our programs to multiple threads. Sadly, in the real world, all code takes some amount of time to execute, so to speed things up, we sometimes want to multi-thread our programs:

## goroutines

Using the *syscall* package, we can spawn separate threads. However, it is generally better to use Go's special mechanism for multi-threading called ***goroutines***. A goroutine is a thread of execution managed by the Go runtime rather than by the OS. In my Go program, I can simultaneously have many, many goroutines (thousands or even hundreds of thousands): the Go runtime creates some number of actual OS threads (usually one for each CPU core in the system) and then schedules the goroutines to run in the threads.

So say we have 4 OS threads and 100 goroutines. The OS decides which (if any) of the 4 threads should run at any moment, and the Go runtime decides which goroutines should run in these 4 threads.

Why goroutines? Why not just create 100 OS threads? In short, creating and managing goroutines requires less overhead compared to creating and managing OS threads. Whereas creating thousands of OS threads is inadvisable, creating thousands of goroutines incurs relatively reasonable overhead costs. ([This blog post explains more details](http://tleyden.github.io/blog/2014/10/30/goroutines-vs-threads/).)

To create a goroutine, we use a `go` statement, specifying a function call to kick off the new goroutine:

```go
func foo() {
    fmt.Println("foo")
}

func main() {
    fmt.Println("before")
    go foo()                  // spawn a new goroutine which starts execution by calling foo()
    fmt.Println("after")
}
```

This program, like any Go program, starts with a call to *main()* in its *main* goroutine. After printing `"before"`, *main()* spawns another goroutine, which calls *foo()*. The *main* and *foo* goroutines continue execution independently: the *main* goroutine completes when its call to *main()* returns; the *foo* goroutine completes when its call to *foo()* returns. However, the *main* goroutine is special in that, when it completes, the program will terminate even if other goroutines have not yet completed. (As we'll see later, there are ways to ensure a goroutine will wait for the completion of other goroutines). 

Nothing is guaranteed about when and for how long the goroutines get time to run on the CPU. In some cases, a goroutine will start execution immediatly after spawning; in other cases, it won't. In some cases, the goroutine which spawns another will continue running for some time; in other cases, it will wait some time before being resumed. All of this depends on the choices of the Go runtime and the OS scheduler. Goroutines will be paused and resumed at times the programmer can neither determine nor predict.

So in our example above, it cannot be said whether `"foo"` or `"after"` will be printed first. Sometimes `"foo"` will be printed first; other times `"after"` will be printed first. Even if running the program a million times prints `"foo"` first, we cannot say `"foo"` will always be printed first: it may just happen that the Go runtime and OS schedulers almost always make the same choices because other OS threads aren't taking up CPU time. But if other running OS threads were to steal CPU time at the right moments, the schedulers would make different choices, causing `"after"` to be printed first.

Lastly, be clear that the arguments in the call of a `go` statement are evaluated in the current goroutine, not in the new goroutine:

```go
go foo(bar())     // bar() is called in this goroutine before the new goroutine is created
```

