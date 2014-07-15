$(document).ready(init);

function init() {
    chrome.bookmarks.getTree(function(bookmarkTree, result) {
        var simpleBookmarkTree = {};
        bookmarkTree.forEach(function(oneOfSon) {
            simpleTreeAddSon(simpleBookmarkTree, oneOfSon);
        });
        simpleBookmarkTree = JSON.parse(JSON.stringify(simpleBookmarkTree, null, '  '));
        uiAppendSubMenu(simpleBookmarkTree[''], true);
    });

    initThumbnails();
    eventListener();
}

function simpleTreeAddSon(father, son) {
    if (son.hasOwnProperty('children')) {
        father[son.title] = {};
        son.children.forEach(function(oneOfSon) {
            simpleTreeAddSon(father[son.title], oneOfSon);
        });
    }
    else {
        father[son.title] = son.url;
    }
}

function uiAppendSubMenu(father, isLv1, fatherName) {
    var panelBodyContent = $('<div></div>')
        .addClass('panel-body');

    for (var son in father) {
        if (isLv1) { // lv1 always folder
            var a = $('<a></a>')
                .attr('data-toggle', 'collapse')
                .attr('data-parent', '#accordion')
                .attr('href', '#'+ son)
                .text(son);
            var panelTitle = $('<h4></h4>')
                .addClass('panel-title')
                .append(a);
            var panelHeading = $('<div></div>')
                .addClass('panel-heading')
                .append(panelTitle);

            var panelBody = uiAppendSubMenu(father[son], false, son);
            var panelBodyFather = $('<div></div>')
                .attr('id', son)
                .addClass('panel-collapse')
                .addClass('collapse')
                .append(panelBody);
            if (son === '书签栏') {
                panelBodyFather.addClass('in');
            }
            var panel = $('<div></div>')
                .addClass('panel')
                .addClass('panel-default')
                .append(panelHeading)
                .append(panelBodyFather);

            $('#accordion').append(panel);
        }
        else {
            if (typeof father[son] === 'string') {
                var a = $('<a></a>')
                    .text(son)
                    .attr('href', father[son])
                var br = $('<br />');
                panelBodyContent.append(a).append(br);
            }
            else if (typeof father[son] === 'object') {
                var a = $('<a></a>')
                    .attr('data-toggle', 'collapse')
                    .attr('data-parent', '#' + fatherName)
                    .attr('href', '#'+ son)
                    .text(son);
                var panelTitle = $('<h4></h4>')
                    .addClass('panel-title')
                    .append(a);
                var panelHeading = $('<div></div>')
                    .addClass('panel-heading')
                    .append(panelTitle);

                var panelBody = uiAppendSubMenu(father[son], false, son);
                var panelBodyFather = $('<div></div>')
                    .attr('id', son)
                    .addClass('panel-collapse')
                    .addClass('collapse')
                    .addClass('in')
                    .append(panelBody);

                var panel = $('<div></div>')
                    .addClass('panel')
                    .addClass('panel-default')
                    .append(panelHeading)
                    .append(panelBodyFather);

                panelBodyContent.append(panel);
            }
        }
    }
    return panelBodyContent;
}

/* initial the center thumbnails.
 */
function initThumbnails() {
    var thumbnailsRow = '';
    var thumbnailsCounter = 0;
    var thumbnailsLength = 0;
    for (site in siteTable) {
        thumbnailsLength ++;
    }
    for (site in siteTable) {
        if (thumbnailsCounter % 4 === 0) {
            $('#center-block').append(thumbnailsRow);
            thumbnailsRow = $('<div class="row"></div>');
        }
        var thumbnailImage = $('<img />')
            .attr({'src': 'img/thumbnail/' + site + '.png'})
            .css('width', '100%');
        var thumbnailName = $('<div></div>').css('text-align', 'center').text(site);
        var thumbnailA = $('<a class="thumbnail"></a>')
            .attr('href', 'http://' + siteTable[site])
            .append(thumbnailImage).append(thumbnailName);
        var thumbnailDiv = $('<div></div>').addClass('col-lg-3')
            .append(thumbnailA);
        thumbnailsRow.append(thumbnailDiv);
        if (thumbnailsCounter === thumbnailsLength - 1) {
            $('#center-block').append(thumbnailsRow);
        }
        thumbnailsCounter ++;
    }
};

function eventListener() {
    $('.thumbnail img').error(function() {
        this.src="img/thumbnail/logo_not_found.png";
    });
};

var siteTable = {
    "amazon": "amazon.cn",
    "baidu": "baidu.com",
    "bilibili": "bilibili.tv",
    "dev.sugarlady": "dev.sugarlady.com",
    "eleme": "ele.me",
    "exmail.qq": "exmail.qq.com",
    "google": "google.com.hk",
    "putao": "pt.sjtu.edu.cn",
    "renren": "renren.com",
    "review board": "reviews.sugarlady.com/dashboard/",
    "sae": "sae.sina.com.cn",
    "sina": "sina.com.cn",
    "sjtu bbs": "bbs.sjtu.edu.cn",
    "taobao": "taobao.com",
    "w3school": "w3school.com.cn",
    "weibo": "weibo.com",
    "youku": "i.youku.com"
};
