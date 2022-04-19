$(function() {
    //var CompanyName;

    //$("img").each(function() {
    //    if($(this).attr("src").indexOf("cobranding")!=-1) {
    //        CompanyName = $(this).attr("alt");
    //        console.log("CompanyName: " + CompanyName);
    //        chrome.storage.sync.set({'CompanyName': CompanyName}, ()=>{});
    //    }
    //});

    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
        response={}
        if(request.action.includes("getCompanyName")) {
            $("img").each(function() {
                if($(this).attr("src").indexOf("cobranding")!=-1) {
                    var CompanyName = $(this).attr("alt");
                    response["CompanyName"] = CompanyName;
                }
            });
        }
        if(request.action.includes("collectComments")) {
            console.log("collectComments");
            $(".comment").each(function() {
                console.log($(this).html());
            });
        }

        sendResponse(response);
    });

});
