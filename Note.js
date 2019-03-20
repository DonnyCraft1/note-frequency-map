const frequency = require('./util/frequency');
const Comparison = require('./Comparison');

class Note {
    constructor (name, octave, rootNote) {
        this.name = name;
        this.octave = octave;
        this.note;
        if (this.name !== null && this.octave !== null) {
            this.note = this.name + this.octave;
        }
        this.tuning = {
            name: rootNote.name,
            octave: rootNote.octave,
            frequency: rootNote.frequency
        };
        this.frequency = frequency.fromNote(this, this.tuning);
    }

    transpose (semitones) {
        frequency.transpose(this, semitones);
    }

    compare (note) {
        return new Comparison(this, note);
    }
}

module.exports = Note;