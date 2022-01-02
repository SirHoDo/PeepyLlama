var fs = require('fs');
var http = require('http');
var https = require('https');
var options = {
};
https.createServer(options, function (req, res) {
});
const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const config = require("../src/config.js");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const Discord = require("discord.js");
const items = require('../src/json/items.json')
const trophy = require('../src/json/trophy.json')
const api = require("../src/core/api")
const app = express();
const MemoryStore = require("memorystore")(session);

module.exports = async (client, args) => {
  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}IUNGO`);
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));
  passport.use(new Strategy({
    clientID: config.id,
    clientSecret: config.secret,
    callbackURL: `callback`,
    scope: ["identify", "guilds"]
  },
    (accessToken, refreshToken, profile, done) => {
      process.nextTick(() => done(null, profile));
    }));
  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
    resave: false,
    saveUninitialized: false,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.locals.domain = config.websiteURL.split("//")[1];
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };
  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }
  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL;
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
    passport.authenticate("discord"));
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });
  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
      req.logout();
      res.redirect("/");
    });
  });
  app.get("/", async (req, res) => {
    var all = await api.getAll()
    let baltop = await api.getAll()
    baltop.sort((a, b) => b.data.bal - a.data.bal);

    var position = 0

    renderTemplate(res, req, "index.ejs", { users: all, leader: baltop, pos: position });
  });
  app.get("/404", (req, res) => {
    renderTemplate(res, req, "404.ejs");
  });
  app.get("/commands", (req, res) => {
    var categories = client.categories
    renderTemplate(res, req, "commands.ejs", { categories });
  });
  app.get("/staff", async (req, res) => {
    let baltop = await api.getAll()
    //baltop.sort((a, b) => b.data.bal - a.data.bal);

    renderTemplate(res, req, "team.ejs", { leader: baltop }, { perms: Discord.Permissions });
  });
  app.get("/trophy", (req, res) => {
    renderTemplate(res, req, "trophy.ejs", { trophy });
  });
  app.get("/user", async (req, res) => {

    var user = await api.getUser('456062221710131210')
    user.userviews = user.userviews + 1
    await api.modUser('456062221710131210', user)

    let baltop = await api.getAll()
    baltop.sort((a, b) => b.data.bal - a.data.bal);

    var position = 0

    var views = user.userviews
    renderTemplate(res, req, "user.ejs", { visits: views, leader: baltop, pos: position }, { perms: Discord.Permissions });
  });
  app.get("/user/:ID", async (req, res) => {
    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })
    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/nouser");
      })
    /* Users Visit Counter */
    var user = await api.getUser(req.params.ID)
    if (!user.profileViews) {
      user.profileViews = 0
      await api.modUser(req.params.ID, user)
    }
    user.profileViews = user.profileViews + 1
    await api.modUser(req.params.ID, user)
    var views = user.profileViews
    renderTemplate(res, req, "settings.ejs", { items, admins, guild, profile: storedSettings, alert: null, visits: views });
  });

  app.post("/user/:ID", async (req, res, addCD) => {
    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })
    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/nouser");
      })

    await api.changeBal(req.params.ID, 5000).then(api.addCool(req.params.ID, 'daily', 30000))

    var user = await api.getUser(req.params.ID)
    if (!user.profileViews) {
      user.profileViews = 0
      await api.modUser(req.params.ID, user)
    }
    user.profileViews = user.profileViews + 1
    await api.modUser(req.params.ID, user)
    var views = user.profileViews
    renderTemplate(res, req, "settings.ejs", { admins, guild, profile: storedSettings, alert: null, visits: views });
  });

  app.get("/staff/:ID/profile", checkAuth, async (req, res) => {

    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })

    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/user");
      })
    renderTemplate(res, req, "adminedit.ejs", { admins, guild, profile: storedSettings, alert: null });
  });
  app.post("/staff/:ID/profile", checkAuth, async (req, res) => {
    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })
    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/nouser");
      })
    var money = req.body.money
    var toAdd = parseInt(money);
    storedSettings.bal = toAdd;

    var xp = req.body.xp
    var toAddxp = parseInt(xp);
    storedSettings.levels.xp = toAddxp;

    var level = req.body.level
    var toAddlevel = parseInt(level);
    storedSettings.levels.level = toAddlevel;
    await api.modUser(req.params.ID, storedSettings)

    const exampleEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription("User" + `<@${req.params.ID}>` + " edited")
    .addFields(
      { name: 'Money:', value: req.body.money },
      { name: 'XP:', value: req.body.xp },
      { name: 'Level:', value: req.body.level}
    )
    .setTimestamp()
  
    client.channels.cache.get(config.GuildChannel).send({ embeds: [exampleEmbed] });

    renderTemplate(res, req, "adminedit.ejs", { admins, guild, profile: storedSettings, alert: "Your settings have been saved." });
  });

  app.get("/staff/:ID/inventory", checkAuth, async (req, res) => {
    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })
    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/user");
      })

    renderTemplate(res, req, "admininv.ejs", { admins, guild, profile: storedSettings, alert: null });
  });
  app.post("/staff/:ID/inventory", checkAuth, async (req, res) => {
    var staffCheck = await api.getAll()
    const admins = [];
    Object.keys(staffCheck).forEach(function (key) {
      if (staffCheck[key].data.staff) {
        admins.push(staffCheck[key].data.id)
      }
    })
    const guild = client.users.fetch(req.params.ID)
      .catch(() => { return res.redirect("/404"); })
    var storedSettings = await api.getUser(req.params.ID)
      .catch(() => {
        return res.redirect("/nouser");
      })
    var laptop = req.body.laptop
    var appLaptop = parseInt(laptop);
    storedSettings.inv['laptop'] = { name: "laptop", amount: appLaptop }

    var headset = req.body.headset
    var appheadset = parseInt(headset);
    storedSettings.inv['headset'] = { name: "headset", amount: appheadset }

    var c4 = req.body.c4
    var appc4 = parseInt(c4);
    storedSettings.inv['connect 4 trophy'] = { name: "connect 4 trophy", amount: appc4 }

    var leztoken = req.body.leztoken
    var appleztoken = parseInt(leztoken);
    storedSettings.inv['leztoken'] = { name: "leztoken", amount: appleztoken }

    var apple = req.body.apple
    var appapple = parseInt(apple);
    storedSettings.inv['apple'] = { name: "apple", amount: appapple }

    var lottery = req.body.lottery
    var applottery = parseInt(lottery);
    storedSettings.inv['lottery'] = { name: "lottery", amount: applottery }

    var moneybag = req.body.moneybag
    var appmoneybag = parseInt(moneybag);
    storedSettings.inv['moneybag'] = { name: "moneybag", amount: appmoneybag }

    var icecream = req.body.icecream
    var appicecream = parseInt(icecream);
    storedSettings.inv['icecream'] = { name: "icecream", amount: appicecream }

    await api.modUser(req.params.ID, storedSettings)
    renderTemplate(res, req, "admininv.ejs", { admins, guild, profile: storedSettings, alert: "Your settings have been saved." });
  });


  app.use("/assets", express.static(__dirname + "/assets"));
  app.use(function (req, res) {
    res.status(404).redirect('/404');
  });

  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(options, app);

  httpServer.listen(config.Dashboard.port);
  httpsServer.listen(config.Dashboard.https);
  console.log("Website online " + config.websiteURL + config.Dashboard.port)
};