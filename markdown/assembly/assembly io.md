# assembly I/O

The keyboard has its own buffer of 256 bytes. When the user hits a key, the character sits in the buffer until the CPU reads the byte. If the buffer gets full (which might happen if the code executed by the CPU fails to read bytes from the keyboard as fast as the user hits keys), additional keystrokes will be ignored until the buffer is no longer full.

The CPU reads bytes one-by-one from the keyboard's buffer by reading the keyboard data register. The keyboard status register coordinates these reads:

 - the keyboard writes `0` to the status register to indicate a byte is waiting to be read from the data register
 - the CPU writes `1` to the status register to indicate it has read the byte from the data register

So when reading from the data register, our code should first check that the status register has the value `0`. If not, the code must repeatedly keep checking or do something else. Once the CPU reads a byte, it should set the status register to `1`, and then it must wait again for the keyboard to set the register back to `0` before reading the next byte.

Very similarly, the display has both a status register and a data register:

 - the display writes `0` to the status register to indicate it is ready for the CPU to write a byte into the data register
 - the CPU writes `1` to the status register to indicate it has written a byte into the data register

The display continually checks the status register, and when the value changes from `0` to `1`, the display reads and displays the byte in the data register and then sets the status register back to `0` when it is ready for the CPU to write another byte.

For convenience, the assembler automatically creates labels for the I/O status and data registers:

 - label `key_status` is `0x2000_0000`
 - label `key_data` is `0x2000_0001`
 - label `display_status` is `0x2000_0002`
 - label `display_data` is `0x2000_0003`

Here's code that reads a single byte from the keyboard into `r1`:    

```
# wait for keyboard status to be 0
test_ready:
lb r1, [key_status]
neq r1, r1, r0
zjump r1, [test_ready]

# actually read the byte
lb r1, [key_data]           # write the byte from the keyboard to r1
copy r2, 1
sb [key_status], r2         # set status to 1 to signal that the CPU has read a byte
```

This code writes a single byte from r1 to the display:

```
# wait for display status to be 0
test_ready:
lb r2, [display_status]
neq r2, r2, r0
zjump r2, [test_ready]

# actually write the byte
sb [display_data], r1       # write the byte from r1 to the display
copy r2, 1
sb [display_status], r2     # set status to 1 to signal that the CPU has written a byte
```

Here's a function *readline* that reads bytes from the keyboard until a linefeed (decimal 10) is read. The data is written to an address passed as argument in r7, the max number of bytes to read is passed to r6, and the function returns the number of bytes read on the stack as a 32-bit value: 

```
readline:
    # preserve r1, r2, r3, r4 on stack
    # we call no functions in here, so we needn't adjust the stack pointer
    sw [sp 4], r1               # leave 4 byte space on stack for return value
    sw [sp 8], r2
    sw [sp 12], r3

    copy r3, 0                  # offset for writing to [r7]

    # return if we've met the max number of bytes to read
    test_length:
    eq r1, r3, r6
    zjump r1, [done]

    test_ready:
    lb r1, [key_status]
    neq r1, r1, r0
    zjump r1, [test_ready]

    lb r1, [key_data]           # write the byte from the keyboard to r1
    copy r2, 1
    sb [key_status], r2         # set status to 1 to signal that the CPU has read a byte

    sw [r7 r3], r1              # copy the read byte to memory
    add r3, 1                   # increment offset by 1

    # if byte was not 10 (linefeed) repeat
    copy r2, 10 
    neq r1, r1, r2
    zjump [test_length]

    done:
    sw [sp], r3                 # store count of bytes read on stack
    # restore r1, r2, r3 from stack
    lw r1, [sp 4]
    lw r2, [sp 8]
    lw r3, [sp 12]
    return
```

Here's a function *print* that writes multiple bytes starting at an address to the display. The address is passed in r7 and the number of bytes to write is passed in r6.

```
print:
    # preserve r1, r2, r3 on stack
    # we call no functions in here, so we needn't adjust the stack pointer
    sw [sp], r1                 
    sw [sp 4], r2
    sw [sp 8], r3

    copy r3, 0                  # offset for reading [r7]

    test_length:
    eq r1, r3, r6
    zjump r1, [done]

    # wait for display status to be 0
    test_ready:
    lb r1, [display_status]
    neq r1, r1, r0
    zjump r1, [test_ready]

    # actually write the byte
    lb r2, [r7 r3]
    sb [display_data], r2       # write the byte from r2 to the display
    copy r1, 1
    sb [display_status], r1     # set status to 1 to signal that the CPU has written a byte

    add r3, 1                   # increment offset by 1
    jump [test_length]

    done:
    # restore r1, r2, r3 from stack
    lw r1, [sp]
    lw r2, [sp 4]
    lw r3, [sp 8]
    return
```