const inquirer = require('inquirer');
const makeDir = require('make-dir');
const path = require('path');
const fs = require('fs-extra');
const async = require('async');
const chalk = require('chalk');

const log = console.log;

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

function makePath(name) {
    return path.resolve(__dirname, `../tmpl/${name}`);
}

module.exports = inquirer.prompt(question).then(({name, author}) => {

    var upperName = name.substring(0, 1).toUpperCase() + name.substring(1);

    makeDir(`./react-rayr-${name}`).then(p => {

        let arr = [
            fn => {
                let _name = '.babelrc';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = '.editorconfig';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = '.eslintignore';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = '.eslintrc';
                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = '.gitignore';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = '.npmignore';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'gulpfile.babel.js';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'package.json',
                    _filePath = `${p}/${_name}`;

                fs.copy(makePath(_name), _filePath, err => {
                    if (err) {
                        fn(err);
                    } else {
                        fs.readFile(_filePath, 'utf8', (err, data) => {
                            if (err) {
                                fn(err);
                            }

                            var result = data.replace(/demo/g, name);

                            result = result.replace(/lilei/g, author);

                            fs.writeFile(_filePath, result, 'utf8', err => {
                                if (err) fn(err);
                                log(chalk.green(`Make: ${_name}.js  success!`));
                                fn(null);
                            });
                        });
                    }
                });
            },
            fn => {
                let _name = 'postcss.config.js';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'README.md';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'webpack.config.js';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'src/index.js',
                    _filePath = `${p}/${_name}`;

                fs.copy(makePath(_name), _filePath, err => {
                    if (err) {
                        fn(err);
                    } else {
                        fs.readFile(_filePath, 'utf8', function (err, data) {
                            if (err) {
                                fn(err);
                            }

                            var result = data.replace(/Demo/g, upperName);

                            fs.writeFile(_filePath, result, 'utf8', function (err) {
                                if (err) fn(err);
                                log(chalk.green(`Make: ${_name}  success!`));
                                fn(null);
                            });
                        });
                    }
                });
            },
            fn => {
                let _name = 'src/RayrDemo.js', _filePath = `${p}/src/Rayr${upperName}.js`;

                fs.copy(makePath(_name), _filePath, err => {
                    if (err) {
                        fn(err);
                    } else {
                        fs.readFile(_filePath, 'utf8', function (err, data) {
                            if (err) {
                                fn(err);
                            }

                            var result = data.replace(/Demo/g, upperName);
                            result = result.replace(/demo/g, name);

                            fs.writeFile(_filePath, result, 'utf8', function (err) {
                                if (err) fn(err);
                                log(chalk.green(`Make: Rayr${upperName}.js  success!`));
                                fn(null);
                            });
                        });
                    }
                });
            },
            fn => {
                let _name = 'src/RayrDemo.scss', _filePath = `${p}/src/Rayr${upperName}.scss`;

                fs.copy(makePath(_name), _filePath, err => {
                    if (err) {
                        fn(err);
                    } else {
                        fs.readFile(_filePath, 'utf8', function (err, data) {
                            if (err) {
                                fn(err);
                            }

                            var result = data.replace(/demo/g, name);

                            fs.writeFile(_filePath, result, 'utf8', function (err) {
                                if (err) fn(err);
                                log(chalk.green(`Make: Rayr${upperName}.scss  success!`));
                                fn(null);
                            });
                        });
                    }
                });
            },
            fn => {
                let _name = 'example/webpack.config.babel.js';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'example/webpack.server.js';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'example/src/index.html';

                fs.copy(makePath(_name), `${p}/${_name}`, err => {
                    if (err) {
                        fn(err);
                    } else {
                        log(chalk.green(`Make: ${_name}  success!`));
                        fn(null);
                    }
                });
            },
            fn => {
                let _name = 'example/src/app.js',
                    _filePath = `${p}/${_name}`;

                fs.copy(makePath(_name), _filePath, err => {
                    if (err) {
                        fn(err);
                    } else {
                        fs.readFile(_filePath, 'utf8', function (err, data) {
                            if (err) {
                                fn(err);
                            }

                            var result = data.replace(/Demo/g, upperName);
                            result = result.replace(/demo/g, name);

                            fs.writeFile(_filePath, result, 'utf8', function (err) {
                                if (err) fn(err);
                                log(chalk.green(`Make: ${_name}  success!`));
                                fn(null);
                            });
                        });
                    }
                });
            },
        ];

        async.waterfall(arr, err => {
            if (err) {
                log(chalk.red(`err: ${err}`));
            } else {
                log(chalk.yellow(`Make: Over!! 😁`));
            }
        });
    });
});
