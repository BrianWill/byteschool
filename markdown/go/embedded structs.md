# Go embedded structs

When declaring a struct type, if we omit the name of a struct field, the field is *embedded*, and the field's name is implicitly the same as its type:

```go
type Foo struct {
    A int
    B string
    C float32
}

type Bar struct {
    A float32
    Foo                      // embed 'Foo' inside 'Bar'
    X string
}

func main() {
    var b Bar = Bar{}
    var f Foo = b.Foo        // assign 'Foo' field to variable 'f'
    b.Foo.A = 3              // assign to field 'A' of the 'Foo' field
}
```

As a convenience, the fields of an embedded struct can be accessed as if they are directly part of the embedding struct (even though they really aren't!). However, if the embedding struct has a field of the same name, the embedded struct's field can only be accessed *via* the embedded struct:

```go
func main() {
    var b Bar = Bar{}
    b.C = "hi"               // b.Foo.C = "hi"
    b.A = 35.2               // assign to the float32 field of 'Bar'
    b.Foo.A = 12             // assign to the int field of 'Foo'
}
```

If an embedded type has methods, we can call them as if they are directly methods of the embedding struct, but the embedded struct is passed as the receiver:

```go
func (f Foo) roger() int {
    return f.A
}

func main() {
    var b Bar = Bar{}
    b.Foo.A = 9
    x := b.roger()           // 9  (b.Foo passed as receiver)
    y := b.Foo.roger()       // 9
}
```

Methods of embedded structs count towards the embedding struct implementing interfaces:

```go

type Alice interface {
    bob()
    carol()
}

type Foo struct {
    // ...
}

type Bar struct {
    // ...
    Foo                      // embed 'Foo' inside 'Bar'
}

func (f Foo) bob() {
    // ...
}

func (b Bar) carol() {
    // ...
}

func main() {
    var a Alice = Bar{}      // ok: 'Bar' implements 'Alice'
}
```

A struct can embed pointers to structs:

```go
type Foo struct {
    A int
    B string
    C float32
}

type Bar struct {
    A float32
    *Foo                     // embed pointer to 'Foo' inside 'Bar'
    X string
}

func main() {
    var b Bar = Bar{}
    b.Foo = &Foo{}           // the 'Foo' pointer needs an actual Foo to point to
    b.Foo.A = 3              // (*b.Foo).A = 3
    var f *Foo = b.Foo       // assign 'Foo' field to variable 'f'
}
```