const chalk = require('chalk');
const fs = require('fs');
const { argv } = require('process');

// => replaces function... rem: function came first, but => comes after ()
const addNote = (title, body) => {

    const notes = loadNotes()

    // to check if any new notes have conflicting names
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title == title
    // })

    const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreenBright.inverse('Note successfully added.'))
    } else {
        console.log(chalk.bgRedBright('Error: Conflicting name with a previous note.'))
    }

    
}

// Function to remove note: Arg- Title
const removeNote= (title) => {

    const notes = loadNotes()

    // const notesToKeep= notes.filter(function(note){
    //     return note.title != title
    // })

    const notesToKeep= notes.filter((note) => note.title !== title)
    

    if (notes.length > notesToKeep.length) {
        console.log(chalk.bgGreenBright('Note Successfully removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRedBright('Error'))
    }

}

const listNotes = () => {
    
    const notes= loadNotes()

    console.log(chalk.inverse('Your notes:'))
    
    notes.forEach((note) => {
        console.log(chalk.white(note.title))
    })
}

const printNote = (title) => {

    const notes = loadNotes()

    //const noteRequested= notes.filter((title) => note.title === title)

    const noteRequested = notes.find((noteRequested) => noteRequested.title === title)

    if (noteRequested){
        console.log(chalk.inverse(noteRequested.title))
        console.log(chalk.white(noteRequested.body))
    } else {
        console.log(chalk.bgRedBright('Not found'))
    }

}

// aux fn to save note
const saveNotes= (notes) => {
    const dataJSON= JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// aux fn to load up notes
const loadNotes = () => {

    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


// the .export obj allows us to export and make use of the fn's from this file in other files
// having {} there allows us to make the export into an obj and export multiple fn's
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    printNote: printNote  
}