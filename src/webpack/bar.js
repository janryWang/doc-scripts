const webpack = require('webpack');
const ProgressBar = require('progress');
const chalk = require('chalk');
const { ProgressPlugin } = webpack;

const barLeft = chalk.bold('[');
const barRight = chalk.bold(']');

function formatModulePath(modulepath) {
  return modulepath ? ' …' + modulepath.substr(modulepath.length - 30) : '';
}

function isSimpleViewport() {
  return process.stdout.columns < 110;
}

function ProgressBarPlugin() {
  const buildBar = new ProgressBar(
    `${barLeft} :percent building :bar :detail ${barRight}`,
    {
      complete: chalk.green('\u2588'),
      incomplete: '\u2591',
      total: 100,
      width: 30,
      clear: true,
    }
  );

  return new ProgressPlugin((percentage, msg, current, active, modulepath) => {
    if (process.stdout.isTTY && percentage < 1) {
      modulepath = formatModulePath(modulepath);
      current = current ? ' ' + current : '';
      active = active ? ' ' + active : '';

      buildBar.update(percentage, {
        detail: isSimpleViewport() ? '' : `${current} ${active} ${modulepath}`,
      });
    } else if (percentage === 1) {
      buildBar.update(1, {});
    }
  });
}

module.exports = ProgressBarPlugin;