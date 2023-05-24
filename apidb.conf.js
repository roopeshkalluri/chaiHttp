const merge = require('deepmerge');
const wdioConf = require('./wdio.conf.js');
const chromeDriverVersion = '99.0.4844.51';
const firefoxDriverVersion = '0.29.0';
// const chrome = {
//   browserName: 'chrome',
//   maxInstances: 1,
// };
// const chromeDocker = {
//   'goog:chromeOptions': {
//     args: ['headless', 'disable-gpu'],
//   },
//   ...chrome,
// };

exports.config = merge(
  wdioConf.config,
  {
    // capabilities: process.env.IS_DOCKER ? [chromeDocker] : [chrome], 
    capabilities: [{
      maxInstances: 1,
      browserName: 'chrome',
      "goog:chromeOptions": { args: ['headless', 'disable-gpu'] },
    }],
    services: ['chromedriver'],

  },
  { clone: false },
);


console.log("config: " + JSON.stringify(this.config));