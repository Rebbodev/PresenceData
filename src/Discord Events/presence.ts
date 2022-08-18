import { apidata } from '..';
import { userId } from '../Data/settings.json';
import { DiscordEvent } from '../util/types';

export const E_PresenceUpdate: DiscordEvent = {
    event: 'presenceUpdate',
    run: async (oldPresence, newPresence) => {
        if (newPresence?.user?.id !== userId) return;

        if (!newPresence.member) return;

        if (apidata['Data']) {
            delete apidata['Data'];
        }

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
                    : 'Weird im currently doing nothing...'
            }`,
        };
    },
};
