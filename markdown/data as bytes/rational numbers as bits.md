# rational numbers as bits

A ***rational number*** is a ratio of two integers, *e.g.* `3/4` (three fourths). We could represent rationals in a computer as simply two separate integers, *e.g.* 8 bits for the numerator and 8 bits for the numerator. However, performing arithmetic on rationals in this form is relatively complicated (and therefore costly).

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