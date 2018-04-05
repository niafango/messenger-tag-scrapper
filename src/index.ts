import login = require("facebook-chat-api");
import fs = require("fs");
import readline = require("readline");

const appStateFile = "./appState.json";

const search = (appState: any) => {
    login({appState}, (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => {
        if (err) {
            console.log("\x1b[31m%s\x1b[0m", "Your are not connected anymore, please connect again.");
            generateConfig(true);
            return;
        }
        getMessage(api);
    });
};

const getMessage = (api: FacebookChatApi.Api) => {
    api.getThreadHistory("1548318388598682", 15000, undefined,
        (err: FacebookChatApi.IError, history: FacebookChatApi.IThreadHistoryMessage[]) => {
            if (err) {
                return console.error(err);
            }
        });
};

const generateConfig = (firstTime = true) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    if (firstTime) {
        console.log("You are not authenticated.\nYour password won't be stored.");
    }

    rl.question("What's your Facebook email ? ", (email: string) => {
        rl.question("What's your Facebook password ? ", (password: string) => {
            rl.close();

            login({email, password}, (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => {
                if (err) {
                    console.log("\x1b[31m%s\x1b[0m", "Failed to authenticate you, trying again.");
                    generateConfig(false);
                } else {
                    writeConfig(api);
                }
            });
        });
    });
};

const writeConfig = (api: FacebookChatApi.Api) => {
    const appState = api.getAppState();
    fs.writeFile(appStateFile, JSON.stringify(appState), (err) => {
        if (err) {
            console.error(err);
        }

        console.log("\x1b[32m%s\x1b[0m", "appState.json generated !");
        search(appState);
    });

};

if (fs.existsSync(appStateFile) && fs.lstatSync(appStateFile).isFile()) {
    const appState = JSON.parse(fs.readFileSync(appStateFile, {encoding: "utf8"}));

    if (appState) {
        search(appState);
    }
} else {
    generateConfig();
}
