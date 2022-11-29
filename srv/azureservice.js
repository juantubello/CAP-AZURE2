const cds = require("@sap/cds");
const dotenv = require('dotenv')
dotenv.config()

async function _uploadAzure(req) {
    return req.data;
}

async function base64ToBuffer(base64, filename) {
    const fs = require('fs');
    const Stream = require('stream');
    imgBuffer = Buffer.from(base64, 'base64');

    let s = new Stream.Readable();
    s.push(imgBuffer);
    s.push(null);
    s.pipe(fs.createWriteStream(filename));
    return s;
}

async function sendImageToAzure(stream, folder, filename) {
    const { BlockBlobClient } = require('@azure/storage-blob'),
        azureStorageConnectionString = process.env.CONNECTION,
        containerName = process.env.CONTAINER + folder,
        blobService = new BlockBlobClient(azureStorageConnectionString, containerName, filename);

    blobService.uploadStream(stream, stream.length).then(() => {
        return("File Uploaded!");
    }
    ).catch((err) => {
        return(err);
    })
}

async function sendImage(req) {
    let base64Img = req.data.base64
    let folder = req.data.folder
    let filename = req.data.filename
    const response = await this.sendImageToAzure(this.base64ToBuffer(base64Img, filename), folder, filename);
    req.data.response = response
    return req.data
}

module.exports = cds.service.impl( function () {
    const { azure } = this.entities;
    this.on("INSERT", azure, sendImage);
});