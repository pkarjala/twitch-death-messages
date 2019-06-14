# [Twitch Death Messages](https://pkarjala.github.com/twitch-death-messages)

A JavaScript tool for sending random death messages to chat, along with a count of the number of deaths.

## Features

* Just requires a single web page and works from your web browser.
* Saves the current number of deaths and the channel name to local browser storage in JSON format.
* Does NOT save connection information

## Sample messages

* It is a shame that [username] died [count] [times] in a row.
* [username] didn't learn to dodge [count] [times].
* That looks like [username] felt the pain [count] [times].
* Welp, [username] slipped and fell to their death [count] [times].
* [username] was sliced in half [count] [times].
* [count] [times] now, [username] has made a boo boo.
* You have shown you know nothing [count] [times] over, [username]
* [username], the cat of [count] lives
* [username] fell [count] [times]...but isn't quite dead yet.
* [username] has fled this mortal coil [count] [times]
* ...and more to come!


## Getting started

1. Download this repository
2. Open the index.html file in the web browser of your choice
3. Register for a Twitch oAuth Token at [https://twitchapps.com/tmi/](https://twitchapps.com/tmi/)
4. Save the oAuth Token to safe place!
5. Enter the Token, your Twitch Username, and the name of the Channel you want to connect to in the applicable boxes.
6. Have fun!


## External Libraries

Uses the [TwitchJS](https://twitch-devs.github.io/twitch-js) library for connection to and communication with a chat channel.