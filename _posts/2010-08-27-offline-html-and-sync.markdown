---
title: HTML applications and data synchronization
meta: August 27 2010 &mdash; Producing weird algorithms
byline: Incremental data synchronization in JS
layout: post
---
I wrote my first "pure" HTML application, which I called [Coppersplit Calculonicus](http://github.com/mkaito/coppersplit), and which is live [here](http://mkaito.github.com/coppersplit), as an educational exercise. It served my purpose well: learning serious Javascript. Soon enough, I started using [web storage](http://dev.w3.org/html5/webstorage/) for backlog purposes, and to keep some user configurations. It was a perfect fit, since the app works on a set of data that doesn't need to be synchronized to anyone else. Whatever you did was stored locally, and loaded up again the next time you drove by.

I'm now working on a different application, with maybe half a dozen common points with my first app. The main difference is that this time I need data synchronization across multiple clients. This poses a major problem, if I am to do it properly. Let me expand a little.

## Data sync 101

First, let's settle a few basic concepts. When I say "data synchronization", I mean the action of keeping multiple clients up to date on one or more arbitrary data sets. Like with so many other things in IT, there are at least three dozen ways to handle this, most of which are pretty obscure.

First of all, we need to know what sort of data we will be handling. In this particular case, the application is a score board of sorts, that keeps track of points assigned to players of a video game I like to spend my time playing. There are a few officers in charge of updating the boards, and everyone else regularly checks on his and his friends' score. There's never more than one game on the same day, so we can use the date as universally unique identifier, since we can't generate "real" UUIDs in Javascript, due to technical limitations (more on this below).

But hold on... Why would I want to work with UUIDs? Can't I just hit the DB and ask to be assigned an ID when I create a new record? It turns out that the whole educational purpose of this application is this very point. I want it to be off-line capable. Officers should be able to annotate scores for the day while sitting on the train to work the next day, if they so wish. The next time the application has a connection, it will send new data to the server and pull updates.

## The long road from bulk to incremental

Now that we have a well defined problem domain, it's time we sit down and see how we're going to solve this riddle. If you carefully read the last sentence in the last paragraph above, I say "send new data" and "pull updates". This does, indeed, imply that I'd like the synchronization to be incremental. But what does this fancy word mean? Basically, that I only want to send "new" stuff around, instead of pushing and pulling data around in bulk. This makes the application more responsive since it has to wait for less data to transfer, and also saves some bandwidth.

But I'm jumping to conclusions here. Let's have a closer look at the two alternatives.

The "simple" way, essentially works thusly: You take the entire local data set and send it to the server, who responds with an updated data set, which you use to replace your local data. It's pretty bulky, but it works. It might also be slow, depending on your data and available bandwidth. The first step towards optimization, would be twofold. First, we will separate the data sending and receiving parts. On one hand, you will regularly ask the server for updated data, by providing a timestamp of your last pull. And then you replace your local data. But wait! All the local data? What if you have local data that hasn't been sent to the server? You need to keep these separate. When you push data to the server, the server needs to confirm he received and stored it, so you can move this data from your "new" branch to your "consolidated" branch. The next time you pull, the new data, and whatever other users might have added to the stack, will come along, and this data set will replace your local copy of the consolidated branch.

This is starting to sound a little better. You will only send data you know is new to the server, which makes the whole process considerably faster. But the astute reader might have noticed that we're still bulk-downloading data from the server. The entire bloody stack each time? That doesn't sound very efficient to me. We can take a similar approach as we did with data pushing. When pulling, we will send a request to the server, which includes the timestamp that came along with the last pull, and which is the date of the latest record sent by the server. If the server has data newer than this timestamp, he will send you any updates. If you remember, we're using record dates as UIDs, so this makes for a perfect timestamp.

And this is how we arrive at incremental-land. We've gone from sending entire data sets to identifying changes and sending over only the relevant bits of data. But there's still something left to handle: record conflicts. Imagine, you're sitting at the bus station, you pull out your netbook and start entering scores from last night's game. The bus arrives, you board it, get home, and the netbook grabs the wifi. The application will now send the new record to the server. But hold on. It turns out, Jane Doe has already sent in a record for last night. Meet the record conflict.

There are mainly two ways to handle this. The simplest thing is to simply reject the new record. But who knows, maybe the first record is missing some data the second record has, or viceversa. The ideal approach involves merging the two. But this is not something you can handle programatically, most of the time. The better way, is presenting the user with a message informing of the conflict, and the option to overwrite the old record, discard the new record, or display him with both, maybe in diff format if the audience is tech savvy, so he can manually perform the merge and send an updated record to the server.

## Further reading

If this topic has sparked your interest, you should read up on connection events and status over at [Mozillazine](http://hacks.mozilla.org/2010/01/offline-web-applications/). Once you grok that, setting up a sync system like the one we've been talking about here is trivial. The important part is always to focus on the data. The data will always tell you how it wants to be synchronized.

## Resources worth bookmarking

* [Dive into HTML5](http://diveintohtml5.org/), an open source book written by the genius Mark Pilgrim, has plenty of data on web storage, offline data, and more HTML5 than you can digest in a week.
* If you don't already have a JS framework of choice, I recommend looking at [Mootools](http://mootools.net/) to help you over the various cross browser quirks.
* In case you find yourself in need of a quick and dirty editor, take a peek at [jsFiddle](http://jsfiddle.net/), the evolution of the MooShell, with support for most well known JS frameworks out of the box.
