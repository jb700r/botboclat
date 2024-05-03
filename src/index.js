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

botboclat.on('guildMemberAdd', (user) => {
  user.user.send("Welcome to hell!")
  const channel01 = botboclat.channels.cache.find(channel => channel.id === process.env.CHANNEL_ID);
  channel01.send(`Welcome ${user.user.username}!`);
});



botboclat.login(process.env.TOKEN);