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
    console.log('initTimeLine');
    getProductsPaginated();
}

function getProductsPaginated() {
    console.log('getProductsPaginated');
    $.get( "http://appapi-gambasoftware.rhcloud.com/products", {offset: 1, limit:5} )
    .done(function(data) {
        console.log(data);
        populateSearchList(data);
    }).fail(function() {
        alert( "Internal server error!" );
    });
}

function populateTimeLine(data){
    console.log('populateTimeLine');
    var list = $('#timelineResult');
    var items = [];
    $.each(data, function(i, item) {
        items.push('<li><div class="img" style="background-image:url(\'img' + item.imgurl+ '\');"></div><div class="result-text"><a href="#" class="text-align">' + item.name + '</a><br><span class="text-align">' + item.description + '</span></div></li>');
    });
    list.append( items.join('') );
}

function search(){
    console.log('search');
    getSearchProducts();

}

function getSearchProducts() {
    console.log('getSearchProducts');
    $.get( "http://appapi-gambasoftware.rhcloud.com/products", {filter: ($('#search').val() !== undefined ? $('#search').val() : '')} )
    .done(function(data) {
        console.log(data);
        populateSearchList(data);
    }).fail(function() {
        alert( "Internal server error!" );
    });
}

function populateSearchList(data){
    console.log('populateSearchList');
    var list = $('#result');
    var items = [];
    $.each(data, function(i, item) {
        items.push('<li><div class="img" style="background-image:url(\'img' + item.imgurl+ '\');"></div><div class="result-text"><a href="#" class="text-align">' + item.name + '</a><br><span class="text-align">' + item.description + '</span></div></li>');
    });
    list.empty();
    list.append( items.join('') );
}
