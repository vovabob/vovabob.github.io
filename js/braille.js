var braille = {
    "A": "1",
    "B": "1-2",
    "C": "1-4",
    "D": "1-4-5",
    "E": "1-5",
    "F": "1-2-4",
    "G": "1-2-4-5",
    "H": "1-2-5",
    "I": "2-4",
    "J": "2-4-5",
    "K": "1-3",
    "L": "1-2-3",
    "M": "1-3-4",
    "N": "1-3-4-5",
    "O": "1-3-5",
    "P": "1-2-3-4",
    "Q": "1-2-3-4-5",
    "R": "1-2-3-5",
    "S": "2-3-4",
    "T": "2-3-4-5",
    "U": "1-3-6",
    "V": "1-2-3-6",
    "W": "2-4-5-6",
    "X": "1-3-4-6",
    "Y": "1-3-4-5-6",
    "Z": "1-3-5-6"
};

// NB: will use the DIV ID="svg" in the host HTML file
var paper = Raphael("svg", 500, 500),
    SPACING = 14,
    RADIUS = 2;

function make_dot(number) {
    number -= 1; // normalize to 0-5
    if (number < 0 || number > 5) {
        console.log("Invalid number.");
        return null;
    }
    // first or second column
    var x = Math.floor(number / 3);
    // first, second, or third row of that column
    var y = number % 3;
    var dot = paper.circle(x * SPACING, y * SPACING, RADIUS).attr("fill", "black");
    return dot;
}

function make_cell(dots) {
    // if we get a string, make it an array
    if (typeof dots === "string") {
        dots = dots.split("-");
    }
    var cell = paper.set();

    for (var c = 0; c < dots.length; c += 1) {
        cell.push(make_dot(dots[c]));
    }
    return cell;
}

function make_word(word, pos) {
    pos = pos || { x: 10, y: 10};
    // capitalize
    word = word.toUpperCase();
    var myword = paper.set();
    for (var c = 0; c < word.length; c += 1) {
        if (braille[word[c]]) {
            var letter = make_cell(braille[word[c]]);
            myword.push(letter);
            letter.transform("T" + pos.x + "," + pos.y);
            // move over 3 spaces -- two for the width of the letter and a space between
            pos.x += SPACING * 3;
        }
    }
    return myword;
}

function make_words(message) {
    var pos = { x: 10, y: 10 },
        words = message.toUpperCase().split(" "),
        myset = paper.set();

    for (var c = 0; c < words.length; c += 1) {
        // see if it's time for a carriage return
        myset.push(make_word(words[c], pos));
        if (pos.x > 10 && (pos.x + SPACING * 3 * words[c].length) > paper.width) {
            pos.x = 10;
            pos.y += SPACING * 5;
        } else {
            pos.x += SPACING * 3;
        }
    }
    return myset;
}

var braille_words = paper.set();

function make() {
    // clear any existing words
    braille_words.remove();
    // write new ones, overwriting previous value of set
    braille_words = make_words(document.getElementById("message").value);
};

// click event to invoke function
document.getElementById("clickme").onclick = make;

// call when page loads, which will draw defaul value ("Raphael is great")
make();
