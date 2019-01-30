const colorize = (...args) => ({
  black: `\x1b[30m${args.join(' ')}`,
  red: `\x1b[31m${args.join(' ')}`,
  green: `\x1b[32m${args.join(' ')}`,
  yellow: `\x1b[33m${args.join(' ')}`,
  blue: `\x1b[34m${args.join(' ')}`,
  magenta: `\x1b[35m${args.join(' ')}`,
  cyan: `\x1b[36m${args.join(' ')}`,
  white: `\x1b[37m${args.join(' ')}`,
  Bright_Black: `\x1b[90m${args.join(' ')}`,
  Bright_Red: `\x1b[91m${args.join(' ')}`,
  Bright_Green: `\x1b[92m${args.join(' ')}`,
  Bright_Yellow: `\x1b[93m${args.join(' ')}`,
  Bright_Blue: `\x1b[94m${args.join(' ')}`,
  Bright_Magenta: `\x1b[95m${args.join(' ')}`,
  Bright_Cyan: `\x1b[96m${args.join(' ')}`,
  Bright_White: `\x1b[97m${args.join(' ')}`
});
module.exports = colorize;
