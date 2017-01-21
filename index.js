var Discord = require('discord.js');
var http = require('http');
var fs = require('fs');
var client = new Discord.Client();
var quoteInterval = 300000; // 5 minutes
var token = "";
var quoteJson;
client.on('ready', function () {
    console.log("I love madgear");
    client.user.setGame("Minecraft");
    setInterval(PullQuotes, quoteInterval);
    PullQuotes(); // Initial pull
});
var PullQuotes = function () {
    console.log("Updating quotes...");
    http.get("http://ripperquotes.azurewebsites.net/api/QuotesApi", function (res) {
        var dataString = "";
        res.on('data', function (d) { return dataString += d; });
        res.on('error', function () { });
        res.on('end', function () {
            quoteJson = JSON.parse(dataString).filter(function (q) { return q.Topic.TopicId == 5 || q.QuoteAuthor.toLowerCase() === "jarrod" || q.QuoteAuthor.toLowerCase() === "jarrod golland"; });
            console.log(quoteJson);
        });
    });
};
var ThoughtsRead = function () {
    var thoughtString = fs.readFileSync("thoughts.json");
    var thoughts = thoughtString == undefined ? [] : JSON.parse(thoughtString);
    return thoughts;
};
var ThoughtsSave = function (thoughts) {
    fs.writeFileSync("thoughts.json", JSON.stringify(thoughts));
};
client.on('message', function (message) {
    if (message.content.startsWith("Milky")) {
        if (message.content.search(" remember ") != -1) {
            var thought = message.content.split(" remember ")[1];
            if (thought != "") {
                var thoughts = ThoughtsRead();
                thoughts.push(thought);
                console.log(thoughts);
                ThoughtsSave(thoughts);
                message.reply("I shall remember " + thought + " for you");
            }
            else
                message.reply("What do I need to remember?");
        }
        else if (message.content.search("what do you know") != -1) {
            var thoughts = ThoughtsRead();
            if (thoughts.length > 0) {
                var index = Math.floor(Math.random() * (thoughts.length));
                var thought = thoughts[index];
                message.reply("Well someone told me " + thought);
            }
            else
                message.reply("I don't know anything, tell me to remember something");
        }
        else if (message.author.username == "ItalianoBot") {
            message.channel.sendMessage("Not much homes", { tts: true });
        }
        else {
            var quote = quoteJson[Math.floor(Math.random() * (quoteJson.length))];
            message.reply(quote.QuoteText);
        }
    }
});
// Check for token.txt
if (token == "") {
    fs.readFile("token.txt", "utf-8", function (err, data) {
        token = data;
        client.login(token);
    });
}
else
    client.login(token);
