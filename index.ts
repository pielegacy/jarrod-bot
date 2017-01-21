const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const client = new Discord.Client();
let token: string = "";
let quoteJson;
client.on('ready', () => {
    console.log("I love madgear");
    client.user.setGame("Minecraft");
    // http.get("http://ripperquotes.azurewebsites.net/api/QuotesApi", (res) => {
    //     let dataString = "";
    //     res.on('data', (d) => dataString += d);
    //     res.on('error', () => {});
    //     res.on('end', () => quoteJson = JSON.parse(dataString).filter((q) => q.Topic.TopicId == 5));
    // });
});
const ThoughtsRead = (): Array<string> => {
    let thoughtString = fs.readFileSync("thoughts.json");
    let thoughts = thoughtString == undefined ? ([] as Array<string>) : JSON.parse(thoughtString);
    return thoughts;
}
const ThoughtsSave = (thoughts: Array<string>) => {
    fs.writeFileSync("thoughts.json", JSON.stringify(thoughts));
}
client.on('message', message => {
    if (message.content.startsWith("Milky")) {
        if ((message.content as string).search(" remember ") != -1) {
            let thought = (message.content as string).split(" remember ")[1];
            if (thought != "") {
                let thoughts = ThoughtsRead();
                thoughts.push(thought);
                console.log(thoughts);
                ThoughtsSave(thoughts);
                message.reply("I shall remember " + thought + " for you");
            }
            else
                message.reply("What do I need to remember?");
        }
        else if ((message.content as string).search("what do you know") != -1) {
            let thoughts = ThoughtsRead();
            if (thoughts.length > 0) {
                let index = Math.floor(Math.random() * (thoughts.length));
                let thought = thoughts[index];
                message.reply("Well someone told me " + thought);
            }
            else
                message.reply("I don't know anything, tell me to remember something");
        }
        else {
            let quote = quoteJson[Math.floor(Math.random() * (quoteJson.length))];
            message.reply(quote.QuoteText);
        }
    }
});
// Check for token.txt
if (token == "") {
    fs.readFile("token.txt", "utf-8", (err, data) => {
        token = data;
        client.login(token);

    });
}
else
    client.login(token);