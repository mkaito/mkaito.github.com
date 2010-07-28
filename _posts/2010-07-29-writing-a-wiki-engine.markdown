---
title: Writing a Wiki engine
meta: July 29 2010 &mdash; Thinking in code
byline: Simple things, rethought.
layout: post
published: true
---

## Why a wiki?

While everyone and his brother is writing a blogging engine, I decided
to take on a wiki engine. After all, my blogging is being taken care
of by [Jekyll](/2010/07/01/why-jekyll/ "Why Jekyll?"), and I have to
admit it's almost perfect. I'll go into the details of "almost" in
another post.

This shall be the first post in a series about how to think out of the
box when tackling a programing task. Standards are good, but standards
are not the holy grail. Sometimes, stepping back and thinking "is this
the right way of doing things?" is the way to go, and you're not
always going to agree with the *standards*. Or maybe the usual way of
doing things isn't the right way. Besides, this approach is
of immense educational value. Understanding the *why* and *how* of
things we take for granted, like forums, wikis, or blogs, help us
understand the fundamental principles that guide every application
from conception to deployment. There are certain ideas and concepts
you need to be familiar with, if you are to call yourself an
application developer, and I'm hoping to send across the right ideas
to get you started. As the saying goes, I can only show you the path,
you'll have to walk it yourself.

I intend not to write about specific tools or technologies, beside the
times I use them as examples of the ideas I try to bring
across. However, I understand that some more examples might be needed,
like real-world examples of what I'm writing about. Be aware, that
each piece of software I write about, is a piece of software I have
actually written, or am in the process of writing, and what you read
is just the line of thought I followed prior to sitting down at the
computer and booting Emacs. This means, that I'm already considering a
follow-up series on the specific technology choices behind my
software. Don't expect tutorials on how to do what I did, since I
don't like writing "click here, enter this" tutorials (and teaching
someone to fish is way better than giving him a fish), but it should
give you enough background to follow
[my code](http://github.com/mkaito) on Git Hub.

Please be aware that the articles in this series will be written with
completeness in mind, and I will strive to go into great detail about
every design decision I made for every problem I encountered. Even
though I try to write in a very dense form, these articles will
probably grow past a few pages in print. Feel free to bookmark, and
read each article in several times. I sincerely hope you enjoy reading
them, as much as I enjoy writing them.

## What is a wiki?

Well... according to wikipedia:

> A wiki ( /ˈwɪki/ WIK-ee) is a website that allows the easy creation
> and editing of any number of interlinked web pages via a web browser
> using a simplified markup language or a WYSIWYG text editor. <span
> class="source"><a
> href="http://en.wikipedia.org/wiki/Wiki">Wikipedia</a></span>

Alright, so a wiki is something that allows people to create and link
content right in the browser, by using some sort of doohickey so they
don't have to learn HTML. This means several things. First, a user
should have an easy time knowing where and how to begin creating
content. Second, if content is related, but not related enough to sit
on the same page, it should be easy to provide context to readers by
linking articles in some fashion. HTML provides for this with
hyperlinks, so don't worry, you don't have to reinvent the wheel on
this one. Third, the user doesn't need to know the technicalities that
enable the wiki. She shouldn't need to learn html, or wonder why the
file upload isn't working, although providing "extra features" for
tech-savvy users is a bonus. This is probably the most fundamental
idea behind good application development. Things need to work and be
intuitive. You need to build on existing knowledge and move on from
there. Don't make the user read a three-tome manual to use your
app. It's your duty as developer to make things work the way the user
would expect. Deal with it.

## Creating bold content

Let's begin with the first question to be asked. Where will pages sit?
Most wiki engines I've seen only have one level of hierarchy among
pages. While this is simple on the back end, it leads to page names
like "The Thing (The Real Thing from London)" and "The Thing (Not The
Same Thing)", and I happen to dislike this. What's wrong with names
like "london/the_thing"? The answer is really simple: absolutely
nothing. Anyone that has used a computer for a week knows what a
folder is and how it's used. We're all used to see hierarchy all over
the world, from monarchy to the army, from your work place to your
family. There's absolutely nothing wrong with building on this
knowledge, and exploiting it for a better user experience.

I've mentioned my dislike for java script driven WYSIWYG editors that
look, behave and weight about as much as MS Word. How about LaTeX? Was
just a joke, don't beat me yet! Plain HTML? Nah... What about
[Textile](http://en.wikipedia.org/wiki/Textile_(markup_language), or
[Markdown](http://daringfireball.net/projects/markdown/ )? More like
it. Would users want to "learn" any of them? I'd argue that textile is
the more powerful of the two, at the cost of being a tad more
complex. But Markdown requires hardly any *learning*. As John Gruber
would put it, if you've ever read or written plain-text email, you
probably already know Markdown. You write stuff, and it turns into
beautiful HTML. And if you've never seen some plain text email, it
looks just like html email, but we use typographic symbols instead of
bright orange to denote things. Have a look at the link above, it's
really simple. I write my articles in markdown, because it's so simple
it doesn't distract me from what I'm writing. I've even caught myself
taking notes in markdown *with a pen and paper*.

Most likely, users will want to add some sort of graphic content to
spice their texts up. How would we handle this? I've seen most big
bulletin board software have an "attach" feature, which is used to
upload several allowed file types and keep them with the posts they
were uploaded for. But a wiki is about sharing. I'd rather have images
stored in a central place, indexed and ready to be used by anyone that
would need the same image. But we'll need an easy way to upload, find
and insert images into the content. Probably categorize them, or tag
them. Some search dialog contraption comes to mind, where the user is
able to refine her search by tags or categories, and ultimately
clicking on an image will insert the apropiate link into the content
area. Sounds like a little bit of java script is going to be required,
and a search back end to support it. Nothing too complex, it should be
fast and responsive.

Don't some of the new NoSQL DBs support "attachments" for records?
How do image uploads stored straight in the database sound? If we can
index them by metadata, this would be almost perfect. On the other
hand, we could keep the metadata in the database and retrieve the
content from disk on demand. Sounds about as good to me. I'm more
inclined to trust my good old file system anyway. And it's easier to
back up than a database. But then, separating related content is not
such a good idea. Keeping the files together with the data would
simplify things greatly, including backups. You still have to backup
the DB to keep the meta data, after all, so why not reduce it to a
single step?

## Connect the dots

Soon enough, users will start wanting to relate content stored on
different pages of your wiki. The preferred way of doing this is by
citation or reference. The web provides for good reference tools in
the form of hyperlinks. We should use these to relate
content. Citation should be handled inline, with no extra
fanciness. But how would you handle linking? The usual way seems
perfectly fine to me. Let me explain. You create a link in whatever
way the local markup/wysiwyg thing defines, in a way the system
recognizes that it is an internal link targeted at another wiki
page. Now, when rendering the page, links are checked for
target. Links with existing targets are rendered in a regular way,
just another link. Links that point into the void, will be
highlighted, letting the user know that there is reference material to
be filled in. So far, so good. The real problem, however, is something
I just went over like it's no big deal.

Where do we draw the line between "the system recognizes the link" and
"the user has no trouble in creating the link"? This, is probably the
most important detail of the whole user interface for your wiki. With
that in mind, let's step back and analyze this problem. We need to
have links created in a consistent way. Otherwise, it would lead to
rather messy parsing code, and vaguely defined formatting rules will
just lead to poorly formatted content. As the pythonistas say:

> There should be one-- and preferably only one --obvious way to do
> it.

Last time I wrote a wiki, I used textile instead of markdown. The
rendering system I used was RedCloth, which is pretty easy to
extend. I wrote a parsing method that took strings like
<code>[[SomeThing/SomethingElse/PageName]]</code> and turned this into
links local to the wiki, with all the target checking I mentioned
above. Sadly, the audience I had for this wiki was rather reduced, so
I didn't have a chance to test this "in the wild", but I'd argue it's
a rather usable approach. From early research, I can
[see](http://maruku.rubyforge.org/extending/extensions.html "Extending
Maruku") that the same thing can be achieved with markdown parsers.

The idea behind this, is taking WikiWords to another
level. "Traditional" wiki software will parse for runs of several
capitalized words with no spacing, and convert them to links. This
would work, because there is a single hierarchy level, as I mentioned
above. With multi-level hierarchies in mind, this becomes a little too
vague, and the need for explicit link declaration becomes clear. Hence
the double square brackets around the page path. What would you rather
encounter in the souce? <code>FooBar/Foo/FooBarBaz</code> or
<code>[[FooBar/Foo/FooBarBaz]]</code>? Source readability counts. And,
yes, I do have a pretty firm Python background, even though I'm a Ruby
enthusiast these days.

Now that we have local links covered, everything else is taken care of
by vanilla markdown. And in case it doesn't, advanced users can "drop
down" to pure HTML without a problem. Markdown allows for seamless
weaving of itself with HTML. For these cases, we might want to provide
a handful of CSS classes to be used, for the sake of visual
harmony. Of course, provide documentation on them, not too far away.

## Cruising the sea of wiki

Navigating the wiki is about as important as content
creation. The most ubiquitous hierarchical navigation element is
probably the one we call "breadcrumbs". Putting these atop each page
will ensure two things. First, the user will immediately have a clear
idea of "where he is", and second, it provides easy upstream
navigation. Also, this should be the only automatically generated
navigation. Automatic index pages are nothing short of a mess. How is
a computer meant to know in what order pages should be displayed? Or
how things should be distributed? Thankfully, the link method outlined
above is easy enough to quickly create categorical or topical index
pages by hand. Let the humans do the thinking, let the computers do
the work. Not the other way around, or any other way.

## Wrapping it up

I've already spent some time working on this project, I've dubbed
"Piki" (guess why *=P*), and it's steadily moving along. Once it is
production ready, I'll share the code and the choices that led me to
the specific technologies used in the process. The whole project is
being written from the start to serve as an educational example, so
there will be lots of comments and no magic hackery going on. Stay
tuned!
