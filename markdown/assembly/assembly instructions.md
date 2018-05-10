# assembly instructions

The instructions of our fictional processor are divided into six groups:

 - copy instructions (opcodes 0x00 through 0x05)
 - arithmetic instructions (opcodes 0x10 through 0x17)
 - comparison instructions (opcodes 0x20 through 0x24)
 - bit logic instructions (opcodes 0x30 through 0x35)
 - bit shift instructions (opcodes 0x40 through 0x46)
 - jump instructions (opcodes 0x50 and 0x53)

Here is each instruction explained:

## copy instructions

In the mnemonics:

 - 'l' stands for 'load', meaning copy from memory to a register
 - 's' stands for 'store', meaning copy from a register to memory
 - 'w' stands for 'word', meaning 4 bytes

We cannot write to the addresses of the boot ROM. Attempting to do so does nothing.

#### opcode 0x00: copy the value in one register to another

```
copy r1, r2                 # copy value in r2 to r1
```

(Putting the destination before the source is the convention in x86 assembly. To avoid future confusion, we'll follow the same convention in our fictional assembly.)

#### opcode 0x01: copy a value to a register

```
copy r3, 0xAABB_CCDD        # copy value 0xAABB_CCDD to r3
```

As a convenience, we can write the values in decimal:

```
copy r3, 18                 # copy value 0x0000_0012 to r3
```

#### opcode 0x02: copy the least-significant byte of a register to an address

```
sb [0xA000_0000], r6        # copy least-significant byte of register r6 to address 0xA000_0000
```

#### opcode 0x03: copy byte at an address to least-significant byte of a register

```
lb r6, [0xA000_0000]        # copy byte at address 0xA000_0000 to r6
```

#### opcode 0x04: copy the 4 bytes of a register to an address

```
sw [0xA000_0000], r6        # copy value in r6 to address 0xA000_0000
```

Because our system is big-endian:

 - the most significant byte of r6 is copied to 0xA000_0000
 - the second-most significant byte of r6 is copied to 0xA000_0001
 - the third-most significant byte of r6 is copied to 0xA000_0002
 - the least significant byte of r6 is copied to 0xA000_0003

(We cannot write to the boot ROM. Attempting to do so does nothing.)

#### opcode 0x05: copy 4 bytes at an address to a register

```
lw r6, [0xA000_0000]        # copy four bytes starting at address 0xA000_0000 to r6
```

Because our system is big-endian:

 - the byte at 0xA000_0000 is copied to the most significant byte of r6
 - the byte at 0xA000_0001 is copied to the second-most significant byte of r6 
 - the byte at 0xA000_0002 is copied to the third-most significant byte of r6
 - the byte at 0xA000_0003 is copied to the least significant byte of r6

## arithmetic instructions

We can only perform arithmetic on data in the registers. To perform arithmetic on data in memory, we have to copy the data into registers.

#### opcode 0x10: add one register to another

The result is written to the first specified register.

```
add r1, r2, r3           # add r2 to r3, storing result in r1
add r5, r7, r5           # add r7 to r5, storing result in r5
```

(Be clear that only the destination register is modified, but the destination can also be used as input to the instruction.)

Adding two 32-bit values in some cases results in a 33-bit value, but the destination register is always just 32 bits, so the most-significant bit of a 33-bit result is discarded. This is called ***overflow***.

#### opcode 0x11: add a value and a register to a register

The value is a signed 32-bit number:

```
add r1, r2, -55          # add -55 to r2, storing result in r1
add sp, sp, 4            # add 4 to sp, storing result in sp
```

#### opcode 0x12: subtract one register from another

```
sub r1, r2, r3           # sub r3 from r2, storing result in r1
sub r5, r7, r5           # sub r5 from r7, storing result in r5
```

Subtracting two 32-bit values in some cases results in 33-bit values, but the destination register is always just 32 bits, so the most-significant bit of a 33-bit result is discarded. This is called ***underflow***.

#### opcode 0x13: multiply one register by another

Because multiplying two 32-bit values in some cases results in 33- to 64-bit values, we would need two registers to store the full result. For simplicity, our CPU simply truncates the result, returning just the lowest 32 bits, so you should be careful about multiplying large numbers.

```
mul r6, r3, r4           # multiply r3 and r4, storing the 32 least-significant bits of the result in r6
```

#### opcode 0x14: divide one register by another

The integer result of division is written to the first register. The remainder is discarded.

```
div r2, r1, r7           # divide r1 by r7, storing the integer result in r2
```

#### opcode 0x15: divide one register by another, storing remainder

A [modulus operation](https://en.wikipedia.org/wiki/Modulo_operation):

```
mod r2, r1, r7           # divide r1 by r7, storing the remainder in r2
```

#### opcode 0x16: reverse sign in register

```
neg r4                   # if the value in r4 is positive, make it negative; if the value in r4 is negative, make it positive
```

#### opcode 0x17: check for overflow or underflow

A special register in the CPU has an overflow/underflow flag bit. An arithmetic instruction that overflows or underflows sets the flag. An arithmetic instruction that does *not* overflow or underflow clears the flag. To read this flag, we use the `flow` instruction, which writes true or false to a register. (Again, we use 0 to represent true and -1 to represent false.)

```
flow r1                  # write 0 or -1 to r1 (depending whether the last arithmetic instruction overflowed or underflowed)
```

## comparison instructions

#### opcode 0x20: compare two registers for equality

```
eq r1, r2, r3             # if r2 and r3 have equal values, write 0 to r1; otherwise write -1 to r1
```

#### opcode 0x21: compare two registers for inequality, writing true/false to a register

Like `eq`, but writes true if the values are *not* equal, false if they are equal.

```
neq r1, r2, r3           # if r2 and r3 do not have equal values, write 0 to r1; otherwise write -1 to r1
```

#### opcode 0x22: compare if one register has a value greater than another, writing true/false to a register

```
gt r1, r2, r3            # if the value in r2 is greater than the value in r3, write 0 to r1; otherwise write -1 to r1
```

#### opcode 0x23: compare if one register has a value less than another, writing true/false to a register

```
lt r1, r2, r3            # if the value in r2 is less than the value in r3, write 0 to r1; otherwise write -1 to r1
```

#### opcode 0x24: compare if one register has a value greater than or equal to another, writing true/false to a register

Like `gt`, but tests true if the values are equal:

```
copy r1, 100
copy r2, 99
gt r7, r1, r2            # writes 0 to r7
gte r7, r1, r2           # writes 0 to r7
copy r2, 100
gt r7, r1, r2            # writes -1 to r7 (100 is not greater than 100)
gte r7, r1, r2           # writes 0 to r7
```

#### opcode 0x25: compare if one register has a value less than or equal to another, writing yes/no to a register

Like `lt`, but tests true if the values are equal:

```
copy r1, 99
copy r2, 100
lt r7, r1, r2            # writes 0 to r7
lte r7, r1, r2           # writes 0 to r7
copy r2, 99
lt r7, r1, r2            # writes -1 to r7 (99 is not less than 99)
lte r7, r1, r2           # writes 0 to r7 
```

## bit logic instructions

#### opcode 0x30: logical 'and' of two registers

An 'and' operation sets bits in the result to 1 when the two corresponding bits in the inputs are both 1's. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
1001_0010       (the bitwise 'and' of the two 8-bit values)
```

Example instruction:

```
and r4, r7, r2           # write to r4 the result of r7 'and' r2
```

#### opcode 0x31: logical 'and' of a register and a value

The value can be decimal or hex.

```
and r4, r7, 32           # write to r4 the result of r7 'and' 0x0000_0020 (decimal 32)
```

#### opcode 0x32: logical 'or' of two registers

An 'or' operation sets bits in the result to 1 when the two corresponding bits in the inputs have at least 1. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
1111_1011       (the bitwise 'or' of the two 8-bit values)
```

Example instruction:

```
or r4, r7, r2            # write to r4 the result of r7 'or' r2
```

#### opcode 0x33: logical 'or' of a register and a value

```
or r4, r7, 32            # write to r4 the result of r7 'or' 0x0000_0020 (decimal 32)
```

#### opcode 0x34: logical 'xor' ('exclusive or') of two registers

An 'xor' operation sets bits in the result to 1 when the two corresponding bits in the inputs have just one 1. All other bits are 0. For example:

```
1111_0011       (first 8-bit value)
1001_1010       (second 8-bit value)
0110_1001       (the bitwise 'xor' of the two 8-bit values)
```

Example instruction:

```
xor r4, r7, r2           # write to r4 the result of r7 'xor' r2
```

#### opcode 0x35: logical 'xor' ('exclusive or') of a register and a value

```
xor r4, r7, 32           # write to r4 the result of r7 'xor' 0x0000_0020 (decimal 32)
```

## bit shift instructions

#### opcode 0x40: shift bits left (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
1000_1100            (the above value shifted left by 2 places)
```

Shifting left always sets the least-significant bits to 0's, *e.g.* the result of shifting left 3 places always has 3 zeroes in the least-significant bits.

```
lshift r1, r2, 5         # store in r1 the result of shifting the bits in r2 left by 5 places
```

#### opcode 0x41: shift bits left (inputs from two registers)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
lshift r1, r2, r3        # store in r1 the result of shifting the bits in r2 left by 7 places
```

#### opcode 0x42: shift bits right, zero-extend (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
0011_1000            (the above value shifted right by 2 places, zero-extended)
```

A zero-extended right shift sets the most-significant bits to 0's, *e.g.* the result of shifting right (zero-extended) 3 places always has 3 zeroes in the most-significant bits.

```
zrshift r1, r2, 5        # store in r1 the result of shifting the bits in r2 right by 5 places
```

#### opcode 0x43: shift bits right, zero-extend (inputs from two registers)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
zrshift r1, r2, r3       # store in r1 the result of shifting the bits in r2 left by 7 places (zero-extended)
```

#### opcode 0x45: shift bits right, sign-extend (inputs from a register and a value)

```
1110_0011            (an 8-bit value)
1111_1000            (the above value shifted right by 2 places, sign-extended)

0110_0011            (an 8-bit value)
0001_1000            (the above value shifted right by 2 places, sign-extended)
```

A sign-extended right shift sets the most-significant bits to 1's or 0's depending on the most-significant bit of the input.

```
rshift r1, r2, 5         # store in r1 the result of shifting the bits in r2 right by 5 places
```

#### opcode 0x46: shift bits right, sign-extend (inputs from two register)

Like previous, but the number of places to shift is taken from a second register.

```
copy r3, 7
rshift r1, r2, r3        # store in r1 the result of shifting the bits in r2 right by 7 places (sign-extended)
```

## jump instructions

Normally, after executing an instruction, the processor executes the next instruction, *e.g.* after executing a 3-byte instruction at 0xC000_0000, the processor executes the instruction at 0xC000_0003. A jump instruction tells the CPU to next execute an instruction at some specified address.

#### opcode 0x50: jump to address

```
jump [r3 r6 4]           # jump execution to address (r3 + r6 + 4)
```

#### opcode 0x51: jump to address only if the value in the specified register is 0

```
zjump r2, [r3 r6 4]      # if the value in r2 is 0, jump execution to address (r3 + r6 + 4)
```

#### opcode 0x52: store the program counter on the stack and jump execution to address

Stores the address of the instruction *after* the `call` instruction itself.

```
call [r5]                # store the program counter on the stack (incrementing sp by 4), and jump to address (r5 + 0 + 0)
```

#### opcode 0x53: load program counter from the stack and jump execution

The return instruction pops a word off the stack and jumps execution to that address:

```
return                   # jump execution back to address stored on the stack, decrementing sp by 4
```