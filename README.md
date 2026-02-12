[![wakatime](https://wakatime.com/badge/user/578854e6-3cc8-43e1-9bf4-3f5a8987960e/project/6d52e518-27b2-4632-857d-36fee6462aa6.svg)](https://wakatime.com)
[![Last Commit](https://img.shields.io/github/last-commit/thevalleyy-NetWork/thevalleyy-Bot/master?style=plastic)](https://github.com/thevalleyy-NetWork/thevalleyy-Bot/commits/master)
[![Version](https://img.shields.io/github/package-json/v/thevalleyy-NetWork/thevalleyy-Bot?style=plastic)](https://github.com/thevalleyy-NetWork/thevalleyy-Bot/blob/master/package.json#L3)
[![Size](https://img.shields.io/github/languages/code-size/thevalleyy-NetWork/thevalleyy-Bot?style=plastic)](https://www.youtube.com/watch?v=DgJS2tQPGKQ)
![spaghetti-code](https://3ds.eiphax.tech/img/spaghetti.svg)

# thevalleyy-Bot

A discord bot, written in JS, powered by NodeJS.

## Features

- Free and open source
- Complete localization in English and German
- 100% customizable
- Slash command handling
- Event listening
- Error and log database

## Tech Stack

**Runtime:** NodeJS

**Database:** sqlite via [enmap](https://www.npmjs.com/package/enmap)

## `config.json`

```json
{
    "token": "discord bot token",
    "owner": "discord user id",
    "guild": "discord guild id",
    "ticketprefix": "🎫-",
    "cooldown_standard": 3,
    "locale": "de",
    "maintenance": {
        "reason": "⚙ Es finden gerade Wartungsarbeiten statt.",
        "activityOn": "🛑 Wartungsmodus",
        "activityOff": "✅ Wartungen beendet"
    },
    "minecraft": {
        "ip": "minecraft server domain",
        "port": 25565
    },
    "links": {
        "adminbewerbung": "link for admin application"
    },
    "keys": {
        "brickset": "brickset api key #1",
        "brickset2": "brickset api key #2",
        "brickset_username": "bickset api username",
        "brickset_password": "brickset api password",
        "nasa": "nasa api key",
        "pexels": "pexels api key",
        "sra": "some-random-api key"
    },
    "roles": {
        "supporter": "discord role id (supporter)",
        "moderator": "discord role id (moderator)",
        "mutechat": "discord role id (muted chat)",
        "mutetalk": "discord role id (muted voice)",
        "niceone": "discord role id (nice one)",
        "member": "discord role id (default)",
        "reactionroles": {
            "news": "discord role id (reaction role)",
            "botnews": "discord role id (reaction role)",
            "minecraft": "discord role id (reaction role)"
        }
    },
    "channels": {
        "memberchannel": "discord channel id (member count channel)",
        "welcomechannel": "discord channel id (welcome messages channel)",
        "cmdlogchannel": "discord channel id (command log channel)",
        "modlogchannel": "discord channel id (mod log channel)",
        "minecraftchannel": "discord channel id (minecraft server ping channel)",
        "ruleschannel": "discord channel id (rules channel)",
        "nekochannel": "discord channel id (neko command channel)",
        "ticketcategory": "discord channel id (category to create tickets in)",
        "archivecategory": "discord channel id (category to archive tickets in)"
    },
    "colors": {
        "default": "#313338",
        "error": "#ef5350",
        "success": "#66bb6a",
        "info": "#42a5f5",
        "grey": "#bdbdbd",
        "magenta": "#ab47bc",
        "purple": "#7e57c2"
    }
}
```

## `data/`

### `data/blacklist.json`

```json
[]
```

### `data/maintenance.json`

```json
{
    "maintenance": false,
    "reason": "⚙ Es finden gerade Wartungsarbeiten statt."
}
```

### `data/mcstats.json`

```json
{
    "mostPlayers": "0",
    "date": "1735837700",
    "lastPinged": "1735837700"
}
```

### `data/stats.json`

```json
{
    "discord": {
        "buttonKlicks": 0
    }
}
```

## Usage

Ensure the bot has at least privileges to register slash commands and send messages.

Insert slash command `/ping`. Response:

<img src="https://i.imgur.com/jOUoRxj.png" width="800" />

## Support

For support, feel free to join my [discord server](https://discord.gg/DkEnwxNqeX).

## Known Bugs

- none. Feel free to create an [issue](https://github.com/thevalleyy-NetWork/thevalleyy-Bot/issues/new).

## Authors

- [thevalleyy](https://www.github.com/thevalleyy)

## Acknowledgements

- [🧠 TomatoCake](https://github.com/DEVTomatoCake)
- [📚 Discord.JS](https://discord.js.org/#/)
- [🗨 StackOverflow](https://stackoverflow.com)
