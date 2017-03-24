
# Pigeon example programs

## Fizz Buzz

The "Fizz Buzz" program is a well-known beginner's programming exercise in which we print out the integers 1 up to 100, but for every value evenly divisible by 3, we instead print out "Fizz", for every value evenly divisible by 5, we instead print out "Buzz", and for every value evenly divisible by both 3 and 5, we instead print out "FizzBuzz".

```
as i 1
while (lte i 100)
    as by3 (eq 0 (mod i 3))
    as by5 (eq 0 (mod i 5))
    if (and by3 by5)
        (print "FizzBuzz")
    elseif by3
        (print "Fizz")
    elseif by5
        (print "Buzz")
    else
        (print i)
    as i (add i 1)
```

## Tic-tac-toe


## Hangman


