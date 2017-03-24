# operating systems

An ***operating system*** (OS)...

 - loads and manages the running of other programs
 - provides hardware access to the programs *via* ***system calls***
 - provides storage device access to the programs *via* a ***filesystem***
 - provides a user interface for starting and managing running programs

The most popular OS’s today are Windows, Linux, and OS X. Linux and OS X are both *Unix-like* operating systems, meaning they follow a set of conventions established by a (now defunct) OS from the 1970's that was called *Unix*. 

In this lesson, we'll stick to describing what all three have in common.

## interrupts

While a CPU controls I/O devices by reading and writing their registers, the only control an I/O device has over the CPU is to send *interrupt signals*. When a device sends the CPU an interrupt signal, the CPU suspends execution of whatever it's doing and jumps execution to the device's associated *interrupt handler*. An interrupt handler is a small piece of OS code that typically reads data from registers of a device and responds accordingly. Without interrupt signals, a device would have no means of telling the CPU when it needs attention.

## device drivers

The interrupt handler and other code associated with a device is called its ***device driver***. How exactly a device is controlled varies from one device to another, so every system must have the correct drivers for its particular hardware. Device drivers are typically plug-in modules of the OS that can be added and removed individually.

## process scheduling

A running program managed by the OS is called a ***process***. When we have more processes running than our system has CPU core’s, the processes can’t literally all run at the very same moment, so we need them to take turns. 

When an interrupt handler finishes running, it jumps execution to the OS's *scheduler* code. The scheduler decides which process should get to run next and then resumes execution of that process.

Without interrupts, a process could keep using a core forever, and the OS would be unable to stop it. To ensure that processes can't hog the CPU for too long, a clock device sends interrupts at regular intervals. (The length of interval is configurable by the OS at system start up. The typical configured length is between 1 and 10 milliseconds.)

## hardware exceptions

Certain instructions in certain cases may trigger *hardware exceptions*. When a hardware exception occurs, execution jumps to a predesignated handler in the OS. For example, some CPU's will trigger an exception when an instruction attempts to divide by zero. Dividing by zero is an invalid operation, so attempting to divide by zero is probably a bug in the code. The exception handler in the OS can then respond to the problem (perhaps by somehow recovering from the problem...or perhaps by simply aborting the process).

## privilege modes

A modern CPU has at least two different privilege modes: in the highest privilege mode, the CPU can do anything; in other modes, executing certain instructions and accessing certain addresses may trigger hardware exceptions.

OS code runs in highest-privilege mode such that it can do anything, but processes run in a low-privilege mode such that they cannot directly access I/O devices and can only access memory addresess as authorized by the OS. When an interrupt or exception occurs, the CPU is kicked up to highest-privilege mode. Before the scheduler resumes execution of a process, it sets the CPU back down to a low-privilege mode.

## virtual memory

In low-privilege modes, a memory address in an executed instruction gets translated according to a special set of tables used by the CPU. For example, if these tables tell the CPU that *virtual address* 300 maps to *physical address* 1500, an instruction to copy the byte at address 300 will actually copy the byte at address 1500. 

Each process has its own set of these memory tables, which effectively control what physical addresses the process can access. Before the scheduler resumes execution of a process, it configures the CPU core to use that processes's memory tables.

In effect, each process has its own *virtual* address space: what virtual address *N* means in one process can be totally different than what virtual address *N* means in another. Because only the OS controls the process memory tables, the OS can ensure that no process has access to the OS's own memory or to the memory of another process.

Virtual addresses are usually mapped to physical addresses in chunks called *pages*. The size of a page depends upon the processor and OS, but 4 KiB (4 kibibytes = 4096 bytes) is typical.

## system calls

Because a process runs in a low-privilege mode, it cannot directly talk to the I/O devices. Instead, a process must invoke OS code to interact with the I/O devices on its behalf. However, a process doesn't have access to the OS's memory and so can't jump execution to any arbitrary OS address.

Enter *system calls*. When a process executes a system call instruction, it specifies a system call number in the instruction, and the CPU jumps execution to the OS address associated with that system call number. In effect, an ordinary process can invoke high-privileged code in the OS, but only at pre-designated addresses. (Actually, some platforms invoke system calls a bit differently, but the way just described is typical.)

When a system call completes its business, it usually jumps execution back to the process. In some cases, however, a system call *blocks* the process that invoked it. A blocked process will not be scheduled to run because it is waiting for something that isn't yet ready. For example, when a process invokes a system call to read a file, it may take a long time (in computer relative terms) to read the data off a disk. Rather than waste a CPU core while waiting for an I/O device to do its business, the OS blocks the process, letting other processes uses the CPU core. When the data read from disk is finally ready, the OS will unblock the process, allowing it to run again. (The unblocked process doesn't necessarily resume execution immediately: it must wait for the scheduler to give it another turn.)

## memory allocation

When a process starts, its memory table has mapped pages for storing the program code itself and for a *call stack* (a place to store the local variables and other transient data of the function calls). All virtual addresses outside of these pages start out unmapped, and so using them in instructions will trigger hardware exceptions.

The process can map more pages of virtual memory to physical memory using certain system calls. (We'll discuss the specific calls in a later lesson.) A process can also *unmap* pages, freeing the associated physical memory for use by other processes. (Many programs never bother to unmap memory. If a program runs for a long time and uses a lot of memory, it should probably be a good citizen and unmap pages that it no longer is using.)

It's also possible to share memory between processes if they each map their own virtual pages to the same shared physical pages. Sharing memory between processes can sometimes be beneficial for performance: multiple separate processes can run simultaneously on different CPU cores while working with the same data. Because sharing memory between processes is an obvious security risk, it requires the processes to have special privileges (discussed shortly).

## page swapping

It's often the case that many pages of processes go unused for long periods. To free space in physical memory, the OS may decide to temporarily swap out dormant pages to disk: the page's data is copied to disk, and the page in the memory table is marked as 'swapped'. When a process attempts to use an address in a swapped page, a hardware exception is triggered; the exception handler copies the page data back into a page of physical memory and reconfigures the memory tables before jumping execution back to the instruction that triggered the exception. This is entirely transparent: the process doesn't know nor need to know which of its pages are swapped out at any moment.

Thanks to page swapping, the total memory used by all running processes can exceed the physical RAM of the whole system. However, swapping pages to and from disk is very slow relative to reading and writing memory. If the processes frequently access more pages than fit in RAM, the system will thrash as it constantly copies pages to and from disk.

## the file system

A system may have many I/O devices for storage, and these devices may store data in quite different ways. To spare programs from these concerns, the OS provide a higher-level abstraction called the ***file system***. (We'll cover the details in another lesson).