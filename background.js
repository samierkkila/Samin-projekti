
var id = 100;
let img;
let element;
// Listen for a click on the camera icon. On that click, take a screenshot.
chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: `element = document.getElementById('overlay')
                if (element){
                element.parentNode.removeChild(element)
                }`});   
  });
  
  chrome.tabs.captureVisibleTab(function(screenshotUrl) {
    var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
    var targetId = null;
    

    chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
      // We are waiting for the tab we opened to finish loading.
      if (tabId != targetId || changedProps.status != "complete")
        return;

      // Passing the above test means this is the event we were waiting for.
      chrome.tabs.onUpdated.removeListener(listener);
    });
    var screenshot = {
      content : document.createElement("canvas"),
      data : ''
    }
    screenshot.data=screenshotUrl;
    var image = new Image();
    image.onload = function() {
      var canvas = screenshot.content;
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);
    };
    image.src = screenshot.data; 
        
    chrome.storage.local.set({'koekuva':image.src},function(){
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
          tabs[0].id,
            { file: './imageOverlay.js'});   
      });
    });
  });
});
