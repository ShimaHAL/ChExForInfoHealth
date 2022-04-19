$(function() {
    $("#collectInfo").on("click", function() {
        chrome.storage.sync.get(['CompanyName'], function(result) {
            var companyName = result.CompanyName;
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
                };
            }).fail(()=>{
                console.log("fail");
            });
        });
        chrome.tabs.query( {active:true, currentWindow:true}, function(tabs){
            console.log("url:"+tabs[0].url);
        });
    });


    function getCompanyInfo(companyName){
        var APIbase = "https://ja.wikipedia.org/w/api.php";
        var APIparam = "?action=query&prop=extracts&exintro&explaintext&redirects=1&format=json&titles=";
        $.ajax(
            {
                method: 'GET',
                url: APIbase + APIparam + companyName,
            }
        ).done((json)=>{
            var extract = Object.values(json.query.pages)[0].extract;
            console.log(extract);
            if(extract !== undefined) {
                return extract;
            };
        }).fail(()=>{
            console.log("fail");
        });
        return "error";
    };
});
