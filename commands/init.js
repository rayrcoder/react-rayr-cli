const inquirer = require('inquirer');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs-extra');
const async = require('async');

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

module.exports = inquirer.prompt(question).then(({name, author, place}) => {
    makeDir(`./react-rayr-${name}`).then(p => {

        let arr = [
            function (fn) {
                fs.copy(path.resolve(__dirname, '../tmpl/.babelrc'), `${p}/.babelrc`, err => {
                    if (err) return console.error(err)
                    console.log(`${p}/.babelrc success!`);
                    fn(err, null);
                });
            },
            function (fn) {
                fs.copy(path.resolve(__dirname, '../tmpl/.babelrc'), `${p}/.babelrc`, err => {
                    if (err) return console.error(err)
                    console.log(`${p}/.babelrc success!`);
                    fn(err, null);
                });
            }
        ];

        async.waterfall(arr, function (err, result) {
            console.log(result);
        });
    });
});
