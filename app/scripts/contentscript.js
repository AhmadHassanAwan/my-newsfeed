var blockWhat = [];
console.log("my-newsfeed");

$(document).ready(function(){

    var selector = {
        feedItem: "._4-u2",
        video: "video",
        sponsored: "._3e_2._m8c",
        image: "._4-eo",
        multiImage: "._2a2q",
        link: "._6l-.__c_",
        done: "done"
    };

    var doJob = function() {
        var vid = ($.inArray("MNVideos", blockWhat) == -1 )? 0:1;
        var img = ($.inArray("MNImage", blockWhat) == -1 )? 0:1;
        var alb = ($.inArray("MNAlbum", blockWhat) == -1 )? 0:1;
        var ads = ($.inArray("MNAds", blockWhat) == -1 )? 0:1;
        var lnk = ($.inArray("MNLink", blockWhat) == -1 )? 0:1;
        var feedSelector = selector.feedItem + ":not(." + selector.done + ")";
        $(feedSelector).each(function () {
            debugger
            if (!($(this).hasClass(selector.done))) {
                $(this).addClass(selector.done);
            }
            else return;

            if (vid && ($(this).find(selector.video).length > 0)) {
                $(this).addClass(selector.done);
                $(this).html("");
            }
            if (ads && ($(this).find(selector.sponsored).length > 0)) {
                $(this).addClass(selector.done);
                $(this).html("");
            }
            if (img && ($(this).find(selector.image).length > 0)) {
                $(this).addClass(selector.done);
                $(this).html("");
            }
            if (alb && ($(this).find(selector.multiImage).length > 0)) {
                $(this).addClass(selector.done);
                $(this).html("");
            }
            if (lnk && ($(this).find(selector.link).length > 0)) {
                $(this).addClass(selector.done);
                $(this).html("");
            }
        });
    }






    chrome.runtime.sendMessage({method: "readMemory"}, function(response) {
        for(var key in response){
            if (response[key] == "checked")
                blockWhat.push(key);
        }
        setTimeout(function(){
            doJob();
        },4000);
        $(window).scroll(function(){
            doJob();
        });
    });
});