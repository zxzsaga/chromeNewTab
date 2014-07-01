$(document).ready(function() {
    chrome.bookmarks.getTree(function(bookmarkTree, result) {
        var simpleBookmarkTree = {};
        bookmarkTree.forEach(function(oneOfSon) {
            addSon(simpleBookmarkTree, oneOfSon);
        });
        console.log(simpleBookmarkTree);
    });
});

function addSon(father, son) {
    if (son.hasOwnProperty('children')) {
        father[son.title] = {};
        son.children.forEach(function(oneOfSon) {
            addSon(father[son.title], oneOfSon);
        });
    }
    else {
        father[son.title] = son.url;
    }
}

function appendSubMenu() {

}
