var authenticated = false;
var auth;
var displayname;
var firstrun = true;

function readyHandler() {
    // Only run handler when authenticated and a configuration is loaded.
    if (authenticated && configLoaded) {
        // Twitch may update something, so we need to make sure it's the first run.
        if (firstrun) {
            // Set the default config and broadcaster config.
            let defaultConfig = window.Twitch.ext.configuration.global;
            let broadcasterConfig = window.Twitch.ext.configuration.broadcaster;

            // If the broadcaster config exists.
            if (broadcasterConfig) {
                let x = JSON.parse(broadcasterConfig.content);

                // Style the panel using the broadcaster config.
                stylePanel(x);
                getExtensionData(auth);

                // If the broadcaster wants to show Twitch Channel emotes, fetch them.
                if (x.settings.showTwitch) {
                    getChannelEmotes(auth);
                }

                // If the broadcaster wants to show BTTV emotes, fetch them.
                if (x.settings.showBTTV) {
                    getBTTVEmotes(auth.channelId);
                }

                // If the broadcaster wants to show FFZ emotes, fetch them.
                if (x.settings.showFFZ) {
                    getFFZEmotes(auth.channelId);
                }

                // If the broadcaster wants to show 7TV emotes, fetch them.
                if (x.settings.showSevenTV) {
                    getSevenTVEmotes(auth.channelId);
                }

                // It is no longer the first run, thus the handler will not run again.
                firstrun = false;
            
            // Otherwise, use the default config.
            } else {
                let x = JSON.parse(defaultConfig.content);

                // Style the panel using the default configuration.
                stylePanel(x);
                getExtensionData(auth);

                // Fetch any emotes the default config says to fetch.
                // (by default, will fetch all)
                if (x.settings.showTwitch) {
                    getChannelEmotes(auth);
                }

                if (x.settings.showBTTV) {
                    getBTTVEmotes(auth.channelId);
                }

                if (x.settings.showFFZ) {
                    getFFZEmotes(auth.channelId);
                }

                if (x.settings.showSevenTV) {
                    getSevenTVEmotes(auth.channelId);
                }

                // It is no longer the first run, thus the handler will not run again.
                firstrun = false;
            }
        }
    }
};

function getExtensionData(auth) {
    // GET the Twitch API for the details of the broadcaster channel
    fetch(`https://api.twitch.tv/helix/users?id=${auth.channelId}`, {
            method: "GET",
            headers: {
                "client-id": auth.clientId,
                "Authorization": `Extension ${auth.helixToken}`
            }
        })
        // if an error occurs, log it
        .catch(err => {
            console.error(err);
        })
        // convert to readable json string
        .then(res => res.json())
        .then(body => {
            // set the name and profile picture of broadcaster
            displayname = body.data[0].display_name;
            document.getElementById("channelHeaderPFP").src = body.data[0].profile_image_url;
            document.getElementById("channelPFP").src = body.data[0].profile_image_url;
        }
    )
};