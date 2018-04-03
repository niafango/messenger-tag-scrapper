import login from "facebook-chat-api";

// Create simple echo bot
login({email: "", password: ""}, (err: object, api: object) => {
    if(err) return console.error(err);

    api.sendMessage("Salut c'est moi le bot !", "1548318388598682");
    api.logout();
});