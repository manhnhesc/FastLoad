// var scriptElement = document.createElement('script');
// scriptElement.src = chrome.runtime.getURL('inject.js');
// scriptElement.onload = function () { this.remove(); };
// (document.head || document.documentElement).appendChild(scriptElement);

//window.addEventListener('load', function () {
//console.log("Hello extension")
//var videoTable = document.querySelectorAll("[data-e2e='user-post-item']");

//for (let i = 0, element; (element = videoTable[i]); i++) {
//element.lastElementChild.lastElementChild.lastElementChild.href;
//console.log(element.lastElementChild.lastElementChild.lastElementChild.href)
//console.dir(element, { depth: true });
//}
//})

var listVideoIds = [];
window.addEventListener('DataEvent', (e) => {
    var data = e.detail;
    console.log('Content script');
    console.log('Received', data.itemList);
    data.itemList.forEach(element => {
        if (listVideoIds.filter(s => s == element.id)[0] == undefined) {
            if (element.video.playAddr && element.video.format != undefined) {
                downloadHandler(element.id, 0, element.video.playAddr, element.video.format);
                //     fetch(element.video.playAddr,
                //         {
                //             method: "GET",
                //             mode: "cors",
                //             cache: "no-cache",
                //             credentials: "include",
                //             redirect: "follow"
                //         })
                //         .then(response => {
                //             response.ok ? response.blob().then(o => {
                //                 let s = URL.createObjectURL(o);
                //                 const l = document.createElement("a");
                //                 l.setAttribute("download", element.id + '.' + element.video.format);
                //                 l.href = s;
                //                 l.dispatchEvent(new MouseEvent("click", {
                //                     bubbles: !0,
                //                     cancelable: !0,
                //                     view: window
                //                 }));
                //             }) : console.log(response)
                //         });
            }
            if (element.imagePost != undefined
                && element.imagePost != null
                && element.imagePost.images != undefined
                && element.imagePost.images != null
                && element.imagePost.images.length > 0) {
                element.imagePost.images.forEach((imageObject, index) => {
                    if (imageObject != undefined && imageObject != null) {
                        if (imageObject.imageURL != undefined
                            && imageObject.imageURL.urlList != undefined
                            && imageObject.imageURL.urlList.length > 0) {
                            var imageUrl = imageObject.imageURL.urlList.filter(x => x)[0];
                            if (imageUrl != undefined && imageUrl != null && imageUrl.length > 0) {
                                downloadHandler(element.id, index, imageUrl, 'jpeg');
                                // .then(response => {
                                //     response.ok ? response.blob().then(o => {
                                //         let s = URL.createObjectURL(o);
                                //         const l = document.createElement("a");
                                //         l.setAttribute("download", element.id + '_' + index + '.jpeg');
                                //         l.href = s;
                                //         l.dispatchEvent(new MouseEvent("click", {
                                //             bubbles: !0,
                                //             cancelable: !0,
                                //             view: window
                                //         }));
                                //     }) : console.log("Image download error ", response)
                                // })
                            }
                        }
                    }
                })


            }
            listVideoIds.push(element.id)
        }
    });
});

function downloadHandler(id, index, imageUrl, format) {
    var header = {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        redirect: "follow"
    };
    if (format == "mp4")
        header.credentials = "include";

    setTimeout(() => fetch(imageUrl, header)
        .then(response => {
            console.log(id + '_' + index + '.' + format)
            console.log(response.status)
            response.blob().then((blob) => {
                if (response.status == 200) {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.setAttribute("download", id + '_' + index + '.' + format);
                    a.href = url;
                    a.click();
                    a.remove();
                    console.log('Downloaded ', id + '_' + index + '.' + format)
                } else {
                    downloadHandler(id, index, imageUrl, format);
                }
            })
        }), getRandomInt(30000, 80000));
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}