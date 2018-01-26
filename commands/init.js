const {prompt} = require('inquirer');
const makeDir = require('make-dir');
const path = require('path');
const copy = require('recursive-copy');

const question = [
    {
        type: 'input',
        name: 'name',
        message: 'React Component name:',
        validate(val) {
            if (val === '') {
                return 'React Component Name is required!'
            } else {
                return true;
            }
        }
    },
    {
        type: 'input',
        name: 'author',
        message: 'React Component author:',
        validate(val) {
            if (val !== '') {
                return true
            }
            return 'React Component author is required!'
        }
    },
    {
        type: 'input',
        name: 'place',
        message: 'Where to init the project:',
        default: './'
    }
]

module.exports = prompt(question).then(({name, author, place}) => {

    makeDir(`./react-rayr-${name}`).then(p => {
        copy(path.resolve(__dirname, '../tmpl'), p).then(res => {
            console.info('Copied ' + res.length + ' files');
        }).catch((error) => {
            console.error('Copy failed: ' + error);
        });
    });
});
