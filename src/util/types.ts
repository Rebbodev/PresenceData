import { ClientEvents } from 'discord.js';

export type ApiData = {
    tag: string;
    image: string;
    status: string;
    activity_name: string;
    activity_state: string;
};

export type DiscordEvent = {
    event: keyof ClientEvents;
    // eslint-disable-next-line unused-imports/no-unused-vars
    run: (...arguments_: any[]) => Promise<void>;
};
