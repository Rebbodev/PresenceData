/* eslint-disable prettier/prettier */
import { Client, GatewayIntentBits } from 'discord.js';
import { config as dotEnvironmentConfig } from 'dotenv';
import express from 'express';

import { E_DiscordReady } from './Discord Events/clientReady';
import { E_PresenceUpdate } from './Discord Events/presence';
import { logger } from './util/logger';
import { ApiData, DiscordEvent } from './util/types';

dotEnvironmentConfig();

export const GLOBALS = {
    BotToken: process.env.BOT_TOKEN,
    ExpressAddress: process.env.EXPRESS_ADDRESS,
    ExpressPort: process.env.EXPRESS_PORT,
    ExpressIdentifier: process.env.EXPRESS_IDENTIFIER
};

const app = express();

export const botClient = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ],
});

export const apidata: {
    Data?: ApiData
} = {};

const eventsRaw: DiscordEvent[] = [E_DiscordReady, E_PresenceUpdate];

if (eventsRaw.length > 0) {
for (const event of eventsRaw) {
    botClient.on(event.event, event.run);
  }
}

//Sending Data On Call
app.get(`${GLOBALS.ExpressIdentifier}`, (request, result) => {
        result.send(JSON.stringify(apidata.Data ? apidata.Data : 'ERROR: NO DATA FOUND!'));
    });



//Starting the discord bot
logger.info('starting discord');
botClient.login(GLOBALS.BotToken);

//Activating Bot Listener
logger.info(`Starting api listener on port: ${GLOBALS.ExpressPort}`);
app.listen(GLOBALS.ExpressPort, () => {
    logger.info(`Api started on: ${GLOBALS.ExpressAddress}:${GLOBALS.ExpressPort}${GLOBALS.ExpressIdentifier}`);
});
