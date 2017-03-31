# what this course covers

The world of programming is vast and confusing, especially from the perspective of newcomers. Courses often claim to teach students how to swim in this sea of confusion, but typically that really means acclimating students to ‘getting stuff done’ without real understanding of what they’re doing. It’s a grossly inefficient way to learn over the long run, and it erodes student confidence and motivation. What students really need is clarity about how computers and code actually work.

A beginner’s programming course therefore should:

 - focus on the right languages and tools
 - cover important background concepts
 - assign projects and exercises that are small enough to feel doable but substantial enough to still be useful and engaging
 - present all of the above in a progression that feels logical and natural, where each step builds upon what came before it

The list of programming topics grows and changes every year. Other courses brag that they keep their material up-to-the-minute, but this is a mistake: beginners are much better served learning the stuff that endures year-over-year (and true experts know from experience the value of stability).

In no particular order, here’s what our course covers:

## hardware and operating system concepts

The programs we write are run by actual, physical hardware, and our programs’ interactions with the hardware are intermediated by an operating system. Without a working mental model of what actually happens in the machine, you’ll never really know what you’re doing as a programmer.

## assembly

Ultimately, a program comes down to binary instructions executed by the CPU, so the code we write must somehow get translated into these binary instructions. For *high-level* languages, this translation process can be very complicated because one line of code may correspond to many binary instructions. In what we call *assembly language*, one line of code directly corresponds to just one or two instructions.

So when a programmer wants convenience and simplicity, they use a high-level language, but when a programmer wants complete control over exactly what the machine does, they use assembly.

Every processor architecture has its own set of binary instructions and so has its own assembly language. For example, assembly language for an Intel x86 processor differs from assembly language for an ARM processor.

All PC’s have x86 processors, but the x86 set of binary instructions is quite complicated, so we start first with a much simpler assembly for a fictional processor.

## C

The C language is often described as the minimal step up from assembly because each line of C code corresponds fairly directly to a handful of binary instructions. C is generally easier to read and write than assembly, and unlike assembly code, C code is not specific to any single processor.

C is the non-assembly language of choice when efficiency and control over the machine are a high priority.

## Go

Unlike C, the Go language is garbage collected. Garbage collection frees programmers from having to keep track of which parts of memory they use but generally comes at some cost to efficiency.

Go also has special concurrency features that C does not. These features make Go particularly well-suited for creating servers because they make it easier to write code that handles many overlapping requests.

Garbage collection and concurrency aside, Go otherwise is very much like C but friendlier and more accessible (which is why our course teaches Go first).

## relational databases and SQL

Many programs need to reliably store large amounts of data. While directly reading and writing files is an option, ensuring that your data actually makes it to disk and doesn’t get corrupted is surprisingly tricky. For this and other reasons, programmers often use *databases*, programs for reliably storing and organizing large amounts of data.

Most databases structure their data in accordance with the relational model. Though a bit unintuitive, the relational model helps avoid unnecessary duplications in your data and helps flexibly accommodate future modifications to the structure of your data.

To communicate with a relational database, programs use a standard language called SQL (Structured Query Language, often pronounced ‘sequel’). Be clear that SQL is not a general-purpose programming language like Javascript, C, or Go: SQL code simply describes how relational data should be added, removed, modified, or retrieved.

Though SQL has been standardized by ANSI, the popular database programs all diverge from this standard to some degree or another, so SQL for one database program is not exactly the same as SQL for another. Our course uses two databases: SQLite and PostgreSQL.

## HTML and CSS

HTML (Hypertext Markup Language) is the document format of web pages. CSS (Cascading Style Sheets) is a complementary language for specifying web page formatting.

HTML and CSS were originally very simple, but as they’ve been extended over the years, they’ve gotten complex in nasty ways. Still, every programmer should have a familiarity with their essentials, which are fairly straightforward.

Be clear that neither HTML nor CSS are programming languages. By themselves, the HTML and CSS that make up a web page are merely inert data describing an unchanging, non-interactive document. To make a page dynamic and interactive, we need to include Javascript code with the page.

## Javascript

For historical and political reasons, Javascript is the only language supported by all of the major web browsers, so love it or hate it, Javascript is your only option for making interactive web pages.

## git (version control)

A version control system helps programmers track and save changes to their code as well as more easily share their changes with collaborators. The most popular version control tool used these days is git, created by Linus Torvalds (who also created the Linux operating system). 

We do not introduce git until late in our course because, while git is simple for simple cases, it has lurking complexities that often trip up users. These complexities distract students from more important matters, and students don’t really need version control for their small-scope projects. When we do get around to introducing git, we make sure students first have a solid grasp of diffs and merges, which are essential to really understanding version control.

## command-line shells

Before graphical user interfaces, computer users interacted with the computer *via* a command-line shell: an interactive programming language in which each command the user types is immediately executed. Today, programmers and system administrators still use shells to interact with computers in a programmatic way.

We cover the most widely used shell, Bash, along with essential command-line programs.

## data structures and algorithms

All data can be organized using general patterns which we call ***data structures***. These data structures and the associated algorithms for searching and sorting make up the core of Computer Science 101.

Strictly speaking, computer science is not about computers or programming. Much like mathematics is the field of formal reasoning about quantity, and like logic is the field of formal reasoning about propositions, computer science is the field of formal reasoning about computation (which we can define as ‘the process of doing math’). 

Basic data structures and algorithms constitute the essentials of computer science that every programmer should know. It’s questionable whether more advanced computer science topics have much value in most domains of programming.

## internet protocols

For the computers on a network to address each other and send each other data, they need a common protocol. Today, most network traffic is sent *via* **IP (the Internet Protocol)**, which allows for communication between computers on different private networks as long as those networks are connected to each other (directly or indirectly).

Currently, most IP traffic uses version 4 of the protocol, but version 4 is slowly being replaced by version 6. We’ll look at both IPv4 and IPv6, as well as the associated protocols **TCP**, **UDP**, and **ICMP**. We’ll also look at **HTTP (Hypertext Transfer Protocol)**, which is used over IP and TCP to deliver web pages and other resources.

## graphics programming (with OpenGL)

In most modern systems, the display is controlled by a GPU (Graphics Processing Unit). Whereas a CPU is generally optimized for quickly switching between performing different operations, a GPU is optimized for repeatedly performing the same operations on many pieces of data. Despite the name, a GPU can be used for purposes other than generating graphics, but a GPU’s massive parallel computation power is particularly well-suited for generating the many pixels that make up an image, and historically that is the primary use of GPU’s.

Programmers do not have the same direct control of GPU’s as they do of CPU’s. To control the GPU, we rely upon API’s (Application Programming Interfaces) exposed by the operating system, mainly Direct3D and OpenGL. Whereas Direct3D is specific to Microsoft Windows, OpenGL is cross-platform, working on most major devices. We’ll look briefly at the older OpenGL 2.x and then ‘modern’ OpenGL 4.x. (In both cases, our coverage will be quite basic because OpenGL and advanced graphics programming are vast topics requiring knowledge of linear algebra and other higher-level math.)
