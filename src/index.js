"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login = require("facebook-chat-api");
var fs = require("fs");
var readline = require("readline");
var appStateFile = "./appState.json";
var search = function (appState) {
    login({ appState: appState }, function (err, api) {
        if (err) {
            console.log("\x1b[31m%s\x1b[0m", "Your are not connected anymore, please connect again.");
            generateConfig(true);
            return;
        }
        getMessage(api);
    });
};
var getMessage = function (api) {
    api.getThreadHistory("1548318388598682", 15000, undefined, function (err, history) {
        if (err) {
            return console.error(err);
        }
    });
};
var generateConfig = function (firstTime) {
    if (firstTime === void 0) { firstTime = true; }
    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    if (firstTime) {
        console.log("You are not authenticated.\nYour password won't be stored.");
    }
    rl.question("What's your Facebook email ? ", function (email) {
        rl.question("What's your Facebook password ? ", function (password) {
            rl.close();
            login({ email: email, password: password }, function (err, api) {
                if (err) {
                    console.log("\x1b[31m%s\x1b[0m", "Failed to authenticate you, trying again.");
                    generateConfig(false);
                }
                else {
                    writeConfig(api);
                }
            });
        });
    });
};
var writeConfig = function (api) {
    var appState = api.getAppState();
    fs.writeFile(appStateFile, JSON.stringify(appState), function (err) {
        if (err) {
            console.error(err);
        }
        console.log("\x1b[32m%s\x1b[0m", "appState.json generated !");
        search(appState);
    });
};
if (fs.existsSync(appStateFile) && fs.lstatSync(appStateFile).isFile()) {
    var appState = JSON.parse(fs.readFileSync(appStateFile, { encoding: "utf8" }));
    if (appState) {
        search(appState);
    }
}
else {
    generateConfig();
}
