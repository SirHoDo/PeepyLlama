const config = {
  ownerID: [''],
  token: '',
  id: '',
  secret: '',

  prefix: '',

  disabledCommands: [],
  disabledPlugins: [],
  websiteURL: '',
  SupportServer: {
    link: '',
    GuildChannel: '',
},
  Dashboard: {
      port: 3039,
      https: 456
  },
API: {
  port: 3040,
  secure: true,
  token: 'abc123',
},
  MongoDBURl: 'mongodb+srv://<user>:<password>@<host>:<port>',
  embedColor: '#5d369d',
  debug: false,
};

module.exports = config;