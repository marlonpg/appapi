window.onload = function() {
    initMenu();
	navigateToSearch();
};

function initMenu(){
    console.log("initMenu");
    document.getElementById('leftnav').setAttribute("w3-include-html", "menu.html");
	w3.includeHTML();
}
function navigateToSearch(){
    console.log("navigateToSearch");
    document.getElementById('main-content').setAttribute("w3-include-html", "search.html");
	w3.includeHTML();
}

function navigateToTimeLine(){
    console.log("navigateToTimeLine");
    document.getElementById('main-content').setAttribute("w3-include-html", "timeline.html");
    w3.includeHTML();
    initTimeLine();
}

function navigateToProductRegister(){
    console.log("navigateToProductRegister");
    document.getElementById('main-content').setAttribute("w3-include-html", "product-register.html");
	w3.includeHTML();
}

function initTimeLine(){
    var result = getProducts();
    var list = $('#timelineResult');
    populateList(list, result);
}

function search(){
    var result = getProducts();
    console.log(result);
    var list = $('#result');
    list.empty();
    populateList(list, result);
}

function getProducts() {
    var result = $.get( "http://appapi-gambasoftware.rhcloud.com/products", {filter: ($('#search').val() !== undefined ? $('#search').val() : '')} )
    .done(function( data ) {
        console.log(data);
        return data.responseJSON;
    }).fail(function() {
        alert( "Internal server error!" );
    });
    console.log("result =" + result);
    return result;
}

function populateList(list, data){
    var items = [];
    $.each(data, function(i, item) {
        items.push('<li><div class="img" style="background-image:url(\'img' + item.imgurl+ '\');"></div><div class="result-text"><a href="#" class="text-align">' + item.name + '</a><br><span class="text-align">' + item.description + '</span></div></li>');
    });
    list.append( items.join('') );
}
