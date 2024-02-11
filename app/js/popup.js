function openChat() {
  document.querySelector("body").textContent = "";
  document.querySelector("body").innerHTML = '<div class="element chatbot"><h1>WebSaathi</h1><hr><div id="outputText"><ul><li><b>User:</b> What is Dark Patter</li><li><b>WebSaathi:</b> Dark patterns are manipulative design choices intended to deceive users for the benefit of the business.</li></ul></div><input type="text" id="inputText" placeholder="Type something..."><button>Process</button></div>';
};
window.onload = function () {
  document.getElementsByClassName("analyze-button chatbot")[0].addEventListener("click", openChat);
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "popup_open" });
  });

  document.getElementsByClassName("analyze-button")[0].onclick = function () {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { message: "analyze_site" });
    });
  };

  document.getElementsByClassName("link")[0].onclick = function () {
    chrome.tabs.create({
      url: document.getElementsByClassName("link")[0].getAttribute("href"),
    });
  };
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "update_current_count") {
    document.getElementsByClassName("number")[0].textContent = request.count;
  }
});

