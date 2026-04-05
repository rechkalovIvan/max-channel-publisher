import 'dotenv/config';
import { validateConfig } from './config.js';
import { createBot } from './bot.js';

validateConfig();

const bot = createBot();
bot.start();

console.log('MAX channel publisher bot started');
