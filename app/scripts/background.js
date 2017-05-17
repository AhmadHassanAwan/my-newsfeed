'use strict';

var memory = {};
var readMemory = function(){
    var readMemoryDfd = $.Deferred();
    chrome.storage.sync.get(["MNVideos", "MNAds", "MNImage", "MNAlbum", "MNLink"], function(resp){
        memory = resp;
        readMemoryDfd.resolve();
    });
    return readMemoryDfd.promise();
};
readMemory().done(function(){
})


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.method == "saveOptions" && request.data){
            chrome.storage.sync.set({
                MNVideos: request.data.MNVideos,
                MNAds: request.data.MNAds,
                MNImage: request.data.MNImage,
                MNAlbum: request.data.MNAlbum,
                MNLink: request.data.MNLink
            }, function(response) {
                // Update status to let user know options were saved.
                readMemory();
                chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                    if (arrayOfTabs[0].url.indexOf("facebook") > -1)
                        chrome.tabs.reload(arrayOfTabs[0].id);
                });
                sendResponse({response: "done"});
            });
        }
        else if(request.method == "readMemory"){
            sendResponse(memory);
        }
    });