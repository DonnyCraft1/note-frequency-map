const parser = require('./util/parser');
const Note = require('./Note');

let baseNote = {
    name: 'A',
    octave: 4,
    frequency: 440
}

function setBase (note, freq) {
    let parsed = parser.parseString(note);
    if (parsed.err !== undefined) return false;
    if (isNaN(freq) || freq <= 0) return false;
    baseNote.name = parsed.name;
    baseNote.octave = parsed.octave;
    baseNote.frequency = freq;
    return true;
}

function noteFromName (note) {
    let parsed = parser.parseString(note);
    return new Note(parsed.name, parsed.octave, null, baseNote);
}

function noteFromFreq (freq) {
    return new Note(null, null, freq, baseNote);
}

module.exports = {
    setBase: (string, freq) => setBase(string, freq),
    noteFromName: string => noteFromName(string),
    noteFromFreq: float => noteFromFreq(float)
}
