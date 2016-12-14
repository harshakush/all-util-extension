
function findAndReplace(searchText, searchNode) {
 
    var regex = typeof searchText === 'string' ?
                new RegExp(searchText, 'g') : searchText,
        childNodes = (searchNode || document.body).childNodes,
        cnLength = childNodes.length,
        excludes = 'html,head,style,title,link,meta,script,object,iframe';

    while (cnLength--) {
        var currentNode = childNodes[cnLength];
        if (currentNode.nodeType === 1 &&
            (excludes + ',').indexOf(currentNode.nodeName.toLowerCase() + ',') === -1) {
            arguments.callee(searchText,currentNode);
        }
        if (currentNode.nodeType !== 3 || !regex.test(currentNode.data)) {
            continue;
        }

        currentNode.hidden = true;      
    }
}

function findOneLevelDown(searchNode, substring)
{
    var childs = searchNode.childNodes;
    if (childs.length > 0)
    {
        for (var i = 0, l = childs.length; i < l; i++)
        {
            var innh = childs[i].innerHTML;
                           
            if (innh.indexOf(substring) > -1)
            {
                    childs[i].hidden = true;
            }          
       }

    }
}

function getKeyWords() {

    var xmlHttp = new XMLHttpRequest();
    var theUrl = "https://raw.githubusercontent.com/harshakush/ImageServer/master/keywords";
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);

    var keyjson = JSON.parse(xmlHttp.responseText);

    var keywords = keyjson.tags;
    return keywords;
}

function searchAndHide(childs, keywords)
{
    if (childs.length > 0) {
        for (var i = 0, l = childs.length; i < l; i++) {
            var innh = childs[i].innerHTML;
            for (var j = 0, lw = keywords.length; j < lw; j++) {
                var substring = keywords[j];
                if (innh.indexOf(substring) > -1) {
                    childs[i].hidden = true;
                    findOneLevelDown(childs[i], substring);
                }
            }

        }

    }
    else {
        alert("No content blocked, update blacklist");
    }

}

var keyWords = getKeyWords();

var images = document.getElementsByClassName('section-list-content');
var childs = images[0].childNodes;
searchAndHide(childs, keyWords);


images = document.getElementsByClassName('section top-stories-section section-toptop');
childs = images[0].childNodes[1].childNodes;
searchAndHide(childs, keyWords);

images = document.getElementsByClassName('nav-items');
childs = images[0].childNodes;
searchAndHide(childs, keyWords);

images = document.getElementsByClassName('rt-col');
childs = images[0].childNodes;
searchAndHide(childs, keyWords);

images = document.getElementsByClassName('gadget-wrapper gsid-EPG');
images.hidden = true;



