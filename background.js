console.log("background.js");

chrome.storage.onChanged.addListener(()=>{
    chrome.storage.sync.get(['CompanyName'], function(result) {
        //これは動く
        console.log("CompanyName: " + result.CompanyName);
    })}
);
