const vscode = require('vscode');
const execSh = require('exec-sh').promise;
const transpile = require('./transpile');
const Output = require('./components/Output');
const StatusBar = require('./components/StatusBar');
const { getUri, getConfig, getWorkspace, getFileName, getCommand } = require('./utils');

function handleSave(doc) {
  const input = doc.fileName;
  if (input.includes('.tailwind.css')) {
    StatusBar.setState('loading');
    const css = doc.getText();
    const filename = getFileName(input);
    const workspace = getWorkspace(input);
    const { output, compact, browsers, tailwindcss } = getConfig('tailpile');
    const packageJsonUri = getUri(workspace, 'package.json');
    const tailwindConfig = tailwindcss.config ? getUri(workspace, tailwindcss.config).path : {};
    transpile({
      css,
      from: input,
      output: getUri(workspace, `${output}/${filename}`),
      compact,
      browsers: browsers === 'package.json' ? packageJsonUri : browsers,
      tailwindConfig,
    })
      .then(({ from, to, warnings }) => {
        StatusBar.setState('success');
        Output.addSuccess({
          to: to.replace(workspace.path, ''),
          from: from.replace(workspace.path, ''),
          warnings,
        });
      })
      .catch(err => {
        // console.log({ err });
        if (err.code === 'ENOENT' && err.message.includes(tailwindConfig)) {
          Output.addError('TAILWIND_CONFIG_NOT_FOUND', { path: tailwindcss.config });
        } else if (err.code === 'FileNotFound' && err.message.includes(packageJsonUri.path)) {
          Output.addError('PACKAGE_JSON_NOT_FOUND');
        } else if (err.browserslist) {
          const path =
            browsers === 'package.json'
              ? '`package.json`'
              : 'Setting > Extension > Tailpile > Browsers';

          Output.addError('BROWSERS_INVALID', { path, msg: err.message });
        } else if (err.name === 'CssSyntaxError') {
          Output.addError('CSS_SYNTAX_ERROR', {
            msg: err.reason,
            line: err.line,
            column: err.column,
            input: input.replace(workspace.path, ''),
          });
        } else {
          Output.addError('UNKNOWN_ERROR', { msg: err.reason, stack: err.stack });
        }
        StatusBar.setState('error');
      });
  }
}

function handleInstall() {
  const { tailwindcss, packageManager } = getConfig('tailpile');
  const options = { title: `Installing Tailwind CSS.`, location: 15 };

  vscode.window
    .withProgress(options, progress => {
      const command = getCommand({ manager: packageManager, version: tailwindcss.version });
      setTimeout(() => {
        progress.report({ message: 'Sometime, it takes more time.' });
      }, 45000);
      return execSh(command, { cwd: __dirname });
    })
    .then(() => {
      vscode.window.showInformationMessage('Successfully Installed Tailwind CSS.');
      vscode.commands.executeCommand('workbench.action.reloadWindow');
    })
    .catch(err => {
      console.log({ err });
      vscode.window.showErrorMessage("Can't Install Tailwind CSS.");
      Output.addError('TAILWIND_INSTALL_FAIL', { manager: packageManager });
    });
}

module.exports = {
  activate: context => {
    Output.mount();
    StatusBar.mount();
    const disposableSave = vscode.workspace.onDidSaveTextDocument(handleSave);
    const disposablOnClick = vscode.commands.registerCommand(`tailpile.show_output`, Output.show);
    const disposablInstall = vscode.commands.registerCommand(`tailpile.tailwindcss`, handleInstall);
    context.subscriptions.push(disposableSave, disposablOnClick, disposablInstall);
  },
  deactivate: () => {
    Output.unmount();
    StatusBar.unmount();
  },
};
