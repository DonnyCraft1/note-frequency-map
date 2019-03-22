const parser = require('./util/parser');
const Note = require('./Note');

let rootNote = {
    name: 'A',
    octave: 4,
    frequency: 440
}

function setRoot (note, freq) {
    let parsed = parser.parseString(note);
    if (parsed.err !== undefined) return false;
    if (isNaN(freq) || freq <= 0) return false;
    rootNote.name = parsed.name;
    rootNote.octave = parsed.octave;
    rootNote.frequency = freq;
    return true;
}

function noteFromName (note) {
    let parsed = parser.parseString(note);
    return new Note(parsed.name, parsed.octave, null, rootNote);
}

function noteFromFreq (freq) {
    return new Note(null, null, freq, rootNote);
}

function noteFromNameExport (notes) {
    // If it's an array
    if (Array.isArray(notes)) {
        let result = [];
        for (let i = 0; i < notes.length; i++) {
            result.push(noteFromName(notes[i]));
        }
        return result;
    // If it's not an array
    } else {
        return noteFromName(notes);
    }
}

function noteFromFreqExport (freqs) {
    // If it's an array
    if (Array.isArray(freqs)) {
        let result = [];
        for (let i = 0; i < freqs.length; i++) {
            result.push(noteFromFreq(freqs[i]));
        }
        return result;
    // If it's not an array
    } else {
        return noteFromFreq(freqs);
    }
}

module.exports = {
    setRoot: (string, freq) => setRoot(string, freq),
    noteFromName: string => noteFromNameExport(string),
    noteFromFreq: float => noteFromFreqExport(float)
}
