console.log("background:loaded");

const backendRoot = "http://127.0.0.1:8000/"
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.action=="page_loaded"){
        data={url: request.url}
        //FIXME: Error
        fetch(backendRoot+"post_url/",
            {
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify(data)
            }
        ).then((response) => {
            console.log(response.json());
        });
    }
    return true;
});
