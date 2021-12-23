const Snoowrap = require('snoowrap');
const { CommentStream } = require('snoostorm');

const client = new Snoowrap({
    userAgent: 'my-iA-bot',
    clientId: '0ryTZobSDp8671BsUK6RLA',
    clientSecret: '4sQH_mR9yZvwB2L0B77dZxPrW-FmkA',
    username: 'inshaAllah_bot',
    password: '2Pizzas>one!'
});

const subNames = ["Islam","Izlam","MuslimLounge","Hijabis","Muslim","Converts","testingground4bots"]
// reddits api doesn't use millis
const BOT_START = Date.now() / 1000;

// pollTime is 10000 because reddit is very strict on posting too frequently
// at first, you'll only be able to post once every 10 minutes, so make sure you get it right!
const comments = new CommentStream(client, { 
    subreddit: subNames.join("+"), 
    limit: 10, 
    pollTime: 10000 
});

comments.on('item', (item) => {
    if(item.created_utc < BOT_START) return;
    const body = item.body.toString().toLowerCase();
    if(
    ( item.author.name.toString()!=="inshaAllah_bot" && (
    body.includes("insha allah") 
    ||body.includes("inshaallah" 
    ||body.includes("inshallah")
    ))
    )){
        console.log(item);
    
        item.reply('inshaAllah! May God grant your wish. \n I am an insha Allah bot.');
    }


});