# note-frequency-map

*A npm package for music note frequency lookup*

# Beta

*This package is currently in alpha, bugs and big structure changes may occur!*

__If you find a bug, or miss a feature, open an issue in the [GitHub page](https://github.com/DonnyCraft1/note-frequency-map)!__

# Installation

Using npm:
```
$ npm install note-frequency-map
```

In NodeJS:
```js
// Load the package
const FrequencyMap = require('note-frequency-map');
```

# Example

Find the frequency of a note:
```js
const FrequencyMap = require('note-frequency-map');
let myNote = FrequencyMap.note('A3');
console.log(myNote.frequency); // > 220
```

---

Change the root:
*The root note is A4=440 by default*
```js
const FrequencyMap = require('note-frequency-map');
FrequencyMap.setRoot('A4', 442); // A4 is normally the refrence note, but any note works!
let myNote = FrequencyMap.note('A3');
console.log(myNote.frequency); // > 221
```

---

*Compare two note objects*
```js
const FrequencyMap = require('note-frequency-map');
let myFirstNote = FrequencyMap.note('Bb6');
let mySecondNote = FrequencyMap.note('C#3');
let comparasonObject = myFirstNote.compare(mySecondNote);
console.log(comparasonObject.summary);
// > 'The note A#6 is 2 octaves and 9 semitones away from C#3'
```

# Functionality

*The `note-frequency-map` object has two methods*
* `.note(name)` - creat a Note object
* `.setRoot(name, frequency)` - set the root note + frequency

---

*The `Note` object has two methods and 4 properties*
* `.transpose(semitones)` - transpose to another note
* `.compare(otherNoteObject)` - see how two notes compare
* `.name` - the name of the note (e.g. 'Bb')
* `.octave` - the octave of the note (e.g. 5)
* `.frequency` - the calculated frequency for the note
* `.tuning` - what root note it was tuned to, an object

# Protip

`Console.log()` the objects while experimenting. This way you will easely see how things is structured