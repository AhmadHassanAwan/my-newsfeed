'use strict';
$(document).ready(function(){
    $("input[type=checkbox]").each(function(){
        $(this).attr("value", "unchecked");
    });

    chrome.runtime.sendMessage({method: "readMemory"}, function(response) {
        //if (response.MNAds == "checked") $("#MNAds").prop("checked", true);
        for(var key in response){
            if (response[key] == "checked")
                $("#"+key).prop("checked", true).attr("value", "checked");
        }
    });

    $("#MNOptions").on("change", ":checkbox", function(){
        if($(this).is(":checked")) {
            $(this).attr("value", "checked");
        }
        else{
            $(this).attr("value", "unchecked");
        }
    });


    var save_options = function() {
        console.log("saving");
        var obj = {
            MNVideos: $('#MNVideos').attr("value"),
            MNAds : $('#MNAds').attr("value"),
            MNImage : $('#MNImage').attr("value"),
            MNAlbum : $('#MNAlbum').attr("value"),
            MNLink : $('#MNLink').attr("value")
        }
        chrome.runtime.sendMessage({method: "saveOptions", data: obj}, function(response) {
            console.log("Response: " + response);
        });
    }
    $("#save").on("click", function(){
        save_options();
        window.close();
    });
});
