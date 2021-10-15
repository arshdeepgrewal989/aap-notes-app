
const chalk = require('chalk');
const { argv } = require('yargs');
const yargs= require('yargs');
const { listNotes } = require('./notes.js');
const notes = require('./notes.js');

const getNotes= require('./notes.js')

const command = process.argv[2]

//customizing version yargs
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string',
        },
        body: {
            describe: 'The contents of the note',
            type: "string",
            demandOption: true
        } 


    },
    // argv = argument vector - the arguments that the user passes thru program
    handler: function(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// remove note command 
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of Note to be removed',
            type: "string",
            demandOption: true,
        }
    },
    // rem to name the argv argument there
    handler(argv) {
        notes.removeNote(argv.title)
        
    }
})

//create list command
yargs.command({
    command: 'list',
    describe: 'Listing all the notes',
    handler() {
        notes.listNotes()
        
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
       title: {
           describe: 'Note title',
           demandOption: true,
           type: 'string'
       } 
    }, 
    handler(){
        console.log('The note reads...')
        notes.printNote(argv.title)
    }
})


// output
//console.log(yargs.argv)

// output with yargs
yargs.parse()













//this gets input from command line. [] can be used to select what to output
// console.log(process.argv[2])






// old stuff
//const validator = require('validator')
//const getNotes = require('./notes.js')

//const msg = getNotes()

//console.log(msg)


//console.log(validator.isURL('https://arshdeep.com'))"
