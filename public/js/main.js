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


function getProducts() {
    $.get( "http://appapi-gambasoftware.rhcloud.com/products",  )
    .done(function( data ) {
      alert( "Data Loaded: " + data );
    }).fail(function() {
        alert( "error" );
    });
}
function getProducts2() {
$.ajax({
    type: "GET",
    url: "http://appapi-gambasoftware.rhcloud.com/products",
    data: data,
    headers: {
        'Pragma':'no-cache',
        'Cache-Control':'no-cache'
    },
    complete: function(e, xhr, settings){
       if(e.status === 200){
            console.log(e.responseText);
       }else{
            console.log("error");
       }
   }
   });
}
/*
$.get( "/products", { name: "John", time: "2pm" } )
.done(function( data ) {
  alert( "Data Loaded: " + data );
}).fail(function() {
    alert( "error" );
});*/