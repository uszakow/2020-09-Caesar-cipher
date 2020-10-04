const fs = require('fs');
const path = require('path');
const { program } = require('commander');

// const fileInput = process.argv[2];

function code(string, shift, action) {
    if (!action) {
        return false;
    }

    const engAlfUp = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    const engAlfLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const engLength = engAlfUp.length + engAlfLower.length;

    const arr = string.split('');
    const result = [];

    inputData: for (i = 0; i < arr.length; i++) {
        for (j = 0; j < engLength; j++) {
            let resultIndex;

            if (arr[i] === engAlfLower[j]) {
                if (action === 'encode') {
                    resultIndex = (j + shift) % engAlfLower.length;

                } else if (action === 'decode') {
                    resultIndex = (j - shift) % engAlfLower.length;
                }
                if (resultIndex < 0) resultIndex += engAlfLower.length;

                result.push(engAlfLower[resultIndex]);
                continue inputData;
            } else if (arr[i] === engAlfUp[j]) {
                if (action === 'encode') {
                    resultIndex = (j + shift) % engAlfUp.length;
                } else if (action === 'decode') {
                    resultIndex = (j - shift) % engAlfUp.length;
                }
                if (resultIndex < 0) resultIndex += engAlfUp.length;

                result.push(engAlfUp[resultIndex]);
                continue inputData;
            }
        }
        result.push(arr[i])
    }

    const resStr = result.join('');

    return resStr;
}

let fileInput = 'stdin.txt';
let fileOutput = 'stdout.txt';
let shift = 0;
let action;

program
    .option('-s, --shift <number>', 'a shift')
    .option('-i, --input <file name>', 'an input file')
    .option('-o, --output <file name>', 'an output file')
    .option('-e, --encode', 'an action encode')
    .option('-d, --decode', 'an action decode');

program.parse(process.argv);

if (program.shift) {
    shift = Number(program.shift);
}
if (program.input) {
    fileInput = program.input;
}
if (program.output) {
    fileOutput = program.output;
}
if (program.encode) {
    action = 'encode';
}
if (program.decode) {
    action = 'decode';
}

//Wyczytać plik źródłowy
fs.readFile(
    path.join(__dirname, fileInput),
    'utf-8',
    (err, data) => {
        if (err) throw err;
        if (!action) throw new Error('no action');

        const codedText = code(data, shift, action);

        //Dopisać rezultat do pliku docelowego
        fs.appendFile(
            path.join(__dirname, fileOutput),
            `${codedText}\n`,
            (err) => {
                if (err) throw err;
            }
        )
    }
)








