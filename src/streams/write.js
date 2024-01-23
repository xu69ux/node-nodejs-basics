import fs from 'fs';

const write = async (pathToFile) => {
    const writeStream = fs.createWriteStream(pathToFile);
    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
    });
};

await write('src/streams/files/fileToWrite.txt');