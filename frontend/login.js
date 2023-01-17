let labels = document.getElementsByClassName('Label');
let credentails = document.getElementById('credentials')
let userName =document.getElementById('userName');
let email = document.getElementById('email');
let pin = document.getElementById('pin');
let submit = document.getElementById('submit');
let userNameError =document.getElementById('username-error-msg');
let emailError = document.getElementById('email-error-msg');
let pinError = document.getElementById('pin-error-msg');

// Username Validation

userName.addEventListener('input' , () => {
    checkUserName(userName , 3 , 12);
})

const checkUserName = (field , min , max) => {
    let text = field.value.trim();
    // if user add space before and After Username
    field.value = text;
    // Validations
    if(text === ''){
        if(userNameError.classList.contains('success')){
            userNameError.classList.remove('success');
        }
        userNameError.classList.add('error');
        userNameError.innerText = "\u26CC Please Enter Username"
    }
    else if(/\d/g.test(text)){
        if(userNameError.classList.contains('success')){
            userNameError.classList.remove('success');
        }
        userNameError.classList.add('error');
        userNameError.innerText = "\u26CC Numbers are not Allowed"
    }
    else if(text.length > max){
        if(userNameError.classList.contains('success')){
            userNameError.classList.remove('success');
        }
        userNameError.classList.add('error');
        userNameError.innerText = "\u26CC Username must be less than 12 characters";
    }
    else if(text.length < min){
        if(userNameError.classList.contains('success')){
            userNameError.classList.remove('success');
        }
        userNameError.classList.add('error');
        userNameError.innerText = "\u26CC Username must be greater than 3 characters";
    }
    else{
        // Correct Attempt after Wrong Attempts
        if(userNameError.classList.contains('error')){
            userNameError.classList.remove('error');
        }
        userNameError.classList.add('success')
        userNameError.innerHTML = "\u2713 Username Available";
    }
}


// Email Validation

email.addEventListener('input' , () => {
    checkEmail(email);
})

const checkEmail = (field) => {
    let text = field.value.trim();
    // if user add space before and After Email
    field.value = text;
    let expression = /^[\w#][\w\.\’+#](.[\w\\’#]+)\@[a-z]+[a-z]+[a-z]+[a-z]+(.[a-z]+[a-z]+[a-z])*(.[a-zA-Z]{2,20})$/;

    // if email is empty
    if(text === ''){
        if(emailError.classList.contains('success')){
            emailError.classList.remove('success');
        }
        emailError.classList.add('error')
        emailError.innerText = "\u26CC Please Enter Email";
    }
    // if email is invalid
    else if(!expression.test(text)){
        // if my errorTag already contains success
        if(emailError.classList.contains('success')){
            emailError.classList.remove('success');
        }
        emailError.classList.add('error')
        emailError.innerText = "\u26CC Invalid Email";
    }
    else{
        // if my email is Valid
        emailError.classList.add('success')
        emailError.innerText = "\u2713 Valid Email";
    }
}


// Password Validation

pin.addEventListener('input' , () =>{
    checkPin(pin , 5 , 12);
})

const checkPin = (field , min) => {
    let text = field.value.trim();
    // if user add space before and After Pin
    field.value = text;
    if(text === ''){
        if(pinError.classList.contains('success')){
            pinError.classList.remove('success')
        }
        pinError.classList.add('error');
        pinError.innerText = "\u26CC Please Enter Your Pin"
    }
    else if(text.length < min){
        if(pinError.classList.contains('success')){
            pinError.classList.remove('success')
        }
        pinError.classList.add('error');
        pinError.innerText = `\u26CC Pin must be greater than ${min}`
    }
    else{
        if(pinError.classList.contains('error')){
            pinError.classList.remove('error');
        }
        pinError.classList.add('success');
        pinError.innerText = '\u2713 Valid Password'
    }
}

submit.addEventListener('click', e => {
    e.preventDefault();
    if(userName.value === '' || email.value === '' || pin === '') {
        return alert('Bad Request: Please enter valid data.');
    }

    if(userName.value === 'ayaz' && email.value === 'ayaz@gmail.com' && pin.value === '12345') {
        // success
        window.location.href = '/dashboard.html'
    } else {
        return alert('UnAuthoirized: User is unauthorized.')
    }

})


// Input Animation


Array.from(labels).forEach((label) => {
    let exactInput = label.nextElementSibling;
    exactInput.addEventListener('focus' , () => {
        label.classList.remove('lower');
        label.classList.add('upper');
    })

    exactInput.addEventListener('blur' , () => {
        if(exactInput.value == ''){
            label.classList.remove('upper')
            label.classList.add('lower')
        }
    })
})


