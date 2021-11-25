const vscode = require('vscode');

const fs = vscode.workspace.fs;

function readFile(uri) {
  return fs.readFile(uri).then(buffer => buffer.toString());
}

function writeFile(uri, content) {
  const buffer = Buffer.from(content, 'utf8');
  return fs.writeFile(uri, buffer);
}

//! Not used by anyfile
function isFileExist(uri) {
  return readFile(uri)
    .then(() => true)
    .catch(() => false);
}

module.exports = { readFile, writeFile, isFileExist };
