# Java strings and control flow

## strings

A string in Java is an instance of the standard library class `java.lang.String`:

```java
String s = "hello";
```

The String class has many methods, such as *toUpperCase*, which returns a new String with all of the letters uppercase:

```java
String s = "Hello, there!";
s = s.toUpperCase();             // "HELLO, THERE!"
```

The *charAt* method returns a `char` representing a single 2-byte character of the string. The *codePointAt* method returns an `int` representing a single 4-byte character of the string:

```java
String s = "Hello, there!";
char c = s.charAt(4);            // 111 (the Unicode value for lowercase 'o')
int i = s.charPointAt(4);        // 111 (same as above, but represented as an int)
```




