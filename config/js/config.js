// I'm not a professional, sh!t is probably incredibly inefficient.
// Please make my code better xqcL

window.Twitch.ext.configuration.onChanged(() => {
    var global = window.Twitch.ext.configuration.global;
    var broadcaster = window.Twitch.ext.configuration.broadcaster;
    if (!broadcaster) {
        let x = JSON.parse(global.content);
        document.getElementById("accentcolor").value = x.style.accentColor;
        document.getElementById("backgroundcolor").value = x.style.backgroundColor;
        document.getElementById("headerfontcolor").value = x.style.headerFontColor;
        document.getElementById("fontcolor").value = x.style.fontColor;
        document.getElementById("toggletwitchemotes").checked = x.settings.showTwitch;
        document.getElementById("togglebttvemotes").checked = x.settings.showBTTV;
        document.getElementById("toggleffzemotes").checked = x.settings.showFFZ;
        document.getElementById("toggleseventvemotes").checked = x.settings.showSevenTV;
    } else {
        let x = JSON.parse(broadcaster.content);
        document.getElementById("accentcolor").value = x.style.accentColor;
        document.getElementById("backgroundcolor").value = x.style.backgroundColor;
        document.getElementById("headerfontcolor").value = x.style.headerFontColor;
        document.getElementById("fontcolor").value = x.style.fontColor;
        document.getElementById("toggletwitchemotes").checked = x.settings.showTwitch;
        document.getElementById("togglebttvemotes").checked = x.settings.showBTTV;
        document.getElementById("toggleffzemotes").checked = x.settings.showFFZ;
        document.getElementById("toggleseventvemotes").checked = x.settings.showSevenTV;
    }
})

document.getElementById("submit").addEventListener("click", () => {
    let data = {
        style: {
            accentColor: document.getElementById("accentcolor").value,
            backgroundColor: document.getElementById("backgroundcolor").value,
            headerFontColor: document.getElementById("headerfontcolor").value,
            fontColor: document.getElementById("fontcolor").value
        },
        settings: {
            showTwitch: document.getElementById("toggletwitchemotes").checked,
            showBTTV: document.getElementById("togglebttvemotes").checked,
            showFFZ: document.getElementById("toggleffzemotes").checked,
            showSevenTV: document.getElementById("toggleseventvemotes").checked
        }
    };
    window.Twitch.ext.configuration.set("broadcaster", "1", JSON.stringify(data));
})