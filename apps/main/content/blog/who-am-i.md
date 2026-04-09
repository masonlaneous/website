---
title: who am i?
description: get to know the mason behind the scape
published: 1749322324082
modified: 1775731763991
---

hi! i am the guy who made this website. in this post ill talk a little about who i am as a person, and then a bit about who i am as a developer

## as a person

im mason! im in my early 20s and i live in the midwest

i have some cats

:ContentImage{ src="kitties.png" alt="i think that's charlie closest to the camera, and slim jim behind him. its easier to tell them apart when they stand up and you can see slim jims big belly" }

and some dogs

:ContentImage{ src="puppies.png" alt="thats duke on the left and dilla on the right. i swear they dont usually look this scary" }

they're all pretty young, except skye the cat (not pictured) who is 12. but duke and dilla are only like 4, and the kitties are like... 2?

that cat bed is right on my desk, within arms reach while im at my desk. its always nice to have a kitty nearby

### i love gaming!

my favorite games are:

1. terraria (mods: calamity, infernum, catalyst, wrath of the gods)
2. doom eternal
3. hades
4. deltarune (not so much replaying, more so consuming ungodly amounts of theories)

honorable mentions: starcraft 2 campaign, overwatch 1, slay the spire, amnesia the dark descent, bloons td 6, subnautica, probably a bunch more im forgetting

im a pc gamer. i have a switch that i never use, because i realized i dont actually like any nintendo games. it was just pokemon for a while but now i think ive moved on even from that.

### i love music!

i mean who doesnt? but music has been an important part of my life for a while. when i think back to previous times of my life, a big thing i remember is the music i was listening to.

i cant do a numbered list for music, there are just too many. i wont even be scratching the surface, but here we go:

aphex twin, boards of canada, radiohead, :::cocteau twins:::mostly heaven or las vegas, thats tied with ok computer for my favorite album ever:::, mf doom, pinkpantheress, alex g, kendrick lamar, clams casino, tame impala, elusin, duster,  mitski, a tribe called quest, weezer, my bloody valentine, sybyr

i have a list of every album ive listened to since may 2021, including ratings. i might port it over to this website some day

### i love tv!

well maybe not love. i dont watch too many shows. but i really like some, like:

1. :::community:::community is my favorite, i watched a pirated dvd of the first few seasons at single digit ages on an portable dvd player and loved it. and after that, we as a family would watch new episodes when they came out:::
2. breaking bad, better call saul
3. the office
4. parks and rec
5. the good place
6. :::always sunny:::im actually rewatching it right now, im on season 11::: in philadelphia

and so on. those are in no particular order btw. except community. but truthfully i dont watch too much tv, though i have quite liked most of the shows ive seen.

---

okay thats enough about me as a person. now lets talk about me...

## as a developer

### the discord bot era

i started as a developer in 2018. i was in a discord server, and i was mildly infamous for adding too many random bots to the server. so i made my own bot with a silly :::name:::"when mason adds another bot"::: so that it would be funny when people saw the message saying it joined the server

after that gag came and went, i decided to keep having fun with the bot, figuring out how to get it online, then figuring out how to get it to respond to messages. very early on i renamed it to "milnk bot" and had it send messages about milk and drinking milk whenever users sent certain keywords. i dont know why. keep in mind i had zero idea how to code, i had never touched javascript prior to this. i just copy pasted from tutorials and edited them slightly. i remember i gave each response its own event listener, like

```js
client.on('message', message => {
  if (message.content === 'milk') {
    message.channel.send('drink your milk!')
  }
})

client.on('message', message => {
  if (message.content === 'hello') {
    message.channel.send('hello, i am milnk bot')
  }
})
```

when it could have just been

```js
client.on('message', message => {

  if (message.content === 'milk') {
    message.channel.send('drink your milk!')
  } else if (message.content === 'hello') {
    message.channel.send('hello, i am milnk bot')
  }

})
```

but at the time i had no concept of an "event listener" in my brain. i just copy pasted what worked. its kinda funny looking back. heres another gem of a codeblock, this ones from june of 2020, just after milnk bot got brought back from the dead and rebranded to masonbot:

```js
client.on('message', message => {
    if (message.content.startsWith("m,sc")) {
    let previousColor = message.member.roles.hoist.hexColor 
    const args = message.content.trim().split(/ +/g);
    let desiredColor = args.slice(1).join(" ").replace(/#/g, "").toLowerCase();
    let works = (/^#[0-9A-F]{6}$/i.test(`#${desiredColor}`));
    if (`${works}` == "true") {
    message.member.roles.hoist.setColor(`${desiredColor}`);
    message.channel.send({embed: {
        color: `${desiredColor}`,
        description: `Changed the color of your hoisted role from ${previousColor} to #${desiredColor}`}})};   
    if (`${works}` == "false") {
        {message.channel.send(`That didn\'t work. Correct usage is \`m,sc hexcode\`, with hexcode being a normal 6 digit hexcode (with or without the hashtag).`)};
    }
}});
```

this is exactly how it was written. the obvious standout is `if (`${works}` == "true")`. i dont think you could come up with a better parody of beginner javascript devs than that if you tried. to anybody who spends time on stackoverflow or discord servers or whatever, helping out beginner devs, you seriously have my respect. i would ask questions in discord servers when i was stuck sometimes, back when i first started, and people were very helpful. good memories! maybe ill join back and see if there are people that *i* could help. a full circle moment

it wasnt until a year later i think? where i started taking actual online courses, trying to improve my understanding of javascript beyond the random stuff i happened to pick up during my time banging rocks together. freecodecamp was the course i chose, i remember doing it during class in high school sometimes, if i had a moment to spare

ultimately, while freecodecamp is a good website and it probably taught me some things i didnt know, i dont think ive ever been very good at absorbing information from courses. i thought i had been learning to code through brute force out of sheer stubbornness, but it turns out thats more or less the way i learn best. nowadays i do spend time reading docs and asking AI for help, but not taking courses. i did try taking a vue course around a month ago, on vue mastery, and i got through the first course before quitting it and learning on my own. it was nice to get the basics from a course, so i had a decent foundation and knew where to start. but after the very very basics i had more luck just diving in. more about that in the next section, but the point is that ive always been a fan of learning by doing

anyway. masonbot had a very good run. he was only in my server, along with my friend group of 5-10 people. so every feature i made was for a very small audience, but that never mattered to me. he had a currency system which i :::was:::still am::: so proud of (hooked up to mongodb), i worked with html canvas a bit to make cool commands like hex viewers, a feature where a user could join vc and have the bot read out their messages for them using microsoft tts (since they didnt want to use their mic), and so many other random things. i would have never gotten into coding if it werent for discordjs, and i think im not alone in that. discordjs 12 will always have a special place in my heart. it felt like the perfect playground to learn in

and good news: masonbot is back! he has been for a number of months, actually. he has a couple AI commands, like chatting with deepseek. he had a command to check the status of my homeserver, although i dont use that command anymore now that i have grafana setup. hes not as full of features as he used to be, but thats okay. i only use him in dms with 2 friends now, but we have fun with him and use the chat command pretty regularly. being able to use bots in dms is so cool, although i still prefer the simplicity of discord bot development from when i first started. before intents and slash commmands. still, its nice to see him online again

### the website era (aka: the miscellaneous era)

this is where ive been for, idk, a couple years? after my server disbanded and masonbot went with it, i didnt code much for a while. but after a while, i dont remember what started it, i realized that my knowledge of javascript from my masonbot days meant that i could get into web development :::relatively easily:::css still kicked my ass more than javascript ever did:::

#### the beginnings

to be honest i dont remember my beginning web dev days much. i started with html css and javascript, but i didnt make that much with them really. i made my own website which was only like 3 super basic pages. i didnt really care much for it, i didnt have the same drive that i had when i was making discord bots. websites just didnt capture me the same way

some time later, i made a website for a friends website. it was a website where you could draw on an html canvas with inside joke images. i still need to port it over to a modern website... but that was the first website i ever made with any sort of complexity. i remember really struggling to get it online, i had problems with CORS i think

side note, but speaking of troubles, around that time is when i was trying to host with google cloud. i really hated it. im sure i will have to learn AWS or google cloud or something else eventually, and it probably wont be too bad now that im generally more experienced. but back then it seemed unbelievably overkill (because, for a small website, it was). eventually i switched to digitalocean and ive stuck with them since, i really love them in comparison. i find the developer experience of just having a linux container so much simpler. its *just* linux. and their tutorials are top notch. i :::first learned how to use linux:::i mean, i had experimented with ubuntu in a virtual machine, but never for more than a few minutes at a time. if you dont have any problem to solve and are just messing around, its hard to really learn, at least for me::: on a digitalocean droplet, getting one of my earlier websites hosted. in fact, i think that website was my first react website. 

#### the reactening

apparently, after making 1/3rd of a website using html, css, and js, i figured i was ready to move on to a framework. and react was the most popular one, so thats what i went with. this react app was also incredibly basic, and it was online for about 2 years, up until i replaced it with masonlaneous. it was just the sample create-react-app home page with a couple lines of text changed, although i did also have a tictactoe page (with websocket-based multiplayer) on that website. but thats about it. and then i just let it sit for years because i really was not interested in react

i DID still experiment with react over the past couple years privately. random projects that i would leave half-finished and never show anybody. i cant even remember most of them, honestly. i had a react rewrite of the previously mentioned html canvas drawing page about 80% finished, then i gave up on it. i tested out rendering user-controlled shapes in html canvas, planning to maybe turn it into some kind of game, but i also gave up on that. for the past couple years, most of the programming ive done has been abandoned early on

#### home server

that is, until i built my home server earlier this year. that gave me problems to solve, and i solved some of them with code. my automated backups are currently handled by a script i wrote in typescript that automatically runs rsync. i think ill do a writeup about that eventually. the home server is also the catalyst for bringing back masonbot, for showing server status within discord. i also self-host my own custom new tab page on my home server. i call it the mason panel. i originally planned for it to have more functionality, but right now its just a bunch of quick links. but i think theres still a good chance that i update it to have more functionality in the future

anyway, the home server did get me to come back to programming a bit, though nothing really public facing (besides the discord bot, if that counts) and not much frontend work (the new tab page was pretty simple). i wasnt really a web dev, just a guy who knew typescript and could throw together a simple website if necessary

#### vue saves the day

but then i decided to give vue a try. i had heard so many people praise its developer experience compared to react. and recently, i had started to think that maybe the reason why i didnt like making websites was just because i didnt like react. so i decided to give it a shot! 

i actually gave sveltekit and angular a try too, but evidently i didnt click with them much considering the fact that i forgot i ever tried them until checking my projects folder just now

anyway, i took the first course on vue mastery, before eventually just diving in on my own project. i dont remember which project i did first, it might have been this very website or it might have been the html-canvas based game. or maybe it was neither, maybe it was some other random short-lived test project. but either way, i was definitely enjoying it more than any other framework i had used. instantly i fell in love with the single-file component (SFC) approach. having the layout, style, and logic all be self contained is so smart. in react, the style is separate, and you have to use css modules instead of regular css otherwise all your css mushes together and overlaps, and css modules are just kinda weird to use. its quite possible i was just dumb, but the point is it didnt really gel with me. with vue, however, it really feels like they took the simplicity of html + css + js, and then smoothed out the edges and modernized it. its so much easier to reason about how a component or page works in vue

i still havent gotten too far into the advanced features of vue, like going deeper with directives for example. ive kept it pretty simple so far, because i havent needed anything more complex. but im actually excited to get into more advanced topics, whereas with react i kinda dreaded it. every time i had to work with useRef() or useMemo() it felt like my brain was turning into mush. vue fits like a glove - it really feels like its empowering me to create, rather than being an obstacle i have to fight with in order to accomplish my goals.

i still have plenty of learning to do, but im *excited* to learn now. i feel reborn! 

#### making this blog with nuxt

pretty soon after starting with vue, i decided to set out and make a blog. i had the idea of writing markdown posts and having the website automatically read those files and turn them into webpages. and then i found out about @nuxt/content, which is exactly what i was looking for! although it wasnt regular vue, it was nuxt. after being traumatized by react, i figured adding another layer of complexity would make everything horrible and i would give up and start crying. but actually, nuxt hasnt been too bad at all! ive been working on the blog for... idk, a month? and i feel like i have a decent grasp on nuxt now, enough to get stuff done at least. once again, i have some learning to do, regarding ssr and ssg and stuff. i am somewhat familiar with the concepts, but this is my first time applying them

i thought i was the type of person who wants as much control and as little abstraction as possible. that is not entirely untrue, but i find that the "nuxt" way of doing things doesnt feel restrictive. file based routing works nicely (in my react website, i basically wrote my own file-based routing, which wasnt very fun), the "layouts" feature is cool. global imports are awesome, its not something i consciously notice usually, but its definitely a big improvement to my developer experience. just being able to use anything anywhere and not having to import it (for the most part, i do still have to import nuxt types to use them in my typescript, but thats fine)

nuxt content in particular has been pretty good too. trying to implement my tooltip system was definitely a headache, but now that ive gotten them sorted i can say that it was *mostly* the fault of my lack of knowledge. if i had to do it again, i could, and it wouldnt be too bad i dont think. although i will say the nuxt documentation for 'content:file:beforeParse' and such didnt explain things super well. i really appreciate something being modular and easily extensible, and while nuxt content IS extensible, i wouldnt necessarily call my experience "easy". but again, im the kind of guy who learns as i go. if youre the type of person who learns by actually studying documentation and ensuring you have a thorough understanding of a technology before trying to do complex stuff with it, then you probably wont run into the same problem. and the fact that that was the only major roadblock i ran into is pretty awesome. ALSO, it wasnt enough for me to giveup. if i ran into a roadblock like that in react, i probably would have just abandoned the entire project, lol

but now i dont feel like giving up on web dev anymore! i feel like ive finally found the passion that ive been looking for, and have regained the desire to code that i mostly lost after i took masonbot offline. so, thanks vue!

#### conclusion

that's about all for this blog post i think. it uh... ended up being longer than i expected it to be. but thats okay! i spent basically all day on this, since ive also been tweaking a bunch of actual code throughout the process of writing. but i think now im about to push my first post-launch update to the website. thanks for reading!