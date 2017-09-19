window.onload = function() {
    initMenu();
	initSearch()
};

function initMenu(){
    console.log("initMenu");
    document.getElementById('leftnav').setAttribute("w3-include-html", "menu.html");
	w3.includeHTML();
}
function initSearch(){
    console.log("initSearch");
    document.getElementById('main-content').setAttribute("w3-include-html", "search.html");
	w3.includeHTML();
}

function initTimeLine(){
    console.log("initTimeLine");
    document.getElementById('main-content').setAttribute("w3-include-html", "timeline.html");
	w3.includeHTML();
}

function initProductRegister(){
    console.log("initProductRegister");
    document.getElementById('main-content').setAttribute("w3-include-html", "product-register.html");
	w3.includeHTML();
}


function search(){
    var result = getProducts();
    console.log(result);
    $('#result').empty();
    populateList(result);
}

function getProducts() {
    $.get( "http://appapi-gambasoftware.rhcloud.com/products", {filter:$('#search').val()} )
    .done(function( data ) {
      return data;
    }).fail(function() {
        alert( "Internal server error!" );
    });
}

function populateList(data){
    var items = [];
    $.each(data, function(i, item) {
        items.push('<li><div class="img" style="background-image:url(\'img' + item.imgurl+ '\');"></div><div class="result-text"><a href="#" class="text-align">' + item.name + '</a><br><span class="text-align">' + item.description + '</span></div></li>');
    });
    $('#result').append( items.join('') );
}
