const argv = require('yargs')
              .option('path', {
                alias : 'p',
                describe : 'Root path from your project',
                default: __dirname
              })
              .option('verbose', {
                alias : 'v',
                describe : 'Enable verbose mode',
                default: false
              })
              .help('help')
              .argv;

const path = argv.path !== undefined ? (argv.path.length > 0 ? argv.path : __dirname) : __dirname;
const verbose = argv.verbose;

if (verbose) {
  console.log("Using path as: " + path);
}
