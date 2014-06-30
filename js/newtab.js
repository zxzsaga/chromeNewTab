$(document).ready(function() {
    chrome.bookmarks.getTree(function(arr, result) {
        console.log(JSON.stringify(arr, null, '  '));
    });
});
