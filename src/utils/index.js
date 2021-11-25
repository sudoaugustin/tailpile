const vscode = require('vscode');

function getUri(workspace, path = '') {
  return vscode.Uri.joinPath(workspace, ...path.split('/'));
}

function getConfig(section) {
  return vscode.workspace.getConfiguration(section);
}

function getWorkspace(path) {
  const workspaces = vscode.workspace.workspaceFolders;
  const workspace = workspaces.find(({ uri }) => path.includes(uri.path));
  return workspace.uri;
}

function getFileName(path) {
  return path.replace(/^.*[\\\/]/, '').replace('.tailwind.css', '.css');
}

function getCommand({ manager, version }) {
  // return manager === 'yarn'
  //   ? `yarn add tailwindcss@${version} --no-lockfile`
  //   : `npm install tailwindcss@${version} --package-lock=fasle`;
  return manager === 'yarn'
    ? `yarn add tailwindcss@${version} --prod`
    : `npm install tailwindcss@${version} --only=prod`;
}

module.exports = { getUri, getConfig, getWorkspace, getFileName, getCommand };
