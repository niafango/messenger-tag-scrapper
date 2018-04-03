import login = require("facebook-chat-api");

// Create simple echo bot
login({email: "simon.galet@yahoo.fr", password: "l/o0h$<F"}, (err: object, api: object) => {
    if(err) return console.error(err);

    api.sendMessage("Salut c'est moi le bot !", "1548318388598682");
    api.logout();
});