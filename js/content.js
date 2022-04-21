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
            var commentURL = "https://news.yahoo.co.jp/comment/plugin/v1/full/?&sort=lost_points&order=desc&page=1&type=1"
            commentURL+="&full_page_url="+$(".news-comment-plugin").data("full-page-url");
            commentURL += "&topic_id="+$(".news-comment-plugin").data("topic-id");
            commentURL += "&space_id="+$(".news-comment-plugin").data("space-id");
            console.log(commentURL);
            response["commentURL"] = commentURL;
        }

        sendResponse(response);
    });

});
