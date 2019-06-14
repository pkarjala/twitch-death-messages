// death-message.js

// global variables
const localStoreNameValue = "deathcount";

var twitchCon = null;
var conInfo = null;
var storeValue = JSON.parse( localStorage.getItem(localStoreNameValue) );
var count = storeValue !== null ? storeValue.count : 0;

const regUsername = /\[username\]/;
const regCount = /\[count\]/;
const regTimes = /\[times\]/;

const messages = [
  "It is a shame that [username] died [count] [times] in a row.",
  "[username] didn't learn to dodge [count] [times].",
  "That looks like [username] felt the pain [count] [times].",
  "Welp, [username] slipped and fell to their death [count] [times].",
  "[username] was sliced in half [count] [times].",
  "[count] [times] now, [username] has made a boo boo.",
  "You have shown you know nothing [count] [times] over, [username]",
  "[username], the cat of [count] lives",
  "[username] fell [count] [times]...but isn't quite dead yet.",
  "[username] has fled this mortal coil [count] [times]"
];

// Initialize the value for the displayed count value.
setSpanCountValue(count, localStoreNameValue);

// The connectionInfo object, used to hold the token, username, and channel name.
function connectionInfo(token, username, channel) {
  this.token = token;
  this.username = username;
  this.channel = channel;
}

// Pulls the connection info from the form field inputs and generates
// a connectionInfo object.
function pullConnectionInfo() {
  first = document.getElementById("token").value;
  second = document.getElementById("username").value;
  third =  document.getElementById("channel").value;
  return new connectionInfo(first, second, third);
}

// Connects to the Twitch Channel listed in the store.
function connectToTwitch() {

  // Pull the connection info from the input fields.
  conInfo = pullConnectionInfo();

  // Instantiate clients.
  twitchCon = new TwitchJs({ token: conInfo.token, username: conInfo.username });

  // Get featured streams.
  twitchCon.api.get('streams/featured').then(response => {
    console.log(response);
    // Do stuff ...
  });

  // Listen to all events.
  const log = msg => console.log(msg);
  twitchCon.chat.on(twitchCon.chatConstants.EVENTS.ALL, log);

  // Connect ...
  twitchCon.chat.connect().then(() => {
    // ... and then join the channel.
    twitchCon.chat.join(conInfo.channel);
  });
}

// Send a chat message when a button is clicked.
function sendDeathMessage() {
  count++;
  setSpanCountValue(count, localStoreNameValue);
  saveCount(count, localStoreNameValue);
  stringToSend = randomMessage(messages)
    .replace(regCount, count)
    .replace(regUsername, conInfo.channel)
    .replace(regTimes, timesValue(count));
  twitchCon.chat.say(conInfo.channel, stringToSend)
    .then(response => {
      console.log(response);
    })
}

// Updates the span value for the given value and ID.
function setSpanCountValue(countValue, spanId) {
  document.getElementById(spanId).textContent = countValue;
}

// Determines if times should be singular or plural.
function timesValue(number) {
  return (number > 1 ? "times" : "time");
}

// Returns a random message from an array of message strings.
function randomMessage(messages) {
  var min = 0;
  var max = (messages.length - 1);
  var randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return messages[randomValue];
}

// Saves the count value to local storage
function saveCount(countValue, localStoreName) {
  json_data = { "count" : countValue };
  localStorage.setItem( localStoreName, JSON.stringify(json_data));
}

// Resets the count value stored and displayed.
function resetCount(localStoreName) {
  count = 0;
  saveCount(count, localStoreName);
  setSpanCountValue(count, localStoreName);
}