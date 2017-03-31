# assembly functions and using the stack

## stack

A stack is a place to store stuff temporarily. The special rule of a stack is that we remove things from the stack in the reverse order in which we added them, *e.g.* having stored A, B, then C, we should remove them in the order C, then B, then A. In effect, we are always removing the last thing added.

The 64KB of addresses `0xFFFF_0000` up through `0xFFFF_FFFF` are meant to be used as a stack. At program start, the stack pointer register `sp` stores the address `0xF000_0000`. To store a piece of data on the stack, we write it starting at `[sp]` and then increment `sp` by the data's number of bytes. To remove a piece of data from the stack---which must have been the last thing added---we decrement `sp` by the data's number of bytes. (Note that 'removing' something from the stack does not actually overwrite or zero-out the bytes which the data occupied. We simply adjust the stack pointer such that subsequent additions to the stack will overwrite whatever we 'removed'.)

64KB should be well more than enough for our simple programs. (In a modern PC, each running program typically has a stack of a few megabytes.) If we write more data to a stack than for which it has capacity, this is a bug called *stack overflow*. In our simple system, there is no hardware check when a stack overflow occurs; we simply have to be careful about not writing too much data to the stack.

## functions

In assembly code, what we call a function (or *routine*, or *subroutine*, or *procedure*) is a reuseable chunk of code which we can jump to using the `call` instruction. When done with its business, the function uses `return` to jump execution from back where it was called.

```
# a do nothing function called 'foo' which does nothing and immediately returns
foo:      
return

# elsewhere in code, we can call 'foo'
call foo
```

In a call to a function, the function may store stuff in the registers and on the stack, but it is expected to restore the registers and stack to their state at the start of the call before returning. This requires:

 1. At the start of a function, a call should store on the stack all of the general-purpose registers it will modify.
 2. Before returning, a function call should restore all of the general-purpose registers that it stored on the stack at the start.
 3. Just before using `return`, a function call restores the stack pointer back to its value at the start of the call.

```
# function `bar` writes the numbers 1 to 100 into successive bytes starting at [0x4000_0000]
bar:
# preserve r1, r2, r3, r4 on stack
sw [sp 0], r1
sw [sp 4], r2
sw [sp 8], r3
sw [sp 12], r4
add sp, 16                   # adjust stack pointer after adding 16 bytes to the stack

# write the numbers
copy r1, 0                   # offset
copy r2, 1                   # value to store
copy r3, 101                 # compared against r2
bar_loop:
sw [r1 0x4000_0000], r2
add r1, 1                    # increment r1 by 1
add r2, 1                    # increment r2 by 1
lt r4, r2, r3
zjump r4, [bar_loop]

# restore register and stack state, then return
add sp, -16                  
lw r1, [sp 0]
lw r2, [sp 4]
lw r3, [sp 8]
lw r4, [sp 12]
return
```

In the above example, we didn't actually need to adjust the stack pointer at all because *bar* itself does not call any functions. However, as soon as a function calls another, we need to adjust the stack pointer:

```
# function 'ack'
ack:
# preserve r1, r2 on stack
sw [sp 0], r1
sw [sp 4], r2
add sp, 8                    # adjust stack pointer after adding 8 bytes to the stack

# ... do stuff with r1 and r2 and call 'bar' at some point

# restore register and stack state, then return
add sp, -8                  
lw r1, [sp 0]
lw r2, [sp 4]
return
```

Above, if *ack* didn't adjust the stack pointer to account for the stack space it uses, its call to *bar* would write over the data that *ack* put on the stack. As long as every function follows the rules, any function can call any other without worriying about interference with its data.

## function inputs (arguments)

Some functions expect input values from their callers. For example, a function that writes values from 1 up to *N* starting at address *X* expects input values for *N* and *X*. Function inputs are usually called ***arguments***.

How arguments are received depends on what the function expects its caller to do. The function might expect its caller to leave arguments:

 - in designated registers
 - at designated locations on the stack
 - or at designated locations elsewhere in memory

Registers are the simplest and therefore first choice, but if registers are insufficient, the stack is used. For large chunks of input data, a function expects to receive an address and possibly a number indicating the number of bytes at that location.

In this example, the function 'bar' expects inputs in registers r6 and r7:

```
# function `bar` writes the numbers 1 to [value of r6] into successive bytes starting at address [r7]
bar:
# preserve r1, r2, r3 on stack
sw [sp 0], r1
sw [sp 4], r2
sw [sp 8], r3
add sp, 12                   # adjust stack pointer after adding 12 bytes to the stack

# write the numbers
copy r1, 0                   # offset
copy r2, 1                   # value to store
bar_loop:
sw [r1 r7], r2
add r1, 1                    # increment r1 by 1
add r2, 1                    # increment r2 by 1
lte r3, r2, r6
zjump r4, [bar_loop]

# restore register and stack state, then return
add sp, -12                  
lw r1, [sp 0]
lw r2, [sp 4]
lw r3, [sp 8]
return
```

## function outputs (return values)

Some functions produce output values for their callers. Like with arguments, outputs can be passed in registers, on the stack, or elsewhere in memory. This function computes the sum of multiple numbers and returns the result on the stack:

```
# function `sum` expects [value of r6] number of 32-bit values starting at address [r7].
# The function returns the sum of these 32-bit values on the stack.
# The function ignores overflow.
sum:
# preserve r1, r2, r3 on stack
sw [sp 4], r1                # we skip over 4 bytes because we will store the return value at [sp]
sw [sp 8], r2
sw [sp 12], r3
sw [sp 16], r4
sw [sp 20], r5
add sp, 24                   # adjust stack pointer after adding 24 bytes to the stack

# sum the numbers
copy r1, 0                   # offset
copy r2, 0                   # index
copy r3, 0                   # sum
sum_loop:
lt r4, r1, r7
zjump r4, [sum_done]
lw r5, [r7 r1]               # load value
add r3, r3, r5               # add value to sum
add r1, 4                    # increment offset by 4
add r2, 1                    # increment index by 1
jump [sum_loop]

sum_done:
sw [sp], r3                  # store return value at [sp]

# restore register and stack state, then return
add sp, -24                  
lw r1, [sp 4]                
lw r2, [sp 8]
lw r3, [sp 12]
lw r4, [sp 16]
lw r5, [sp 20]
return
```

To call the above function:

```
data: bytes 11w 7w -9w 0w 30w
copy r6, 5                      # 5 values to sum
copy r7, data                   # the starting address of the 5 values
call [sum]
lw r1, [sp 4]                   # store the returned value in r1
#r1 should now have the value 39 (the sum of 11, 7, -9, 0, and 30)
```

Remember that `call` adds 4 to `sp` and `return` subtracts 4 from `sp`. We store the return value at `[sp 0]` in the call, so after the call returns, the return value is located at `[sp 4]`.
