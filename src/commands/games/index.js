const commands = require('fs').readdirSync(__dirname)
    .filter(c => c !== 'index.js')
    .map(c => require(`${__dirname}/${c}`))

module.exports = {
    commands,
    name: '🎲 Games',
    id: 'games',
    desc: "Challenge yourself, or others to some friendly games... Plus earn a couple extra dollars."
}