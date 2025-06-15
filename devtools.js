chrome.devtools.network.onRequestFinished.addListener(processRequest, {
    urls: ["*://www.tiktok.com/api/post/item_list/*"],
    types: ["script", "xmlhttprequest"],
});

function processRequest(dict) {
    console.log(dict);
}