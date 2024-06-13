   const TelegramBot = require('node-telegram-bot-api');
   const axios = require('axios');

   // Bot tokenini o'rnating
   const token = 'YOUR_TELEGRAM_BOT_TOKEN';
   const bot = new TelegramBot(token, { polling: true });

   // Musiqa qidirish funksiyasi
   async function searchMusic(query) {
       const apiUrl = `https://api.example.com/search?query=${encodeURIComponent(query)}`;
       try {
           const response = await axios.get(apiUrl);
           if (response.data && response.data.results && response.data.results.length > 0) {
               return response.data.results[0].url; // Musiqa URL manzilini qaytarish
           } else {
               return 'Musiqa topilmadi.';
           }
       } catch (error) {
           console.error(error);
           return 'Musiqa qidirishda xato yuz berdi.';
       }
   }

   // /start komandasi
   bot.onText(/\/start/, (msg) => {
       bot.sendMessage(msg.chat.id, 'Salom! Men musiqa qidirish botiman. Qidiruv so\'rovini yuboring.');
   });

   // Qidiruv so'rovlarini qayta ishlash
   bot.on('message', async (msg) => {
       const chatId = msg.chat.id;
       const query = msg.text;

       if (query.startsWith('/start')) return;

       const result = await searchMusic(query);
       bot.sendMessage(chatId, `Mana topilgan musiqa: ${result}`);
   });