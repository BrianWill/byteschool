# assembly language

In an ***assembly language***, each line corresponds directly to one or two machine instructions.

Each processor instruction set requires its own assembly language, *e.g.* x86 assembly differs from MIPS assembly. Moreover, assembly code is particular to each individual assembler, so for instance, x86 assembly code written for the GAS assembler for x86 won’t assemble using the MASM assembler for x86.

The most popular assemblers for x86 include:

 - GAS (Gnu Assembler)
 - MASM (Microsoft Macro Assembler)
 - NASM (Netwide Assembler)
 - FASM (Flat Assembler)

Because the x86 ISA (Instruction Set Architecture) is very complex, for now we'll only cover a reductively simple assembly language for a fictional ISA. Though simplified, our fictional processor will be fully capable of performing any task---just not with the performance of real processors.

We'll also disregard the role of operating systems and assume our code has unrestricted access to memory and the I/O devices.

## I/O devices

Our simple system will have just one input device, a keyboard, and one output device, a printer. We read bytes of ASCII text from the keyboard and write bytes of ASCII text to the printer.

## addresses

In our fictional system, addresses are 32-bits in size (thus limiting our system to a max of 4GB). We'll denote addresses in hex, *e.g.* `0xFFFF_FFFF`.

Addresses `0x4000_0000` through `0xFFFF_FFFF` (the last 3GB) are mapped to RAM.

The first GB of addresses, `0x0000_0000` through `0x3FFF_FFFF` (the last GB) are mapped to I/O devices:

 - `0x0000_0000` through `0x0F_FF_FF_FF` (256MB) is the ROM storing our code
 - `0x2000_0000` is the keyboard buffer status register
 - `0x2000_0001` is the keyboard buffer data register
 - `0x2000_0002` is the display buffer status register
 - `0x2000_0003` is the display buffer data register

All other addresses remain unmapped. (We're mapping far more addresses for I/O than we need, but for our purposes, we just want big round hex numbers. We'll discuss the keyboard and display buffers in a later lesson.)

Our CPU will only read instructions from the boot ROM.

The first byte of every instruction is an ***opcode*** denoting the operation. Some opcodes are followed by additional bytes of data. To specify a register requires a single data byte; specifying an address or 32-bit value requires four bytes.

## registers

Our fictional processor has ten 32-bit registers, which we'll call `r0`, `r1`, `r2`, `r3`, `r4`, `r5`, `r6`, `r7`, `sp` ('stack pointer'), and `pc` ('program counter').

Registers `r0`, `sp`, and `pc` are special:

 - The value read from `r0` is always `0x0000_0000`: writing a value to `r0` doesn't change the value in `r0`.
 - The `sp` register stores the stack pointer of the call stack.
 - The `pc` register stores the address of the next instruction to execute. When an instruction is executed, `pc` is automatically updated to the address of the next instruction, *e.g.* when executing a 3-byte instruction at `0x0000_0070`, `pc` is automatically set to `0x0000_0073`. Jump instructions write a value to `pc` and thereby change what instruction will execute next.

When the system powers on, all registers are set to `0x0000_0000`, except `sp` is set to `0xFFFF_0000`, and `pc` is set to `0xC000_0000` (so that's where execution starts).

## true and false

Several instructions use 0 (0x0000_0000) to represent *true* and -1 (0xFFFF_FFFF) to represent *false*.

## address operands

When we specify addresses in instructions, we do so with two registers and an offset (a signed 32-bit integer) surrounded in `[]`. For example, if register `r1` holds the value `0x00AA_BBC4` and `r2` holds the value `0x0000_0002`, then `[r2 r1 -3]` represents the address `0x00AA_BBC3` (`0x00AA_BBC4` plus `0x0000_0002` minus `3`).

If the offset is omitted, it defaults to `0`. If we omit one or both registers, they default to `r0`.

An address operand requires six data bytes to represent: one byte for each register and four bytes for the offset.

## mnemonic

When we write an instruction in assembly, we denote the instruction with a *mnemonic*, a short name for the instruction. Some opcodes in our fictional assembly share the same opcode but are distinguished by taking different kinds of inputs, *e.g.* an instruction taking a register as input is different from an instruction taking a value as input.

## interrupts and exceptions

Our simple computer has no hardware interrupts or exceptions.

## instruction labels

Our assembly code is written as a list of instructions, line-by-line. When we want to jump to an instruction, we need to know its numeric address, which requires counting up the number of bytes occupied by all previous instructions and adding that number to the address of the first instruction. Not only is this extremely tedious and error-prone, we'll have to recompute the address any time we add, remove, or modify prior instructions!

To spare us this enormous hassle, assemblers let us label our instructions. A label can consist of letters of the alphabet, numerals, and underscores, and is denoted by ending with a colon:

```
foo: copy r1, r2              # this instruction is labeled 'foo'
```

When the assembler translates our code, it computes the address represented by each label, and so we can use a label name in place of an address in a copy or jump instruction. Basically, the 

```
jump [foo]                    # jump to the address represented by the label 'foo'
```

## data labels

Before our first instruction, we can label designated chunks of memory for storing data:

```
foo: 35 bytes                 # labeled chunk of 4 bytes
bar: 50 bytes                 # labeled chunk of 50 bytes
ack: 7 bytes                  # labeled chunk of 7 bytes
```

The label of the first chunk represents address `0x0000_0000`. Each successive label represents the previous address offset by the size of its chunk. Above, *foo* is `0x0000_0000`, *bar* is `0x0000_0032` (decimal `50`), and *ack* is `0x0000_0039` (decimal `57`).

We can specify string and number values to be written to these chunks before our first instruction executes. Strings are encoded as ASCII and terminated with a 0 byte; each number occupies a single byte unless it is suffixed with a `w`, in which case it occupies a word (4 bytes):

```
foo: 35 bytes "hello" 19      # labeled chunk of 35 bytes with string "hello", then a byte with the value 19
bar: 9 bytes 0x7B -82w        # labeled chunk of 9 bytes with 0x7B written to first byte and -82 written to the next four bytes
```

If we omit the number of bytes, it's inferred from the data:

```
foo: bytes "hello" 19w         # labeled chunk of 10 bytes (six bytes for the string and four bytes for the number)
```
