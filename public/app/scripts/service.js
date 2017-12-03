function login(){
    //call service to do the authentication
    initMenu();
    //navigateToSearch();
    navigateToTimeLine();
    initUserInfo();
}

function logoutUser(){
    //call service to terminate session
    window.location="http://localhost:8080/logout";
}

function getProductsPaginated() {
    console.log('getProductsPaginated');
    $.get( "http://localhost:8080/products", {offset: 1, limit:5} )
    .done(function(data) {
        console.log(data);
        populateTimeLine(data);
    }).fail(function() {
        alert( "Internal server error!" );
    });
}

function populateTimeLine(data){
    console.log('populateTimeLine');
    var list = $('#timelineResult');
    var items = jsonToMediaObject(data);
    list.append( items.join('') );
}

function getSearchProducts() {
    console.log('getSearchProducts');
    $.get( "http://localhost:8080/products", {filter: ($('#search').val() !== undefined ? $('#search').val() : '')} )
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
    var items = jsonToMediaObject(data);
    list.empty();
    list.append( items.join('') );
}

function jsonToMediaObject(data){
    console.log('jsonToMediaObject');
    var items = [];
    $.each(data, function(i, item) {
        items.push('<li><div class="media"><div class="media-left"><a href="#"><div class="img media-object" style="background-image:url(\img' + item.imgurl+ '\);"></div></a></div>');
        items.push('<div class="media-body"><h4 class="media-heading onhover">' + item.name + '</h4>' + item.description + '</div></div></li>');
    });
    return items;
}

function createNewProduct() {
    console.log('createNewProduct');
    $.ajax({
        url:'http://localhost:8080/product',
        method: 'POST',
        contentType: false,
        processData: false,
        data: new FormData($('#prodregister')[0]),
        success:function(){
            alert("New product created with Success!");
            //window.location="http://localhost:8080/";
        },
        error:function(){
            alert("Error to connect to server, please try again later!");
        },
    });
}