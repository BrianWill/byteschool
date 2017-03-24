# what this course does NOT cover

You’ll find advocates and defenders for every programming language and tool, but they can’t all be right: not everything is awesome!

Some insist you should just ‘use the right tool for the job!’:

> *Any great craftsman has a belt full of tools, each a perfect choice for certain situations. Similarly, there will never be just a single programming language, and each language will evolve and improve over time to keep pace with innovation.*

This is a false analogy: programming languages are more like different brands than different tools. A great craftsman doesn’t carry fifteen different brands of hammer in their belt.

Why do so many people like the wrong hammers? People tend to like the tools with which they are most comfortable. Learning the ins-and-outs of a language can take a lot of time and effort, and people don’t like writing-off bad investments.

Anyway, here’s our list of the tangential ratholes that beginners should avoid:

## OOP (Object-Oriented Programming)

Students tend to have trouble understanding object-oriented programming, likely for one simple reason: object-oriented programming doesn’t work. OOP prescribes a set of practices that ultimately do not cohere, and so attempting to follow OOP’s rules quickly leads to confusion and paralysis. 

Yes, most programmers today work in object-oriented languages and claim to practice object-oriented programming, but the large majority of code written by these programmers breaks the rules of OOP left and right. The vast bulk of supposedly OO code is largely procedural code written in the guise of OOP. (And to the extent code is actually OO, the OO-ness represents harmfully excess structure rather than real benefits.)

Unfortunately, OOP dominates most domains of programming in the working world today, so most students will have to learn the basics of OOP at some point. That point, however, should be deferred to as late as possible. Instructors who distract and indoctrinate students with OOP nonsense are committing malpractice.

## Design Patterns and SOLID

Design Patterns and SOLID are basically extensions/restatements of OO ideas. Their merits are dubious for any programmer, let alone beginners.

## TDD (Test-Driven Development)

Automated testing (writing code to verify the correct operation of other code) is a useful idea when deployed strategically. Test-Driven Development---in any of its myriad variations---takes the idea too far. Our course teaches a small amount of automated testing but not TDD.

## Ruby, Rails, and Python

Ruby (a programming language) and Rails (a Ruby framework for creating web applications) epitomize how the illusion of simplicity can supplant actual simplicity. Despite their friendly appearances, Ruby and Rails are overly complicated beasts just below the surface. Worst of all, Ruby is heavily infected with Object-Oriented-ness.

Python is a cleaner language than Ruby but ultimately shares these same core problems.

Ruby and Python both suffer from seriously sub-par performance. The Go language provides much better performance for similar tasks.

## Javascript frameworks (Angular, React, Ember, Backbone, etc.)

The finicky details of HTML/CSS and Javascript in the browser get really ugly. To cope, many programmers use Javascript frameworks which abstract over the gross details. If you must deal with web browsers, this is an understandable thing to do, but these frameworks tend to suffer from their own mysterious complications with their own weird quirks/bugs. Worse, these Javascript frameworks tend to have very short shelf lives: the framework you learn this year will probably be replaced by the new hotness next year, so who knows how long it will be properly maintained?

Besides all this, it’s generally good policy to favor libraries over frameworks.

(While we’re at it, build tools like *bower* and *grunt* share the same fundamental problem: they want to dictate how you structure your projects, and they make fragile---and often incompatible---assumptions about your development environment.)

## Node.js

Node.js is a Javascript runtime used mainly for writing servers. Very unconventionally, Node does all I/O asynchronously and thereby requires an unintuitive approach to writing code. Making asynchronicity the default was a bold, experimental idea when Node was introduced in 2009, but by now it seems pretty clear the experiment failed. Yes, programs can be written this way, but only with many awkward workarounds.

## Java and C\#

Java took the industry by storm in the mid-90’s, becoming the dominant programming language of business applications and programming education almost overnight. Java’s heavy-handed enforcement of programming in an Object-Oriented style limited how a whole generation of programmers learned to think about code. While still very widely used, Java is clearly undergoing a (slow) decline.

The success of Java threatened Microsoft, who responded by introducing a similar language, C# (pronounced ‘C sharp’). Despite the name, C# is not particularly related to C or C++. C# has some advantages over Java, but it shares many of the same fundamental problems.

## PHP, Visual Basic, and Perl

PHP is the most hated of all languages today. Yes, Facebook uses it, but only because it was the one language Mark Zuckerberg knew back in college. PHP is a language you use only because someone else decided to use it years ago and now you’re stuck with that decision.

Visual Basic is not as bad as PHP, but it’s even less relevant.

Perl once occupied the space that Python and Ruby now occupy. Among other problems, Perl was famous for doing too much in each individual line of code, often making code difficult to read. Today, virtually no one starts new projects in Perl.

## R, Matlab, and Mathematica

These languages are geared for engineers and academics who want to perform computations and visualize the results. They are poor fits for more general purposes.

## Objective-C

For many years, Apple pushed Objective-C as the one true way to write Mac and iOS applications, but now Apple is pushing Swift. The transition to Swift is happening rapidly enough that bothering to learn Objective-C is probably a total waste of time for any new programmers.

# other things we don't cover but may be worth learning
 
## C++

C++ started out as an extension of C that added classes (a core feature of OOP). Originally, all C code was also valid C++ code, but the languages have since diverged in subtle but significant ways. Still, it’s mostly true to say that C++ is like C but with (a lot) more stuff.

Whether you prefer C or C++ depends largely on how you feel about OOP, but some programmers (for complex reasons I won’t go into) use C++ and simply ignore its OOP features.

Most serious game code is written today in C++, but there’s no good reason not to learn C before C++. C is a far simpler language, and virtually everything you learn in C carries over to C++ nearly verbatim.

## Haskell, F#, Scala, Clojure, and functional programming

‘Functional programming’ is a style of programming which addresses the problem of changing state. Languages like Haskell, F#, Scala, and Clojure are designed to facilitate this style. 

While functional programming may have a bright future, beginners should still focus on conventional ‘imperative programming’ because it better reflects how the hardware operates. (Partly for this reason, functional code tends to be less efficient.) Once you’re proficient with Go and C, functional programming is worth investigation.

## Rust

The Rust language, like Go, offers a few twists on the semantic model of C. Rust’s main trick is to enforce greater memory safety, especially in the context of concurrency. As of yet, Rust has less adoption than Go, but it may take off in the near future.

## iOS and Android development

It’s now possible to run natively compiled code (such as written in C or C++) on both iOS and Android. However, to make a complete application, your natively compiled code has to talk to the system *via* the Swift language on iOS or *via* Java on Android. So if you want to create mobile applications, you’ll have to deal with these prescribed languages in some capacity.







