var moment = require('moment');
var twitter = require('twitter-text');
const shell = require('electron').shell;

var apiTocken = "Basic NXBaWnRYVDlsdzk4dWFoTDlBS3FkSTdMRzpCU3JWdnZORjBrYlpkSGxjSGFiWnRPeDZGUnJDejdFblRuTk1ESThqY0J4ZFl2YURHNw==";
var AuthToken;
var apiRoot = 'https://api.twitter.com/1.1/search/tweets.json?';

var app = new Vue({
  el: '#app',
  data: {
    counter: 00,
    tweets: [],
  },
  mounted: function () {
    this.drawTimer();
    this.updateTimer();
    this.authTwitter();
  },
  methods: {
    updateTimer: function () {
      var self = this;
      setInterval(function() {
        self.drawTimer()
      }, 1000);
    },
    drawTimer: function() {
      var currentTime = moment(new Date());
      var eventTime = moment("2017-03-03");
      this.counter = moment(eventTime.diff(currentTime)).format("DD:hh:mm:ss");
    },
    authTwitter: function() {
      Vue.http.post('https://api.twitter.com/oauth2/token','grant_type=client_credentials',{
        headers: {
          "Authorization": apiTocken,
          "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8.'
        }
      }).then(response => {
        var body = response.body;
        AuthToken = body.token_type + " " + body.access_token;
        this.fetchTwitterData();
        this.updateFeet();
      }, err => {
        console.log(err)
      })
    },
    updateFeet: function() {
      var self = this;
      setInterval(function() {
        self.fetchTwitterData()
      }, 60000);
    },
    fetchTwitterData: function() {
      this.$http.get(apiRoot + 'q=%23nintendoswitch&lang=en&lang=de&result_type=popular',{
        headers: {
          "Authorization": AuthToken
        }
      })
      .then(response => {
        this.tweets = [];
        response.body.statuses.map(tweet => {
          var out = {
            "userImg": tweet.user.profile_image_url,
            "userScreenName": "@" + tweet.user.screen_name,
            "userName": tweet.user.name,
            "createAt": moment(new Date(tweet.created_at)).fromNow(),
            "text": twitter.autoLink(twitter.htmlEscape(tweet.text))
          }
          this.tweets.push(out);
        });
          
      }, err => {
        console.log(err);
      })
    }
  }
})

document.addEventListener('click', function(event){
  if (event.target.tagName.toLowerCase() !== 'a') return;
  event.preventDefault();
  shell.openExternal(event.target.href);;
})