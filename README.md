# note-frequency-map

*A npm package for music note frequency lookup*

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

Change the root:
*The root note is A4=440 by default*
```js
const FrequencyMap = require('note-frequency-map');
FrequencyMap.setRoot('A4', 442); // A4 is normally the refrence note, but any note works!
let myNote = FrequencyMap.note('A3');
console.log(myNote.frequency); // > 221
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