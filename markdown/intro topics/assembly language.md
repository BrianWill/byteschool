# assembly language

![under construction](/static/images/construction.gif)

In an ***assembly language***, each line corresponds directly to one or two machine instructions.

Each processor instruction set requires its own assembly language, *e.g.* x86 assembly differs from MIPS assembly. Moreover, assembly code is particular to each individual assembler, so for instance, x86 assembly code written for the GAS assembler for x86 won’t assemble using the MASM assembler for x86.

The most popular assemblers for x86 include:

 - GAS (Gnu Assembler)
 - MASM (Microsoft Macro Assembler)
 - NASM (Netwide Assembler)
 - FASM (Flat Assembler)

Because the x86 ISA (Instruction Set Architecture) is very complex, for now we'll only cover a reductively simple assembly language for a fictional ISA. Though, simplified, our fictional processor will be fully capable of performing any task---just not with the performance of real processors.

We'll also disregard the role of operating systems and assume our code has unrestricted access to memory and the I/O devices.

Our fictional processor has eight 32-bit registers, which we'll call r1, r2, r3, r4, r5, r6, r7, and r8. Its memory addresses are 32-bits in size (thus limiting our system to a max of 4GB). We'll denote memory addresses in hex, *e.g.* `0xFF_FF_FF_FF`.

In our fictional system, addresses `0x00_00_00_00` through `0xBF_FF_FF_FF` (the first 3GB) are mapped to RAM. The remaining addresses, `0xC0_00_00_00` through `0xFF_FF_FF_FF` (the last GB) are mapped to I/O devices:

 - `0xC0_00_00_00` through `0xCF_FF_FF_FF` (256MB) is ROM storing the boot firmware
 - `0xD0_00_00_00` through `0xDF_FF_FF_FF` (256MB) is the graphics framebuffer 
 - `0xE0_00_00_00` through `0xE0_00_00_FF` (256B) is the keyboard buffer

(We're mapping far more addresses for I/O than we need, but for our purposes, we just want big round hex numbers.)

When our system boots, it begins executing code at 0xC0_00_00_00. Our CPU will only read instructions from the boot ROM.

The first byte of every instruction is an ***opcode*** denoting the operation. Some opcodes are followed by additional bytes of data. To specify a register requires a single data byte; specifying an address requires four bytes; specifying a 32-bit value requires four bytes.

A number of instructions use 0 (0x00_00_00_00) to represent *true* and -1 (0xFF_FF_FF_FF) to represent *false*.

When we write an instruction in assembly, we denote the instruction with a *mnemonic*, a short name for the instruction. Some opcodes in our fictional assembly share the same opcode but are distinguished by taking different kinds of inputs, *e.g.* an instruction taking a register as input is different from an instruction taking a value as input.

A register prefixed with a register and an offset inside `[]` denotes an address which is the sum of the two registers and the offset. The offset is a signed 16-bit integer. For example, if register r1 holds the value 0x00_AA_BB_C4 and r2 holds the value 0x00_00_00_02, then `[r2 -3]r1` represents the address 0x00_AA_BB_C3 (because we add 2 and subtract 3). We'll call such notation an ***indirect address***. If the offset is 0, we can leave it implicit, *e.g.* `[r1][r2]` is the address which is the sum of just r1 and r2. An indirect address requires four data bytes to represent: one byte for each register, and two bytes for the offset.

The instructions are divided into six groups:

 - copy instructions (opcodes 0x00 through 0x07)
 - arithmetic instructions (opcodes 0x10 through 0x14)
 - comparison instructions (opcodes 0x20 through 0x24)
 - bit logic instructions (opcodes 0x30 through 0x35)
 - bit shift instructions (opcodes 0x40 through 0x46)
 - jump instructions (opcodes 0x40 and 0x41)

## copy instructions

### opcode 0x00: copy the value in one register to another

```
copy r1, r2          # copy value in r2 to r1
```

(Putting the destination before the source is the convention in x86 assembly. To avoid future confusion, we'll follow the same convention in our fictional assembly.)

### opcode 0x01: copy the value in a register to an address

```
copy 0xA0_00_00_00, r6      # copy value in r6 to address 0xA0_00_00_00
```

Because our system is big-endian:

 - the most significant byte of r6 is copied to 0xA0_00_00_00
 - the second-most significant byte of r6 is copied to 0xA0_00_00_01
 - the third-most significant byte of r6 is copied to 0xA0_00_00_02
 - the least significant byte of r6 is copied to 0xA0_00_00_03

(We cannot write to the boot ROM. Attempting to do so does nothing.)

### opcode 0x02: copy an address to a register

```
copy r6, 0xA0_00_00_00      # copy four bytes starting at address 0xA0_00_00_00 to r6
```

Because our system is big-endian:

 - the byte at 0xA0_00_00_00 is copied to the most significant byte of r6
 - the byte at 0xA0_00_00_01 is copied to the second-most significant byte of r6 
 - the byte at 0xA0_00_00_02 is copied to the third-most significant byte of r6
 - the byte at 0xA0_00_00_03 is copied to the least significant byte of r6

### opcode 0x03: copy four bytes at address to another address

```
copy 0xA0_00_00_00, 0xB0_00_00_00      # copy four bytes starting at address 0xB0_00_00_00 to address 0xA0_00_00_00
```

 - the byte at 0xB0_00_00_00 is copied to 0xA0_00_00_00
 - the byte at 0xB0_00_00_01 is copied to 0xA0_00_00_01
 - the byte at 0xB0_00_00_02 is copied to 0xA0_00_00_02
 - the byte at 0xB0_00_00_03 is copied to 0xA0_00_00_03

### opcode 0x04: copy a value to a register

```
copy r3, 0xAA_BB_CC_DD                 # copy value 0xAA_BB_CC_DD to r3
```

As a convenience, we can write these values in decimal:

```
copy r3, 18                            # copy value 0x00_00_00_12 to r3
```

### OPCCODE 0x05: copy the four bytes in a register to four bytes at an indirect address

```
copy [r3 -10]r2, r7          # copy the four bytes in register r7 to the address which is the sum of r3, r2, and -10
```

### OPCCODE 0x06: copy the four bytes at an indirect address to a register

```
copy r7, [r3 -10]r2          # copy to r7 the four bytes at the address which is the sum of r3, r2, and -10
```

### OPCCODE 0x07: copy the four bytes at an indirect address to the four bytes at another indirect address

```
copy [r8]r4, [r3 -10]r2      # copy to four bytes at (r3 + r2 - 10) to the four bytes at (r8 + r4 + 0)
```

## arithmetic instructions

We can only perform arithmetic on data in the registers. To perform arithmetic on data in memory, we have to copy the data into registers.

### opcode 0x10: add one register to another

The result is written to the first specified register.

```
add r1, r2, r3          # add r2 to r3, storing result in r1
add r5, r8, r5          # add r8 to r5, storing result in r5
```

(Be clear that only the destination register is modified, but the destination can also be used as input to the instruction.)

Adding two 32-bit values in some cases results in a 33-bit value, but the destination register is always just 32 bits, so the most-significant bit of a 33-bit result is discarded. This is called ***overflow***.

### opcode 0x11: subtract one register from another

```
sub r1, r2, r3          # sub r3 from r2, storing result in r1
sub r5, r8, r5          # sub r5 from r8, storing result in r5
```

Subtracting two 32-bit values in some cases results in 33-bit values, but the destination register is always just 32 bits, so the most-significant bit of a 33-bit result is discarded. This is called ***underflow***.

### opcode 0x12: multiply one register by another

Because multiplying two 32-bit values in some cases results in 33- to 64-bit values, we need two registers to store the full result.

```
mul r6, r3, r3, r4       # multiply r3 and r4, storing the 4 most-significant bytes of the result in r6 and the 4 least-significant bytes in r3
```

### opcode 0x13: divide one register by another

The integer result is written to the first register; the remainder is written to the second register.

```
div r2, r8, r1, r8      # divide r1 by r8, storing the integer result in r2 and the remainder in r8
```

### opcode 0x14: check for overflow or underflow

A special register in the CPU has an overflow/underflow bit flag. An arithmetic instruction that overflows or underflows sets the flag. An arithmetic instruction that does *not* overflow or underflow clears the flag. To read this flag, we use the `flow` instruction. (Again, we use 0 to represent true and -1 to represent false.)

```
flow r1             # write 0 or -1 to r1 (depending whether the last arithmetic instruction overflowed or underflowed)
```

## comparison instructions

### opcode 0x20: compare two registers for equality

```
eq r1, r2, r3      # if r2 and r3 have equal values, write 0 to r1; otherwise write -1 to r1
```

### opcode 0x21: compare two registers for inequality, writing true/false to a register

Like `eq`, but writes true if the values are *not* equal, false if they are equal.

```
neq r1, r2, r3     # if r2 and r3 do not have equal values, write 0 to r1; otherwise write -1 to r1
```

### opcode 0x22: compare if one register has a value greater than another, writing true/false to a register

```
gt r1, r2, r3      # if the value in r2 is greater than the value in r3, write 0 to r1; otherwise write -1 to r1
```

### opcode 0x23: compare if one register has a value less than another, writing true/false to a register

```
lt r1, r2, r3      # if the value in r2 is less than the value in r3, write 0 to r1; otherwise write -1 to r1
```

### opcode 0x24: compare if one register has a value greater than or equal to another, writing true/false to a register

Like `gt`, but tests true if the values are equal:

```
copy r1, 100
copy r2, 99
gt r8, r1, r2          # writes 0 to r8
gte r8, r1, r2         # writes 0 to r8
copy r2, 100
gt r8, r1, r2          # writes -1 to r8 (100 is not greater than 100)
gte r8, r1, r2         # writes 0 to r8
```

### opcode 0x25: compare if one register has a value less than or equal to another, writing yes/no to a register

Like `lt`, but tests true if the values are equal:

```
copy r1, 99
copy r2, 100
lt r8, r1, r2          # writes 0 to r8
lte r8, r1, r2         # writes 0 to r8
copy r2, 99
lt r8, r1, r2          # writes -1 to r8 (99 is not less than 99)
lte r8, r1, r2         # writes 0 to r8 
```

## bit logic instructions

### opcode 0x30: logical 'and' of two registers

An 'and' operation sets bits in the result to 1 when the two corresponding bits in the inputs are both 1's. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
1001_0010       (the bitwise 'and' of the two 8-bit values)
```

Example instruction:

```
and r4, r8, r2       # write to r4 the result of r8 'and' r2
```

### opcode 0x31: logical 'and' of a register and a value

The value can be decimal or hex.

```
and r4, r8, 32       # write to r4 the result of r8 'and' 0x00_00_00_20 (decimal 32)
```

### opcode 0x32: logical 'or' of two registers

An 'or' operation sets bits in the result to 1 when the two corresponding bits in the inputs have at least 1. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
1111_1011       (the bitwise 'or' of the two 8-bit values)
```

Example instruction:

```
or r4, r8, r2       # write to r4 the result of r8 'or' r2
```

### opcode 0x33: logical 'or' of a register and a value

```
or r4, r8, 32       # write to r4 the result of r8 'or' 0x00_00_00_20 (decimal 32)
```

### opcode 0x34: logical 'xor' ('exclusive or') of two registers

An 'xor' operation sets bits in the result to 1 when the two corresponding bits in the inputs have just one 1. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
0110_1001       (the bitwise 'xor' of the two 8-bit values)
```

Example instruction:

```
xor r4, r8, r2       # write to r4 the result of r8 'xor' r2
```

### opcode 0x35: logical 'xor' ('exclusive or') of a register and a value

```
xor r4, r8, 32       # write to r4 the result of r8 'xor' 0x00_00_00_20 (decimal 32)
```

## bit shift instructions

### opcode 0x40: shift bits left (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
1000_1100            (the above value shifted left by 2 places)
```

Shifting left always sets the least-significant bits to 0's, *e.g.* the result of shifting left 3 places always has 3 zeroes in the least-significant bits.

```
lshift r1, r2, 5       # store in r1 the result of shifting the bits in r2 left by 5 places
```

### opcode 0x41: shift bits left (inputs from two register)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
lshift r1, r2, r3       # store in r1 the result of shifting the bits in r2 left by 7 places
```

### opcode 0x42: shift bits right, zero-extend (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
0011_1000            (the above value shifted right by 2 places, zero-extended)
```

A zero-extended right shift sets the most-significant bits to 0's, *e.g.* the result of shifting right (zero-extended) 3 places always has 3 zeroes in the most-significant bits.

```
zrshift r1, r2, 5       # store in r1 the result of shifting the bits in r2 right by 5 places
```

### opcode 0x43: shift bits right, zero-extend (inputs from two register)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
zrshift r1, r2, r3       # store in r1 the result of shifting the bits in r2 left by 7 places (zero-extended)
```

### opcode 0x45: shift bits right, sign-extend (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
1111_1000            (the above value shifted right by 2 places, sign-extended)

0110_0011            (an 8-bit value)
0001_1000            (the above value shifted right by 2 places, sign-extended)
```

A sign-extended right shift sets the most-significant bits to 1's or 0's depending on the most-significant bit of the input.

```
rshift r1, r2, 5       # store in r1 the result of shifting the bits in r2 right by 5 places
```

### opcode 0x46: shift bits right, sign-extend (inputs from two register)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
rshift r1, r2, r3       # store in r1 the result of shifting the bits in r2 right by 7 places (sign-extended)
```

## jump instructions

Normally, after executing an instruction, the processor executes the next instruction, *e.g.* after executing a 3-byte instruction at 0xC0_00_00_00, the processor executes the instruction at 0xC0_00_00_03. A jump instruction tells the CPU to next execute an instruction at some specified address.

### opcode 0x50: jump to a specified address

```
jump 0xC0_00_F0_AB          # jump execution to 0xC0_00_F0_AB
```

### opcode 0x51: jump to a specified address only if the value in the specified register is 0x00_00_00_00

```
zjump r2, 0xC0_00_F0_AB     # if the value in r2 is 0, jump execution to 0xC0_00_F0_AB
```

## instruction labels

Our assembly code is written as a list of instructions, line-by-line. When we want to jump back to an instruction, we need to know its numeric address, which requires counting up the number of bytes occupied by all previous instructions and adding that number to the address of the first instruction. Not only is this extremely tedious and error-prone, we'll have to recompute the address any time we add, remove, or modify prior instructions!

To spare us this enormous hassle, assemblers let us label our instructions. A label can consist of letters of the alphabet, numerals, and underscores, and is denoted by ending with a colon. A label either precedes the instruction it labels (either on the same line or on the next non-blank line):

```
foo: copy r1, r2            # this instruction is labeled 'foo'
```

When the assembler translates our code, it computes the address represented by each label, and so we can use a label name in place of an address in a copy or jump instruction:

```
jump foo                    # jump to the address represented by the label 'foo'
```

## data labels





## stack management



## function calls and the call stack


## call stack

 - the ***call stack*** stores the local variables of the called functions. The call stack is so-called because it is organized into a stack, a LIFO (last-in, first-out) data structure in which we only remove the last thing added. For each function call, we add to the stack a “frame”, which consists of the local variables for that call and the return address (the address to jump back to when the function returns). The parameter variables are given their initial values from the arguments to the function.


## heap memory

 - the ***heap*** stores data which is too large to store on the stack and/or which needs to live beyond the function call in which it was created



## hardware execptions



## hardware interrupts





The memory used by a running program has three main sections:

 - the oddly named ***text*** section contains the program instructions. The text is almost always treated as read-only. (In principle, a program could intentionally modify its own code during execution, but such “self-modifying” code is generally frowned upon as being overly clever and error-prone.)


