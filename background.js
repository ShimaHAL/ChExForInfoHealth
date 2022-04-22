console.log("background:loaded");

const backendRoot = "http://127.0.0.1:8000/"
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.action=="page_loaded"){
        fetch(backendRoot+"post_url/",
            {
                method: "POST",
                body: JSON.stringify({"url": request.url})
            }
        ).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
        });
    }
    return true;
});
