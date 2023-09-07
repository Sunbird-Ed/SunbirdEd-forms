const fs = require('fs');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { spawn } = require("child_process");
const packageFilepath = "projects/common-form-elements/package.json";
const filesToRemoveLines = [
    {
        filepath: "projects/common-form-elements/src/lib/dynamic-field/dynamic-field.directive.ts",
        keyword: "DynamicRichtextComponent"
    },
    {
        filepath: "projects/common-form-elements/src/lib/common-form-elements.module.ts",
        keyword: "DynamicRichtextComponent"
    }
];

const run = async () => {
    try {
        // const answers = await askLibraryDetails();
        const answers = {
            environment: 'mobile',
            name: '@project-sunbird/common-form-elements',
            version: '5.1.1'
          }
        const { environment } = answers;
        console.log(answers);
        updateFiles(environment);
        updatePackageFile(packageFilepath, answers);
        console.log(chalk.bgBlue(' =========== Building Angular Package ==========='));
        const child = spawn('ng', ['build', 'common-form-elements', '--prod']);
        child.stdout.on('data', (data) => {
            console.log(chalk.green(`${data}`));
        });
        child.stderr.on('data', (data) => {
            console.error(`${data}`);
        });
        child.on('close', (code) => {
            if (code === 0) {
                console.log(chalk.green('Successfully Done!!!'));
            } else {
                console.log(`child process exited with code ${code}`);
            }
        });
    } catch (error) {
        console.log(chalk.red(error));
        process.exit(1);
    }
};

const askLibraryDetails = () => {
    const questions = [
        {
            type: 'list',
            name: 'environment',
            message: 'What do you want to build for ?',
            choices: ['mobile', 'web'],
            default: 'mobile',
            filter(val) {
                return val.toLowerCase();
            }
        },
        {
            type: 'input',
            name: 'name',
            message: "Please enter library name",
            validate(value) {
                if (value) {
                    return true;
                }

                return 'Please enter a valid package name';
            },
        },
        {
            type: 'input',
            name: 'version',
            message: "Please enter library version",
            validate(value) {
                const pass = value.match(
                    /^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/
                );
                if (pass) {
                    return true;
                }

                return 'Please enter a valid library version';
            },
        }
    ];
    return inquirer.prompt(questions);
}

const updateFiles = (env) => {
    for (let i = 0; i < filesToRemoveLines.length; i++) {
        const fileData = fs.readFileSync(filesToRemoveLines[i].filepath, { encoding: 'utf-8' });
        let dataArray = fileData.split('\n');
        for (let index = 0; index < dataArray.length; index++) {
            if (dataArray[index].includes(filesToRemoveLines[i].keyword)) {
                if (env === 'mobile') {
                    dataArray[index] = dataArray[index].replace('// MOBILE', '');
                    dataArray[index] = `// MOBILE ${dataArray[index]}`;
                }
                if (env === 'web') {
                    dataArray[index] = dataArray[index].replace('// MOBILE', '').trimStart();
                }
            }
        }
        const updatedData = dataArray.join('\n');
        fs.writeFileSync(filesToRemoveLines[i].filepath, updatedData);
        console.log(chalk.yellow(
            'Successfully updated the filepath ---> ' +
            chalk.green.underline.bold(filesToRemoveLines[i].filepath)
        ));
    }
};

const updatePackageFile = (filepath, { environment, name, version }) => {
    const jsonString = fs.readFileSync(filepath);
    let packageData = JSON.parse(jsonString);

    if(version) {
        packageData.version = version;
    }

    if (name) {
        packageData.name = name;
    } else if (environment === 'mobile') {
        packageData.name = 'common-form-elements';
    } else if (environment === 'web') {
        packageData.name = 'common-form-elements-full';
    }
    fs.writeFileSync(filepath, JSON.stringify(packageData, null, 4));
    console.log(chalk.yellow(
        'Package name updated successfully ---> ' +
        chalk.green.underline.bold(packageData.name)
    ));
};

run();