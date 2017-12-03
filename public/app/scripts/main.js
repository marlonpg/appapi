/*window.onload = function() {
    //initMenu();
    //navigateToSearch();
    //login();
    initLogin();
};

function initLogin(){
    console.log("initLogin");
    document.getElementById('main-content').setAttribute("w3-include-html", "login.html");
	w3.includeHTML();
}

function initSignup(){
    console.log("initSignup");
    document.getElementById('main-content').setAttribute("w3-include-html", "signup.html");
	w3.includeHTML();
}

function initUserInfo(){
    console.log("initUserInfo");
    document.getElementById('userLogin').setAttribute("w3-include-html", "user-info.html");
	w3.includeHTML();
}

function initMenu(){
    console.log("initMenu");
    document.getElementById('leftnav').setAttribute("w3-include-html", "menu.html");
	w3.includeHTML();
}

function initTimeLine(){
    console.log('initTimeLine');
    getProductsPaginated();
}

function navigateToSearch(){
    console.log("navigateToSearch");
    document.getElementById('main-content').setAttribute("w3-include-html", "search.html");
	w3.includeHTML();
}

function navigateToContactUs(){
    console.log("navigateToContactUs");
    document.getElementById('main-content').setAttribute("w3-include-html", "contactus.html");
	w3.includeHTML();
}

function navigateToTimeLine(){
    console.log("navigateToTimeLine");
    document.getElementById('main-content').setAttribute("w3-include-html", "timeline.html");
    w3.includeHTML();
    waitFinishRender("#timelineResult").then(function(){
        initTimeLine();
        initTimeLine();
        initTimeLine();
    });
}
//Promise to wait until div is rendered
var waitFinishRender = function(id) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
          if($(id).length > 0){
            resolve();
          }
        }, 100);
    });
  };
  


function navigateToProductRegister(){
    console.log("navigateToProductRegister");
    document.getElementById('main-content').setAttribute("w3-include-html", "product-register.html");
    w3.includeHTML();
    w3.includeHTML(myCallback);
    
    function myCallback() {
        $('input[type=date]').datepicker({
            dateFormat: 'yy-mm-dd'
        }); 
    }
}

function search(){
    console.log('search');
    getSearchProducts();
}

//timeline
$(window).scroll(function() {
    if(document.getElementById("timelineResult")){
        if($(window).scrollTop() + $(window).height() > $(document).height() - 10) {
            getProductsPaginated();
        }
    }
});
*/
//google-maps
/*function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(-30.016399, -51.161117),
        zoom: 100,
        mapTypeId: google.maps.MapTypeId.HYBRID
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBu-916DdpKAjTmJNIgngS6HL_kDIKU0aU&callback=myMap"></script>
*/
