const vscode = require('vscode');

let Output;

function mount() {
  Output = vscode.window.createOutputChannel('Tailpile');
  Output.show();
}

function unmount() {
  Output.dispose();
}

function show() {
  Output.show();
}

function addError(code, payload = {}) {
  let title, solutions;
  switch (code) {
    case 'TAILWIND_INSTALL_FAIL':
      const otherManager = ['npm', 'yarn'].find(v => v !== payload.manager);
      title = 'Error while running shell script to install Tailwind CSS.';
      solutions = [
        'Check your internet connection.',
        `Make sure ${payload.manager} is installed. (Wanna use ${otherManager}? Setting > Extensions > Tailpile > Package Manager & select \`${otherManager}\`.)`,
        "If the above solutions doesn't help, report to https://github.com/sudoaugustin/tailpile.",
      ];
      break;

    case 'TAILWIND_CONFIG_NOT_FOUND':
      title = `Tailwind CSS config file(\`${payload.path}\`) is not created in the current workspace.`;
      solutions = [
        `Create \`${payload.path}\` & export tailwindcss config object.`,
        `Setting > Extensions > Tailpile > Tailwindcss:Config & remove \`${payload.path}\`.`,
      ];
      break;

    case 'PACKAGE_JSON_NOT_FOUND':
      title = 'No `package.json` file in the workspace.';
      solutions = [
        'Create `package.json` & add `browserslist` key.',
        'Setting > Extensions > Tailpile > Browsers & replace `package.json` with browserslist array.',
      ];
      break;

    case 'BROWSERS_INVALID':
      title = `The browserslist defined in ${payload.path} is invalid.`;
      solutions = [`Go to ${payload.path} and replace browser query.`];
      break;
    case 'CSS_SYNTAX_ERROR':
      title = `Css syntax error at line ${payload.line}:${payload.column} in ${payload.input}.`;
      break;
    case 'UNKNOWN_ERROR':
    default:
      title = 'Unknown error occured.';
      break;
  }
  Output.appendLine(`🚫 ${title}`);
  payload.msg && Output.appendLine(`   📄 ${payload.msg}`);
  if (payload.stack) {
    const stacks = payload.stack.split('\n');
    stacks.forEach(stack => Output.appendLine(`      ${stack}`));
  }
  if (solutions) {
    Output.appendLine(`   ⛑️ Try one of the solutions below.`);
    solutions.forEach(sol => Output.appendLine(`      ○ ${sol}`));
  }
  Output.appendLine('');
  Output.show();
}

function addSuccess({ from, to, warnings }) {
  Output.appendLine(`✅ Successfully compiled \`${from}\` to \`${to}\`.`);
  warnings && warnings.forEach(msg => msg && Output.appendLine(`   ⚠️ ${msg}`));
  Output.appendLine('');
}

module.exports = { show, mount, unmount, addError, addSuccess };
