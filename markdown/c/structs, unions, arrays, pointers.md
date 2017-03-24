# Go structs, unions, arrays, and pointers

## structs

A struct is declared like so:

```c
struct foo {
    int a;
    float b;
}

struct foo f;      // a variable 'f' of type 'struct foo'
```

Note that `struct` is part of the new type's name. If we want a struct type without `struct` as part of its name, we use `typedef`:

```c
typedef struct {
    int a;
    float b;
} foo;             // don't forget the semi-colon!

foo f;             // a variable 'f' of type 'foo'
```

## unions

A ***union*** is like a struct, but the elements all overlap in memory. A union only occupies enough memory to store its largest element. Effectively, we can only store one element in a union at a time:

```c
union foo {
   int a;
   float b; 
}

union foo f;       // a variable 'f' of type 'union foo'
f.a = 4;           // assigning to 'a' stores an int value in the union
f.b = 7.8;         // assigning to 'b' stores a float value in the union, overwriting bytes of the int value
int x = f.a;       // garbage!
float y = f.b;     // 7.8
```

Assigning to one element overwrites bytes of the other elements, making the other element values garbage. We can read any element of a union at any time, but we generally don't want to read garbage.

Unions are useful in cases where the type of something varies. Using a struct would work too but wastes memory if we only need one element at at time.

## arrays and pointers

In Go, a pointer is denoted with `*` as a prefix on the type. In C, it is a prefix on the name of what is being declared/defined:

```c
int *p;           // 'p' is a pointer to int
```

In Go, an array is denoted with `[]` as a prefix on the type. In C, it is a *suffix* on the name of what is being declared/defined:

```c
int arr[8];       // 'arr' is an array of 8 ints
```

When we create an array of pointers or a pointer to an array, we have to be mindful that the modifier `[]` has a higher precedence than `*`:

```c
int *arr[8];      // 'arr' is an array of 8 pointers to int
int (*p)[8];      // 'p' is a pointer to an array of 8 ints
```

In effect, you should read a declaration/definition inside out, starting from the name and giving `[]` precedence over `*`. The 'base type' (the type name at the front) is always read last.

Here's a more complicated example:

```c
int *(*foo[8])[10];    // 'foo' is an array of pointers to arrays of 10 pointers to int
                       // the equivalent type in Go: [8]*[10]*int
```

This extremely confusing notation is the worst thing about C!

The name of a defined array can be used as a pointer value. The name of an array of X's is a pointer-to-X value referencing the first X of the array:

```c
int arr[6];
int *p = arr;         // the name 'arr' references the first int of the array
*p = 3;               
if (arr[0] == 3) {    // the condition is true
    // ...
}
```

Be clear, though, that an array name is not a variable. We cannot assign to an array name.

## pointer arithmetic

Adding an integer to a pointer produces a new pointer of the same type referencing a higher address. The original address is added to the size of the pointed to type multiplied by the integer:

```c
// assuming 4-byte ints
int x;           // assume address is 1000
int *p = &x;     
p = p + 3;       // (p + 3) returns an int pointer with address 1012 (because 1000 + (4 * 3))
```

Code like the above is very dangerous because we have no guarantees about what resides 3 int slots above the variable *x*. Pointer arithmetic is only really useful with arrays and allocated blocks:

```c
int arr[10];
int *p = arr;
p = arr + 3;     // assign 'p' the address of the int at index 3 of the array
```

In fact, the operator `[]` in C is really just a shorthand for doing pointer arithmetic and dereferencing:

```c
int arr[10];
arr[2] = 400;         // *(arr + 2) = 400;
int i = arr[7];       // int i = *(arr + 7)
```

Subtracting an integer from a pointer produces a new pointer of the same type referencing a lower address:

```c
int arr[10];
int *p = arr;
p = arr + 7;     // assign 'p' the address of the int at index 7 of the array
p = p - 3;       // assign 'p' the address of the int at index 4 of the array
```

Subtract one pointer from another of the same type to get the distance between them as an integer:

```c
int arr[10];             
int *p1 = arr + 3;
int *p2 = arr + 7;
int i = p2 - p1;         // 4
i = p1 - p2;             // -4
```

We cannot add pointers to other pointers because the results would not be useful!

## the `->` operator

Unlike in Go, the dot operator cannot be used on a pointer to a struct. We must explicitly dereference:

```c
struct foo {
    int x;
}

struct foo f;
struct foo *p = &f;
p.x = 3;                // compile error: cannot use . on a pointer
(*p).x = 3;             // ok
```

As a convenience, the `->` operator combines the dereference and dot operators:

```c
p->x = 3;               // (*p).x = 3;
```

## void pointers



## arrays as parameters and return types



## strings

While C has no built-in string type, it does have string literals. The text in a string literal is stored encoded as ASCII in the read-only data section of the compiled code. A string literal itself is a char pointer value that references the first byte where the string's data is stored:

```c
char *s = "hello, there";    // assign to 's' a pointer referencing the first byte of the string's data
char c = s[7];               // 116 (the value for ASCII lowercase 't')                 
```

On most platforms, attempting to modify a read-only section of memory triggers a hardware exception. You should not attempt to modify the bytes where a string literal's data is stored:

```c
char *s = "hello, there";    // assign to 's' a pointer referencing the first byte of the string's data
s[3] = 89;                   // hardware exception (on most platforms): the target address is read-only
```

## const

## `sizeof` operator

The `sizeof` operator returns the size in bytes of a type. 

## stack vs heap allocation

In Go, we don't have to worry about whether a pointer references something that has gone out of scope: the compiler heap allocates anything which might have references to it after its scope returns. C does no such thing: all local variables and values in a scope are stored on the call stack.

So in C, if we retain a reference to something after its scope returns, using that reference is very dangerous because the referenced memory may get reused for storing other stuff:

```c
// a function foo returning an int pointer
int *foo() {
    int x;          // allocated on stack in scope of the call to 'foo'
    return &x;      // return reference to local 'x'
}

int bar() {
    int *p = foo();
    // ...   
    *p = 4;         // very dangerous! the memory 'x' occupied in the call may be storing other stuff now
}
```

In short, never use references to stack allocated things after execution leaves their scope. Chances are very good that the referenced memory will get reused for subsequent stack allocations very soon thereafter. If we return a pointer from a function, it should almost always reference heap allocated memory.

To use the heap in C, we must request a block of memory from the operating system with a system call. We specify how many bytes we want, and the system call returns with the address of the first byte of the block. (If the request is denied, the system call returns an error value.) We can then use pointers to read and write the bytes of the block. It is our responsibility to tell the operating system when we are done with an allocated block. Failure to free allocated blocks may lead over time to our program allocating more and more memory that it doesn't actually need.

Rather than issue system calls directly, we usually use library functions that issue system calls for us. The C standard library has *malloc* ('memory allocate') and *free*. The *malloc* function returns a pointer-to-void referencing the start of the block it allocates. Internally, the library keeps track of the starting addresses of allocated blocks. To free a block, we call *free*, passing a pointer that references the starting address of the block.

Arrays, like any other variables or values, are always stored on the stack, not the heap. In general, we should avoid putting large things on the stack, so rather than create large arrays, we usually allocate blocks on the heap instead.





