const frequency = require('./util/frequency');
const Comparison = require('./Comparison');
const Error = require('./Error');

class Note {
    constructor (name, octave, freq, baseNote) {
        this.name = name;
        this.octave = octave;
        this.note;
        this.tuning = {
            name: baseNote.name,
            octave: baseNote.octave,
            frequency: baseNote.frequency
        };

        if (freq === null) {
            this.frequency = frequency.fromNote(this, this.tuning);
            this.centsOff = 0;
        } else {
            this.frequency = freq;
            let checkedName = name || null;
            let checkedOctave = octave || null;
            let closest = frequency.getCentsOffFromNote(checkedName, checkedOctave, freq, baseNote);
            if (closest !== false) {
                this.centsOff = closest.cents;
                this.name = closest.note.name;
                this.octave = closest.note.octave;
            } else this.err = new Error(7, `The frequency "${freq}" is out of range`, freq);
        }

        if (this.name !== null && this.octave !== null) {
            this.note = this.name + this.octave;
        }
    }

    transpose (semitones) {
        frequency.transpose(this, semitones);
    }

    compare (note) {
        return new Comparison(this, note);
    }
}

module.exports = Note;