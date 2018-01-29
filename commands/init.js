const inquirer = require('inquirer');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const replace = require('replace-in-file');
const async = require('async');
const fs = require('fs-extra');

const {log} = console;

const question = [
    {
        type: 'input',
        name: 'name',
        message: 'React Component name:',
        default: 'demo',
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
        default: 'lilei',
        message: 'React Component author:',
        validate(val) {
            if (val !== '') {
                return true
            }
            return 'React Component author is required!'
        }
    }
];

module.exports = inquirer.prompt(question).then(({name, author}) => {

    const spinner = ora('Init template...');
    const componentName = `./react-rayr-${name}`;

    spinner.start();

    download('rayrcoder/react-rayr-tpl', componentName, (err) => {
        if (err) {
            log(chalk.red(err));
            process.exit();
        }

        let upperName = name.substring(0, 1).toUpperCase() + name.substring(1),
            _oldFile = `${componentName}/src/RayrDemo`,
            _newFile = `${componentName}/src/Rayr${upperName}`;

        async.waterfall([
            fn => {
                fs.rename(`${_oldFile}.js`, `${_newFile}.js`, function (err) {
                    if (err) {
                        fn(err);
                    } else {
                        fn(null);
                    }
                });
            },
            fn => {
                fs.rename(`${_oldFile}.scss`, `${_newFile}.scss`, function (err) {
                    if (err) {
                        fn(err);
                    } else {
                        fn(null);
                    }
                });
            },
        ], err => {
            if (err) {
                log(chalk.red(`err: ${err}`));
            } else {
                replace({
                    files: [
                        `${componentName}/src/*`,
                        `${componentName}/example/src/*`,
                        `${componentName}/package.json`
                    ],
                    from: [/demo/g, /Demo/g, /lilei/g],
                    to: [name, upperName, author],
                    encoding: 'utf8'
                }).then(() => {
                    spinner.stop();
                    log(chalk.green('New React Component project has been initialized successfully!'));
                }).catch(error => {
                    console.error('Error occurred:', error);
                    process.exit();
                });
            }
        });
    })
});

