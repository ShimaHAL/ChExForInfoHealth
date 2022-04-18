$(function() {
    var CompanyName;

    $("img").each(function() {
        if($(this).attr("src").indexOf("cobranding")!=-1) {
            CompanyName = $(this).attr("alt");
            console.log("CompanyName: " + CompanyName);
            chrome.storage.sync.set({'CompanyName': CompanyName}, ()=>{});
        }
    });
});
