const Discord = require('discord.js');
const http = require('http');
const fs = require('fs');
const client = new Discord.Client();
let token: string = "";
let quoteJson;
client.on('ready', () => {
    console.log("It's a me, Andrew! Call me by typing Italiano");
    client.user.setGame("with myself");
    // http.get("http://ripperquotes.azurewebsites.net/api/QuotesApi", (res) => {
    //     let dataString = "";
    //     res.on('data', (d) => dataString += d);
    //     res.on('end', () => quoteJson = JSON.parse(dataString));
    // });
    // client.channels.get("name", "reddit-free-zone");
});
const sayings: Array<string> = [
    "Mamma mia!",
    "Wowee, I love Anime and Pizza!",
    "Yahoo! Italy!",
    "https://barbaracartategui.files.wordpress.com/2010/11/pizza-pepperoni.jpg",
    "http://www.ezilon.com/maps/images/europe/Italian-road-map.gif",
    "Videogames my man!",
    "Weed my dude!",
    "You found Dark Souls hard? Well gee get good",
    "Metal music and Vaporwave, that's the stuff",
    "http://4chan.org/ck is where it's at",
    ":pizza:",
    "My Dad's dead",
    "No shazz I wasn't bonging on",
    "I didn't think I was this quotable",
    "Drake's probably the whitest black guy out there"
];
const ThoughtsRead = (): Array<string> => {
    let thoughtString = fs.readFileSync("thoughts.json");
    let thoughts = thoughtString == undefined ? ([] as Array<string>) : JSON.parse(thoughtString);
    return thoughts;
}
const ThoughtsSave = (thoughts: Array<string>) => {
    fs.writeFileSync("thoughts.json", JSON.stringify(thoughts));
}
client.on('message', message => {
    if (message.content.startsWith("Italiano")) {
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
        // else if ((message.content as string).search("quote") != -1){
        //     let quote = quoteJson[Math.floor(Math.random() * (quoteJson.length))];
        //     message.reply(`"${quote.QuoteText}"\n \t~ ${quote.QuoteAuthor}`);
        // }
        else {
            let index = Math.floor(Math.random() * (sayings.length));
            let response = sayings[index];
            message.reply(response);
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