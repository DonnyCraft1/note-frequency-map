# note-frequency-map

*A npm package for music note frequency lookup*

# Alpha

*This package is currently in alpha, bugs and big structure changes may occur!*

__If you find a bug, or miss a feature, open an issue on the [GitHub page](https://github.com/DonnyCraft1/note-frequency-map)!__

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

# Examples

Find the frequency of a note:
```js
const FrequencyMap = require('note-frequency-map');
let myNote = FrequencyMap.noteFromName('A3');
console.log(myNote.frequency); // > 220
```

---

Find the note from a frequency
```js
const FrequencyMap = require('note-frequency-map');
let myNote = FrequencyMap.noteFromFreq(880);
console.log(myNote.note); // > 'A5'
```

---

Change the root:
*The root note is A4=440 by default*
```js
const FrequencyMap = require('note-frequency-map');
FrequencyMap.setRoot('A4', 442); // A4 is normally the refrence note, but any note works!
let myNote = FrequencyMap.noteFromName('A3');
console.log(myNote.frequency); // > 221
```

---

Compare two note objects
```js
const FrequencyMap = require('note-frequency-map');
let myFirstNote = FrequencyMap.noteFromName('Bb6');
let mySecondNote = FrequencyMap.noteFromName('C#3');
let comparasonObject = myFirstNote.compare(mySecondNote);
console.log(comparasonObject.summary);
// > 'The note A#6 is 2 octaves and 9 semitones away from C#3'
```

# Functionality

*The `note-frequency-map` object has three methods*
* `.noteFromName(name)` - creat a Note object from the note name (e.g. 'C#3')
* `.noteFromFreq(frequency)` - create a Note object from a frequency (e.g. 880)
* `.setRoot(name, frequency)` - set the root note + frequency

---

*The `Note` object has two methods and 7 properties*
* `.transpose(semitones)` - transpose to another note
* `.compare(otherNoteObject)` - see how two notes compare
* `.name` - the name of the note (e.g. 'Bb')
* `.octave` - the octave of the note (e.g. 5)
* `.note` - the name + the octave (e.g. 'Bb5')
* `.frequency` - the frequency of the note
* `.tuning` - what root note it was tuned to, an object
* `.centsOff` - how much out of tune the note is, usefull when finding note from frequency
* `.err` - is defined of something went wrong

# Protip

`console.log()` the data while experimenting. This way you will easely see how things is structured

# Changelog

*Changelog for version `0.0.7`*
* Optimized the note finder (from frequency) alogrithm
* `note-frequency-map.noteFromName(name)` now support both `b` and `♭` as flat symbols
* Fixed `console.log()` typo in README.md
* Bug fixes
* Code cleanup

*Check the [GitHub page](https://github.com/DonnyCraft1/note-frequency-map) for more details*