#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";

const releaseInfo = "/etc/os-release";

const data = fs.readFileSync(releaseInfo, "utf8");

// parsing /erc/os-release file
const osInfo = {};
data.split("\n").forEach((line) => {
  const [key, value] = line.split("=");
  if (key && value) {
    osInfo[key.trim()] = value.replace(/"/g, "").trim();
  }
});

function formatedSeconds(seconds) {
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60);
    const ss = Math.floor(seconds % 60);

    return `${hh} hours, ${mm} minutes, ${ss} seconds`
}

const getMemory = {
    usedMemory: Math.floor((os.totalmem / (1024 * 1024)) - (os.freemem / (1024 * 1024))),
    totalMemory: Math.floor((os.totalmem / (1024 * 1024)))
}

const output = {
  host: `${process.env.USER}@${os.hostname}`,
  hr: '--------------------------------------------------------------------',
  sys: `Distro: ${osInfo["NAME"]} ${os.machine}`,
  kernel: `Kernel: ${os.release}`,
  uptime: `Uptime: ${formatedSeconds(os.uptime)}`,
  shell: `Shell: ${process.env.SHELL}`,
//   terminal: `Terminal: ${process.env.TERM}`,
  cpus: `CPU: ${JSON.stringify(os.cpus().at(0).model)}`,
  memory: `Memory: ${getMemory.usedMemory}MB / ${getMemory.totalMemory}MB`,
  currentDate: `Date: ${new Date().toDateString()}`,
  currentTime: `Time: ${new Date().toTimeString()}`,
};

(function () {
    for(const value in output) {
        console.log(output[value]);
    }
})();