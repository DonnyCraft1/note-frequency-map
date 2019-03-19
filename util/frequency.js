const scale = require('./scale');

function fromNote (note) { // Note object
    return calculate(note.name, note.octave, note.tuning);
}

function transpose (note, semitones) {
    let index = scale.indexOf(note.name) + semitones;
    let newOctave = note.octave;

    while (index < 0) {
        index += scale.length;
        newOctave--;
    }

    console.log(index > scale.length - 1);

    while (index > scale.length - 1) {
        index -= scale.length;
        newOctave++;
    }

    if (newOctave < 0) {
        return new Error(7, `This result in octave being "${octave}"`, string);
    }

    note.octave = newOctave;
    note.name = scale[index];
}

function getSemitonesFromNote (name1, octave1, name2, octave2) {
    let semitones = scale.indexOf(name1) - scale.indexOf(name2);
    let octaves = octave1 - octave2;
    return semitones + (octaves * scale.length);
}

function getSemitonesFromRoot (name, octave, rootNote) {
    return getSemitonesFromNote(name, octave, rootNote.name, rootNote.octave);
}

function getStepSize () {
    return Math.pow(2, 1/12);
}

function calculate (name, octave, rootNote) {
    return rootNote.frequency * Math.pow(getStepSize(), getSemitonesFromRoot(name, octave, rootNote));
}

module.exports.fromNote = fromNote;
module.exports.transpose = transpose;
module.exports.getSemitonesFromNote = getSemitonesFromNote;