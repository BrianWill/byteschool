/* moops.js */


/* 
TODO


 - probably will want to rate limit instruction execution for those busy loops while waiting for keyboard input

*/

const MAX_ADDRESS = Math.pow(2, 32) - 1,
    MAX_VALUE = Math.pow(2, 32) - 1,
    MIN_VALUE = -Math.pow(2, 31),
    MIN_MEMORY_ADDRESS = 0x40000000;

// token types
const SQUARE_LEFT = 0,
    SQUARE_RIGHT = 1,
    COLON = 2,
    NUMBER = 3,
    IDENTIFIER = 4,
    COMMA = 5,
    SPACE = 6;

const COPY = 0x00,   // copy register to register
    COPY_IMM = 0x01,    // copy value to register
    SB = 0x02,        // store byte at indirect address
    LB = 0x03,        // load byte from indirect address
    SW = 0x04,        // store word at indirect address
    LW = 0x05,        // load word from indirect address

    ADD = 0x10,       // add two registers, storing in third
    ADD_IMM = 0x11,     // add immediate value
    SUB = 0x12,
    MUL = 0x13,
    DIV = 0x14,
    MOD = 0x15
    NEG = 0x16,
    FLOW = 0x17,       // check for overflow

    EQ = 0x20,
    NEQ = 0x21,
    GT = 0x22,
    LT = 0x23,
    GTE = 0x24,
    LTE = 0x25,

    AND = 0x30,
    AND_IMM = 0x31,
    OR = 0x32
    OR_IMM = 0x33
    XOR = 0x34
    XOR_IMM = 0x35

    LSHIFT_IMM = 0x40,
    LSHIFT = 0x41,
    ZRSHIFT_IMM = 0x42,
    ZRSHIFT = 0x43,
    RSHIFT_IMM = 0x44,
    RSHIFT = 0x45,

    JUMP = 0x50,
    ZJUMP = 0x51,
    CALL = 0x52,
    RETURN = 0x53;

// TODO do we need rotate instructions?

// instruction size in bytes
const sizeByOpcode = {};
sizeByOpcode[COPY] = 3;   
sizeByOpcode[COPY_IMM] = 6;   
sizeByOpcode[SB] = 8;        
sizeByOpcode[LB] = 8;        
sizeByOpcode[SW] = 8;        
sizeByOpcode[LW] = 8;        

sizeByOpcode[ADD] = 4;       
sizeByOpcode[ADD_IMM] = 7;    
sizeByOpcode[SUB] = 4;
sizeByOpcode[MUL] = 4;
sizeByOpcode[DIV] = 4;
sizeByOpcode[MOD] = 4;
sizeByOpcode[NEG] = 2;
sizeByOpcode[FLOW] = 2;

sizeByOpcode[EQ] = 4;
sizeByOpcode[NEQ] = 4;
sizeByOpcode[GT] = 4;
sizeByOpcode[LT] = 4;
sizeByOpcode[GTE] = 4;
sizeByOpcode[LTE] = 4;

sizeByOpcode[AND] = 4;
sizeByOpcode[AND_IMM] = 7;
sizeByOpcode[OR] = 4;
sizeByOpcode[OR_IMM] = 7;
sizeByOpcode[XOR] = 4;
sizeByOpcode[XOR_IMM] = 7;

sizeByOpcode[LSHIFT_IMM] = 7;
sizeByOpcode[LSHIFT] = 4;
sizeByOpcode[ZRSHIFT_IMM] = 7;
sizeByOpcode[ZRSHIFT] = 4;
sizeByOpcode[RSHIFT_IMM] = 7;
sizeByOpcode[RSHIFT] = 4;

sizeByOpcode[JUMP] = 7;
sizeByOpcode[ZJUMP] = 8;
sizeByOpcode[CALL] = 7;
sizeByOpcode[RETURN] = 1;

const R0 = 0,
    R1 = 1,
    R2 = 2,
    R3 = 3,
    R4 = 4,
    R5 = 5,
    R6 = 6,
    R7 = 7,
    SP = 8;

const readableRegisterNames = {
    "r0": true,
    "r1": true,
    "r2": true,
    "r3": true,
    "r4": true,
    "r5": true,
    "r6": true,
    "r7": true,
    "sp": true
};

const mnemonicToOpcode = {
    "copy": [COPY, "rr", COPY_IMM, "rv"],
    "sb": [SB, "ar"],
    "lb": [LB, "ra"],
    "sw": [SW, "ar"],
    "lw": [LW, "ra"],

    "add": [ADD, "rrr", ADD_IMM, "rrv"],
    "sub": [SUB, "rrr"],
    "mul": [MUL, "rrr"],
    "div": [DIV, "rrr"],
    "mod": [MOD, "rrr"],
    "neg": [NEG, "r"],
    "flow": [FLOW, "r"],

    "eq": [ADD, "rrr"],
    "neq": [ADD, "rrr"],
    "gt": [GT, "rrr"],
    "lt": [LT, "rrr"],
    "gte": [GTE, "rrr"],
    "lte": [LTE, "rrr"],

    "and": [AND, "rrr", AND_IMM, "rrv"],
    "or": [OR, "rrr", OR_IMM, "rrv"],
    "xor": [XOR, "rrr", XOR_IMM, "rrv"],

    "lshift": [LSHIFT, "rrr", LSHIFT_IMM, "rrv"],
    "zrshift": [ZRSHIFT, "rrr", ZRSHIFT_IMM, "rrv"],
    "rshift": [RSHIFT, "rrr", RSHIFT_IMM, "rrv"],

    "jump": [JUMP, "a"],
    "zjump": [ZJUMP, "ra"],
    "call": [CALL, "a"],
    "return": [RETURN, ""],
};

const KEYBOARD_STATUS_ADDRESS = 0x20000000;
const KEYBOARD_DATA_ADDRESS = 0x20000001;
const DISPLAY_STATUS_ADDRESS = 0x20000002;
const DISPLAY_DATA_ADDRESS = 0x20000003;

// register state
var memory;
var registers, overflow;
var keyboard, display;
var instructions;

function reset() {
    errorMsg.innerHTML = "";
    memory = {};
    registers = {
        'r0': 0x00000000,
        'r1': 0x00000000,
        'r2': 0x00000000,
        'r3': 0x00000000,
        'r4': 0x00000000,
        'r5': 0x00000000,
        'r6': 0x00000000,
        'r7': 0x00000000,
        'sp': 0xf0000000,
        'pc': 0x00000000,
    };
    overflow = false;
    instructions = null;
    keyboard = {
        status: 0,
        data: [],          // circular buffer
        idx: 0,
        length: 0,
        SIZE: 256,
        STATUS_ADDRESS: 0x20000000,
        DATA_ADDRESS: 0x20000001,
        read: function() {   
            if (this.length === 0) {
                return 0;          // empty buffer returns 0
            }
            var value = this.data[this.idx];   // we read from front of buffer
            this.idx++;
            if (this.idx === this.SIZE) {
                this.idx = 0;
            }
            this.length--;
            return value;
        },
        write: function(value) {   
            if (this.length === 0) {
                this.data[this.idx] = value;
                this.length = 1;
                this.idx++;
                if (this.idx === this.SIZE) {
                    this.idx = 0;
                }
            } else if (this.length === this.SIZE) {
                // do nothing: if buffer is full, typed keys are ignored
            } else {
                var i = this.idx + this.length;
                if (i >= this.SIZE) {
                    i -= this.SIZE;
                }
                this.data[i] = value;      // we write to end of buffer
                this.length++;
            }
        }
    };
    display = {
        status: 0,
        data: [],   
        MAX_SIZE: 1000,  // impose a cap just so it doesn't get crazy huge
        STATUS_ADDRESS: 0x20000002,
        DATA_ADDRESS: 0x20000003,
        write: function(value) {
            this.data[this.data.length] = value;
            if (this.data.length > this.MAX_SIZE) { // if too big, discard first half of buffer
                this.data = this.data.slice(Math.floor(this.MAX_SIZE / 2));
            }
        },
        toString: function() {
            var chars = [];
            for (var i in this.data) {
                chars.push(String.fromCharCode(this.data[i]));
            }
            return chars.join('');
        }
    };
    highlightLine(null);
    displayRegisters();
}

function writeRegister(reg, value) {
    if (registers[reg] === undefined) {
        throw "cannot write to non-existent register";
    }
    if (reg === "pc") {
        throw "cannot write to pc register";
    }
    registers[reg] = value >>> 0;
}

function readRegister(reg) {
    if (registers[reg] === undefined) {
        throw "cannot read non-existent register";
    }
    if (reg === "pc") {
        throw "cannot read the pc register";
    }
    return registers[reg];
}

function signedDecimal(value) {
    var a = (value & 0x80000000) >>> 0; // shift to remove sign
    if (a === 0x80000000) {
        return -Math.abs(value ^ 0xFFFFFFFF + 1);
    } else {
        return '';
    }
}

function addUnsigned32Bit() {
    var sum = 0;
    for (var i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum >>> 0;   // truncate to lowest 32 bits
}

function negate(value) {
    return (-value) >>> 0;
}

function decimalToBinary(value){
    // truncate to lowest 32 bits
    return (value >>> 0).toString(2);
}

function decimalToHex(value){
    // truncate to lowest 32 bits
    var hex = (value >>> 0).toString(16);
    var padding = 8 - hex.length;
    hex = "0".repeat(padding) + hex;
    return "0x" + hex.substring(0, 4).toUpperCase() + "_" + hex.substring(4).toUpperCase();
}

function indirectAddress(ia) {
    var reg1 = (ia.reg1 !== undefined) ? readRegister(ia.reg1) : 0;
    var reg2 = (ia.reg2 !== undefined) ? readRegister(ia.reg2) : 0;
    var offset = (ia.offset !== undefined) ? ia.offset : 0;
    return addUnsigned32Bit(reg1, reg2, offset);
}

function truncateTo32Bits(value) {
    return value >>> 0;
}

// input is 32 bit unsigned
function lowestByte(word) {
    word = word << 24;
    return word >>> 24;
}

// input is 32-bit unsigned
function wordToBytes(word) {
    var bytes = [];
    bytes[0] = (word & 0xFF000000) >>> 24;
    bytes[1] = (word & 0x00FF0000) >>> 16;
    bytes[2] = (word & 0x0000FF00) >>> 8;
    bytes[3] = word & 0x000000FF;
    return bytes;
}

// bytes is big-endian
function bytesToWord(bytes) {
    return (
        (bytes[0] << 24) +
        (bytes[1] << 16) +
        (bytes[2] << 8) +
        bytes[3]
    );
}

// TODO read / write non-memory addresses

function readMemory(address) {
    if (address > MAX_ADDRESS || address < 0) {
        throw "address " + address + " is invalid";
    }
    if (address >= MIN_MEMORY_ADDRESS) {
        var value = memory[address];
        if (value === undefined) {
            value = 0;
        }
        return value;
    }
    switch (address) {
    case KEYBOARD_STATUS_ADDRESS:
    case KEYBOARD_DATA_ADDRESS:
    case DISPLAY_STATUS_ADDRESS:
    case DISPLAY_DATA_ADDRESS:

    }
}

function writeMemory(address, value) {
    if (address > MAX_ADDRESS || address < 0) {
        throw "address " + address + " is invalid";
    }
    if (value > 255 || value < 0) {
        throw "byte value " + value + " is invalid";
    }
    if (address >= MIN_MEMORY_ADDRESS) {
        memory[address] = value;
    }
    switch (address) {
    case KEYBOARD_STATUS_ADDRESS:
        keyboard_status = value;
    case KEYBOARD_DATA_ADDRESS:
        keyboard_end_idx++;
        if (keyboard_end_idx === 256) {
            keyboard_end_idx = 0;
        }
        if (keyboard_data.length < 256) {
            keyboard
        }
        
    case DISPLAY_STATUS_ADDRESS:
    case DISPLAY_DATA_ADDRESS:

    }
}

// depending upon the instruction
function runInstruction(ins) {
    var op1 = ins.operands[0];
    var op2 = ins.operands[1];
    var op3 = ins.operands[2];
    switch (ins.opcode) {
    case COPY:
        writeRegister(op1, readRegister(op2))
        break;
    case COPY_IMM: 
        writeRegister(op1, op2)
        break;    
    case SB:
        writeMemory(indirectAddress(op1), lowestByte(readRegister(op2)));
        break;
    case LB: 
        writeRegister(op1, readMemory(indirectAddress(op2)));
        break;
    case SW:
        var addr = indirectAddress(op1);
        var bytes = wordToBytes(readRegister(op2));
        writeMemory(addr, bytes[0]);
        writeMemory(addr + 1, bytes[1]);
        writeMemory(addr + 2, bytes[2]);
        writeMemory(addr + 3, bytes[3]);
        break;
    case LW:
        var addr = indirectAddress(op2);
        var bytes = [
            readMemory(addr),
            readMemory(addr + 1),
            readMemory(addr + 2),
            readMemory(addr + 3)
        ];
        writeRegister(op1, bytesToWord(bytes));
        break;
    case ADD:
        // TODO set/clear overflow flag
        writeRegister(op1, readRegister(op2) + readRegister(op3));
        break;
    case ADD_IMM:
        writeRegister(op1, readRegister(op2) + op3);
        break;
    case SUB:
        writeRegister(op1, readRegister(op2) + negate(readRegister(op3)));
        break;
    case MUL:
        writeRegister(op1, readRegister(op2) * readRegister(op3));
        break;
    case DIV:
        writeRegister(op1, Math.floor(readRegister(op2) / readRegister(op3)));
        break;
    case MOD:
        writeRegister(op1, readRegister(op2) % readRegister(op3));
        break;
    case NEG:
        writeRegister(op1, negate(readRegister(op1)));
        break;
    case FLOW:
        writeRegister(op1, overflow ? 0 : -1); 
        break;
    case EQ:
        writeRegister(op1, (readRegister(op2) === readRegister(op3)) ? 0 : -1); 
        break;
    case NEQ:
        writeRegister(op1, (readRegister(op2) !== readRegister(op3)) ? 0 : -1); 
        break;
    case GT:
        writeRegister(op1, (readRegister(op2) > readRegister(op3)) ? 0 : -1); 
        break;
    case LT:
        writeRegister(op1, (readRegister(op2) < readRegister(op3)) ? 0 : -1); 
        break;
    case GTE:
        writeRegister(op1, (readRegister(op2) >= readRegister(op3)) ? 0 : -1); 
        break;
    case LTE:
        writeRegister(op1, (readRegister(op2) <= readRegister(op3)) ? 0 : -1); 
        break;
    case AND:
        writeRegister(op1, readRegister(op2) & readRegister(op3)); 
        break;
    case AND_IMM:
        writeRegister(op1, readRegister(op2) & op3); 
        break;
    case OR:
        writeRegister(op1, readRegister(op2) | readRegister(op3)); 
        break;
    case OR_IMM:
        writeRegister(op1, readRegister(op2) | op3);
        break;
    case XOR:
        writeRegister(op1, readRegister(op2) ^ readRegister(op3)); 
        break;
    case XOR_IMM:
        writeRegister(op1, readRegister(op2) ^ op3);
        break;
    case LSHIFT_IMM:
        writeRegister(op1, readRegister(op2) << op3);
        break;
    case LSHIFT:
        writeRegister(op1, readRegister(op2) << readRegister(op3)); 
        break;
    case ZRSHIFT_IMM:
        writeRegister(op1, readRegister(op2) >>> op3);
        break;
    case ZRSHIFT:
        writeRegister(op1, readRegister(op2) >>> op3); 
        break;
    case RSHIFT_IMM:
        writeRegister(op1, readRegister(op2) >> op3);
        break;
    case RSHIFT: 
        writeRegister(op1, readRegister(op2) >> readRegister(op3)); 
        break;
    case JUMP:
        registers['pc'] = indirectAddress(op1);
        break;
    case ZJUMP:
        var reg = readRegister(op1);
        if (reg === 0) {
            registers['pc'] = indirectAddress(op2);
        } else {
            registers['pc'] += sizeByOpcode[ins.opcode];
        }
        break;
    case CALL:
        // store pc on stack
        var sp = registers['sp'];
        var bytes = wordToBytes(registers['pc']);
        writeMemory(sp, bytes[0]);
        writeMemory(sp + 1, bytes[1]);
        writeMemory(sp + 2, bytes[2]);
        writeMemory(sp + 3, bytes[3]);
        // nope, we don't check for overflow! programmer's responsibility to avoid
        registers['sp'] = addUnsigned32Bit(sp, 4);          // increment stack pointer by 4
        registers['pc'] = indirectAddress(op1);
        break;
    case RETURN:
        var sp = addUnsigned32Bit(registers['sp'], -4);     // decrement stack pointer by 4
        var bytes = [
            readMemory(sp),
            readMemory(addUnsigned32Bit(sp, 1)),
            readMemory(addUnsigned32Bit(sp, 2)),
            readMemory(addUnsigned32Bit(sp, 3))
        ];
        registers['pc'] = bytesToWord(bytes);
        break;
    }
    switch (ins.opcode) {
    case JUMP:
    case ZJUMP:
    case CALL:
    case RETURN:
        // do nothing
        break;
    default:
        registers['pc'] += sizeByOpcode[ins.opcode];
    }
}

function isAlphaNumeric(char) {
    char = char.charCodeAt(0);
    return (
        (char > 47 && char < 58) ||    // numeric (0-9)
        (char > 64 && char < 91) ||    // upper alpha (A-Z)
        (char > 96 && char < 123) ||   // lower alpha (a-z)    
        char === 95                    // underscore
    );
};

function isNumeric(char) {
    char = char.charCodeAt(0);
    return (char > 47 && char < 58);
};

function lexLine(line) {
    var tokens = [];
    for (var i = 0; i < line.length; ) {
        var ch = line.charAt(i);
        if (ch === "#") {
            // comments
            break;
        } else if (ch === ":") {
            tokens.push({type: COLON});
            i++;
        } else if (ch === ",") {
            tokens.push({type: COMMA});
            i++;
        } else if (ch === "[") {
            tokens.push({type: SQUARE_LEFT});
            i++;
        } else if (ch === "]") {
            tokens.push({type: SQUARE_RIGHT});
            i++;
        } else if (ch === " ") {
            var j = i + 1;
            for ( ; j < line.length; j++) {
                if (line.charAt(j) !== " ") {
                    break;
                }
            }
            tokens.push({type: SPACE});
            i = j;
        } else if (ch === "0" && line.charAt(i + 1).toLowerCase() === "x") {   // hex number
            for (var j = i + 2; j < line.length; j++) {
                ch = line.charAt(j);
                if (!isNumeric(ch) && ch !== "_") {
                    break;
                }
            }
            var str = line.substring(i, j).replace(/_/g, "");    // strip out underscores
            var value = parseInt(str);        
            if (value > MAX_VALUE) {
                throw "hex number cannot exceed max value";
            }
            tokens.push({type: NUMBER, value: value});
            i = j;
        } else if (ch === "-" || isNumeric(ch)) {
            var j = i + 1;
            for ( ; j < line.length; j++) {
                if (!isNumeric(line.charAt(j))) {
                    break;
                }
            }
            var str = line.substring(i, j);
            var value = parseInt(str);        
            if (value > MAX_VALUE) {
                throw "number cannot exceed max value";
            }
            if (value < MIN_VALUE) {
                throw "number cannot exceed min value";
            }
            value = value >>> 0;   // coerce to unsigned
            tokens.push({type: NUMBER, value: value});    
            i = j;
        } else if (isAlphaNumeric(ch)) {
            var j = i + 1;
            for ( ; j < line.length; j++) {
                if (!isAlphaNumeric(line.charAt(j))) {
                    break;
                }
            }
            tokens.push({type: IDENTIFIER, value: line.substring(i, j)});
            i = j;
        } else {
            throw "invalid character encountered";
        }       
    }
    return tokens;
}

function parseLine(tokens) {
    var label = null;
    var instruction = null;
    var i = 0;
    if (tokens[i] !== undefined && tokens[i].type === SPACE) {
        i++;
    }
    // check for label
    if (tokens[i] !== undefined && 
        tokens[i].type === IDENTIFIER && 
        tokens[i + 1] !== undefined && 
        tokens[i + 1].type === COLON) {
        label = tokens[i].value;
        i += 2;
    }

    if (tokens[i] !== undefined && tokens[i].type === SPACE) {
        i++;
    }
    if (tokens[i] === undefined) {
        return {label: label, instruction: instruction};
    }

    // get mnemonic
    if (tokens[i].type !== IDENTIFIER) {
        throw "expected mnemonic";
    }
    var mnemonic = tokens[i].value;
    i++;

    var instruction = {};
    instruction.operands = parseOperands(tokens, i);
    instruction.opcode = opcodeFromMemonicOperands(mnemonic, instruction.operands);

    return {label: label, instruction: instruction};
}

// returns list of operands (may be any number of operands)
function parseOperands(tokens, startIdx) {
    var operands = [];
    var commaExpected = false;    // only accept commas after operands
    var operandExpected = false;  // after comma, expect another operand
    for (var i = startIdx; i < tokens.length; i++) {
        var t = tokens[i];
        if (t.type === SPACE) {
            // do nothing
        } else if (t.type === COMMA) {
            if (!commaExpected) {
                throw "unexpected comma";
            } else {
                commaExpected = false;
                operandExpected = true;
            }
        } else if (t.type === NUMBER) {
            if (commaExpected) {
                throw "missing comma";
            } 
            operands.push(t.value);
            commaAccepted = true;
            operandExpected = false;
        } else if (t.type === IDENTIFIER) {  // register or label
            if (commaExpected) {
                throw "missing comma";
            } 
            operands.push(t.value);
            commaExpected = true;
            operandExpected = false;
        } else if (t.type === SQUARE_LEFT) {
            if (commaExpected) {
                throw "missing comma";
            } 
            var address = {};
            var closed = false;
            var nNumbers = 0;
            var nRegisters = 0;
            for (i = i + 1; i < tokens.length; i++) {
                t = tokens[i];
                if (t.type === SPACE) {
                    // do nothing
                } else if (t.type === NUMBER) {
                    address.offset = t.value;
                    nNumbers++;
                } else if (t.type === IDENTIFIER) {
                    if (readableRegisterNames[t.value]) {
                        if (address.reg1) {
                            address.reg2 = t.value;
                        } else {
                            address.reg1 = t.value;    
                        }
                        nRegisters++;
                    } else if (t.value === 'pc') {
                        throw "cannot use pc in an address";
                    } else {
                        address.offset = t.value;
                        nNumbers++;   // must be a label
                    }
                } else if (t.type === SQUARE_RIGHT) {
                    closed = true;
                    break;
                } else {
                    throw "unexpected token in address";
                }
            }
            if (!closed) {
                throw "address is missing closing ]";
            }
            if (nNumbers > 1) {
                throw "address has more than one offset";
            }
            if (nRegisters > 2) {
                throw "address has more than two registers";
            } 
            if (nNumbers + nRegisters === 0) {
                throw "address has no registers or offset";
            }
            operands.push(address);
            commaExpected = true;
            operandExpected = false;
        } else {
            throw "unexpected token";
        }
    }
    if (operandExpected) {
        throw "missing operand after comma";
    }
    return operands;
}


function isRegisterOperand(operand) {
    return readableRegisterNames[operand];
}


function isNumberOperand(operand) {
    return (
        ((typeof operand) === "number") ||
        ((typeof operand) === "string" && !isRegisterOperand(operand))
    );
}

function isAddressOperand(operand) {
    return (typeof operand) === "object";
}


// returns opcode (also validates correctness of the number of operand and correctness of their types)
// address operands are objects, registers are strings, and numbers are registers or strings
function opcodeFromMemonicOperands(mnemonic, operands) {
    var opcodePatterns = mnemonicToOpcode[mnemonic];
    if (!opcodePatterns) {
        throw "invalid mnemonic";
    }
    for (var i = 0; i < opcodePatterns.length; i += 2) {
        var pattern = opcodePatterns[i + 1];
        if (pattern.length !== operands.length) {
            continue;
        }
        var match = true;
        for (var j = 0; j < pattern.length; j++) {
            var operand = operands[j];
            switch (pattern.charAt(j)) {
            case "r":
                if (!isRegisterOperand(operand)) {
                    match = false;
                }
                break;
            case "v":
                if (!isNumberOperand(operand)) {
                    match = false;
                }
                break;
            case "a":
                if (!isAddressOperand(operand)) {
                    match = false;
                }
                break;
            }
        }
        if (match) {
            return opcodePatterns[i];
        }
    }
    throw "invalid operands for mnemonic"
}


function displayRegisters() {
    var table = document.getElementById("register_table");
    
    table.innerHTML = `
        <tr>
            <td>pc: ${decimalToHex(registers['pc'])} <span>${registers['pc']}</span></td>
            <td>sp: ${decimalToHex(registers['sp'])} <span>${registers['sp']}</span></td>
        </tr>
        <tr>
            <td>r1: ${decimalToHex(registers['r1'])} <span>${registers['r1']}<span class="signed">${signedDecimal(registers['r1'])}</span></span></td>
            <td>r2: ${decimalToHex(registers['r2'])} <span>${registers['r2']}<span class="signed">${signedDecimal(registers['r2'])}</span></span></td>
        </tr>
        <tr>    
            <td>r3: ${decimalToHex(registers['r3'])} <span>${registers['r3']}<span class="signed">${signedDecimal(registers['r3'])}</span></span></td>
            <td>r4: ${decimalToHex(registers['r4'])} <span>${registers['r4']}<span class="signed">${signedDecimal(registers['r4'])}</span></span></td>
        </tr>
        <tr>
            <td>r5: ${decimalToHex(registers['r5'])} <span>${registers['r5']}<span class="signed">${signedDecimal(registers['r5'])}</span></span></td>
            <td>r6: ${decimalToHex(registers['r6'])} <span>${registers['r6']}<span class="signed">${signedDecimal(registers['r6'])}</span></span></td>
        </tr>
        <tr>
            <td>r7: ${decimalToHex(registers['r7'])} <span>${registers['r7']}<span class="signed">${signedDecimal(registers['r7'])}</span></span></td>
        </tr>
    `;
}

var stepButton = document.getElementById("step_button");
stepButton.onclick = displayRegisters;

function displayMemory() {

}

function assemble(text) {
    var lines = text.split('\n');
    var instructionsByAddress = {};
    var addressesByLabel = {};
    var address = 0;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var tokens = lexLine(line);
        var parsed = parseLine(tokens);
        var label = parsed.label;
        var instruction = parsed.instruction;
        if (label) {
            if (addressesByLabel[label]) {
                throw "cannot define a label more than once";
            }
            addressesByLabel[label] = address;
        }
        if (instruction) {
            instruction.lineIdx = i;
            instructionsByAddress[address] = instruction;
            address += sizeByOpcode[instruction.opcode];
        }
    }

    // replace labels with addresses
    for (var i in instructionsByAddress) {
        var ins = instructionsByAddress[i];
        for (var j in ins.operands) {
            var operand = ins.operands[j];
            if (typeof operand === "object") {
                var offset = operand.offset;
                if (typeof offset === "string") {
                    if (addressesByLabel[offset] === undefined) {
                        throw "label " + offset + " is not defined";
                    }
                    operand.offset = addressesByLabel[offset];
                }
            }
        }
    }
    return instructionsByAddress;
}

function highlightLine(idx) {
    var lines = codeDiv.innerText.split('\n');
    if (idx !== null && idx < lines.length) {
        lines[idx] = '<span id="current_line">' + lines[idx] + '</span>';
    }
    codeDiv.innerHTML = lines.join('<br/>');
}

var codeDiv = document.getElementById('code_text');

var runButton = document.getElementById('run_button');
var stepButton = document.getElementById('step_button');
var resetButton = document.getElementById('reset_button');
var errorMsg = document.getElementById('error_message');

function displayError(ex) {
    if (typeof ex === "string") {
        errorMsg.innerHTML = 'ERROR:' + ex;
    }
}

runButton.onclick = function run() {
    reset();
    var code = codeDiv.innerText;
    try {
        instructions = assemble(code);
    } catch (ex) {
        displayError(ex);
    }

    // step via recursive timeout because we can't hog single thread: 
    // we need keyboard input handler to run while instructions are executing
    function step() {
        var instruction = instructions[registers['pc']];
        if (instruction !== undefined) {
            try {
                runInstruction(instruction);
            } catch (ex) {
                displayError(ex);
            }
            displayRegisters();
            window.setTimeout(step, 0);
        } else {
            instructions = null;
        }
    }
    step();
};

stepButton.onclick = function step() {
    if (instructions === null) {
        reset();
        var code = codeDiv.innerText;
        try {
            instructions = assemble(code);
        } catch (ex) {
            displayError(ex);
        }
    }
    var instruction = instructions[registers['pc']];
    if (instruction !== undefined) {
        highlightLine(instruction.lineIdx);
        try {
            runInstruction(instruction);
        } catch (ex) {
            displayError(ex);
        }
        displayRegisters();
    } else {
        reset();
    }
};

resetButton.onclick = reset;

reset();

