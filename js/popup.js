$(function() {
    console.log("popup:open");
    try {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: "popup_open"}, function(response) {
                if(response.status == "ON") {
                    $("#status").text(response.status);
                    $("#collectInfo").show();
                    $("#collectComments").show();
                }
            });
        });
    } catch(err) {
        console.log(err);
    }

    const backendRoot = "http://127.0.0.1:8000/"
    $("#collectInfo").on("click", function() {
        chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
            if(tabs[0].url.match(/articles/)){
                chrome.tabs.sendMessage(tabs[0].id,
                    {action: ["getCompanyName"]},
                    (response) => {
                    var companyName = response.CompanyName;
                    $("#companyName").text(companyName);

                    var APIbase = "https://ja.wikipedia.org/w/api.php"
                    var APIparam = "?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&titles="
                    $.ajax(
                        {
                            method: 'GET',
                            url: APIbase + APIparam + companyName,
                        }
                    ).done((json)=>{
                        extract = Object.values(json.query.pages)[0].extract;
                        if(extract !== undefined) {
                            $("#companyDetail").text(extract);
                        }else{
                            $("#companyDetail").text("取得に失敗しました。");
                        };
                    }).fail(()=>{
                        console.log("fail");
                    });

                });
            }else{
                $("#companyName").text("This page is not suitable");
            }
        });
    });

    $("#collectComments").on("click", function() {
        chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
            console.log(tabs[0].url);
            $.ajax(
                {
                    url: backendRoot+"collect-comments/",
                    type: "POST",
                    data: {
                        "url": tabs[0].url
                    }
                }
            ).done((json)=>{
                var comments = "";
                json.data.forEach((info)=>{
                    comments += info.comment + "<br>";
                    comments += "Good:" + info.good+", Bad:" + info.bad + "<br> <hr>";
                });
                $("#comments").html(comments);
            }).fail(()=>{
                $("#comments").text("failed. try again.");
            });
        });
    });
});
