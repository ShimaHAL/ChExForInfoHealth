$(function() {
   // console.log('content:loaded');
    chrome.runtime.sendMessage(
        {
            action: "page_loaded",
            url: location.href
        }
    );

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action == "popup_open") {
            sendResponse({"status": "ON"});
        }else{
            return true;
        }
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
        response={}
        if(request.action.includes("getCompanyName")) {
            $("img").each(function() {
                if($(this).attr("src").match(/cobranding/)) {
                    var CompanyName = $(this).attr("alt");
                    response["CompanyName"] = CompanyName;
                }
            });
        }
        sendResponse(response);
    });
});
