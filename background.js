console.log("background:loaded");

const backendRoot = "http://127.0.0.1:8000/"
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.action=="page_loaded"){
        const formData = new FormData();
        formData.append('url', request.url);
        fetch(backendRoot+"post_url/", {
            method: "POST",
            body: formData}
        ).then((response) => {
            return response.json();
        }).then((json) => {
            console.log(json);
        });
    }
    return true;
});
