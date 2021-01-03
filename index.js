const Discord = require("discord.js");
const bot = new Discord.Client();

const { botToken, serverId, everyoneRoleId, avatarUrl } = require("./config.json");

let channelArray = [
    {
        category: "Shopify Monitors",
        channels: ["shopify-filtered", "shopify-filtered-eu", "shopify-unfiltered", "shopify-filtered-no-stock", "shopify-filtered-variants", "shopify-discount", "shopify-links", "dsm", "undefeated", "kith", "palace", "funko", "travis", "skate-shops", "password", "cpfm", "dtlr", "kaws", "antibot", "shoepalace", "shopify-questions"]
    },
    {
        category: "Nike",
        channels: ["nike-hunts", "desktop-new", "desktop-restock-us", "desktop-restock-gb", "desktop-restock-ca", "desktop-restock-jp", "desktop-restock-au", "desktop-restock-sg", "nike-us", "nike-gb", "nike-ca", "nike-gb", "nika-cn", "nike-sg", "nike-ru", "nike-de", "nike-fr", "nike-nl", "nike-it", "nike-au", "nike-pl", "nike-be", "nike-mx", "nike-pt", "nike-gr"]
    },
    {
        category: "Supreme",
        channels: ["us-filtered", "eu-filtered", "jp-filtered", "supreme-us", "supreme-eu", "supreme-jp", "supreme-keywords"]
    },
    {
        category: "Adidas",
        channels: ["adidas-us", "adidas-uk", "adidas-au", "adidas-ca", "yeezy-supply"]
    },
    {
        category: "AIO",
        channels: ["aio-filtered-us", "aio-filtered-eu", "frenzy", "solebox", "end", "porter-us", "porter-eu", "hibbett", "ssense", "footshop", "snipes", "footites-us", "footsites-ca", "footsites-eu", "titolo", "tactics", "svd", "offspring", "nordstrom", "finishline", "asos", "snipes-usa", "ccs", "kickz", "zalando", "baster4ballers", "aw-lab", "footsites-release-calendar", "mesh"]
    },
    {
        category: "Social Media",
        channels: ["social-media-filtered", "social-media-stores", "instagram", "twitter"]
    },
    {
        category: "Flips",
        channels: ["best-buy", "target", "walmart", "gamestop", "amazon", "costco"]
    },
    {
        category: "Scraper",
        channels: ["raffles", "footpatrol", "size", "jd-sports", "hipstore"]
    }
];

bot.on("message", async message => {

    if(!message.memmber || !message.member.hasPermission("ADMINISTRATOR")) return;

    if(message.content == "monitorsetup"){

        let guild = await bot.guilds.cache.get(serverId);

        channelArray.forEach(type => {

            guild.channels.create(`${type.category}`, {
                type: "category",
                permissionOverwrites: [
                    {
                        id: everyoneRoleId,
                        deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
                    }
                ]
            }).then(categoryChannel => {
    
                type.channels.forEach(channel => {
                   
                    guild.channels.create(`${channel}`, {
                        type: "text",
                        parent: categoryChannel.id
                    }).then(channelMade => {
                        
                        channelMade.createWebhook(`${channel}`, {
                            avatar: avatarUrl,
                            reason: "Monitor"
                        })
                        .then(webhook => channelMade.send(`${webhook.url}`));

                    });

                });
    
            });

        });

    };

});

bot.login(botToken);