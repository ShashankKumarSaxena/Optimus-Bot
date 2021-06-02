const { Client, Collection, Permissions } = require("discord.js");
const Util = require("./Util.js");

module.exports = class BotClient extends Client {
  constructor(options = {}) {
    super({ disableMentions: "everyone" });
    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.utils = new Util(this);

    this.validate(options);
  }

  validate(options) {
    if (typeof options != "object")
      throw new TypeError("Options should be type of object!");

    if (!options.token)
      throw new Error("You must pass the token for the client!");
    this.token = options.token;

    if (!options.prefix) throw new Error("Give a valid prefix!");
    if (typeof options.prefix !== "string")
      throw new Error("Prefix must be a type of string!");
    this.prefix = options.prefix;
  }

  async start(token = this.token) {
    this.utils.loadCommands();
    this.utils.loadEvents();

    await super.login(token);
  }
};
