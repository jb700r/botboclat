require("dotenv").config();
const { REST, Routes,ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with hey!",
  },
  {
    name: "gamba",
    description: "Please don't gamba :("
  },
  {
    name: "bomboclat_dog",
    description: "play bomboclat dog in the voice channel"
  },
  {
    name: "bomboclat",
    description: "play bomboclat in the voice channel"
  },

];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("Setting slash commands.");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands works.");
  } catch (error) {
    console.log("Error : ", error);
  }
})();
