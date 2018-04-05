import login = require('facebook-chat-api');

// Create simple echo bot
login({email: "", password: ""}, (err: FacebookChatApi.IError, api: FacebookChatApi.Api) => {
    if(err) return console.error(err);
    api.getThreadHistory("1548318388598682", 100, undefined, (err: FacebookChatApi.IError, history: FacebookChatApi.IThreadHistoryMessage[]) => {
        if(err) return console.error(err);
    });
    api.logout();
});