var DOMElements = {
    form: document.querySelector('form'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    errorMessage: document.getElementById('errorMessage'),
};

var usersList = [];

/**
 * 
 * Fire function to check if local storage have it data
 */
(function () {
    if (localStorage.getItem('users')) {
        usersList = JSON.parse(localStorage.getItem('users'));
    }
})();

/**
 * 
 * Check these inputs empty or not
 * @returns {true || false}
 */
function isInputsEmpty() {
    if (DOMElements.email.value !== '' || DOMElements.password.value !== '') {
        DOMElements.errorMessage.classList.replace('d-block', 'd-none');
        return false;
    } else {
        DOMElements.errorMessage.innerText = 'All Inputs Is Required...!';
        DOMElements.errorMessage.classList.replace('d-none', 'd-block');
        DOMElements.errorMessage.classList.replace('text-success', 'text-danger');
        return true;
    }
}

/**
 * Check and return true if data is not exist - false if data is exist
 * @returns {true || false}
 */
function isDataExist() {
    for (var i = 0; i < usersList.length; i++) {
        if (DOMElements.email.value === usersList[i].email) {
            return true;
        }
    }
    return false;
}

/**
 * 
 * Check data it is valid or not
 * @param {*} input
 */
function Validation(input) {
    var userValidationObj = {
        userName: /^([A-Z][a-z]*)\s?[aA-zZ]+?\s?[aA-zZ]+?$/,
        email: /^[aA-zZ0-9]+[@]((gmail)||(facebook))(.com)$/,
        password: /^([0-9]?[\W]?[a-zA-Z]?).{5,10}$/,
    }
    if (userValidationObj[input.id].test(input.value)) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
    else {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        return false;
    }
}

/**
 * 
 * All this faire when user enter data
 */
(function () {
    DOMElements.email.addEventListener('input', function (e) {
        Validation(e.target);
    });
    DOMElements.password.addEventListener('input', function (e) {
        Validation(e.target);
    });
})();

/**
 * 
 * @returns
 */
function login() {
    DOMElements.form.addEventListener('submit', function (e) {
        e.preventDefault();
    });
    if (isInputsEmpty()) {
        return;
    } else {
        if (localStorage.getItem('users')) {
            if (Validation(DOMElements.email) && Validation(DOMElements.password)) {
                for (var i = 0; i < usersList.length; i++) {
                    if (DOMElements.email.value == usersList[i].email && DOMElements.password.value == usersList[i].password) {
                        localStorage.setItem('userActive', JSON.stringify(usersList[i].userName));
                        window.location.replace('../Pages/home.html');
                        //window.location.href = '../home.html';
                        //window.open('../Pages/home.html', '_self');
                        return;
                    } else {
                        DOMElements.errorMessage.classList.replace('text-success', 'text-danger');
                        DOMElements.errorMessage.innerText = 'Your name or email or password is not a valid...!';
                        DOMElements.errorMessage.classList.replace('d-none', 'd-block');
                    }
                }
            } else {
                return;
            }
        } else {
            DOMElements.errorMessage.classList.replace('text-success', 'text-danger');
            DOMElements.errorMessage.innerText = 'Your email is not exist please sign up first...!';
            DOMElements.errorMessage.classList.replace('d-none', 'd-block');
        }
    }
    clear();
}

/**
 * 
 * Clear data from inputs after the user is ended entering.
 */
function clear() {
    DOMElements.email.value = '';
    DOMElements.password.value = '';
}

/**
 * 
 * The tooltip fairing user hovering on inputs, it describe of user how him entered data.
 */
(function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
})();
