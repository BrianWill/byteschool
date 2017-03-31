
# bits and bytes

A ***bit*** is the smallest possible unit of information. A bit holds one of two states and so conveys either yes/no, up/down, left/right, true/false, A or B...any distinction, as long as there are just two possibilities. The distinction represented by a bit ultimately depends upon agreement between whoever sets the bit and whoever reads it. A mailbox flag, for example, is a bit: it holds one of two states, up or down, and by pre-arrangement, up indicates 'mail is inside' while down indicates 'no mail'; if the flag gets stuck in a position half-way between up and down, its meaning becomes indeterminate.

Computers store bits in several different ways, most commonly as electronic circuits, as charges on magnetic surfaces, or as microscopic grooves on optical discs. Whatever the physical mechanism, we usually represent the two states of a bit with the symbols 0 and 1. Be clear, though, that the choice of symbols is really arbitrary, and bits aren't always used to represent numbers. In principle, bits can be used to represent any kind of data, including text, audio, images...anything.

While a single bit can only represent two states, for every additional bit, we can represent twice as many states. With three bits, for example, we can represent `2 * 2 * 2 = 2^3 = 8` states (`*` means multiplication and `^` means exponentiation). With three bits, we have these eight possible combinations of bits, each of which can arbitrarily represent whatever we want, like say different colors:

    000     blue
    001     red
    010     orange
    011     yellow
    100     green
    101     purple
    110     white
    111     black

The general formula is: ***given n bits, we can represent 2^n different values***

For example, given 7 bits, we can represent `2^7 = 128` different values.

## quantities of bits

 - **byte**: the smallest unit of addressable memory (historically varies from system to system, but all modern systems have 8 bits per byte)
 - **octet**: 8 bits
 - **megabyte**: 1,000,000 (10^6) bytes
 - **gigabyte**: 1,000,000,000 (10^9) bytes
 - **terabyte**: 1,000,000,000,000 (10^12) bytes
 - **petabyte**: 1,000,000,000,000,000 (10^15) bytes
 - **exabyte**: 1,000,000,000,000,000,000 (10^18) bytes
 - **zettabyte**: 1,000,000,000,000,000,000,000 (10^21) bytes
 - **kibibyte**: 1,024 (2^10) bytes
 - **mebibyte**: 1,048,576 (2^20) bytes
 - **gibibyte**: 1,073,741,824 (2^30) bytes

These prefixes can all be used with *–bit* as well as *–byte*, *e.g.* a *mebibit* is 2^20 bits. 

In abbreviations, uppercase *B* usually means byte while lowercase *b* usually means bit, *e.g.* *KB* is a kilobyte while *kb* is a kilobit. Usually the case of the prefix letter matches the case of the *b*, but these conventions are not always strictly followed!

When talking about throughput, the convention is to use bits, not bytes, *e.g.* the download speed of my internet connection is 100mbps (100 megabits per second).