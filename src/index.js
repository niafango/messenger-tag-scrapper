"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login = require("facebook-chat-api");
// Create simple echo bot
login({ email: "simon.galet@yahoo.fr", password: "feojVirjAg5" }, function (err, api) {
    if (err)
        return console.error(err);
    api.getThreadHistory("1548318388598682", 100, undefined, function (err, history) {
        if (err)
            return console.error(err);
        console.log(history[1].body);
    });
    api.logout();
});
