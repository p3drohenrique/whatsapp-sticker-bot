require("dotenv/config");
const { WhatsappPuppeteer } = require("whatsapp-puppeteer");

const groupName = process.env.GROUP_NAME || "";
const debug = process.env.DEBUG === "TRUE" ? true : false;

(async () => {
  console.log("Iniciando Whatsapp sticker bot");
  console.log("Group name: ", groupName);
  console.log("Debug: ", debug);

  const whatsappPuppeteer = new WhatsappPuppeteer();

  await whatsappPuppeteer.initialize({
    headless: !debug,
    showQrCodeTerminal: true,
  });

  whatsappPuppeteer.on("newMessage", async (message) => {
    if (debug) console.log("MESSAGE: ", message);
    if (message.type === "image" && message.hasMedia) {
      const chat = await message.getChat();
      if (debug) console.log("CHAT: ", chat);
      if (chat.name === groupName && chat.isGroup) {
        const image = await message.downloadMedia();
        if (image) {
          await chat.sendMessage(image, {
            sticker: true,
            stickerAuthor: "🤖 Sticker Bot - ☠️ Pedro H.",
          });
        }
      }
    }
  });
})();
