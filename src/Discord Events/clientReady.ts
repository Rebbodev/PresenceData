import { apidata, botClient } from '..';
import { guildId, userId } from '../Data/settings.json';
import { DiscordEvent } from '../util/types';

export const E_DiscordReady: DiscordEvent = {
    event: 'ready',
    run: async () => {
        const guild = await botClient.guilds.fetch(guildId);
        const member = guild?.members.cache.get(userId);

        const newPresence = member?.presence;

        if (!newPresence || !newPresence.user || !newPresence.member) return;

        apidata['Data'] = {
            tag: newPresence.user.tag,
            status: newPresence.status,
            image: newPresence.member
                ?.displayAvatarURL()
                .replace('.webp', '.png'),
            activity_name: `${
                newPresence.activities.length > 0 &&
                newPresence.activities.at(0)?.name
                    ? newPresence.activities.at(0)?.name
                    : 'Being lazy'
            }`,
            activity_state: `${
                newPresence.activities.length > 0 &&
                newPresence.activities.at(0)?.state
                    ? newPresence.activities.at(0)?.state
                    : 'Looks like im doing nothing...'
            }`,
        };
    },
};
