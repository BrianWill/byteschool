# Go `time` package

The `time` package provides types and functions for dates and times and for reading the system clocks and timers. In daily life, we forget how complicated times and dates really are, but programmers frequently have to deal with these complexities.

The `time` package contains five core types:

 - `time.Location` represents a timezone, like Eastern Standard Time
 - `time.Time` represents a date and time of day as the number of nanoseconds (billionths of a second) since the first moment of January 1st, 1970; it also includes a `time.Location` to denote the timezone
 - `time.Duration` represents a number of nanoseconds between two moments in time
 - `time.Timer` holds a channel which will receive a single `time.Time` value after an elapsed duration
 - `time.Ticker` holds a channel which will receive `time.Time` values at a regular interval

## time.LoadLocation

Rather than create `time.Location` values directly, we pass an [IANA Time Zone](https://en.wikipedia.org/wiki/Tz_database) location name to the function `time.LoadLocation`, which looks up the string in a database and returns a `*time.Location`:

```go
var loc *Location
var err error
loc, err = time.LoadLocation("America/New_York")
```

The global `time.Local` stores a `*time.Location` representing the system-configured timezone, and the global `time.UTC` stores a `*time.Location` representing Coordinated Universal Time (the modern equivalent of Greenwich Mean Time).

## time.Date

The `time.Date` function returns a `time.Time` given a time of day, a `time.Location`, and a calendar year, month, and day:

```go
func Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) Time
```

```go
// October 26th, 1985, 1:21 am
t := time.Date(1985, 10, 26, 1, 21, 0, 0, time.UTC)
```

## time.Now

The `time.Now` function reads the sytem clock, returning a `time.Time` of the current moment with the system-configured timezone:

```go
t := time.Now()            // the current moment in time
```

## time.Parse

The `time.Parse` function parses a `time.Time` from a string. We have to pass a second string denoting the expected format. The accepted formats are described in [the package documentation](https://golang.org/pkg/time/#pkg-constants). Several `time` constants denote commonly used formats:

```go
const (
        ANSIC       = "Mon Jan _2 15:04:05 2006"
        UnixDate    = "Mon Jan _2 15:04:05 MST 2006"
        RubyDate    = "Mon Jan 02 15:04:05 -0700 2006"
        RFC822      = "02 Jan 06 15:04 MST"
        RFC822Z     = "02 Jan 06 15:04 -0700" // RFC822 with numeric zone
        RFC850      = "Monday, 02-Jan-06 15:04:05 MST"
        RFC1123     = "Mon, 02 Jan 2006 15:04:05 MST"
        RFC1123Z    = "Mon, 02 Jan 2006 15:04:05 -0700" // RFC1123 with numeric zone
        RFC3339     = "2006-01-02T15:04:05Z07:00"
        RFC3339Nano = "2006-01-02T15:04:05.999999999Z07:00"
        Kitchen     = "3:04PM"
        // Handy time stamps.
        Stamp      = "Jan _2 15:04:05"
        StampMilli = "Jan _2 15:04:05.000"
        StampMicro = "Jan _2 15:04:05.000000"
        StampNano  = "Jan _2 15:04:05.000000000"
)
```

If the date string does not match the specified format, `time.Parse` returns an error:

```go
// November 24th, 2010, 7:45:13am Eastern Standard Time
t, err := time.Parse(time.RFC1123, "Wed, 24 Nov 2010 07:45:13 EST")
```
## time.Duration constants

To express a `time.Duration`, its convenient to use multiples of these constants:

```go
const (
        Nanosecond  Duration = 1
        Microsecond          = 1000 * Nanosecond
        Millisecond          = 1000 * Microsecond
        Second               = 1000 * Millisecond
        Minute               = 60 * Second
        Hour                 = 60 * Minute
)
```

For example:

```go
a := 3 * time.Second                      // the number of nanoseconds equal to 3 seconds
b := 15 * time.Hour                       // the number of nanoseconds equal to 5 hours
```

## time.NewTimer

The `time.NewTimer` function creates a `time.Timer`. After an elapsed duration, a spawned goroutine will send the current time to the `time.Timer`'s channel:

```go
timer := time.NewTimer(8 * time.Second)
t := <-timer.C                            // the channel is sent the current time after an 8 second wait
```

## time.NewTicker

The `time.NewTicker` function creates a `time.Ticker`. At regular intervals, a spawned goroutine will send the current time to the `time.Ticker`'s channel. When done with a `time.Ticker`, we should call its `Stop` method, which kills the spawned goroutine:

```go
// print the current date and time 10 times spaced in 8 second intervals
ticker := time.NewTicker(8 * time.Second)
for i := 0; i < 10; i++ {
    t := <-ticker.C                       
    fmt.Println(t)
}
ticker.Stop()
```