# Java enums

An ***enum*** (short for 'enumeration') is a minor variation of a class that makes it easy to define discrete, named values.

For an enum, there is a fixed set of instances of that type. The instance names are listed in the enum:

```java
enum DayOfWeek {
    // 7 instances of this enum
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY;
}
```

(By convention, enum instance names are written in all caps.)

We refer to an enum instance by prefixing it with its type name and a dot:

```java
DayOfWeek day = DayOfWeek.MONDAY;
```

(Like a class, enum variables are references.)

We could approximate the above with an ordinary class like so:

```java
class DaysOfWeek {
    static final DayOfWeek SUNDAY = new DayOfWeek();
    static final DayOfWeek MONDAY = new DayOfWeek();
    static final DayOfWeek TUESDAY = new DayOfWeek();
    static final DayOfWeek WEDNESDAY = new DayOfWeek();
    static final DayOfWeek THURSDAY = new DayOfWeek();
    static final DayOfWeek FRIDAY = new DayOfWeek();
    static final DayOfWeek SATURDAY = new DayOfWeek();
}
```

(The `final` modifier means the field cannot be reassigned new values. Its initial value is 'final'.)

The main advantage of `enum` is that it lets us simply list instance names rather than write something like the above.

[Other conveniences: switch]

Every enum type implicitly extends `java.lang.Enum`. The `Enum` class has a method *values* which will return an array of the instances.
