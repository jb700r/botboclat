require("dotenv").config();
const { Client, IntentsBitField, Emoji, GuildChannel } = require("discord.js");

const botboclat = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ],
});

botboclat.on("ready", (c) => {
  console.log(`${c.user.username} is ready`);
});


const { joinVoiceChannel, createAudioPlayer, createAudioResource, entersState, VoiceConnectionStatus } = require('@discordjs/voice');

async function playSound(channel, soundFilePath) {
  try {
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    connection.on(VoiceConnectionStatus.Ready, () => {
      console.log('Connection is ready.');
    });

    const player = createAudioPlayer({ pause: false });
    connection.subscribe(player);

    const stream = createAudioResource(soundFilePath);
    player.play(stream);

    console.log('Sound started playing.');

    player.on('stateChange', (oldState, newState) => {
      console.log(`Player transitioned from ${oldState.status} to ${newState.status}`);
      if (newState.status === VoiceConnectionStatus.Idle) {
        connection.destroy();
        console.log('Connection destroyed.');
      }
    });

    player.on('error', error => {
      console.error('Player error:', error);
    });

    await entersState(player, VoiceConnectionStatus.Idle, 5000);
    console.log('Player entered idle state.');
  } catch (error) {
    console.error('Error playing sound:', error);
  }
}

// Exemple d'utilisation avec le client existant 'botboclat':
botboclat.on('messageCreate', async message => {
    if (message.content === '!play1') {
      if (!message.member.voice.channel) {
        return message.reply('You must be in a voice channel to use this command!');
    }

    try {
        await playSound(message.member.voice.channel, 'sound/bomboclat2.mp3');
    } catch (error) {
        console.error('Error playing sound:', error);
        message.reply('An error occurred while playing the sound.');
    }
    }
});

botboclat.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "hey") {
    interaction.reply("Hey pussy boi!");
  }
  if (interaction.commandName === "gamba") {
    interaction.reply(
      "Go to https://stake.com if you want to loose all your money!"
    );}
    if (interaction.commandName === "bomboclat_dog") {
      if (!interaction.member.voice.channel) {
        return interaction.reply('You must be in a voice channel to use this command!');
      }
      else
      {
        playSound(interaction.member.voice.channel, 'sound/bomboclat2.mp3');
        interaction.reply("Playing bomboclat dog!")
      }
  };
  if (interaction.commandName === "bomboclat") {
    if (!interaction.member.voice.channel) {
      return interaction.reply('You must be in a voice channel to use this command!');
    }
    else
    {
      playSound(interaction.member.voice.channel, 'sound/bomboclat.mp3');
      interaction.reply("Playing bomboclat!")
    }
}
});
/*
botboclat.on("messageCreate", (message) => {
  if (message.author.id == "446625751857496074") {
    message.author.send("https://tenor.com/view/lean-codeine-promethazine-sprite-gif-5718593 this you?");
    message.reply("https://tenor.com/view/lean-codeine-promethazine-sprite-gif-5718593 this you?");
  }
});

botboclat.on("messageCreate", (message) => {
  if (message.author.id == "664252922648854530") {
    message.author.send("https://tenor.com/view/gambling-gamble-gambler-old-man-addiction-gif-13539663578305331391 this you?");
    message.reply("https://tenor.com/view/gambling-gamble-gambler-old-man-addiction-gif-13539663578305331391 this you?");
  }
});
*/
botboclat.on('guildMemberAdd', (user) => {
  user.user.send("Welcome to hell!")
  const channel01 = botboclat.channels.cache.find(channel => channel.id === '1226367309254230080');
  channel01.send(`Welcome ${user.user.username}!`);
});



botboclat.login(process.env.TOKEN);
