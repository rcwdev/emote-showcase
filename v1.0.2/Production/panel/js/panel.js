var firstrun=!0,authenticated=!1,configLoaded=!1,auth;function readyHandler(){if(authenticated&&configLoaded&&firstrun){let defaultConfig=window.Twitch.ext.configuration.global,broadcasterConfig=window.Twitch.ext.configuration.broadcaster;if(broadcasterConfig){let x=JSON.parse(broadcasterConfig.content);stylePanel(x),getExtensionData(auth),x.settings.showTwitch&&getChannelEmotes(auth),x.settings.showBTTV&&getBTTVEmotes(auth.channelId),x.settings.showFFZ&&getFFZEmotes(auth.channelId),x.settings.showSevenTV&&getSevenTVEmotes(auth.channelId),firstrun=!1}else{let x=JSON.parse(defaultConfig.content);stylePanel(x),getExtensionData(auth),x.settings.showTwitch&&getChannelEmotes(auth),x.settings.showBTTV&&getBTTVEmotes(auth.channelId),x.settings.showFFZ&&getFFZEmotes(auth.channelId),x.settings.showSevenTV&&getSevenTVEmotes(auth.channelId),firstrun=!1}}}function stylePanel(data){try{data.settings.showHeaderPFP||(document.getElementById("channelHeaderPFP").style.display="none",document.getElementById("channelInfo").style.justifyContent="center",document.getElementById("channelInfo").style.textAlign="center"),data.settings.showCustomHeaderText&&""!=data.settings.customHeaderText&&(document.getElementById("channelHeaderText").innerText=data.settings.customHeaderText.toString())}finally{document.documentElement.style.setProperty("--accent-color",data.style.accentColor),document.documentElement.style.setProperty("--background-color",data.style.backgroundColor),document.documentElement.style.setProperty("--font-color",data.style.fontColor),document.documentElement.style.setProperty("--header-font-color",data.style.headerFontColor)}}function getExtensionData(auth){fetch(`https://api.twitch.tv/helix/users?id=${auth.channelId}`,{method:"GET",headers:{"client-id":auth.clientId,Authorization:`Extension ${auth.helixToken}`}}).catch(err=>{console.error(err)}).then(res=>res.json()).then(body=>{document.getElementById("channelHeaderPFP").src=body.data[0].profile_image_url,document.getElementById("channelPFP").src=body.data[0].profile_image_url})}function getChannelEmotes(auth){document.getElementById("twitch").classList.remove("hidden"),fetch(`https://api.twitch.tv/helix/chat/emotes?broadcaster_id=${auth.channelId}`,{method:"GET",headers:{"client-id":auth.clientId,Authorization:`Extension ${auth.helixToken}`}}).catch(err=>{console.error(err);let x=document.createTextNode("Something went wrong.");document.getElementById("twitchEmotes").appendChild(x)}).then(res=>res.json()).then(body=>{if(0===body.data.length){let x=document.createTextNode("No emotes found.");document.getElementById("twitchEmotes").appendChild(x)}else try{body.data=body.data.sort((a,b)=>a.name.localeCompare(b.name)),body.data.forEach(emote=>{let x=document.createElement("img");switch(x.alt=emote.name,emote.format.includes("animated")?x.src=`https://static-cdn.jtvnw.net/emoticons/v2/${emote.id}/animated/dark/3.0`:x.src=emote.images.url_4x,document.getElementById("twitchEmotes").appendChild(x),emote.emote_type){case"follower":tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Follower Emote`,arrow:!0});break;case"subscriptions":switch(emote.tier){case"1000":tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 1 Sub Emote`,arrow:!0});break;case"2000":tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 2 Sub Emote`,arrow:!0});break;case"3000":tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Tier 3 Sub Emote`,arrow:!0})}break;case"bitstier":tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>Bits Reward Emote`,arrow:!0})}})}catch(err){let x=document.createTextNode("No emotes found.");document.getElementById("twitchEmotes").appendChild(x)}})}function getBTTVEmotes(id){document.getElementById("bttv").classList.remove("hidden"),fetch(`https://api.betterttv.net/3/cached/users/twitch/${id}`).catch(err=>{console.error(err);let x=document.createTextNode("Something went wrong.");document.getElementById("bttvEmotes").appendChild(x)}).then(res=>res.json()).then(body=>{if(body.channelEmotes||body.sharedEmotes){if(!body.channelEmotes)return;if(body.channelEmotes=body.channelEmotes.sort((a,b)=>a.code.localeCompare(b.code)),body.channelEmotes.forEach(emote=>{let x=document.createElement("img");x.alt=`${emote.code} `,x.src=`https://cdn.betterttv.net/emote/${emote.id}/3x`,document.getElementById("bttvEmotes").appendChild(x),tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>Channel Emote`,arrow:!0})}),!body.sharedEmotes)return;body.sharedEmotes=body.sharedEmotes.sort((a,b)=>a.code.localeCompare(b.code)),body.sharedEmotes.forEach(emote=>{let x=document.createElement("img");x.alt=`${emote.code} `,x.src=`https://cdn.betterttv.net/emote/${emote.id}/3x`,document.getElementById("bttvEmotes").appendChild(x),tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>Shared Emote<br>By: ${emote.user.displayName.toString()}`,arrow:!0})})}else{let x=document.createTextNode("No emotes found.");document.getElementById("bttvEmotes").appendChild(x)}})}function getFFZEmotes(id){document.getElementById("ffz").classList.remove("hidden"),fetch(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${id}`).catch(err=>{console.error(err);let x=document.createTextNode("Something went wrong.");document.getElementById("ffzEmotes").appendChild(x)}).then(res=>res.json()).then(body=>{if(0===body.length){let x=document.createTextNode("No emotes found.");document.getElementById("ffzEmotes").appendChild(x)}else try{(body=body.sort((a,b)=>a.code.localeCompare(b.code))).forEach(emote=>{let x=document.createElement("img");x.alt=`${emote.code} `,emote.images["4x"]?x.src=emote.images["4x"]:emote.images["2x"]?x.src=emote.images["2x"]:x.src=emote.images["1x"],document.getElementById("ffzEmotes").appendChild(x),tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.code.toString()}</b><br>By: ${emote.user.displayName.toString()}`,arrow:!0})})}catch(err){let x=document.createTextNode("No emotes found.");document.getElementById("ffzEmotes").appendChild(x)}})}function getSevenTVEmotes(id){document.getElementById("seventv").classList.remove("hidden"),fetch(`https://api.7tv.app/v2/users/${id}/emotes`).catch(err=>{console.error(err);let x=document.createTextNode("Something went wrong.");document.getElementById("seventvEmotes").appendChild(x)}).then(res=>res.json()).then(body=>{try{(body=body.sort((a,b)=>a.name.localeCompare(b.name))).forEach(emote=>{let x=document.createElement("img");x.alt=`${emote.name} `,x.src=emote.urls[3][1],document.getElementById("seventvEmotes").appendChild(x),tippy(x,{allowHTML:!0,content:`<img src=${x.src.toString()}><br><b>${emote.name.toString()}</b><br>By: ${emote.owner.display_name.toString()}`,arrow:!0})})}catch(err){let x=document.createTextNode("No emotes found.");document.getElementById("seventvEmotes").appendChild(x)}})}window.Twitch.ext.configuration.onChanged(()=>{configLoaded=!0,readyHandler()}),window.Twitch.ext.onAuthorized((function(data){authenticated=!0,auth=data,readyHandler()}));