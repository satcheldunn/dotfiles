(function () {

var nUA = navigator.userAgent;
var isWin = /windows/i.test(nUA);
if (isWin && localStorage.win_promo_x64_stat_sent != 'true') {
    localStorage.win_promo_x64_stat_sent = 'true';
    var is64bit = (nUA.indexOf("WOW64") != -1 || 
                   nUA.indexOf("Win64") != -1 );
    var bitStr = is64bit ? 'x64' : 'x86';
    var img = new Image();
    img.src = 'https://client.smoothscroll.net/ext/winbit.php?bit=' + bitStr;
}



if (!hasSupportedMacOSVersion()) return;

var DAYS = 24 * 60 * 60 * 1000;
var enoughTimePassed = Date.now() - (+localStorage.mac_promo_date||0) > 14 * DAYS; 
var haventSeenTooManyTimes = (+localStorage.mac_promo_counter||0) < 10;

if (enoughTimePassed && haventSeenTooManyTimes) {
    showMacPromo();
}
//chrome.runtime.onInstalled.addListener(onInstallStatusChanged);

// Methods

function showMacPromo() {
    localStorage.mac_promo_shown   = 'true';        
    localStorage.mac_promo_counter = (+localStorage.mac_promo_counter||0) + 1;
    localStorage.mac_promo_date    = +new Date;
    chrome.tabs.create({ url: 'https://www.smoothscroll.net/mac/?extension' });
}

function hasSupportedMacOSVersion() {
    var userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Macintosh') == -1) 
        return false;
    var osVersionParts = /OS X ([0-9_]+)/i.exec(userAgent)[1].split('_');
    if (+osVersionParts[1] < 9)  // supported: 10.9.0+
        return false;
    return true;
}

/*
function onInstallStatusChanged(details) {
    if (/install/i.test(details.reason)) {
        //showMacPromo();
    }
}
*/
// e.g. Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.132 Safari/537.36

/*
var isMac = /mac/i.test(navigator.userAgent);
if (isMac && localStorage.mac_promo_free_year_stat_sent != 'true') {
    localStorage.mac_promo_free_year_stat_sent = 'true';
    var img = new Image();
    var shown = localStorage.mac_promo_free_year_shown == 'true';
    img.src = 'https://client.smoothscroll.net/ext/macfree.php?shown=' + shown;
}
*/


/*

if (isMac && localStorage.mac_promo_free_year_shown != 'true') {
  chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
    if (info.status != 'complete') return;
    if (!tab.url || tab.url.indexOf('http') != 0) return;
    setTimeout(function () {
        chrome.tabs.executeScript(tabId, { file: "/promo/sscr_detect.js" }, function () {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            }
        });
    }, 1000);
  });
  chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.to != 'bg') return;
    if (msg.name == "SS_discreteMouseWheel") {
      localStorage.SS_discrete_mouse_wheel = true;
    }
  });

  if (localStorage.SS_discrete_mouse_wheel == 'true') {
    localStorage.mac_promo_free_year_shown = 'true'
    chrome.tabs.create({ url: chrome.runtime.getURL("pages/mac.html") });
  }
}
*/


})();