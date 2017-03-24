

# high-level programming languages

High-abstraction programming languages give a programmer conveniences by taking away the programmer’s control. High-level code specifies larger units of action while the language handles the precise details. Whereas each line of code in assembly corresponds directly to one or two machine instructions, each line in a high-level language corresponds potentially to many machine instructions. Whereas assembly code is specific to an ISA (Instruction Set Architecture), high-level code can be compiled for different ISA's.

***Syntax and semantics***: At heart, a language is a set of syntactical and semantic rules. Syntax is the set of rules of how the source text is written; semantics are the rules of meaning behind the source text. That comments in Pigeon begin with # and run to the end of the line is a syntax rule; that functions in Pigeon must be called with a fixed number of arguments is a semantic rule.

***Object code***: Machine instructions, but with symbolic names used as stubs in place of some addresses.

***Linker***: A program that patches together files of object code to produce executables.

***Dynamic linking***: An operating system feature that allows code to be linked into an already running process. This allows many programs to make use of the same library code without wasting storage space and memory. On Linux, object files meant to be dynamically linked are called shared-object files and end in *.so*. On Windows, they are called dynamic-linking libraries and end in *.dll*.

***Compiler***: A program that translates one form of code into another—usually high-level language source code into object code. Unlike with assemblers, this is usually not a simple one-to-one translation, hence the different term.

***Interpreter***: A program that translates code into action: as the interpreter reads each statement of code, it does what the code says to do rather than producing another form of code. When code is interpreted, usually any linking that needs to be done is done at runtime by the interpreter.

***Virtual machine***: A kind of interpreter that doesn’t interpret source code but rather some kind of intermediate code resembling machine instructions. In Java, they call this intermediate code *bytecode*. In C#, they call it *IL* (Intermediate Language) code.

***JIT (Just-In-Time) compilation***: With Just-In-Time compilation, an interpreter or VM, instead of interpreting a piece of code, may choose to compile it into machine code and then have that machine code execute. The Java VM, .NET CLR, and today's Javascript engines do JIT compilation.

***Garbage collection (GC)***: A language feature that automatically keeps track of which data is still being used. When a piece of data is no longer used, the garbage collector marks its memory for reuse. With automatic garbage collection, we don’t have to worry so much about memory leaks (though it is still possible to create them).

***Type error***: A type error is supplying the wrong type of operand to an operator or supplying the wrong type of argument to a function.

***Static typing***: In a statically-typed language, type errors can be programatically detected without actually running the code. When the compiler detects a type error, it will abort compilation and report the problem. This effectively eliminates a whole class of potential bugs.

***Dynamic typing***: In a dynamically-typed language, type errors cannot be programatically detected without running the program. Most dynamically-typed languages are strongly typed, meaning that the wrong type of operand supplied to an operation will cause an error when the operation is executed. (This is generally desirable: you don’t want your code to blindly continue, oblivious to the type error.)

***Polymorphism***: When an operation or function accepts a varied number of inputs and/or varying types of inputs, it is polymorphic. In a dynamically-typed language, we create a polymorphic function by simply testing the number/types of the parameters and branching as we see fit, *e.g.* ‘if the second argument is a number, do this, otherwise do that’. In a statically-typed language, if the language supports polymorphism, we can declare a function of the same name multiple times but with differing numbers and/or differing types of parameters; each version of the function need not return the same type as any of the other versions; in effect, the versions are really just separate functions that happen to share the same name.

***Weak typing***: A weakly-typed language allows for arbitrary manipulation of any data. In this sense, the data types are open for improper operations, hence “weak”. Assembly and C are the primary examples of weakly-typed languages.

***Strong typing***: A strongly-typed language only allows manipulation of a piece of data through operations intended for its type. In dynamically-typed languages, strong typing requires checking the types of the operands to every operation each time they are executed. This overhead degrades performance. In statically-typed languages, the compile-time type-checking makes runtime checking unnecessary. 

(While C is statically-typed, it is still weakly-typed because C pointer arithmetic allows C code to arbitrarily modify any bytes of data. Once you can arbitrarily muck with bits, the static typing system can’t stop you from doing whatever you want, whether “type valid” or not.)

## imperative vs. functional

Code written in assembly and most high-level languages is ***imperative***: the code is a series of instructions that command the machine to perform actions. The opposite of imperative is ***functional***. In FP, we avoid *state* (data that changes over time). Functional, stateless code takes fixed, unchanging values as input and spits out fixed, unchanging values as output. Instead of commanding the machine to modify existing pieces of data in memory, our code defines how a given set of input values produces output values. If all (or at least most) of our program’s code is stateless in this way, the program will generally be easier to understand and reason about.

***Procedural vs. object-oriented***: Procedural code is composed of data types and functions (which are sometimes also called 'procedures'). Procedural code can be functional, but is most commonly imperative. Object-oriented code is composed of data types and ***methods*** (functions that 'belong' to data types). Object-oriented code can be functional but is most commonly imperative. (We'll discuss the theory behind Object-Oriented Programming much later.)

***Library***: A body of code that provides commonly useful functionality. Most languages provide a *standard library*, a body of code that comes stock with the language.

***Idiom***: A small-scale pattern that frequently occurs in code of a particular language.

***Tool***: Any program that helps software development. Assemblers, compilers, text editors, debuggers, *etc.* are all tools.

***Debugger***: A tool that allows you to track and pause execution of your code and see what is happening in memory.

***Profiler***: A tool that helps you measure performance of your code (both in terms of execution time and memory use).

***Version control***: A tool that helps you keep track of changes in code as it is developed and helps developers merge their work together.

***IDE (Integrated Developer Environment)***: A tool that ties together a text editor and other tools into one graphical interface such that running or debugging your code can be done more conveniently.

***Efficiency***: Interpretation, dynamic typing, and garbage collection tend to introduce overhead at runtime, so the fastest languages are generally statically typed and compiled to machine code.

***Portability***: Portability first hings on the ability to translate your source into something runnable on all of your target platforms, so assembly is the antithesis of portable. Portability also requires that the libraries you use be available on all target platforms. Lastly, portability requires that the target platforms all support the needed capabilities.

***Functional languages***: Some lanuages are designed with the functional paradigm in mind. These include Haskell, Scala, ML, and F#. None of these are super popular, but they have their adherants.

***Shell language***: A shell language is designed to be primarily used interactively as a command prompt. The most common shell on Unixes is called BASH, which we’ll cover in a later unit.

***Scripting language***: Shell languages and dynamic languages have often been called *scripting* languages because they are commonly used to run and orchestrate other programs. Programs written in shell languages, especially, are called *scripts*.

***Data language***: A data language is not a programming language, *per se*, but rather a human-readable way to textually express data. XML, for instance, is a standard syntax for expressing hierarchical data of all kinds.

***Query language***: A language for requests to a database.

***Domain-specific language***: A language intended to solve a limited class of problems in a limited domain. 

***Graphical language***: A language in which the code is expressed graphically, either whole or in part, instead of textually. Some domain-specific languages are successfully expressed graphically, but graphically expressing code of a general-purpose language has never taken off (it's probably just a bad idea).