var DOMElements = {
    form: document.querySelector('form'),
    userName: document.getElementById('userName'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    errorMessage: document.getElementById('errorMessage'),
}

/**
 * 
 * That array to store the users
 */
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
 * - Catch values from inputs
 * - Check if this data is exist or not
 * - Check if these data is valid or not
 * - Appear message of user each case above
 */
function getValues() {
    if (Validation(DOMElements.userName) && Validation(DOMElements.email) && Validation(DOMElements.password)) {
        var usersListObj = {
            userName: DOMElements.userName.value,
            email: DOMElements.email.value,
            password: DOMElements.password.value
        };
        usersList.push(usersListObj);
        localStorage.setItem('users', JSON.stringify(usersList));
        DOMElements.errorMessage.innerText = 'Success All Inputs Is Valid';
        DOMElements.errorMessage.classList.replace('d-none', 'd-block');
        DOMElements.errorMessage.classList.replace('text-danger', 'text-success');
    } else {
        DOMElements.errorMessage.classList.replace('text-success', 'text-danger');
        DOMElements.errorMessage.innerText = 'Your name or email or password is not a valid...!';
        DOMElements.errorMessage.classList.replace('d-none', 'd-block');
    }
}

/**
 * 
 * Sign up ( Create New User )
 */
function signUp() {
    DOMElements.form.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    if (isInputsEmpty()) { } else {
        if (localStorage.getItem('users')) {
            if (isDataExist()) {
                DOMElements.errorMessage.innerText = 'The Email Really Exist...!';
                DOMElements.errorMessage.classList.replace('d-none', 'd-block');
                DOMElements.errorMessage.classList.replace('text-success', 'text-danger');
            } else {
                getValues();
            }
        } else {
            getValues();
        }
    }
    clear();
}

/**
 * 
 * Check these inputs empty or not
 * @returns {true || false}
 */
function isInputsEmpty() {
    if (DOMElements.userName.value !== '' || DOMElements.email.value !== '' || DOMElements.password.value !== '') {
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
 * 
 * All this faire when user enter data
 */
(function () {
    DOMElements.userName.addEventListener('input', function (e) {
        Validation(e.target);
    });
    DOMElements.email.addEventListener('input', function (e) {
        Validation(e.target);
    });
    DOMElements.password.addEventListener('input', function (e) {
        Validation(e.target);
    });
})();

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
 * Clear data from inputs after the user is ended entering.
 */
function clear() {
    DOMElements.userName.value = '';
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