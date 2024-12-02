var DOMElements = {
    divUserName: document.getElementById('divUserName'),
}

/**
 * 
 * That array to store the active user
 */
var userActiveList = [];

/**
 * 
 * Fire function to check if local storage have it data
 */
(function () {
    if (localStorage.getItem('userActive')) {
        userActiveList = JSON.parse(localStorage.getItem('userActive'))
        DOMElements.divUserName.innerHTML = userActiveList;
    } else {
        DOMElements.divUserName.innerHTML = 'Please go to login Page';
    }
})();

