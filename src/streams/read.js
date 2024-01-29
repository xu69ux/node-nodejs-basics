import fs from 'fs';

const read = async (pathToFile) => {
    const readStream = fs.createReadStream(pathToFile);
    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });
};

await read('src/streams/files/fileToRead.txt');