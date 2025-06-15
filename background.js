chrome.storage.local.set({ 'TikTokDownload': true }, function () {
    console.log('Backgroud settings saved');
});

chrome.webRequest.onCompleted.addListener(processRequest, {
    urls: ["*://www.tiktok.com/api/post/item_list/*"],
    types: ["script", "xmlhttprequest"],
});
function processRequest(dict) {
    console.log(dict);
}

// chrome.runtime.onMessageExternal.addListener(async function (request, sender, sendResponse) {
//     console.log(request)
//     var localStorage = await chrome.storage.local.get("TikTokDownload");
//     if (request.localstorage === "TikTokDownload")
//         sendResponse({ TikTokDownload: localStorage.TikTokDownload });
//     return true;
// });


chrome.runtime.onConnectExternal.addListener(port => {
    port.onMessage.addListener(async (request, port) => {
        console.log(request);
        console.log(port);
        var localStorage = await chrome.storage.local.get("TikTokDownload");
        if (request.localstorage === "TikTokDownload")
            await port.postMessage({ TikTokDownload: localStorage.TikTokDownload });
        return true;
    })
});