# computer hardware

Computer systems can be loosely grouped into these types:

 - **client/workstation**: A general-purpose system primarily for interactions with a human user, such as a PC.
 - **server**: A system primarily used to respond to requests from other systems across the network.
 - **handheld**: Like a client/workstation, but miniaturized, *e.g.* cell phones.
 - **embedded sytsem**: A sytem designed to perform one or a few dedicated functions. It is embedded as part of a complete device, such as a car or toaster.
 - **mainframe**: A server for high-performance data-handling. Used primarily by large organizations for large data processing needs. Mainframe use has steeply declined since the 1980’s.
 - **supercomputer**: A system for high-performance computation. Used primarily in scientific modeling, such as predicting the weather.

These types differ mainly in their power and performance characteristics. Whatever the type, a computer fundamentally consists of three core componenets:

 - one or more CPU’s (Central Processing Units)
 - system memory, *a.k.a.* RAM (Random Access Memory)
 - I/O (input/output) devices

## system memory

System memory is...

 - a series of bytes, addressed starting from 0: address 0 is the first byte, address 1 is the second, address 2 is the third, *etc.*
 - *volatile*, meaning the bits of RAM randomly flip when the RAM loses power
 - much faster than hard drives (even Solid State Drives)

CPU's can only read and write whole bytes of memory, not individual bits.

The code of running programs is copied into memory. Running programs also use memory as a place to store data during their execution. Any data the program wants to persist must be stored on some kind of non-volatile storage, such as a hard drive.

## CPU's (Central Processing Units)

A CPU is a piece of circuitry that executes *instructions* (*a.k.a.* *binary instructions*, *machine instructions*, *native instructions*). Each instruction is a sequence of bits recognized by the processor as instructing it to perform some action.

A ***register*** is a small storage area in a processor. Modern CPU’s tend to have between a few dozen and a few hundred registers, each register typically 32 to 128 bits in size.

The set of instructions understood by the CPU and its set of registers differs between different CPU's. When two processors implement the same ***ISA (Instruction Set Architecture)***, they have the same registers and can understand the same instructions, so they can both run the same machine code. The most prevelant ISA today is *x86*, used in Intel and AMD processors in PC’s. ISA’s tend to evolve over time such that later processors extend the set of registers and instructions. Newer x86 processors, for example, can run code which older x86 processors cannot.

The number of bits used to represent a memory address depends upon the CPU. Recent x86 processors have addresses up to 64 bits.
 
A system can have multiple CPU’s, each of which executes instructions independently of the others. It's also possible for each CPU to have multiple 'cores', each of which executes instructions independently of the others. A new PC today typically has a single CPU with 2 to 4 cores.

## big-endian vs. little-endian

Whether a system is big-endian or little-endian determines how bytes get copied between memory and registers. In a big-endian system, the most-significant byte is copied first, *e.g.* the instruction which copies address *A* into register *R* copies the byte at *A* into the most-significant byte of *R*, *A+1* into the next byte of *R*, *A+2* into the next byte of *R*, and so on. In a little-endian system, the *least*-significant byte is copied first. The choice of endianness is mostly arbitrary. For historical reasons, most CPU's today are little-endian.

## memory hierarchy

The storage locations of a computer are often thought of as forming a hierarchy. At the top are the fastest but smallest locations: the registers of the CPU. At the bottom are the slowest but largest locations: hard drives (and other kinds of high-capacity long-term storage).

In between the registers and system RAM, we have the processor’s cache. The cache is controlled automatically by the CPU such that, when it reads bytes from memory, those bytes get stored in cache. As long as those bytes of memory remain copied in cache, the CPU can subsequently read the cache instead of having to read bytes from  actual memory. The more code can stick to reading/writing cache instead of memory, the better it will perform.

Today’s newer CPU’s in PC's have caches of a few to several megabytes in size.

## I/O devices

An input device sends data for the CPU to read. An output device receives data from the CPU. An input/output device both sends and receives data.

 - example input devices include: keyboards, mice, microphones, game controllers
 - example output devices include: monitors, printers, sound devices
 - example input/output devices include: hard drives, flash drives, and other kinds of storage devices

(In truth, very few devices purely do just input or just output. A keyboard, for example, receives commands from the CPU to turn its lights on and off, and a printer sends status information to the CPU.)

I/O devices contain their own registers, and it is these registers which the CPU reads and writes to communicate with the device.

In a system with ***port-mapped I/O***, the CPU reads and writes the device registers using input/output instructions specifying the registers by *port numbers*. Ports are effectively a separate 'address space'.

In a system with ***memory-mapped I/O***, the CPU reads and writes the device registers using regular copy instructions. For this to work, certain addresses are mapped to devices rather than to memory.

## polling vs interrupts

***Polling*** refers to when the code run by the CPU periodically checks a device's registers to see if the device needs the CPU to do something. The obvious problem with polling is that doing this constant checking wastes CPU time.

An ***interrupt signal*** sent from an I/O device causes the CPU to jump execution to an address designated in the ***interrupt table*** (a table of addresses in a designated place in memory). When the interrupt handling code is finished, the processor generally resumes whatever it was doing when the interrupt signal came in.

A ***hardware exception*** is like an interrupt but triggered by the CPU itself when it executes an invalid instruction. For example, some CPU's will trigger an exception when they divide a number by zero.

## boot firmware

The ***boot firmware*** is the code which the CPU runs upon powering on. This code usually resides in a ROM (Read-Only Memory) chip on the motherboard. On older PC’s, this chip is called the BIOS (Basic Input/Ouput System). On newer PC's, the boot firmware is part of what's called the UEFI (Unified Extensible Firmware Interface). The principle job of boot firmware is to begin the loading of the operating system, which usually resides on a hard drive.

