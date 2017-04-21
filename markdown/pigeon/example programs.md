
# Pigeon example programs

## Fizz Buzz

The "Fizz Buzz" program is a well-known beginner's programming exercise in which we print out the integers 1 up to 100, but:

 - for every value evenly divisible by 3, we instead print out "Fizz"
 - for every value evenly divisible by 5, we instead print out "Buzz"
 - for every value evenly divisible by both 3 and 5, we instead print out "FizzBuzz"

```
var i
var by3
var by5
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

String "_" will designate an empty slot, string "X" will designate an X, and string "O" will designate an O. We'll use three lists of three strings each to represent the board: one list to represent the top row, another list to represent the middle row, and another list to represent the bottom row.

```
var topRow
var middleRow
var bottomRow
var continue
var currentPlayer
as topRow (list "_" "_" "_")
as middleRow (list "_" "_" "_")
as bottomRow (list "_" "_" "_")
as continue true
as currentPlayer "X"

function playerMove
    var move
    var row
    var col
    var slot
    as move null
    while (eq move null)
        as row null
        while (eq row null)
            as row (prompt "Select [t]op, [m]iddle, or [b]ottom row, player " currentPlayer)
            if (eq row "t")
                as row topRow
            elseif (eq row "m")
                as row middleRow
            elseif (eq row "b")
                as row bottomRow
            else
                (print "Invalid input. Try again.")
                as row null
        as col null
        while (eq col null)
            as col (prompt "Select [l]eft, [m]iddle, or [r]ight column, player " currentPlayer)
            if (eq col "l")
                as row 0
            elseif (eq row "m")
                as row 1
            elseif (eq row "r")
                as row 2
            else
                (print "Invalid input. Try again.")
                as row null
        as slot (get row col)
        if (eq slot "_")
            (set row col currentPlayer)
            as move true                       # signal that we're done
        else 
            (print "That slot is occupied! Try again.")
        

# returns "X" if X wins, returns "O" if O wins, returns "_" if no one wins, and returns "tie" if tied
function winner
    var topRowFull
    var middleRowFull
    var bottomRowFull
    # check top row
    if (and (neq (get topRow 0) "_") (eq (get topRow 0) (get topRow 1) (get topRow 2)))
        return (get topRow 0)
    # check middle row
    if (and (neq (get middleRow 0) "_") (eq (get middleRow 0) (get middleRow 1) (get middleRow 2)))
        return (get middleRow 0)
    # check bottom row
    if (and (neq (get bottomRow 0) "_") (eq (get bottomRow 0) (get bottomRow 1) (get bottomRow 2)))
        return (get bottomRow 0)
    # check left column
    if (and (neq (get topRow 0) "_") (eq (get topRow 0) (get middleRow 0) (get bottomRow 0)))
        return (get topRow 0)
    # check middle column
    if (and (neq (get topRow 1) "_") (eq (get topRow 1) (get middleRow 1) (get bottomRow 1)))
        return (get topRow 1)
    # check right column
    if (and (neq (get topRow 2) "_") (eq (get topRow 2) (get middleRow 2) (get middleRow 2)))
        return (get topRow 2)
    # check top-left to bottom-right diagonal
    if (and (neq (get topRow 0) "_") (eq (get topRow 0) (get middleRow 1) (get bottomRow 2)))
        return (get topRow 0)
    # check bottom-left to top-right diagonal
    if (and (neq (get bottomRow 0) "_") (eq (get bottomRow 0) (get middleRow 1) (get topRow 2)))
        return (get bottomRow 0)
    # check tie
    as topRowFull (and (neq (get topRow 0) "_") (neq (get topRow 1) "_") (neq (get topRow 2) "_"))
    as middleRowFull (and (neq (get middleRow 0) "_") (neq (get middleRow 1) "_") (neq (get middleRow 2) "_"))
    as bottomRowFull (and (neq (get bottomRow 0) "_") (neq (get bottomRow 1) "_") (neq (get bottomRow 2) "_"))
    if (and topRowfull middleRowFull bottomRowFull)
        return "tie"
    return "_"

var w
while continue
    (print (concat topRow "\n" middleRow "\n" bottomRow "\n"))
    as w (winner)
    if (eq w "X")
        (print "X's win!")
        as continue false
    elseif (eq w "O")
        (print "O's win!")
    elseif (eq w "tie")
        (print "Tie!")
        as continue false
    else
        (playerMove)
        # toggle the current player
        if (eq currentPlayer "X")
            as currentPlayer "O"
        else
            as currentPlayer "X"
```

## Hangman


