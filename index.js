"use strict";

const fhurl = require("fh-instance-url");
const CronJob = require("cron").CronJob;
const got = require("got");

const pingEndpoint = '/sys/info/ping';

let init = false;

module.exports = function() {
  if (init) {
    // Keep us from creating multiple crons
    return;
  }

  if (!process.env.FH_INSTANCE) {
    console.warn('No FH_INSTANCE env var deteced. rhmap-keepawake only works when deployed on RHMAP.');
    return;
  }

  new CronJob({
    cronTime: "*/5 * * * *",
    onTick: ping,
    start: true
  });

  init = true;
};

function ping() {
  return Promise.resolve('http://localhost') //getSelfHost()
    .then(host => {
      host = 'http://localhost';
      console.log('### TESTING -- Hitting endpoint: ', host + pingEndpoint);
      return got(host + pingEndpoint);
    })
    .then((res) => console.log('Got ping response: ', res))
    .catch(err => console.error("Error pinging self!\n" + err.stack));
}

function getSelfHost() {
  return new Promise((resolve, reject) => {
    const guid = {
      guid: process.env.FH_INSTANCE
    };

    fhurl.getUrl(guid, (err, serviceUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(serviceUrl);
      }
    });
  });
}
