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
      GuildID: '',
      ModRole: '',
      SuggestionChannel: '',
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
  MongoDBURl: 'mongodb://',
  embedColor: '#5d369d',
  debug: false,
};

module.exports = config;