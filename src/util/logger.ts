import { createLogger, shimLog } from '@lvksh/logger';
import { blueBright, cyan } from 'colorette';

export const logger = createLogger({
    info: {
        label: blueBright('[INFO]'),
        newLine: cyan('⮡'),
        newLineEnd: cyan('⮡'),
    },
});

shimLog(logger, 'info');
