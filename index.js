require("dotenv").config();

const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_TOKEN);

var Owlbot = require("owlbot-js");

var client = Owlbot(process.env.ACCESS_TOKEN);

bot.on("text", async (ctx) => {
  try {
    client.define(ctx.message.text).then(function (result) {
      result.definitions.map((x, index) => {
        ctx.reply(
          (result.definitions.length > 1 ? "Number: " + (index + 1) : "") +
            "\nWord: " +
            result.word +
            "\nPronunciation: " +
            result.pronunciation +
            "\n\nType: " +
            x.type +
            "\nDefinition: " +
            x.definition +
            (x.example !== null ? "\nExample " + x.example : "") +
            (x.image_url !== null ? "\nImage_url " + x.image_url : "") +
            (x.emoji !== null ? "\nEmoji " + x.emoji : "")
        );
      });
    });
  } catch (e) {
    ctx.reply(e);
  }
});

bot.launch();
