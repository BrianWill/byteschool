# Go functions and scopes

A function is defined like so:

```go
func name(parameters) returnType {
    //...body
}
```    

The parameters are separated by commas, and the parameter names are followed by their types. The return type specifies which kind of value the function must return. If you try to return something from the function other than its declared return type, you'll get a compile error. If you want the function to return nothing, leave the return type blank. 

This function takes two ints and returns their sum:

```go
func sum(a int, b int) int {
    return a + b
}
```

## local variable scope

A ***scope*** is a span of code in which a variable exists and can be accessed. A sub-scope is a subportion within another scope. In a hierarchy of scopes, the inner scopes have access to variables of their containing scopes, but not the other way around.

Every `func`, `if`, `else`, and `for` body is a scope.

```go
func foo(a int) {          // parameter 'a' belongs to the scope of the function
    if a < 5 {
        fmt.Println(a)     // this subscope can access 'a' of the containing scope
        b := a + 2         // 'b' declared in this subscope
        fmt.Println(b)
    }  
    fmt.Println(b)         // compile error: no variable 'b' exists in this scope
}
```

If a subscope declares a variable of the same name as a variable from a containing scope, the name in that subscope after the declaration refers to the subscope's own variable. The variable of that name from the outer scope is effectively inaccessible past that point in the subscope (if this ever creates a problem, simply change the name(s) so that they're different!).

```go
func foo(x int) {
    if x < 5 {
        fmt.Println(x)     // print 'x' of outer scope
        x := x + 3         // declare 'x' in this scope, assigning it the result of adding 'x' of outer scope and 3
        fmt.Println(x)     // print 'x' of this scope
    }
}
```

Above in the `if`, the compiler assumes *x* refers to *x* of the subscope, not the parameter *x* of the containing scope.

## global variables

A variable declared outside of any function is global. A global variable can be initialized and so can have its type inferred, but a global variable cannot be declared with `:=` syntax:

```
// at top-level of code...
var s = "hi"                // global string variable 's' initialized with "hi"
var i int = 9               // global int variable 'i' initialized with 9
f := 3.7                    // compile error: invalid syntax
```

A global variable can be initialized with the values of other global variables. The compiler will figure out the order in which the globals of a package must be initalized so we don't have to think about their written order:

```
// at top-level of code...
var a = b + 3               // ok: the compiler will figure out that 'b' must be initialized before 'a'
var b = 10                  
```

If the global initializations in a package are circular (and so logically impossible), the compiler will give you an error:

```
// at top-level of code...
var a = b + 3               // compile error: 'a' requires value of 'b', but 'b' requires value of 'a'
var b = a - 2
```

The global variables are all intialized at the start of the program, before the kickoff call to *main*. The globals of an imported package are initialized before the globals of the local package.