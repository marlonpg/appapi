window.onload = function() {
    //initMenu();
    //navigateToSearch();
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

function search(){
    console.log('search');
    getSearchProducts();

}

