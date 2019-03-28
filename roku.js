browser.contextMenus.create({
  id: "pushToRokuLink",
  title: "Push to Roku",
  contexts: ["link"]
});


function onResponse(response) {
  console.log("Received " + response);
  browser.tabs.executeScript({
    file: "passive.js"
  });

}

function onError(error) {
  console.log(`Error: `, error);
  browser.tabs.executeScript({
    file: "passive.js"
  });
}

browser.contextMenus.onClicked.addListener(function(info, tab) {
  if (info && info.menuItemId === 'pushToRokuLink') {
    console.log("Push website to roku", info.linkUrl);

    browser.tabs.executeScript({
      file: "active.js"
    });

    var sending = browser.runtime.sendNativeMessage("firefox_roku_native",
      info.linkUrl);
    sending.then(onResponse, onError);
  }
});
