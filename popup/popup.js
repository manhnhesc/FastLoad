const mySwitch = document.getElementById('switchCheckDefault');
mySwitch.addEventListener("click", function () {
    if (mySwitch.checked) {
        chrome.storage.local.set({ 'TikTokDownload': true }, function () {
            console.log('Settings saved');
        });
    }
    else {
        chrome.storage.local.set({ 'TikTokDownload': false }, function () {
            console.log('Settings saved');
        });
    }
})

var localStorage = chrome.storage.local.get("TikTokDownload");
if (localStorage != undefined)
    mySwitch.checked = localStorage.TikTokDownload;