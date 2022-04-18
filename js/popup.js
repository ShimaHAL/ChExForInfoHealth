$(function() {
    $("#collectInfo").on("click", function() {
        chrome.storage.sync.get(['CompanyName'], function(result) {
            var companyName = result.CompanyName;
            $("#companyName").text(companyName);
            var APIurl = "https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&rvprop=content&titles="
            $.ajax(
                {
                    method: 'GET',
                    url: APIurl + companyName,
                }
            ).done((json)=>{
                console.log(json);
                $("#companyDetail").text(json);
            }).fail(()=>{
                console.log("fail");
            });
        });
    });
});
