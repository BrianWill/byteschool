# negative numbers as bits

A *signed* integer is either positive or negative. To indicate that a binary number stored as bits is meant to be negative, we can't just stick a minus sign in front: all we have are bits, not minus signs!

## sign bit

The most obvious way to represent signed numbers is to designate one bit to act as the sign. Usually this is the most-significant bit (the 'leftmost' bit), and usually 0 indicates positive while 1 indicates negative. For example, assuming we use 8 bits to store a signed integer, we can represent the values -127 up to +127 

```
0111_1111    (+127)
0111_1110    (+126)
...
0000_0001    (+1)
0000_0000    (+0)
1000_0000    (-0)
1000_0001    (-1)
...
1111_1110    (-126)
1111_1111    (-127)
```

(Note that we effectively have both a positive and negative zero.)

## one's complement

An alternative way of representing signed integers, called *one's complement*, flips all the bits of a positive to get its negative equivalent (and *vice versa*). For an 8-bit one's complement integer, we can represent the values -127 up to +127:

```
0111_1111     (+127)
0111_1110     (+126)
...
0000_0010     (+2)
0000_0001     (+1)
0000_0000     (+0)
1111_1111     (-0)
1111_1110     (-1)
1111_1101     (-2)
...
1000_0001     (-126)
1000_0000     (-127)
```

(Note that the most-significant bit still effectively designates the sign.)

## two's complement

***Two's complement*** is just like one's complement but removes negative zero and shifts the negative values down by one, *e.g.* whereas 1111_1010 is -5 in one's complement, it's -6 in two's complement. We end up with just one representation of zero and one more negative value. For example, given 8 bits, we can represent the values -128 up to +127:

```
0111_1111     (+127)
0111_1110     (+126)
...
0000_0010     (+2)
0000_0001     (+1)
0000_0000     (0)
1111_1111     (-1)
1111_1110     (-2)
...
1000_0010     (-126)
1000_0001     (-127)
1000_0000     (-128)
```

To find the negative of a positive (or *vice versa*), just flip all the bits and add one. (Yes, as surprising as it seems, this works both ways!)

Most CPU's expect signed integers in two's complment form because it requires the simplest circuitry for performing arithmetic.
