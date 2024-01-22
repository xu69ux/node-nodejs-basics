import fs from 'fs';

const write = async () => {
    const writeStream = fs.createWriteStream('src/streams/files/fileToWrite.txt');
    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
    });
};

await write();