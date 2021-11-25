const vscode = require('vscode');

let StatusBar;

function mount() {
  StatusBar = vscode.window.createStatusBarItem(2);
  StatusBar.command = 'tailpile.show_output';
  setState();
  StatusBar.show();
}

function unmount() {
  StatusBar.dispose();
}

function setState(state = 'default') {
  const icon = {
    default: 'telescope',
    loading: 'loading~spin',
    success: 'check-all',
    error: 'error',
  };
  StatusBar.text = `$(${icon[state]}) Tailpile`;
  if (state === 'success' || state === 'error') {
    setTimeout(setState, 3000);
  }
}

module.exports = { mount, unmount, setState };
