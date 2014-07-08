$(document).ready(function() {
    chrome.bookmarks.getTree(function(bookmarkTree, result) {
        var simpleBookmarkTree = {};
        bookmarkTree.forEach(function(oneOfSon) {
            addSon(simpleBookmarkTree, oneOfSon);
        });
        simpleBookmarkTree = JSON.parse(JSON.stringify(simpleBookmarkTree, null, '  '));
        appendSubMenu(simpleBookmarkTree[''], true);
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

function appendSubMenu(father, isLv1, fatherName) {
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

            var panelBody = appendSubMenu(father[son], false, son);
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

                var panelBody = appendSubMenu(father[son], false, son);
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
