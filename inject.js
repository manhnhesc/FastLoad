const editorExtensionId = chrome.runtime.id;
var port = chrome.runtime.connect(editorExtensionId, { name: "TikTokConnect" });
const windowFetch = window.fetch;
window.fetch = async (...i) => {
    var [t] = i;
    var contentType;
    const windowFetchPromise = windowFetch(t);
    const windowFetchResult = await windowFetchPromise, cloneFetch = windowFetchResult.clone();
    try {
        await port.postMessage({ localstorage: "TikTokDownload" });
        port.onMessage.addListener(async (tiktokDownloadResponse) => {
            if (tiktokDownloadResponse.TikTokDownload) {
                if (windowFetchResult.ok && ((contentType = windowFetchResult.headers.get("Content-Type")) != null && contentType.includes("application/json"))) {
                    if (windowFetchResult.url.indexOf('https://www.tiktok.com/api/post/item_list') !== -1) {
                        const cloneFetchJson = await cloneFetch.json();
                        console.log("Data event sending")
                        const dispatchEvent = new CustomEvent('DataEvent', { detail: cloneFetchJson });
                        window.dispatchEvent(dispatchEvent)
                    } else {
                        console.log(windowFetchResult.url)
                    }
                } else
                    console.error("Response is not JSON or not ok:", windowFetchResult)
            }
        });
    } catch (s) {
        console.log(s)
    }
    return windowFetchPromise;
};