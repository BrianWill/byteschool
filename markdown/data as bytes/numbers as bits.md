# numbers as bits

## decimal numbers (base-10)

The system of counting we all know and use is called ***base-10*** or ***decimal*** (*deci-* meaning *ten*). In decimal, we use the ten symbols 0 1 2 3 4 5 6 7 8 and 9. We count by cycling through the digits in that order:

```
0   zero
1   one
2   two
3   three
4   four
5   five
6   six
7   seven
8   eight
9   nine
```

To count beyond nine, we need another digit place: the 9 cycles back to our first symbol, 0, and the digit place to the left (which implicitly starts as a 0) cycles from 0 to 1:

```
09  nine
10  ten
```

As we count, each time the right-most digit cycles around from 9 back to 0, the digit to its left cycles to the next symbol in the sequence. Eventually we'll reach 99, and counting one higher cycles the right-most 9 back to 0, and the digit to its left (the other 9) also cycles back to 0, causing the implicit 0 to its left to cycle to 1:

```
099  ninety-nine
100  one hundred
```
    
Effectively, any time you have a series of 9's in the right-most digit places and wish to count one higher, the 9's all cascade back to 0, and the first non-9 digit from the right cycles once. For example:

```
23999999     twenty-three million, nine hundred ninety-nine thousand, nine-hundred ninety-nine
24000000     twenty-four million
```

## binary numbers (base-2)

The system of counting in which we use just two symbols (0 and 1) is called ***base-2*** or ***binary***.

```
0   zero
1   one
```

To count beyond one, we need another digit place: the 1 cycles back to our first symbol, 0, and the digit place to the left (which implicitly starts with a 0) cycles from 0 to 1:

```
01  one
10  two!
```

And here's where it gets confusing: what looks like ten in decimal is actually two in binary. To help avoid this confusion, you should read binary numbers digit-by-digit, *e.g.* 101 is 'one zero one', not 'one-hundred one': the quantity represented by binary 101 is what we call five in decimal!

As we count in binary, every time the right most digit cycles around from 1 back to 0, the digit to its left cycles to the next symbol in the sequence: 0 cycles up to 1, and 1 cyclces back around to 0. Just like in decimal, any time our last symbol in the sequence cycles back around, the digit place to its left also cycles. Whereas, in decimal, a series of 9's in the right-most digits will cascade, we get the same effect in binary when we have a series of 1's in the right-most digits:

```
10101111 binary one zero one zero one one one one
10110000 binary one zero one one zero zero zero zero
```

So here is counting in binary up to the equivalent of decimal 15:

```
00000 zero
00001 one
00010 two
00011 three
00100 four
00101 five
00110 six
00111 seven
01000 eight
01001 nine
01010 ten
01011 eleven
01100 twelve
01101 thirteen
01110 fourteen
01111 fifteen
10000 sixteen
```

Every binary digit place with a 1 effectively corresponds to a power of two, starting with 1 on the right and increasing to the left:

```
000001 one
000010 two
000100 four
001000 eight
010000 sixteen
100000 thirty-two
```

A binary number is effectively the sum of the powers of two corresponding to each digit-place with a 1:

```
100010 thirty-two + two = thirty-four
```

So this is how we convert from binary to decimal. To go the other way, from decimal to binary, we break a decimal number into a sum of (unique) powers of two. For example, decimal 55 is the sum of 32, 16, 4, 2, and 1.

## hexadecimal (base-16)

Because binary numbers are verbose, we generally avoid writing them out as 0's and 1's. Instead, we use another counting system, ***base-16***, ***hexadecimal*** (also called 'hex'), as a shorthand for binary. In hexadecimal, we count with the sixteen symbols 0 1 2 3 4 5 6 7 8 9 A B C D E F (though lowercase A through F are sometimes used instead). Counting in hex is just like counting in decimal or binary, but we just have more symbols to cycle through.

It works out that, because 16 is a power of 2, conversion between hex and binary is extremely easy to do, requiring no arithmetic at all. All you need to do is memorize the correspondence between the first 16 binary and hex numbers:

```
0000 binary = 0 hex
0001 binary = 1 hex
0010 binary = 2 hex
0011 binary = 3 hex
0100 binary = 4 hex
0101 binary = 5 hex
0110 binary = 6 hex
0111 binary = 7 hex
1000 binary = 8 hex
1001 binary = 9 hex
1010 binary = A hex
1011 binary = B hex
1100 binary = C hex
1101 binary = D hex
1110 binary = E hex
1111 binary = F hex
```

To convert a hex number into binary, simply replace each hex digit with the four binary digits it corresponds to in this table. For example:

```
3A5F hex = 0011_1010_0101_1111
```

(The underscore separators are there just to make it easier to see the digits in groups of four.)

To go the other way, from binary to hex, replace each group of four binary digits with the hex digit it corresponds to in the table (just be sure to first add padding zeros on the left so that the number of binary digits is a mutiple of four).

```
11011 binary = 0001_1011 binary = 1B hex
```

To avoid confusion between written decimal, binary, and hex numbers, we usually add prefixes or suffixes to binary and hex numbers. Most commonly we denote hex numbers with `0x` or `0X`, *e.g.* `0x314` is 'hex three one four'. Binary numbers aren't written out much---again, we usually prefer hex to represent binary---but when they are written out, we typically prefix them with `0b` or `0B`.

As you've probably guessed by now, we represent positive decimal integers as bits by simply converting to binary. The decimal number 130, for example, has the binary equivalent 10000010 and so can be represented with 8 bits.

An ***unsigned*** integer is always positive, never negative. If we use 8 bits to store an unsigned integer, we can represent the values 0 up to 255:

```
0000_0000    (0)
0000_0001    (1)
...
1111_1111    (255)
```