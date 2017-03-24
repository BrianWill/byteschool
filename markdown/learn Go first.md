# What programming language should I learn first?

Programming languages can be classified on a spectrum of abstraction:

***Low-abstraction*** programming languages give a programmer direct control over the hardware but burden the programmer with that responsibility. Low-level code specifies every tiny unit of action.

***High-abstraction*** programming languages give a programmer conveniences by taking away the programmer’s control. High-level code specifies larger units of action while the language handles the precise details.

The lowest-level languages are called ***assembly languages***. In assembly code, one line corresponds directly to one or two binary instructions to be executed by the CPU. This gives the programmer maximum control, but each binary instruction does a very small unit of work (copy a byte of memory, add/subtract these two numbers, test if this number is greater than that number, etc). Constructing large programs one tiny instruction at a time is doable but very tedious, and the resulting code is generally hard to read and understand. Very little programming today is done in assembly, but certain domains need the full control it offers. For example, key parts of an operating system must be written in assembly.

The C and C++ languages offer a higher degree of abstraction over assembly but still give programmers a lot of control, especially over how memory is used. This control over memory is very important for high-performance code, such as for games and audio/video encoding/decoding. Linux is written mostly in C. Windows is written mostly in C++. Applications like Chrome and Photoshop are written in C++. Nearly all big-budget games of the past 20 years are written in C++.

The Go language is higher-level than C and C++, primarily because it has a feature called garbage collection. In a garbage collected language like Go, the language tracks your data such that, when a piece of data is no longer needed, the memory it occupies is made available for reuse. Without garbage collection, the programmer is responsible for ‘freeing’ the memory occupied by data that is no longer needed. Doing this is not always easy, and doing it improperly can lead to nasty bugs. So garbage collection makes life easier. However, it does impose overhead that slows down the code, and it takes away full control of how data is stored in memory.

Of the options covered so far, Go is by far the best starting point for beginners. Assembly requires too much patience. C and C++ lack garbage collection and come with a number of distracting complications (such as header files). Especially compared to C++, Go is remarkably simple and small: there’s just a lot less to learn.

If you’re interested in operating systems or game programming, you’ll need to learn C and C++ at some point, but you’ll have a much easier time learning those languages if you start with Go first.

## But what about…?

### Dynamic languages (Javascript, Python, Ruby, PHP, Perl)

When I say these languages are a waste of time, I’m not being mean. They are commonly recommended to beginners because they appear simple, but underneath their friendly faces lurk a lot of complications. After several years with Javascript and Python, plus a bit of Ruby, I can say Go does everything better. Go is simpler, it runs better, its tool chain is simpler, it gives you static type checking (without the usual burdens), and it compiles very quickly.

Of course, if you want to write code for web browsers, you’ll have to learn Javascript, but don’t bother with the rest of the dynamic languages.

### Java or C\#

Java and C# generally run better than the dynamic languages, and they give you static type checking. On the other hand, Java and C# typically run a bit worse than Go, they’re overly complicated, and they impose an Object-Oriented style of programming (which is bad, especially for beginners).

### HTML, CSS, SQL

HTML and CSS are data formats, not programming languages. SQL is a domain-specific language for talking to relational databases. If you want to make web pages, you must learn HTML and CSS. If you want to use a relational database, you must learn SQL. Learn Go first.

### Swift, Objective-C

If you want to write iOS apps, you must learn Swift (and it’ll help a lot to also learn Objective-C). Learn Go first.

### R, MATLAB, Processing

R is geared towards statistical processing and data visualization (graphs). MATLAB is geared towards mathematical computation. Processing is a simplified language for basic graphics programming. Learn Go first.

### FP (Functional programming)

Code written in assembly, C, C++, and Go is *imperative*: the code is a series of instructions that command the machine to perform actions. The opposite of imperative programming is *functional* programming (*FP*). In FP, we avoid *state* (data that changes over time). Functional, stateless code takes fixed, unchanging values as input and spits out fixed, unchanging values as output. Instead of commanding the machine to modify existing pieces of data in memory, our code defines how a given set of input values produces output values. If all (or at least most) of our program’s code is stateless in this way, the program will generally be easier to understand and reason about.

Some languages are considered functional because they facilitate the functional style. The two most notable functional languages, I would say, are Haskell and Clojure. Unfortunately, both have major weaknesses that make them hard to work with and hard to learn. The ideal functional language would take certain aspects of both, but unfortunately, no such language yet exists.

FP is very high level: the code tends to express a lot per line of code because many, many details are left up to the language. On the downside, avoiding state tends to require using a lot more memory, and this can slow down execution time (the more your data is spread around in memory, the more the CPU has to wait while reading/writing memory).

FP is worth investigation, but learn Go first.

#### footnote

Experienced programmers may be wondering what I specifically think is wrong with Haskell and Clojure:

 - Haskell’s type system is complicated. Clojure’s is simpler, but lacks static type checking.
 - Haskell’s lazy evaluation is weird. Clojure’s lazy data structures produce similar benefits in a more predictable way.
 - Haskell’s strict purity makes doing any stateful stuff tricky and hard to learn. Clojure simply lets you mix pure and impure code (impure code can call pure code but not the other way around). Unfortunately, Clojure cannot enforce the purity of any function because it lacks static type checking.
 - Haskell’s syntax is overly clever. Clojure’s syntax is overly simple. Both are hard to learn and read.
 - Haskell offers native compilation out-of-the-box, but Clojure does not.
 
The ideal functional language would combine static typing, strict evaluation, impurity, lazy data structures, native compilation, and a not-too-clever/not-too-simple syntax.