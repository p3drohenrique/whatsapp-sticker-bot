require('dotenv/config');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcodeTerminal = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on('qr', qrCode => {
  console.log('Whatsapp QRCode:');
  qrcodeTerminal.generate(qrCode, { small: true });
});

client.on('ready', () => console.log('Conectou!'));

client.on('message_create', async message => {
  if (message.from !== process.env.CONTACT_ID) return;
  if (message.type !== 'image') return;
  if (!message.hasMedia) return;

  const chat = await message.getChat();
  if (!chat.isGroup) return;
  if (chat.name?.trim() !== 'Sticker Bot') return;
  const image = await message.downloadMedia();
  const stickerMessage = await chat.sendMessage(image, { 
    sendMediaAsSticker: true,
    stickerAuthor: '🤖 Sticker Bot - ☠️ Pedro H.',
  });
  await new Promise(resolve => setTimeout(() => resolve(), 1000 * 5));
  await stickerMessage.star();
});

client.initialize();