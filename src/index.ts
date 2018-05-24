import login = require("facebook-chat-api");
import fs = require("fs");
import readline = require("readline");
import IThreadInfo = FacebookChatApi.IThreadInfo;
import OutputID = FacebookChatApi.OutputID;

const appStateFile = "./appState.json";
const resultFolder = "./results/";

const loginWithAppState = (appState: any): void => {
    login({appState}, (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => {
        if (err) {
            console.log("\x1b[31m%s\x1b[0m", "Your are not connected anymore, please connect again.");
            generateConfig(true);
            return;
        }
        askForThreadName(api);
    });
};

const searchThread = (api: FacebookChatApi.Api, threadName: string): void => {
    api.getThreadList(50, null, ["INBOX"],
        (err: FacebookChatApi.IError, list: FacebookChatApi.IThreadInfo[]) => {
            const thread = list.find((value: IThreadInfo): boolean => {
                return (value.name != null && value.name.toLowerCase().indexOf(threadName.toLowerCase()) !== -1);
            });
            if (thread == null || thread.threadID == null) {
                console.log("\x1b[31m%s\x1b[0m", "Unable to find this thread, please type its name again.");
                askForThreadName(api);
                return;
            }
            askForTag(api, thread.threadID);
        });
};

const searchMessages = (api: FacebookChatApi.Api, threadID: OutputID, tag: string): void => {
    api.getThreadHistory("1548318388598682", 15000, undefined,
        (err: FacebookChatApi.IError, history: FacebookChatApi.IThreadHistoryMessage[]) => {
            if (err) {
                return console.error(err);
            }

            const searchResult = [];
            for (const message of history) {
                if (message.body && message.body.indexOf(tag) === 0) {
                    searchResult.push(message.body);
                }
            }

            saveResult(tag, searchResult);
        });
};

const saveResult = (tag: string, searchResult: string[]): void => {
    const resultFile = `${resultFolder}${tag}.json`;

    fs.writeFile(resultFile, JSON.stringify(searchResult), (err) => {
        if (err) {
            console.error(err);
        }

        console.log("\x1b[32m%s\x1b[0m", `Result saved in ${resultFile}`);
    });
};

const askForTag = (api: FacebookChatApi.Api, threadID: OutputID): void => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("What tag do you want to search for ? ", (tag: string) => {
        rl.close();
        searchMessages(api, threadID, tag);
    });
};

const askForThreadName = (api: FacebookChatApi.Api): void => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("In what thread do you want to search for a tag ? ", (threadName: string) => {
        rl.close();
        searchThread(api, threadName);
    });
};

const generateConfig = (firstTime = true): void => {
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

const writeConfig = (api: FacebookChatApi.Api): void => {
    const appState = api.getAppState();
    fs.writeFile(appStateFile, JSON.stringify(appState), (err) => {
        if (err) {
            console.error(err);
        }

        console.log("\x1b[32m%s\x1b[0m", "appState.json generated !");
        loginWithAppState(appState);
    });

};

if (fs.existsSync(appStateFile) && fs.lstatSync(appStateFile).isFile()) {
    const appState = JSON.parse(fs.readFileSync(appStateFile, {encoding: "utf8"}));

    if (appState) {
        loginWithAppState(appState);
    }
} else {
    generateConfig();
}
