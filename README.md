
<div align="center">

# Peepy Llama

[![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=online&url=https://iungo.info%2F)](https://iungo.info/)

[![Built with Discord.JS][builtwithdjs-badge]][builtwithdjs]
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=SirHoDo_PeepyLlama&metric=ncloc)](https://sonarcloud.io/dashboard?id=SirHoDo_PeepyLlama)


**PeepyLlama**, Discord Economy Bot an with extensive online user dashboard and administrative panel.

```sh 
DASHBOARD CSS, SCRIPTS AND IMAGES HAS BEEN STRIPPED BACK TO AVOID COMPLETE COPIES OF THE ORIGIONAL WEBSITE # HTTPS://PEEPY.INFO

* While working as normal, this area is up to your own imagination and creativity to complete *
```
<br />

[Features](#features) •
[Getting started](#getting-started) •
[Installation](#installation) •
[Configuration](#configuration) •
[Integrations](#third-party-integrations)

</div>

## Features

<br>

```sh
💸 Currency
```
| Command | Usage |
| --- | --- |
| Active | View the top most active bot users. You get more XP by typing in servers! |
| Adopt | Adopt an available pet from the pet shop. |
| Apply | Apply to work as any chosen occupation. |
| Balance | Check a users balance. |
| Baltop | Displays the global richest players. |
| Beg | Ask some strangers for spare change. |
| Buy | Buy an available item from a list of purchasable items. |
| Daily | Collect your daily bonus. |
| Disown | Give your beloved pet up for adoption... |
| Gift | Give another player an item that you own. |
| Give | Pay some of your balance to another player. |
| Inventory | Lift of items a user has in their inventory. |
| Jobs | View full list of available work. |
| Leaderboard | Displays current leaderboard types. |
| Pet | Check statistics about your/another players pets. |
| Petshop | List of all available pets to adopt. |
| Rank | Shows your current level, XP and position on the rankings. |
| Resign | Leave your job. |
| Rob | Steal another players hard earned money. |
| Sell | Sell an item from your inventory. |
| Shop | Buy an item for your inventory. |
| Shoutout | Shoutout another YouTuber (Requires YouTuber job) |
| Use | If an item is useable, lets you use it. (Gift Boxes) |
| Work | Do your job! |
<br>

```sh
🎲 Games
```
| Command | Usage |
| --- | --- |
| Connect4 | Play a game of connect 4 against an opponent. |
| Doubleornothing | Test your luck, double... or loose the amount of money you bet.  |
<br>

```sh
General 
```
| Command | Usage |
| --- | --- |
| Eval | Execute JS code in chat (Bot Admin Only) |
| Admin | Sends admin dashboard page to edit selected user profiles. |
| Help | List of all commands. |
| Invite | Send the bots invite URL as an embed to the chat. |
| Passive | Enables Passive mode so the user cannot rob or be robbed. |
| Profile | Send selected users website profile in chat. |

<br>


## Getting started

```sh
Visit Discord Portal         # https://discord.com/developers/applications/
Create Application           # (New Application)

OAuth2 Redirects             # (Add Redirect)
Add Callback URL             # (http://localhost:3039/callback OR http://URL/callback)

Create Bot User              # (Bot -> Add Bot)
Take note of bot info         # Token && Client ID (number in the URL)

Create MongoDB               # https://www.mongodb.com/free-cloud-database
```

## Installation

### *Step 1: Install  dependencies*
``$ npm i``\
Please use `Node.js 16+` and `NPM` version `7`+

### *Step 2: Provide configuration details*
``/src/config.js``\
Fill in all missing config information.

### *Step 3: Starting the bot*
``$ node .``\
Start the bot application using "`node . `"\
Any issues, please [open an issue][issues].

</details>

## Configuration

### Flags

When calling `zoxide init`, the following flags are available:

- `Main Config`
  - Required to start the bot
    | Value     | Description                       |
    | -------- | --------------------------------- |
    | `ownerID`   | Bot Owners User ID.      |
    | `token` | Token Obtained from Discord Developer portal.             |
    | `id`    | Bots Client ID Obtained from Discord Developer portal. |
    | `secret`    | Secret for OAuth2 Redirects  |
    | `prefix`    | Bot Trigger Phrase.      *`example ($help)`* |
    | `websiteURL`    | Website URL *`(For Future reference)`* |
    | `embedColor`    | Color of all Embeds the bot will use. |
    | `debug`    | Debug mode, *`(true/false)`* |
    | `MongoDBURl` | Required to create user accounts and store data |
        
- `API`
  - Required for Statistics API
    | Value     | Description                       |
    | -------- | --------------------------------- |
    | `port`   | HTTP port for API access.      |
    | `secure` | Decide if API should require token Authentication.             |
    | `token`    | Your secret API access token. *`(Made by you)`* |


[builtwithdjs-badge]: https://img.shields.io/badge/builtwith-djs-7d81f7?style=flat-square
[builtwithdjs]: https://discord.js.org/#/
[downloads-badge]: https://img.shields.io/github/downloads/SirHoDo/RocketTrades/total?style=flat-square
[issues]: https://github.com/SirHoDo/RocketTrades/issues/new
[releases]: https://github.com/SirHoDo/RocketTrades/releases
