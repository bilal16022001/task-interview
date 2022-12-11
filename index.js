
document.querySelector(".register .form").onsubmit = function (e) {

    e.preventDefault();

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let ConfirmPassword = document.getElementById("ConfirmPassword").value;

    let emailTest = /\w+@\w+.\w+/ig;
    let passTest = /\w{8,}/ig;
    let ConfrimpassTest = /\w{8,}/ig;
    let nameTest = /^(?![0-9])[a-z0-9]{5,15}$/g;
    let validEmail = emailTest.test(email);
    let validPassword = passTest.test(password);
    let validConfirmPassword = ConfrimpassTest.test(ConfirmPassword);
    let validName = nameTest.test(username);
    let lastEl = username[username.length - 1];

    const data = {
        username: username,
        email: email,
        password: password,
        password_confirmation: ConfirmPassword

    };

    // POST request using fetch()
    fetch("https://goldblv.com/api/hiring/tasks/register", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(data),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json",
            'Accept': 'application/json'
        }
    })

        // Converting to JSON
        .then(response => response.json())

        // Displaying results to console
        .then(json => {
            if (json.email) {

                window.localStorage.setItem("email", json.email);
            }

            if (json.errors.username) {
                document.querySelector(".err_name").innerHTML = json.errors.username;
            }
            if (json.errors.email) {
                document.querySelector(".err_email").innerHTML = json.errors.email;
            }
            if (json.errors.password) {
                document.querySelectorAll(".err_password").forEach(el => {
                    el.innerHTML = innerHTML = json.errors.password;
                });
            }






        });


    //cehck
    setTimeout(() => {
        if (validName == true && isNaN(lastEl) == true & validEmail == true && validPassword == true && validConfirmPassword == true && ConfirmPassword == password) {

            if (window.localStorage.getItem("email") != null) {
                window.location = "succLogin.html";
            }


        } else {

            if (validName == false) {
                document.querySelector(".err_name").innerHTML = `* you should use 5 to 15 characters and letters and numbers <br/> * no numbers at the beginning or the end `;
            }
            if (validEmail == false) {
                document.querySelector(".err_email").innerHTML = `* email not valid`;
            }
            if (validPassword == false || validConfirmPassword == false || validConfirmPassword == true && validPassword == false) {
                document.querySelectorAll(".err_password").forEach(el => {
                    el.innerHTML = innerHTML = `* Password must be at least 8 characters`;
                });
            }
            if (validPassword == true && validConfirmPassword == false) {
                document.querySelector(".err_Conpassword").innerHTML = `* confrim Password is not equal password `;
            }
        }

    }, 1000);


}



