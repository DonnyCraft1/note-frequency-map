const scale = require('./scale');

function fromNote (note) { // Note object
    return calculate(note.name, note.octave, note.tuning);
}

// This function finds how much off the note is from either a defined one, or the closest one
function getCentsOffFromNote (name, octave, freq, baseNote) {
    let closestNoteName = name;
    let closestNoteOctave = octave
    // If no note is choosen, find the closest note
    if (closestNoteName === null || closestNoteOctave === null) {

        // First find the octave
        for (let i = -3; i < 40; i++) {
            let minFreq = calculate(scale[0], i, baseNote) / getHalfStepSize();
            let maxFreq = calculate(scale[scale.length - 1], i, baseNote) * getHalfStepSize();

            // Octave is not found, continue to next octave
            if (!(freq >= minFreq && freq <= maxFreq)) continue;

            // Octave was found, try to find the note.
            closestNoteOctave = i;

            // Find the closest note
            for (let i = 0; i < scale.length; i++) {
                let currentNoteFreq = calculate(scale[i], closestNoteOctave, baseNote);
                let centsDiff = centsDifference(currentNoteFreq, freq);
                if (centsDiff <= 50 && centsDiff > -50) {
                    closestNoteName = scale[i];
                    break;
                }
            }
            if (closestNoteName === null) continue;
        }
        
        // If the octave wasn't found
        if (closestNoteOctave === null) return false;
        // If the note wasn't found
        if (closestNoteName === null) return false;

    }
    return {
        note: {
            name: closestNoteName,
            octave: closestNoteOctave
        },
        cents: centsDifference(calculate(closestNoteName, closestNoteOctave, baseNote), freq)
    }
}

function centsDifference (f1, f2) {
	return 1200*(Math.log(f2/f1)/Math.log(2))
}

function transpose (note, octave, semitones) {
    let index = scale.indexOf(note.name) + semitones;
    let newOctave = note.octave;

    while (index < 0) {
        index += scale.length;
        newOctave--;
    }

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

function getSemitonesFromBase (name, octave, baseNote) {
    return getSemitonesFromNote(name, octave, baseNote.name, baseNote.octave);
}

function getFullStepSize () {
    return getStepSize(scale.length);
}

function getHalfStepSize () {
    return getStepSize(scale.length * 2);
}

function getStepSize (count) {
    return Math.pow(2, 1/count);
}

function calculate (name, octave, baseNote) {
    return baseNote.frequency * Math.pow(getFullStepSize(), getSemitonesFromBase(name, octave, baseNote));
}

module.exports.fromNote = fromNote;
module.exports.transpose = transpose;
module.exports.getSemitonesFromNote = getSemitonesFromNote;
module.exports.getCentsOffFromNote = getCentsOffFromNote;