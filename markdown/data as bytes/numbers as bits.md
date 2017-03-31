# decimal numbers (base-10)

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

To count beyond nine, we need another digit place: the 9 cycles back to our first symbol, 0, and the digit place to the left (which implicitly starts with a 0) cycles from 0 to 1:

```
09  nine
10  ten
```

As we count, each time the right most digit cycles around from 9 back to 0, the digit to its left cycles to the next symbol in the sequence. Eventually we'll reach 99, and counting one higher cycles the right-most 9 back to 0, and the digit to its left (the other 9) also cycles back to 0, causing the implicit 0 to its left to cycle to 1:

```
099 ninety-nine
100 one hundred
```
    
Effectively, any time you have a series of 9's in the right-most digit places and wish to count one higher, the 9's all cascade back to 0, and the first non-9 digit from the right cycles once. For example:

```
23999999     twenty-three million, nine hundred ninety-nine thousand, nine-hundred ninety-nine
24000000     twenty-four million
```

# binary numbers (base-2)

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

Because binary numbers are verbose, we generally avoid writing them out as 0's and 1's. Instead, we use another counting system, ***base-16***, ***hexadecimal*** (called 'hex' for short). In hexadecimal, we count with the sixteen symbols 0 1 2 3 4 5 6 7 8 9 A B C D E F (though lowercase A through F are sometimes used instead). Counting in hex is just like counting in decimal or binary, but we just have more symbols to cycle through.

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

# negative numbers

An unsigned integer is always positive, never negative. If we use 8 bits to store an unsigned integer, we can represent the values 0 up to 255:

```
0000_0000    (0)
0000_0001    (1)
...
1111_1111    (255)
```

A *signed* integer is either positive or negative. To indicate that a binary number stored as bits is meant to be negative, we can't just stick a minus sign in front: all we have are bits, not minus signs!

## sign bit

The most obvious way to represent signed numbers is to designate one bit to act as the sign. Usually this is the most-significant bit (the 'leftmost' bit), and usually 0 indicates positive while 1 indicates negative. For example, assuming we use 8 bits to store a signed integer, we can represent the values -127 up to +127 

```
0000_0000    (+0)
0000_0001    (+1)
...
0111_1110    (+126)
0111_1111    (+127)

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
0000_0001     (+1)
0000_0010     (+2)
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

# rationals

A ***rational number*** is a ratio of two integers, *e.g.* `3/4` (three fourths). We could represent rationals in a computer as simply two separate integers, *e.g.* 8 bits for the numerator and 8 bits for the numerator. However, performing arithmetic on rationals in this form is relatively complicated (and so costly).

## fixed-point

***Fixed-point*** is the computing equivalent of radix-point notation, *i.e.* numbers with a dot in them. In decimal, the digits to the right of the radix point represent multiples of a negative power of ten. For example, `25.84` is the sum of these four digits:

```
20.00     (2 * 10^1)
05.00     (5 * 10^0)
00.80     (8 * 10^-1 = eight tenths)
00.04     (2 * 10^-2 = four hundredths)
```

In binary, the digits to the right of the radix point represent multiples of a negative power of *two*. For example, `10.0101` is the sum of these six digits:

```
10.0000     (1 * 2^1)
00.0000     (0 * 2^0)
00.0000     (0 * 2^-1 = zero halves)
00.0100     (1 * 2^-2 = one fourth)
00.0000     (0 * 2^-3 = zero eighths)
00.0001     (1 * 2^-4 = one sixteenth)
```

In radix-point notation, not all rational values can be represented with a finite number of digits. For example, representing `1/3` (one third) in decimal radix-point requires an infinite number of digits:

```
0.33333333333...  (infinitely repeating 3's)
```

Not all values which can be represented with a finite number of digits in decimal are also finite in binary. For example, decimal `0.7` can only be exactly represented in binary with an infinite number of digits:

```
0.10110011001100... (infinitely repeating pattern of 1100)
```

(All values which can be represented in binary with a finite number of digits can be represented in decimal with a finite number of digits.)

## floating-point numbers

***Floating-point*** is the computing equivalent of scientific notation (*a.k.a.* engineering notation). In scientific notation, a value is represented as a *significand* multiplied by a power of ten. For example, the significand `78.113402` with exponent `4` represents `781134.02` because we shift the radix point of the significant right by four places. (When the exponent is negative, we shift it left.)

In binary, the exponent is a power of *two*, but it otherwise works the same: the exponent signifies how many digit places to shift the radix point (right if positive, left if negative).

Represented as bits, we need to decide how many bits to use to represent the significand and how many to represent the exponent. The radix point is implicit after the first significand bit. For example, assuming we have 8 bits for a significand and 8 bits for an exponent (represented in two's complement)...

```
0000_0101  (significand with implicit radix point after the leftmost digit)
0000_0011  (exponent +3)
```

...this represents `0.0101` because we took `0.0000101` and shifted the radix point right three places.

Generally it's more useful to have more significand bits than exponent bits. The more significand bits, the more *precision* we can represent; the more exponent bits, the larger the *range* of values we can represent.

The [IEEE](https://en.wikipedia.org/wiki/Institute_of_Electrical_and_Electronics_Engineers) (Institute of Electrical and Electronics Engineers) has codified standard formats for floating-point numbers. Many modern processors can perform arithmetic upon floating-point numbers in these standard formats.

## numbers of arbitrary size and precision 

In most code, we represent numbers using a finite number of bits. In some cases, however, we need to represent numbers of unlimited size and precision. For example, when computing sums of money, we generally shouldn't use floating-point because doing so creates rounding errors: given only-so-many bits for representing significands and exponents, some values must get approximated.

While CPU's do not directly operate upon numbers of arbitrary size and precision, we can store and operate upon such numbers by breaking them down into smaller numbers. For example, if we could only directly store 5-digit numbers, we could still store a 20-digit number as 4 separate 5-digit numbers. Similarly, if we could only directly perform addition on 5-digit numbers, we could perform addition on 20-digit numbers by breaking the work into multiple-steps of addition on 5-digit numbers.

We'll ellide over the details here. Just understand that code can deal with arbitrary numbers when really necessary.