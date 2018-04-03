"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var facebook_chat_api_1 = __importDefault(require("facebook-chat-api"));
// Create simple echo bot
facebook_chat_api_1.default({ email: "simon.galet@yahoo.fr", password: "l/o0h$<F" }, function (err, api) {
    if (err)
        return console.error(err);
    api.sendMessage("Salut c'est moi le bot ! Sucez Simon.", "1548318388598682");
});
