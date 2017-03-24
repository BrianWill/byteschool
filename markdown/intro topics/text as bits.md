## text characters

A piece of text data is a sequence of ***characters***, abstract units of written language. Characters in English include the lowercase letters `a` through `z`, the uppercase letters `A` through `Z`, the numerals `0` through `9`, punctuation marks like `.` and `?`. We also need characters to represent the spacing between words, paragraphs, and lines, so we have ***whitespace characters*** like `space`, `tab`, and `carriage return`.

A ***glyph*** is a particular visual representation of a character, *e.g.* the lowercase letter `a` is a character which can be represented by many different glyphs of different sizes, color, fonts, and styles:

!['a' glyph](/static/images/A-small_glyphs.svg.png)

Text data itself contains no information about glyphs. When a program renders a text image (whether for display on screen or printing), the program uses glyph data from font files.

(Text rendering is a complex topic we'll cover much later. For now, we're concerned only with text data by itself.)

A formatted document, like in Microsoft Word, contains formatting information (font choice, font size, font color, font weight, margins, *etc.*) in addition to the text data. By itself, *text data is just a sequence of characters.*

A ***text editor*** is a program for editing files containing just text data with no formatting.

## character sets and character encodings

To represent a character of text as bits, we represent it as a number, and so we must (arbitrarily) decide which numbers represent which characters. A ***character set*** is a standardized mappipng of characters to numbers.

When expressing characters as numbers, we need to decide how exactly to write the numbers as bits. How many bits do we use to represent each character? Do we use the same number of bits for every character? In other words, how should we *encode* the characters? A ***character encoding*** is a standardized way of encoding text.

## ASCII (American Standard Code for Information Interchange) 

ASCII (pronounced 'ass-key') was the most widely used character set for several decades. ASCII contains just 128 characters: the English alphabet (lowercase and uppercase), the numerals (`0` through `9`), English punctuation marks, and 30 ***control characters***. 

The control characters were meant to represent actions rather than any visual symbols. When a program reading ASCII text encountered a control character, it would perform the action denoted by the character. For example, when a teletype machine would read the ASCII bell character, it would sound a bell to notify human operators. Most of these control characters don't make much sense in a modern context, so modern programs will usually either ignore these control characters or display placeholder glyphs in their place. However, control characters still have some modern relevance in connection with terminals (covered much later).

ASCII has six whitespace characters: space, horizontal tab, vertical tab, carriage return, line feed, and form feed. How exactly these characters get interpreted by programs varies, *e.g.* the amount of space denoted by a horizontal tab is left up to the program displaying the text.

(Technically, ASCII considers the whitespace characters other than space to be control characters.)

Programs on Unix, Mac, and Windows follow different conventions to denote the end of a line:

 - Unix programs use just line feed
 - Windows programs use a carriage return followed by a line feed
 - modern Mac programs use just line feed; older Mac programs use just carriage return

(Many modern programs will properly display text following any of these conventions.)

Because ASCII has just 128 characters, we can encode each character with 7 bits (2 to the 7th power is 128). For example, ASCII uppercase `A` is mapped to 65, which in binary is `1000001`. Because modern computers have 8-bit bytes, it is most common to store each ASCII character as a full byte instead of just 7 bits. (The extra bit per character is either just ignored or used as a [check bit](https://en.wikipedia.org/wiki/Parity_bit).)

## Unicode

The ***Unicode*** character set has now supplanted ASCII as the most widely used character set. Created in the 1990’s, Unicode contains over a million characters, including basically every symbol of every written language in history.

In Unicode terminology, a *codepoint* is a mapping of one number to one character. Unicode contains 17 *planes*, each of which consist of 65,536 (2 to the 16th power) codepoints, making 1,114,112 codepoints in total. By convention, Unicode codepoints are denoted by `U+` followed by four to six hex digits:

 - U+0000              (the first codepoint of Unicode)
 - U+10FFFF            (the last codepoint of Unicode)

The 17 planes:

 - Plane 0, the BMP (Basic Multilingual Plane), codepoints U+0000 to U+FFFF. The most important plane because it contains nearly all of today’s modern written languages.
 - Plane 1, the SMP (Supplementary Multilingual Plane), U+10000 to U+1FFFF. Contains symbols like mathematical and musical notation.
 - Plane 2, the SIP (Supplementary Ideographic Plane), U+20000 to U+2FFFF. Contains about 40,000 Chinese ideographs.
 - Planes 3 to 13, U+30000 to U+DFFFF. Totally unused.
 - Plane 14, the SSP (Supplementary Special-purpose Plane), U+E0000 to U+EFFFF. Contains only a few hundred arcane characters having to do with data protocols.
 - Planes 15 and 16, the PUA’s (Private Use Areas), U+F0000 to U+10FFFF. Contains no characters. You’re free to use the codepoints in these planes to represent whatever you want in your own programs.

Unicode text is most commonly encoded in three standard encodings:

 - ***UTF-8***, as the name implies, uses as few as 8 bits to represent a single character, though some characters require as many as 32 bits. 
 - In ***UTF-16***, the most commonly used characters are represented with 16 bits and the rest with 32. 
 - In ***UTF-32***, all characters are represented with 32 bits. The choice of which encoding to use comes down to a trade off between space efficiency and processing efficiency.

('UTF' stands for 'Unicode Transformation Format'.)

### UTF-32

UTF-32 is the simplest encoding for Unicode. In UTF-32, each character is simply encoded in four bytes. For instance, the codepoint `U+40077` is encoded as:

```
0000_0000   0000_0100   0000_0000   0111_0111
00          04          00          77
```

### UTF-16

UTF-16 uses two bytes to encode the codepoints of the BMP but four bytes to encode all other codepoints. For example, `U+0065` is in the BMP, so it is encoded as:

```
0000_0000   0110_0101
00          65
```

To encode a character outside the BMP, we use two pairs of bytes, the first always beginning with the bits `110110`, the second always beginning with the bits `110111`. In the first pair, the four bits after `110110` are used to represent the plane by subtracting 1, *e.g.* plane 3 is represented as 2 while plane 7 is represented as 6. The remaining 16 bits are used to represent the codepoint within the plane. For example, `U+20065` is a codepoint in plane 2, and the codepoint within the plane is `0065`, so we represent this codepoint with four bytes:

```
1101_1000   0100_0000     1101_1100   0110_0101
D8          40            DC          65
```

These two pairs are not mistaken for the two characters `U+D840` and `U+DC65` because those codepoints in the BMP are “surrogates”: the codepoints `U+D800` to `U+DFFF` are reserved just for this purpose of 4-byte encodings in UTF-16.

### UTF-8

UTF-8 uses 1 to 3 bytes per character in the BMP, but 4 characters for every other character:

The codepoints `U+0000` to `U+007F` are encoded in one byte, like so:

```
0xxx_xxxx
```

The codepoints `U+0080` to `U+07FF` are encoded in two bytes, like so:

```
110x_xxxx   10xx_xxxx
```

The codepoints `U+0800` to `U+FFFF` are encoded in three bytes, like so:

```
1110_xxxx   10xx_xxxx   10xx_xxxx
```

The codepoints `U+10000` to `U+100FF` are encoded in four bytes, like so:

```
1111_0xxx   10xx_xxxx   10xx_xxxx   10xx_xxxx
```