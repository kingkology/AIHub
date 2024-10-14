/*
Welcome to the kings library.
This is a dynamic library to take care of all front end to backend communications. 
it works with 
1. jquery library
2. sweet alert 2 plugin
3. notify plugin


Load all libraries before loading this library. 
NB: jquery library should always be first
*/


/*
Note that all responses received from the backend should be in json format or html for pageletes.

{"status":201,"status_message":"Category Added Successfully","data":null}

1. status: status code of response
2. status_message: message to display along with the response code
3. data: this is optional and can be any form of data that you want to return Either text or json. json is prefered {"message1":"Hello","message2":"World"}

*/



/*
This is a sweet alert warning toast which can be called anywhere in the front end including within any function
Usage:
WarningToast.fire({title: 'Please Fill In ID'})

*/
const WarningToast = Swal.mixin({
    toast: true,
    icon: 'warning',
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: '#F7F700',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })



  /*
This is a sweet alert error toast which can be called anywhere in the front end including within any function
Usage:
ErrorToast.fire({title: 'Please Fill In ID'})
*/
const ErrorToast = Swal.mixin({
    toast: true,
    icon: 'error',
    iconColor: 'White',
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: '#B96666',
    color: 'White',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  /*
This is a sweet alert success toast which can be called anywhere in the front end including within any function
Usage:
SuccessToast.fire({title: 'Please Fill In ID'})
*/
const SuccessToast = Swal.mixin({
    toast: true,
    icon: 'success',
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: '#42CBA5',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })



    /*
This is a sweet alert success toast which can be called anywhere in the front end including within any function
Usage:
SuccessToast.fire({title: 'Please Fill In ID'})
*/
const InfoToast = Swal.mixin({
    toast: true,
    icon: 'info',
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    background: '#002849',
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })



/*
This function is for redirecting to a full page

Parameters:
1. page_url: This refers to the url of the page you wish to redirect to

Usage:
This can be used on any event handler
onclick="redirect_page('https://thatweb.com/signup/')";
*/

function redirect_page(page_url) {

    window.location.href = page_url;

}



/*
This function is for hiding html elements

Parameters:
1. x: The ID of the element to hide

Usage:
This can be used on any event handler
onclick="hide_element('element id')";
*/
function hide_element(x) {
    document.getElementById(x).style.display = "None";
}


/*
This function is for displaying html elements that have been hidden

Paramenters:
1. x: The ID of the element to show

Usage:
This can be used on any event handler
onclick="show_element('element id')";
*/
function show_element(x) {
    document.getElementById(x).style.display = "Block";
}




/*
This function is used to automatically click on an html element found on the currently visible page

Parameters:
1. element_id:ID of the button/element to click.

Usage:
This can be used on any event handler
onclick="element_click('element id')";
*/
function element_click(element_id) {

    let button = document.querySelector("#" + element_id);

    // Click the button
    if (button) {
        button.click();
    }

}



/*
This function is used to submit a login page without refreshing the entire page. 
It uses a POST method
Parameters:
1. url: this refers to the url/controller/api where you want to submit the login credentials
2. uname: this refers to the id of the html element that takes the userid/email 
3. pword: this refers to the id of the html element that takes the password

Usage:
This can be used on any event handler
onclick="login('https://thatweb.com/api/login/','userid_element_id','password_element_id')";

Expected response:
The function expects a response in json format which must follow the following structure:
eg. {http code,"message","url to redirect to when successful"}
{200,"Success","https://thatweb.com/app_lobby/"}

*/
function login(url, uname, pword) {
    let response = {};
    let username = $('#' + uname).val();
    let password = $('#' + pword).val();
    let login_api = url;

    //check if user id field is empty
    if ( typeof username === 'undefined' || username === null || username === '') {
        
        // $.growl.error({
        //     message: 'Please Fill In ID'
        //   });
          
        // notif({
            
        //     msg: 'Please Fill In ID',
        //     showHideTransition: 'slide',
        //     type: 'error',
        //     position: 'right'
        // });

        
          
        WarningToast.fire({
            title: 'Please Fill In ID'
          })

        return;
    }

    //check if password field is empty
    if ( typeof password === 'undefined' || password === null || password === '') {
        

        WarningToast.fire({
            title: 'Please Fill In Password'
          })
        return;
    }


    let data = {
        "username": username,
        "password": password
    };

    //initialise loading
    Swal.fire({
        title: 'Checking Login Credentials',
        allowOutsideClick: false,
        html: '<p><center>Please wait...</center></p>',
        didOpen: () => {
            swal.showLoading()
        },
        showClass: {
            popup: 'animate__animated animate__bounceInLeft'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    //send values to api
    $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: login_api, // the url where we want to POST
            data: data, // our data object
            dataType: 'json', // what type of data do we expect back from the server
            async: true
        })
        // using the done promise callback
        .done(function (data, textStatus, jqXHR) {
            // receive the response after sending the request
            swal.close();
            response = jqXHR.responseText;
            response = JSON.parse(response);

            if (response.status == "200" || response.status == "201") {

                SuccessToast.fire({
                    title: 'Login Successful'
                  })

                $('#' + uname).val("");
                $('#' + pword).val("");

                //redirect to homepage
                if (!( typeof response.data === 'undefined' || response.data === null || response.data === '')) {
                    window.location.href = response.data;
                } else {
                    WarningToast.fire({title: 'Redirect url not specified'})
                    
                }

            } else {
                ErrorToast.fire({title: response.status_message})
            }
            return;
        })
        // using the fail promise callback
        .fail(function (jqXHR, textStatus, errorThrown) {
            swal.close();
            var error_message = "";
            error_message = jqXHR.statusText;
            try {
                if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                    error_message = jqXHR.responseJSON.status_message;
                }
            } catch (error) {
                // Handle the error
            }
        
            if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                const errors = jqXHR.responseJSON.errors;
                let errorMessages = [];
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key];
                    messages.forEach((message) => {
                        errorMessages.push(message);
                    });
                });
                notif({
                    msg: errorMessages.join('<br>'),
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            } else {
                notif({
                    msg: error_message,
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            }
        });
}



/*
1. url: this refers to the url/controller/api for processing user logout.

*/
function logout(url) {
    let login_api = url;

    //initialise loading
    Swal.fire({
        title: 'Dumping login session',
        allowOutsideClick: false,
        html: '<p><center>Please wait...</center></p>',
        didOpen: () => {
            swal.showLoading()
        },
        showClass: {
            popup: 'animate__animated animate__bounceInLeft'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    //send values to api
    $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: login_api, // the url where we want to POST
            data: "", // our data object
            dataType: 'json', // what type of data do we expect back from the server
            async: true
        })
        // using the done promise callback
        .done(function (data, textStatus, jqXHR) {
            // receive the response after sending the request
            swal.close();
            response = jqXHR.responseText;
            response = JSON.parse(response);

            if (response.status == "200" || response.status == "201") {

                //redirect to login page
                if (!( typeof response.data === 'undefined' || response.data === null || response.data === '')) {
                    window.location.href = response.data;
                } else {
                    
                    
                    ErrorToast.fire({title: 'Redirect url not specified'})
                }

            } else {
                ErrorToast.fire({title: response.status_message})
            }

            return;
        })
        // using the fail promise callback
        .fail(function (jqXHR, textStatus, errorThrown) {
            swal.close();
            var error_message = "";
            error_message = jqXHR.statusText;
            try {
                if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                    error_message = jqXHR.responseJSON.status_message;
                }
            } catch (error) {
                // Handle the error
            }
        
            if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                const errors = jqXHR.responseJSON.errors;
                let errorMessages = [];
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key];
                    messages.forEach((message) => {
                        errorMessages.push(message);
                    });
                });
                notif({
                    msg: errorMessages.join('<br>'),
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            } else {
                notif({
                    msg: error_message,
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            }
        });
}



/*
This function accepts password data and sends it to your stated api for processing. It takes 1 argument
1. url : the link/api to receive the password values

*/

function force_pwd_change(url = "") {
    let response = [];
    let old_password = "";
    let new_password = "";
    let confirm_password = "";

    Swal.fire({
        position: 'top-end',
        title: 'Change Default Password',
        backdrop:true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        html: '<div class="row">' +
            '<form id="change_pwd_form" name="change_pwd_form">' +
            '<div class="col-md-12 col-l-12 col-xl-12"><div class="alert alert-info fade show  animate__animated  animate__slideInDown" role="alert">Note: It is recommended that you change your password every 3 months and old passwords should not be reused for a period of 12 months.<br> Password should follow the format below.<br><font color="red">8 charachters or more</font>,<font color="red">lowercase letters</font>,<font color="red">uppercase letters</font> ,<font color="red">numbers and symbols</font> to make the password really strong!</div><br>' +
            '<div class="position-relative form-group"><label for="old_password" class="">Old Password</label><input name="old_password" id="old_password" placeholder="Old password" type="password" class="form-control"><a href="javascript:void(0)" onclick=toggle_pwd("old_password","toggle_pwd1")><i id="toggle_pwd1" class="fas fa-eye-slash" aria-hidden="true"></i></a></div>' +
            '<div class="position-relative form-group"><label for="new_password" class="">New Password</label><input aria-describedby="passwordHelp" name="new_password" id="new_password" placeholder="New password" type="password" class="form-control password-strength__input" onkeyup="pwd_strength();checknewpass(\'new_password\',\'confirm_password\',\'pwdmess\')"><a href="javascript:void(0)"><i id="toggle_pwd2" class="fas fa-eye-slash" aria-hidden="true"  onclick=toggle_pwd("new_password","toggle_pwd2")></i></a></div>' +
            '<div class="password-strength__bar-block progress mb-4"><div class="password-strength__bar progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>' +
            '<div class="position-relative form-group"><label class="" style="color:red" id="pwdmess"></label></div>' +
            '<div class="position-relative form-group"><label for="confirm_password" class="">Confirm Password</label><input name="confirm_password" id="confirm_password" placeholder="Confirm password" type="password" class="form-control" onkeyup="checknewpass(\'new_password\',\'confirm_password\',\'pwdmess\')"><a href="javascript:void(0)" onclick=toggle_pwd("confirm_password","toggle_pwd3")><i id="toggle_pwd3" class="fas fa-eye-slash" aria-hidden="true"></i></a></div>' +
            '</div>' +
            '</form>' +
            '</div>',
        
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Change',
        showClass: {
            popup: 'animate__animated animate__zoomInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        preConfirm: () => {
            old_password = document.getElementById('old_password').value,
            new_password = document.getElementById('new_password').value,
            confirm_password = document.getElementById('confirm_password').value
      }
        /*showLoaderOnConfirm: true,*/
    }).then((result) => {
        if (result.isConfirmed) {

            if ( typeof url === 'undefined' || url === null || url === '') {
                WarningToast.fire({title: 'Invalid url'})
                
                return;
            }


            if ( typeof old_password === 'undefined' || old_password === null || old_password === '') {
                WarningToast.fire({title: 'Old password is required'})
                
                force_pwd_change(url);
                return;
            }
            if ( typeof new_password === 'undefined' || new_password === null || new_password === '') {
                WarningToast.fire({title: 'New password is required'})
                
                force_pwd_change(url);
                return;
            }
            if ( typeof confirm_password === 'undefined' || confirm_password === null || confirm_password === '') {
                WarningToast.fire({title: 'Password confirmation is required'})
                
                force_pwd_change(url);
                return;
            }
            if (!(new_password === confirm_password)) {
                WarningToast.fire({title: 'New password and confirm passowrds do not match'})
                
                force_pwd_change(url);
                return;
            }

            //initialise loading
            Swal.fire({
                title: 'Checking Credentials',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: {
                        'old_password': old_password,
                        'new_password': new_password,
                        'confirm_password': confirm_password
                    }, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (rs, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    //Swal.fire("Success", response.status_message, "success");

                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.status,
                        text: response.status_message,
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                        showClass: {
                            popup: 'animate__animated animate__zoomInUp'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                       
                    }).then((result) => {
                        window.location.reload(true);
                        return;
                    });

                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        }
    });
}



//Change password
/*
This function accepts password data and sends it to your stated api for processing. It takes 1 argument
1. url : the api/link to receive the password values

*/
function change_pwd(url = "") {
    let response = [];
    let old_password = "";
    let new_password = "";
    let confirm_password = "";

    Swal.fire({
        position: 'center',
        title: 'Change Password',
        allowOutsideClick: false,
        closeOnEsc: false,
        html: '<div class="row">' +
            '<div class="col-md-12 col-l-12 col-xl-12"><div class="alert alert-info fade show  animate__animated  animate__slideInDown" role="alert">Note: It is recommended that you change your password every 3 months and old passwords should not be reused for a period of 9 months.<br> Password should follow the format below.<br><font color="red">9 charachters or more</font>,<font color="red">lowercase letters</font>,<font color="red">uppercase letters</font> ,<font color="red">numbers and symbols</font> to make the password really strong!</div><br>' +
            '<div class="position-relative form-group"><label for="old_password" class="">Old Password</label><input name="old_password" id="old_password" placeholder="Old password" type="password" class="form-control"><a href="javascript:void(0)" onclick=toggle_pwd("old_password","toggle_pwd1")><i id="toggle_pwd1" class="fas fa-eye-slash" aria-hidden="true"></i></a></div>' +
            '<div class="position-relative form-group"><label for="new_password" class="">New Password</label><input aria-describedby="passwordHelp" name="new_password" id="new_password" placeholder="New password" type="password" class="form-control password-strength__input" onkeyup="pwd_strength();checknewpass(\'new_password\',\'confirm_password\',\'pwdmess\')"><a href="javascript:void(0)"><i id="toggle_pwd2" class="fas fa-eye-slash" aria-hidden="true"  onclick=toggle_pwd("new_password","toggle_pwd2")></i></a></div>' +
            '<div class="password-strength__bar-block progress mb-4"><div class="password-strength__bar progress-bar bg-danger" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>' +
            '<div class="position-relative form-group"><label class="" style="color:red" id="pwdmess"></label></div>' +
            '<div class="position-relative form-group"><label for="confirm_password" class="">Confirm Password</label><input name="confirm_password" id="confirm_password" placeholder="Confirm password" type="password" class="form-control" onkeyup="checknewpass(\'new_password\',\'confirm_password\',\'pwdmess\')"><a href="javascript:void(0)" onclick=toggle_pwd("confirm_password","toggle_pwd3")><i id="toggle_pwd3" class="fas fa-eye-slash" aria-hidden="true"></i></a></div>' +
            '</div>' +
            '</div>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Change',
        cancelButtonText: "Cancel",
        preConfirm: () => {
            old_password = document.getElementById('old_password').value,
            new_password = document.getElementById('new_password').value,
            confirm_password = document.getElementById('confirm_password').value
        }
        /*showLoaderOnConfirm: true,*/
    }).then((result) => {
        if (result.isConfirmed) {

            if ( typeof url === 'undefined' || url === null || url === '') {
                

                ErrorToast.fire({title: 'Invalid url'})

                return;
            }


            if ( typeof old_password === 'undefined' || old_password === null || old_password === '') {
                
                ErrorToast.fire({title: 'Old password is required'})
                change_pwd(url);
                return;
            }
            if ( typeof new_password === 'undefined' || new_password === null || new_password === '') {
                
                ErrorToast.fire({title: 'New password is required'})
                change_pwd(url);
                return;
            }
            if ( typeof confirm_password === 'undefined' || confirm_password === null || confirm_password === '') {
                
                ErrorToast.fire({title: 'Password confirmation is required'})
                change_pwd(url);
                return;
            }
            if (!(new_password === confirm_password)) {
                
                ErrorToast.fire({title: 'New password and confirm passowrds do not match'})
                change_pwd(url);
                return;
            }

            //initialise loading
            Swal.fire({
                title: 'Checking Credentials',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: {
                        'old_password': old_password,
                        'new_password': new_password,
                        'confirm_password': confirm_password
                    }, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (rs, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                   SuccessToast.fire({title: response.status_message})
                    return;

                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            WarningToast.fire({title: 'Your password was not modified'})
        }
    });
}



//Reset password
/*
This function accepts password data and sends it to your stated api for processing. It takes 1 argument
1. url : the api/link to receive the password values

*/
function reset_pwd(url = "") {
    let response = [];
    let ghid = "";
    let sname = "";
    let uemail = "";
    let utel = "";
    let dob = "";

    Swal.fire({
        position: 'center',
        title: 'Reset Password',
        html: '<div class="row">' +
            '<div class="col-md-12 col-l-12 col-xl-12">' +
            '<div class="position-relative form-group"><label for="ghpin" class="">Your ID</label><input type="text" class="form-control" placeholder="Enter the ID number of your Ghana card" title="Enter the ID number of your Ghana card " id="ghid" name="ghid" autocomplete="off" required></div>' +
            '<div class="position-relative form-group"><label for="sname" class="">Your Surname</label><input type="text" class="form-control" placeholder="Enter your Surname" title="Enter your Surname" id="sname" name="sname" autocomplete="off" required></div>' +
            '<div class="position-relative form-group"><label for="dob" class="">Your Date of Birth</label><input type="date" class="form-control" title="Enter your Date of Birth" id="dob" name="dob" autocomplete="off" required></div>' +
            '<div class="position-relative form-group"><label for="uemail" class="">Your Email</label><input type="email" class="form-control" placeholder="Enter your Email" title="Enter your Email" id="uemail" name="uemail" autocomplete="off" required></div>' +
            '<div class="position-relative form-group"><label for="uemail" class="">Your Telephone Number</label><input type="number" class="form-control" title="Enter your Telephone Number" id="utel" name="utel" autocomplete="off" required></div>' +
            '</div>' +
            '</div>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Reset',
        cancelButtonText: "Cancel",
        preConfirm: () => {
            ghid = document.getElementById('ghid').value,
            sname = document.getElementById('sname').value,
            uemail = document.getElementById('uemail').value,
            utel = document.getElementById('utel').value,
            dob = document.getElementById('dob').value
        }
        /*showLoaderOnConfirm: true,*/
    }).then((result) => {
        if (result.isConfirmed) {

            if ( typeof url === 'undefined' || url === null || url === '') {
                WarningToast.fire({title: 'Invalid url'})
                return;
            }

            if ( typeof ghid === 'undefined' || ghid === null || ghid === '') {
                WarningToast.fire({title: 'ID is required'})
                
                reset_pwd(url);
                return;
            }
            if ( typeof sname === 'undefined' || sname === null || sname === '') {
                WarningToast.fire({title: 'Surname is required'})
                
                reset_pwd(url);
                return;
            }
            if ( typeof dob === 'undefined' || dob === null || dob === '') {
                WarningToast.fire({title: 'Date of Birth is required'})
                
                reset_pwd(url);
                return;
            }
            if ( typeof uemail === 'undefined' || uemail === null || uemail === '') {
                WarningToast.fire({title: 'Email is required'})
                
                reset_pwd(url);
                return;
            }
            if ( typeof utel === 'undefined' || utel === null || utel === '') {
                WarningToast.fire({title: 'Telephone number is required'})
                
                reset_pwd(url);
                return;
            }

            //initialise loading
            Swal.fire({
                title: 'Resetting Password',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: {
                        'nid': ghpin,
                        'sname': sname,
                        'dob': dob,
                        'uemail': uemail
                    }, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (rs, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);
                    
                   
                   SuccessToast.fire({title: response.status_message})
                    return;

                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            WarningToast.fire({title: "Your password was not modified"})
        }
    });
}



//check password match
/*
This function accepts user password inputs and compares them to see if they match and displays reponse if mismatch it to your stated api for processing.
It takes 3 argument
1. x : first password input id
2. y : second password input id
3. z : id of html element to display response

expected response
{
  "status": 400, meaning-->http status code
  "status_message": "Error updating office.",  meaning-->http status message
  "data": null meaning-->additional data in json format as {"data1": 200,"data2": "additional updating message.","data3": hi}
}

*/
function checknewpass(x, y, z) {
    var pwd1 = document.getElementById(x).value;
    var pwd2 = document.getElementById(y).value;

    if ( (typeof pwd1 === 'undefined' || pwd1 === null || pwd1 === '') || ( typeof pwd2 === 'undefined' || pwd2 === null || pwd2 === '')) {
        return;
    }

    if (pwd1 != pwd2) {
        document.getElementById(z).innerHTML = '<div class="alert alert-danger" role="alert"><i class="fas fa-frown-o mr-2" aria-hidden="true"></i>Passwords do not match</div>';

    } else {
        document.getElementById(z).innerHTML = "";

    }

}



/*
Show/hide password
This is reliant on the change password function or the force password change function
*/
function toggle_pwd(input_box, toggle_id) {

    if ($('#' + input_box).attr("type") == "text") {
        $('#' + input_box).attr('type', 'password');
        $('#' + toggle_id).removeClass("fa-eye");
        $('#' + toggle_id).addClass("fa-eye-slash");
    } else if ($('#' + input_box).attr("type") == "password") {
        $('#' + input_box).attr('type', 'text');
        $('#' + toggle_id).addClass("fa-eye");
        $('#' + toggle_id).removeClass("fa-eye-slash");
    }

}



/*
Check password strength
This is reliant on the change password function or the force password change function
It takes no parameter but uses elements with the classes specified in the DOM object in the function
*/

function pwd_strength() {

    DOM = {
        passwForm: '.password-strength',
        passwErrorMsg: '.password-strength__error',
        passwInput: document.querySelector('.password-strength__input'),
        //passwVisibilityBtn: '.password-strength__visibility',
        //passwVisibility_icon: '.password-strength__visibility-icon',
        strengthBar: document.querySelector('.password-strength__bar'),
        //submitBtn: document.querySelector('.password-strength__submit') 
    };

    //*** MAIN CODE

    const getPasswordVal = input => {
        return input.value;
    };

    const testPasswRegexp = (passw, regexp) => {

        return regexp.test(passw);

    };

    const testPassw = passw => {

        let strength = 'none';

        const moderate = /(?=.*[A-Z])(?=.*[a-z]).{8,}|(?=.*[\d])(?=.*[a-z]).{8,}|(?=.*[\d])(?=.*[A-Z])(?=.*[a-z]).{8,}/g;
        const strong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).{8,}|(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=.*[\d]).{8,}/g;
        const extraStrong = /(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]).{8,}/g;

        if (testPasswRegexp(passw, extraStrong)) {
            strength = 'extra';
        } else if (testPasswRegexp(passw, strong)) {
            strength = 'strong';
        } else if (testPasswRegexp(passw, moderate)) {
            strength = 'moderate';
        } else if (passw.length > 0) {
            strength = 'weak';
        }

        return strength;

    };

    const testPasswError = passw => {

        const errorSymbols = /\s/g;

        return testPasswRegexp(passw, errorSymbols);

    };

    const setStrengthBarValue = (bar, strength) => {

        let strengthValue;

        switch (strength) {
            case 'weak':
                strengthValue = 25;
                bar.setAttribute('aria-valuenow', strengthValue);
                break;

            case 'moderate':
                strengthValue = 50;
                bar.setAttribute('aria-valuenow', strengthValue);
                break;

            case 'strong':
                strengthValue = 75;
                bar.setAttribute('aria-valuenow', strengthValue);
                break;

            case 'extra':
                strengthValue = 100;
                bar.setAttribute('aria-valuenow', strengthValue);
                break;

            default:
                strengthValue = 0;
                bar.setAttribute('aria-valuenow', 0);
        }


        return strengthValue;

    };

    //also adds a text label based on styles
    const setStrengthBarStyles = (bar, strengthValue) => {

        bar.style.width = `${strengthValue}%`;

        bar.classList.remove('bg-success', 'bg-info', 'bg-warning');

        switch (strengthValue) {
            case 25:
                bar.classList.add('bg-danger');
                bar.textContent = 'Weak';
                break;

            case 50:
                bar.classList.remove('bg-danger');
                bar.classList.add('bg-warning');
                bar.textContent = 'Moderate';
                break;

            case 75:
                bar.classList.remove('bg-danger');
                bar.classList.add('bg-info');
                bar.textContent = 'Strong';
                break;

            case 100:
                bar.classList.remove('bg-danger');
                bar.classList.add('bg-success');
                bar.textContent = 'Extra Strong';
                break;

            default:
                bar.classList.add('bg-danger');
                bar.textContent = '';
                bar.style.width = `0`;
        }


    };

    const setStrengthBar = (bar, strength) => {

        //setting value
        const strengthValue = setStrengthBarValue(bar, strength);

        //setting styles
        setStrengthBarStyles(bar, strengthValue);
    };



    const passwordStrength = (input, strengthBar) => {

        //getting password
        const passw = getPasswordVal(input);

        //check if there is an error
        const error = testPasswError(passw);

        if (!(error)) {

            //finding strength
            const strength = testPassw(passw);

            //setting strength bar (value and styles)
            setStrengthBar(strengthBar, strength);

        }

    };


    //*** EVENT LISTENERS
    DOM.passwInput.addEventListener('input', () => {
        passwordStrength(DOM.passwInput, DOM.strengthBar);
    });


}



/*
Overall, this function allows users to select an image file, checks its size, and displays the selected image in the specified image element if it meets the size requirements.
The function takes two parameters: input and x.

input represents the file upload input element where the user selects an image file.
x represents the ID of the image element where the selected image will be displayed.
The function starts by assigning the value of x to the imagehold variable.

It checks if the fileUpload.files property is defined. This condition ensures that the browser supports the File API and the user has selected a file.

Inside the condition, it calculates the size of the selected image file in kilobytes. The size is obtained by dividing the file size (in bytes) by 1024 and rounding it to 2 decimal places using parseFloat and toFixed.

It checks if the size is greater than 3000 KB (3 MB). If the size exceeds the limit, it displays an error message using Swal.fire() from the Swal (SweetAlert) library. The error message states that the image is larger than 3 MB.

If the browser supports HTML5 and the image file has been selected (input.files && input.files[0]), it creates a new FileReader object.

It sets the onload event handler for the reader object. When the image is loaded, the event handler function is executed.

Inside the event handler function, it sets the src attribute of the image element with the ID imagehold to the result of the reader object. This displays the selected image in the specified image element.

Finally, the reader reads the image file data using readAsDataURL(input.files[0]), which converts the file data to a data URL representing the image.

*/

function readURL(input, x) {
    let imagehold = x;

    let fileUpload = input;
    if (typeof (fileUpload.files) != "undefined") {
        var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);
        if (size > 3000) {
            Swal.fire('', "This image is larger than 3mb.", 'error');
            fileUpload.value = "";
            return;
        }
    } else {
        Swal.fire('', "This browser does not support HTML5.", 'error');
    }
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#' + imagehold).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}





/*
this function allows you to export an HTML table to an Excel file by converting the table's HTML content into a data URI and opening it in a new window. 
It also provides the option to hide specific elements with the class name no_print during the export process.

The function takes one parameter: x, which represents the ID of the HTML table element to be exported.

It assigns the value of x to the variable tablez.

It retrieves the HTML table element using document.getElementById(x) and assigns it to the variable htmltable.

It uses the querySelectorAll method to select all elements with the class name no_print. This is done using the CSS selector .no_print.

It iterates over the selected elements using the forEach method and sets their display CSS property to "None" to hide them. This is achieved by setting el.style.display = "None".

It retrieves the outer HTML of the htmltable element using the outerHTML property and assigns it to the variable html.

It opens a new window and sets its URL to a data URI containing the Excel file data. The Excel file is created by appending the html content to the data:application/vnd.ms-excel URL. The encodeURIComponent function is used to encode the HTML content.

After the Excel file is opened or downloaded, the code iterates over the elements with the class name no_print again and sets their display CSS property to "Block" to show them again.
*/
function ExportToExcel(x) {
    var tablez = x;
    var htmltable = document.getElementById(x);

    [].forEach.call(document.querySelectorAll('.no_print'), function (el) {
        el.style.display = "None";
    });

    var html = htmltable.outerHTML;
    window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));

    [].forEach.call(document.querySelectorAll('.no_print'), function (el) {
        el.style.display = "Block";
    });
}



/*
the call_pagelet function is used to asynchronously load a page component using AJAX and display it in a specified location on the web page. 
It supports a callback function to be executed after the component is loaded, and it handles error conditions by displaying an error message and optionally falling back to a default component.

The function takes several parameters:

url: The URL of the server-side script or endpoint that will return the page component content.
display_location: The ID of the HTML element where the page component will be displayed.
callback_function: The name of the callback function to be executed after the page component is loaded and displayed.
...callback_parameters: Optional additional parameters to be passed to the callback function.
The code initializes a loading dialog using the Swal (SweetAlert) library to show a message to the user while the page component is being loaded.

An AJAX request is made using $.ajax() to the specified url using the HTTP POST method. The expected response data type is set to HTML using dataType: 'html'.

The .done() method is called when the AJAX request is successfully completed. It takes a callback function with three parameters: rs, textStatus, and jqXHR. Inside this callback function, the following actions are performed:

The loading dialog is closed using swal.close().
The response from the server is stored in the response variable.
The page component content is inserted into the HTML element with the ID specified by display_location using document.getElementById().innerHTML.
If a callback_function is provided, the callback parameters are prepared by iterating over callback_parameters and constructing a string representation of the parameters to be passed to the callback function.
The callback function is invoked using eval(call_function), where call_function is a string representing the function call.
The .fail() method is called if the AJAX request fails. It takes a callback function with three parameters: jqXHR, textStatus, and errorThrown. Inside this callback function, the following actions are performed:

The loading dialog is closed using swal.close().
The error message is extracted from the jqXHR object and stored in the error_message variable.
If available, the specific error message from the server response is used instead of the default error message.
An error toast notification is displayed using the ErrorToast.fire() function.
The call_default_pagelet() function is called to load a default page component if the AJAX request fails.
*/
function call_pagelet(url, display_location, callback_function, ...callback_parameters) {

    //initialise loading
    Swal.fire({
        title: 'Loading page component',
        allowOutsideClick: false,
        html: '<p><center>Please wait...</center></p>',
        didOpen: () => {
            swal.showLoading()
        },
        showClass: {
            popup: 'animate__animated animate__bounceInLeft'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    $.ajax({
            type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
            url: url, // the url where we want to POST
            /*data        : formData, // our data object*/
            dataType: 'html', // what type of data do we expect back from the server
            async: true
        })
        // using the done promise callback
        .done(function (rs, textStatus, jqXHR) {

            swal.close();
            response = jqXHR.responseText;

            // now you state where to display the component
            document.getElementById(display_location).innerHTML = response;

            if (callback_function) {
                let callback_parameter = "";
                let count = 0;

                for (const your_parameters of callback_parameters) {
                    callback_parameter = callback_parameter + "'" + your_parameters + "',";
                }
                callback_parameter = callback_parameter + "1";
                let call_function = callback_function + "(" + callback_parameter + ")";

                eval(call_function);

                //window[callback_function](callback_parameters.split(','));           
            }
        })
        // using the fail promise callback
        .fail(function (jqXHR, textStatus, errorThrown) {
            swal.close();
            // console.log(jqXHR);

            var error_message="";
                    error_message=jqXHR.statusText;
                    try {
                        if (!(typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) 
                        {
                            error_message=jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        
                    }

                    ErrorToast.fire({title: error_message})


            call_default_pagelet(display_location);
            return;
        });
}




//this displays a 404 div incase the specified page is not found
function call_default_pagelet(display_location) {
    let the_page = "";
    the_page = "<div class='row'><div class='col-md-12 col-l-12 col-xl-12'> <center><h2>Specified page not found</h2></center> </div></div>";
    document.getElementById(display_location).innerHTML = the_page;
    return;

   
}



/*
This function accepts table data and builds a table based on the data provided.
It takes 4 argument
1. url : The api or link to the the data
2. display_location : id of html element to display response. usually a table element(<table></table>)
3. start : start of the the data usually 0
4. limit : number of records to display at a time.

Accepted repsonse format
*/
/*
[
  [
    {
        //Table headers
      "th1": "No.",
      "th2": "Office Code",
      "th3": "Office Name",
      "th4": "Office Contact",
      "th5": "Region",
      "th9": "Office Type",
      "th6": "Staff Count",
      "th7": "Status",
      "th8": "Actions"
    }
  ],
  [
  //Table rows
    {
      "type" : "text",
      "name" : "no1",
      "id"   : "no1",
      "value": 1
    },
    {
      "type" : "text",
      "name" : "office_code1",
      "id"   : "office_code1",
      "value": "off-0310"
    },
    {
      "type" : "button",
      "name" : "details1",
      "id"   : "details1",
      "value": "<i class='fas fa-eye'> View</i>",
      "additional_properties" : "onclick=\"call_pagelet('".$view_url."','page_content')\" class='btn btn-sm btn-info' color:white "
    }
  ]
]
*/

function create_table(url, display_location, start, limit, callback_function, ...callback_parameters) {

    let response = "";
    let table_header = "";
    let table_body = "";
    let array_response;
    let old_content = document.getElementById(display_location).innerHTML;
    document.getElementById(display_location).innerHTML = "";
    //document.getElementById(display_location).innerHTML = "<p><center><i class=\"fas fa-refresh fa-4x fa-spin\"></i></center></p>";

    //initialise loading
    Swal.fire({
        title: 'Fetching data',
        allowOutsideClick: false,
        html: '<p><center>Please wait...</center></p>',
        didOpen: () => {
            Swal.showLoading()
        },
        showClass: {
            popup: 'animate__animated animate__bounceInLeft'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: url, // the url where we want to POST
            data: {
                start: start,
                limit: limit
            }, // our data object*/
            dataType: 'json', // what type of data do we expect back from the server
            async: true
        })
        // using the done promise callback
        .done(function (rs, textStatus, xhr) {
            // nreceive the reference component that will host response and the response after sending the request
            Swal.close();
            let data = rs;
            /*parse response as json object*/
            array_response = (data);
            /*get length of full response object*/
            let response_length = array_response.length;
           
            if (response_length > 0) {
                
                /*Building table body from the rest of the array index*/
                table_body = "";
                for (let i = 0; i < response_length; i++) {
                    /*convert the current object index from an object to an array*/
                    let current_index = Object.values(array_response[i]);
                    table_body = table_body + "<tr>";
                    //loop through the td elements
                    for (let j = 0; j < current_index.length; j++) {
                        //convert the td value object to an array inorder to access the properties
                        let td_content = Object.values(current_index[j]);
                        switch (td_content[0]) {
                            case 'text':
                                table_body = table_body + "<td id='" + td_content[2] + "' name='" + td_content[1] + "'>" + td_content[3] + "</td>";
                            break;

                            case 'button':
                                table_body = table_body + "<td>" + create_button(td_content[3], td_content[2], td_content[1], td_content[4]) + "</td>";
                            break;
                        }
                    }
                    table_body = table_body + "</tr>";
                }
                

                response = table_body;
            } else {
                Swal.fire("Error", "No Table Data Found ", "error");
                return;
            }
            document.getElementById(display_location).innerHTML = response;


            if (callback_function) {
                let callback_parameter = "";
                let count = 0;

                for (const your_parameters of callback_parameters) {
                    callback_parameter = callback_parameter + "'" + your_parameters + "',";
                }
                callback_parameter = callback_parameter + "1";
                let call_function = callback_function + "(" + callback_parameter + ")";

                eval(call_function);

                //window[callback_function](callback_parameters.split(','));           
            }
            
        })
        // using the fail promise callback
        .fail(function (jqXHR, textStatus, errorThrown) {
            swal.close();
            var error_message = "";
            error_message = jqXHR.statusText;
            try {
                if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                    error_message = jqXHR.responseJSON.status_message;
                }
            } catch (error) {
                // Handle the error
            }
        
            if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                const errors = jqXHR.responseJSON.errors;
                let errorMessages = [];
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key];
                    messages.forEach((message) => {
                        errorMessages.push(message);
                    });
                });
                notif({
                    msg: errorMessages.join('<br>'),
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            } else {
                notif({
                    msg: error_message,
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            }
        });
}

function call_datatable() {

    $(".table_button_displays").html("");

    $('table').DataTable( {
        colReorder: true,
        responsive: true,
        lengthChange: true,
        lengthMenu: [ [10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, "All"] ],
        paging: true,
        search: true,
        info: true,
        dom: 'B<"clear">lfrtip',
        buttons: [ 'copy', 'excel','csv', 'pdf', 'colvis' ]
    } );

}



function insert_form(url, form_id, callback_function, ...callback_parameters) {
    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to submit this data.",
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {
            
            let current_name = "";
            let current_id = "";
            let check_required_pass=true;
            var form = $('#' + form_id);
            var the_data = [];
            the_data = form.serializeArray();

            let form_data = new FormData();

            var output = [];

            the_data.forEach(function (item) {
                current_name = item.name;
                var existing = output.filter(function (v, i) {
                    return v.name == item.name;
                });
                if (existing.length) {
                    var existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].value = output[existingIndex].value.concat(item.value);
                } else {
                    if (typeof item.value == 'string') {
                        item.value = [item.value];
                        if (item.value != "undefined") {
                            let current_element = document.getElementsByName(current_name);
                            current_id = $(current_element).attr("id");
                            // console.log(current_id+" : "+$('#'+current_id).val());

                            switch (true) {
                                case (($('#' + current_id).val()=="") && ($('#' + current_id).prop('required')) ):

                                    if ((item.value)) {
                                        let thefield = current_name.replaceAll('_', ' ');
                                        notif({
                                            // heading: 'Required',
                                            msg: thefield + ' is required',
                    
                                            type: 'error',
                                            position: 'right'
                                        });
                                        check_required_pass=false;
                                    }
                                    
                                break;
    
                                default:
                                   
                                break;
                            }
                            
                            form_data.append(current_name, item.value);
                        }
                    }
                }
            });

            let inputs = document.getElementById(form_id);
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type.toLowerCase() == 'file') {
                    if (inputs[i].name) {
                        //console.log(inputs[i].name+" : "+inputs[i].files.length);

                        

                        switch (true) {
                            case (inputs[i].files.length > 0):
                                let thefile;
                                //console.log(inputs[i].name);
                                thefile = document.forms[form_id][inputs[i].name].files[0];
                                // console.log(thefile);
                                form_data.append(inputs[i].name, thefile);
                                break;

                            default:
                                let current_element = document.getElementsByName(inputs[i].name);
                                current_id = $(current_element).attr("id");
                                if ($('#' + current_id).prop('required')) {
                                    let thefield = inputs[i].name.replaceAll('_', ' ');
                                    notif({
                                        // heading: 'Required',
                                        msg: thefield + ' is required',
                
                                        type: 'error',
                                        position: 'right'
                                    });
                                    check_required_pass=false;
                                }
                            break;
                        }

                    }
                }
            }

            //initialise loading
            Swal.fire({
                title: 'Sending data',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            /*console.log(output);*/
            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: form_data, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true,
                    processData: false, //add this
                    contentType: false //and this
                })
                // using the done promise callback
                .done(function (data, textStatus, jqXHR) {
                    //swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);
                    console.log(jqXHR);
                    if (response.status == "200" || response.status == "201") {
                        SuccessToast.fire({title: response.status_message})
                        
                        if (callback_function) {
                            let callback_parameter = "";
                            let count = 0;

                            for (const your_parameters of callback_parameters) {
                                callback_parameter = callback_parameter + "'" + your_parameters + "',";
                            }
                            callback_parameter = callback_parameter + "1";
                            let call_function = callback_function + "(" + callback_parameter + ")";

                            eval(call_function);

                            //window[callback_function](callback_parameters.split(','));           
                        }
                    } else {
                        // ErrorToast.fire({title: response.status_message});
                        // Loop through the errors object
                        Object.keys(response.status_message.errors).forEach((key) => {
                            // Get the error messages for the current key
                            const errorMessages = errorResponse.errors[key];

                            // Loop through the error messages
                            errorMessages.forEach((message) => {
                                // Display the error message
                                // console.log(`Error in ${key}: ${message}`);
                                notif({
                                    // heading: 'Error',
                                    msg: message,
            
                                    type: 'error',
                                    position: 'right'
                                });
                            });
                        });
                        
                    }

                    //CLEAR FORM
                    $('#' + form_id)[0].reset();
                    return;
                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            ErrorToast.fire({title: "Your data was not submitted"});
            // Swal.fire("Cancelled", "Your data was not submitted", "error");
        }
    });
}




function update_form(url, form_id, callback_function, ...callback_parameters) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to edit this data.",
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {

            let current_name = "";
            let current_id = "";
            let check_required_pass=true;
            var form = $('#' + form_id);
            var the_data = [];
            the_data = form.serializeArray();

            let form_data = new FormData();

            var output = [];

            the_data.forEach(function (item) {
                current_name = item.name;
                var existing = output.filter(function (v, i) {
                    return v.name == item.name;
                });
                if (existing.length) {
                    var existingIndex = output.indexOf(existing[0]);
                    output[existingIndex].value = output[existingIndex].value.concat(item.value);
                } else {
                    if (typeof item.value == 'string') {
                        item.value = [item.value];
                        if (item.value != "undefined") {
                            let current_element = document.getElementsByName(current_name);
                            current_id = $(current_element).attr("id");
                            // console.log(current_id+" : "+$('#'+current_id).val());
                            switch (true) {
                                case (($('#' + current_id).val()=="") && ($('#' + current_id).prop('required')) ):

                                    if ((item.value)) {
                                        let thefield = current_name.replaceAll('_', ' ');
                                        notif({
                                            // heading: 'Required',
                                            msg: thefield + ' is required',
                    
                                            type: 'error',
                                            position: 'right'
                                        });
                                        check_required_pass=false;
                                    }
                                    
                                break;
    
                                default:
                                   
                                break;
                            }


                            form_data.append(current_name, item.value);
                        }
                    }
                }
            });

            
            let inputs = document.getElementById(form_id);
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i].type.toLowerCase() == 'file') {
                    if (inputs[i].name) {
                        //console.log(inputs[i].name+" : "+inputs[i].files.length);

                        switch (true) {
                            case (inputs[i].files.length > 0):
                                let thefile;
                                //console.log(inputs[i].name);
                                thefile = document.forms[form_id][inputs[i].name].files[0];
                                // console.log(thefile);
                                form_data.append(inputs[i].name, thefile);
                                break;

                            default:
                                let current_element = document.getElementsByName(inputs[i].name);
                                current_id = $(current_element).attr("id");
                                if ($('#' + current_id).prop('required')) {
                                    let thefield = inputs[i].name.replaceAll('_', ' ');
                                    notif({
                                        // heading: 'Required',
                                        msg: thefield + ' is required',
                
                                        type: 'error',
                                        position: 'right'
                                    });
                                    check_required_pass=false;
                                }
                            break;
                        }


                    }
                }
            }

            if(check_required_pass==false)
            {
                return;
            }

            //initialise loading
            Swal.fire({
                title: 'Sending data',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            /*console.log(output);*/
            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: form_data, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true,
                    processData: false, //add this
                    contentType: false //and this
                })
                // using the done promise callback
                .done(function (data, textStatus, jqXHR) {
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    if (response.status == "200" || response.status == "201") {
                       SuccessToast.fire({title: response.status_message})
                        
                        if (callback_function) {
                            let callback_parameter = "";
                            let count = 0;

                            for (const your_parameters of callback_parameters) {
                                callback_parameter = callback_parameter + "'" + your_parameters + "',";
                            }
                            callback_parameter = callback_parameter + "1";
                            let call_function = callback_function + "(" + callback_parameter + ")";

                            eval(call_function);

                            //window[callback_function](callback_parameters.split(','));
                        }
                    } else {
                        notif({
                            // heading: 'Error',
                            msg: response.status_message,
    
                            type: 'error',
                            position: 'right'
                        });
                        ErrorToast.fire({title: response.status_message})
                    }

                    //CLEAR FORM
                    /* $('#' + form_id)[0].reset();*/
                    return;
                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });


        } else {
            Swal.fire("Cancelled", "Your data was not modified", "error");
        }
    });


}


function update_values(url, callback_function, ...callback_parameters) {

    /*alert(callback_function);
    return;*/

    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to edit this data.",
        icon: 'warning',
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {

            //initialise loading
            Swal.fire({
                title: 'Sending data',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            /*console.log(output);*/
            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    /*data        : the_values,*/ // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (data, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    if (response.status == "200" || response.status == "201") {
                        notif({
                            // heading: 'Success',
                            msg: response.status_message,
    
                            type: 'success',
                            position: 'right'
                        });
                        if (callback_function) {
                            let callback_parameter = "";
                            let count = 0;

                            for (const your_parameters of callback_parameters) {
                                callback_parameter = callback_parameter + "'" + your_parameters + "',";
                            }
                            callback_parameter = callback_parameter + "1";
                            let call_function = callback_function + "(" + callback_parameter + ")";

                            eval(call_function);

                            //window[callback_function](callback_parameters.split(','));
                        }

                    } else {
                        ErrorToast.fire({title: response.status_message})
                    }
                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            Swal.fire("Cancelled", "Your data was not modified", "error");
        }
    });

}




function background_update_values(url, callback_function, ...callback_parameters) {


    /*console.log(output);*/
    $.ajax({
            type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url: url, // the url where we want to POST
            /*data        : the_values,*/ // our data object
            dataType: 'json', // what type of data do we expect back from the server
            async: true
        })
        // using the done promise callback
        .done(function (data, textStatus, jqXHR) {
            // nreceive the response after sending the request
            //swal.close();
            response = jqXHR.responseText;
            response = JSON.parse(response);

            if (response.status == "200" || response.status == "201") {
                console.log(response.status_message);

            } else {
                console.log(response.status_message);
            }
        })
        // using the fail promise callback
        .fail(function (jqXHR, textStatus, errorThrown) {
            swal.close();
            var error_message = "";
            error_message = jqXHR.statusText;
            try {
                if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                    error_message = jqXHR.responseJSON.status_message;
                }
            } catch (error) {
                // Handle the error
            }
        
            if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                const errors = jqXHR.responseJSON.errors;
                let errorMessages = [];
                Object.keys(errors).forEach((key) => {
                    const messages = errors[key];
                    messages.forEach((message) => {
                        errorMessages.push(message);
                    });
                });
                notif({
                    msg: errorMessages.join('<br>'),
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            } else {
                notif({
                    msg: error_message,
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });
            }
        });

}



function remove(url, item_id, form_id, callback_function, ...callback_parameters) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to delete this data.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {
            //initialise loading
            Swal.fire({
                title: 'Deleting data',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: {
                        'id': item_id
                    }, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (data, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    if (response.status == "200" || response.status == "201") {
                        //CLEAR FORM
                        $('#' + form_id)[0].reset();
                        notif({
                            // heading: 'Success',
                            msg: response.status_message,
    
                            type: 'success',
                            position: 'right'
                        });

                        if (callback_function) {
                            let callback_parameter = "";
                            let count = 0;

                            for (const your_parameters of callback_parameters) {
                                callback_parameter = callback_parameter + "'" + your_parameters + "',";
                            }
                            callback_parameter = callback_parameter + "1";
                            let call_function = callback_function + "(" + callback_parameter + ")";

                            eval(call_function);

                            //window[callback_function](callback_parameters.split(','));
                        }
                    } else {
                        ErrorToast.fire({title: response.status_message})
                    }
                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            Swal.fire("Cancelled", "Your data was not modified", "error");
        }
    });
}


function remove_row(url, item_id, table_id, r, callback_function, ...callback_parameters) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to delete this data.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {
            //initialise loading
            Swal.fire({
                title: 'Deleting data',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    data: {
                        'id': item_id
                    }, // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (data, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    if (response.status == "200" || response.status == "201") {
                        //delete row from interface
                        let i = r.parentNode.parentNode.rowIndex;
                        document.getElementById(table_id).deleteRow(i);
                        notif({
                            // heading: 'Success',
                            msg: response.status_message,
    
                            type: 'success',
                            position: 'right'
                        });

                        if (callback_function) {
                            let callback_parameter = "";
                            let count = 0;

                            for (const your_parameters of callback_parameters) {
                                callback_parameter = callback_parameter + "'" + your_parameters + "',";
                            }
                            callback_parameter = callback_parameter + "1";
                            let call_function = callback_function + "(" + callback_parameter + ")";

                            eval(call_function);

                            //window[callback_function](callback_parameters.split(','));
                        }
                        return;
                    } else {
                        ErrorToast.fire({title: response.status_message})
                    }
                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });

        } else {
            Swal.fire("Cancelled", "Your data was not modified", "error");
        }
    });
}



function remove_element(element_id) {

    Swal.fire({
        title: 'Are you sure?',
        text: "Dear User, you are about to remove this data.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Accept',
        cancelButtonText: "Decline"
    }).then((result) => {
        if (result.isConfirmed) {


            const element = document.getElementById(element_id);
            element.remove();
        } else {
            Swal.fire("Cancelled", "Your data was not modified", "error");
        }
    });
}


/* 
This prints the contents of a specified div
It takes 2 arguements
1. div_id: the id of the div/element which you want to print its content
2. ..all_css this is a rest paramenter that can accept more than one input it accepts the css used for the page inorder to maintain the style on the table
eg;print_div('print_waybill','<link href=\'<?php echo SYSTEM_URL; ?>assets/libraries/font-awesome-4.7.0/css/font-awesome.min.css\' type=\'text/css\' rel=\'stylesheet\'>','<link href=\'main.css\' type=\'text/css\' rel=\'stylesheet\'>');
*/
function print_div(div_id, ...all_css) {

    let printid = div_id;


    [].forEach.call(document.querySelectorAll('.no_print'), function (el) {
        el.style.display = "None";
    });


    let DocumentContainer = document.getElementById(printid);
    let WindowObject = window.open("", "PrintWindow", "top=70,toolbars=no,scrollbars=yes,status=no,resizable=yes");

    for (const your_css of all_css) {
        WindowObject.document.write('<link href="' + your_css + '" type="text/css" rel="stylesheet">')
    }
    WindowObject.document.writeln(DocumentContainer.innerHTML);
    WindowObject.document.close();
    setTimeout(function () {
        WindowObject.focus();
        WindowObject.print();
        WindowObject.close();
    }, 6000);


    [].forEach.call(document.querySelectorAll('.no_print'), function (el) {
        el.style.display = "Block";
    });
}


function confirm_if_data_exists(url, callback_function, ...callback_parameters) {


    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: url, // the url where we want to POST
        //data: form_data, // our data object
        dataType: 'json', // what type of data do we expect back from the server
        async: true,
        processData: false, //add this
        contentType: false //and this
    })
    // using the done promise callback
    .done(function (data, textStatus, jqXHR) {
        swal.close();
        response = jqXHR.responseText;
        response = JSON.parse(response);

        if (response.status == "200" || response.status == "201") {
           SuccessToast.fire({title: response.status_message})

            switch (response.status_message) {
                case "In":

                    Swal.fire({
                        title: 'Are you sure?',
                        text: "Dear User, Data already exists for the specified transaction are you sure you want to replace it?",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Accept',
                        cancelButtonText: "Decline"
                    }).then((result) => {
                        if (result.isConfirmed) {
                
                            if (callback_function) {
                                let callback_parameter = "";
                                let count = 0;
                
                                for (const your_parameters of callback_parameters) {
                                    callback_parameter = callback_parameter + "'" + your_parameters + "',";
                                }
                                callback_parameter = callback_parameter + "1";
                                let call_function = callback_function + "(" + callback_parameter + ")";
                
                                eval(call_function);
                
                                //window[callback_function](callback_parameters.split(','));
                            }
                
                        } else {
                            Swal.fire("Cancelled", "Your data was not modified", "error");
                        }
                    });
                    
                break;
            
                default:
                    if (callback_function) {
                        let callback_parameter = "";
                        let count = 0;
        
                        for (const your_parameters of callback_parameters) {
                            callback_parameter = callback_parameter + "'" + your_parameters + "',";
                        }
                        callback_parameter = callback_parameter + "1";
                        let call_function = callback_function + "(" + callback_parameter + ")";
        
                        eval(call_function);
        
                        //window[callback_function](callback_parameters.split(','));
                    }
                break;
            }

        } else {
            notif({
                // heading: 'Error',
                msg: response.status_message,
                showHideTransition: 'slide',
                type: 'error',
                position: 'right'
            });
            ErrorToast.fire({title: response.status_message})
        }

        //CLEAR FORM
        /* $('#' + form_id)[0].reset();*/
        return;
    })
    // using the fail promise callback
    .fail(function (jqXHR, textStatus, errorThrown) {
        swal.close();
        var error_message = "";
        error_message = jqXHR.statusText;
        try {
            if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                error_message = jqXHR.responseJSON.status_message;
            }
        } catch (error) {
            // Handle the error
        }
    
        if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
            const errors = jqXHR.responseJSON.errors;
            let errorMessages = [];
            Object.keys(errors).forEach((key) => {
                const messages = errors[key];
                messages.forEach((message) => {
                    errorMessages.push(message);
                });
            });
            notif({
                msg: errorMessages.join('<br>'),
                showHideTransition: 'slide',
                type: 'error',
                position: 'right'
            });
        } else {
            notif({
                msg: error_message,
                showHideTransition: 'slide',
                type: 'error',
                position: 'right'
            });
        }
    });


}


/*
This function asks for confirmation for completion of tasks.
1. url : the link/api to receive the follow up action after confirmation

*/


function confirm_Action(url = "") {
    let response = [];

    Swal.fire({
        position: 'center',
        title: 'Confirm Action',
        html: '<div class="row">' +
            '<div class="col-md-12 col-l-12 col-xl-12"><div class="alert alert-info fade show  animate__animated  animate__slideInDown" role="alert">Did the Task Complete Successfully?</div><br>' +
            '</div>' +
            '</div>',
        allowOutsideClick: false,
        confirmButtonText: 'Yes',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: "No",
        showClass: {
            popup: 'animate__animated animate__zoomInUp'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
        /*showLoaderOnConfirm: true,*/
    }).then((result) => {
        if (result.isConfirmed) {

            if ( typeof url === 'undefined' || url === null || url === '') {
                notif({
                    // heading: 'Error',
                    msg: 'Invalid url',
                    showHideTransition: 'slide',
                    type: 'error',
                    position: 'right'
                });

                return;
            }


            //initialise loading
            Swal.fire({
                title: 'Checking Credentials',
                allowOutsideClick: false,
                html: '<p><center>Please wait...</center></p>',
                didOpen: () => {
                    swal.showLoading()
                },
                showClass: {
                    popup: 'animate__animated animate__bounceInLeft'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            })

            $.ajax({
                    type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                    url: url, // the url where we want to POST
                    /*data: { 'old_password': old_password, 'new_password': new_password, 'confirm_password': confirm_password },*/ // our data object
                    dataType: 'json', // what type of data do we expect back from the server
                    async: true
                })
                // using the done promise callback
                .done(function (rs, textStatus, jqXHR) {
                    // nreceive the response after sending the request
                    swal.close();
                    response = jqXHR.responseText;
                    response = JSON.parse(response);

                    //Swal.fire("Success", response.status_message, "success");
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: response.status,
                        text: response.status_message,
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Ok',
                        showClass: {
                            popup: 'animate__animated animate__zoomInUp'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        },
                       
                    }).then((result) => {
                        window.location.reload(true);
                        return;
                    });
                    

                })
                // using the fail promise callback
                .fail(function (jqXHR, textStatus, errorThrown) {
                    swal.close();
                    var error_message = "";
                    error_message = jqXHR.statusText;
                    try {
                        if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                            error_message = jqXHR.responseJSON.status_message;
                        }
                    } catch (error) {
                        // Handle the error
                    }
                
                    if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                        const errors = jqXHR.responseJSON.errors;
                        let errorMessages = [];
                        Object.keys(errors).forEach((key) => {
                            const messages = errors[key];
                            messages.forEach((message) => {
                                errorMessages.push(message);
                            });
                        });
                        notif({
                            msg: errorMessages.join('<br>'),
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    } else {
                        notif({
                            msg: error_message,
                            showHideTransition: 'slide',
                            type: 'error',
                            position: 'right'
                        });
                    }
                });
        } else {
            notif({
                // heading: 'Error',
                msg: 'Process terminated',
                showHideTransition: 'slide',
                type: 'error',
                position: 'right'
            });

            return;
        }
    });
}



/*
This function accepts information and presents it to the user for reading
1. url : the link/api to fetch the information (optional)
2. message : information to send if url is not required (optional)

*/

function popup_message(url = "", message = "") {
    let response = [];



    if ((url != "" || message != "")) {



        switch (true) {
            case (( typeof url === 'undefined' || url === null || url === '') && (!( typeof message === 'undefined' || message === null || message === ''))):

                let mymessages = message.split("|");
                let message_display = "";

                Object.entries(mymessages).forEach(
                    ([key, value]) => message_display += '<div class="row">' +
                    '<div class="col-md-12 col-l-12 col-xl-12">' +
                    '<div class="alert alert-info fade show  animate__animated  animate__slideInDown" role="alert">' +
                    value +
                    '</div><br>' +
                    '</div>' +
                    '</div>'
                );

                Swal.fire({
                    position: 'center',
                    title: 'Urgent',
                    html: message_display,
                    allowOutsideClick: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Seen',
                    showClass: {
                        popup: 'animate__animated animate__zoomInUp'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                    /*showLoaderOnConfirm: true,*/
                }).then((result) => {
                    if (result.isConfirmed) {


                    }
                });


                return;

            case ( typeof message === 'undefined' || message === null || message === '' && (!( typeof url === 'undefined' || url === null || url === ''))):


                //initialise loading
                Swal.fire({
                    title: 'Checking Credentials',
                    allowOutsideClick: false,
                    html: '<p><center>Please wait...</center></p>',
                    didOpen: () => {
                        swal.showLoading()
                    },
                    showClass: {
                        popup: 'animate__animated animate__bounceInLeft'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })

                $.ajax({
                        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
                        url: url, // the url where we want to POST
                        //data: { 'old_password': old_password, 'new_password': new_password, 'confirm_password': confirm_password }, // our data object
                        dataType: 'json', // what type of data do we expect back from the server
                        async: true
                    })
                    // using the done promise callback
                    .done(function (rs, textStatus, jqXHR) {
                        // nreceive the response after sending the request
                        swal.close();
                        response = jqXHR.responseText;
                        response = JSON.parse(response);

                        Swal.fire({
                            position: 'center',
                            title: 'Urgent',
                            html: '<div class="row">' +
                                '<div class="col-md-12 col-l-12 col-xl-12">' +
                                '<div class="alert alert-info fade show  animate__animated  animate__slideInDown" role="alert">' +
                                response.status_message +
                                '</div><br>' +
                                '</div>' +
                                '</div>',
                            allowOutsideClick: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Seen',
                            showClass: {
                                popup: 'animate__animated animate__zoomInUp'
                            },
                            hideClass: {
                                popup: 'animate__animated animate__fadeOutUp'
                            }
                            /*showLoaderOnConfirm: true,*/
                        }).then((result) => {
                            if (result.isConfirmed) {


                            }
                        });

                        return;

                    })
                    // using the fail promise callback
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        swal.close();
                        var error_message = "";
                        error_message = jqXHR.statusText;
                        try {
                            if (! (typeof jqXHR.responseJSON.status_message === 'undefined' || jqXHR.responseJSON.status_message === null)) {
                                error_message = jqXHR.responseJSON.status_message;
                            }
                        } catch (error) {
                            // Handle the error
                        }
                    
                        if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
                            const errors = jqXHR.responseJSON.errors;
                            let errorMessages = [];
                            Object.keys(errors).forEach((key) => {
                                const messages = errors[key];
                                messages.forEach((message) => {
                                    errorMessages.push(message);
                                });
                            });
                            notif({
                                msg: errorMessages.join('<br>'),
                                showHideTransition: 'slide',
                                type: 'error',
                                position: 'right'
                            });
                        } else {
                            notif({
                                msg: error_message,
                                showHideTransition: 'slide',
                                type: 'error',
                                position: 'right'
                            });
                        }
                    });


                return;

            default:
                return;
        }

    }


}





function get_div_as_jpg(div_id, preview_div, download_button_id) {

    // Convert the div to image (canvas)
    html2canvas(document.getElementById(div_id) /*,{width: 1036,height: 1849 }*/ ).then(function (canvas) {

        var dl = document.createElement('a');
        dl.setAttribute('href', canvas.toDataURL("image/jpg", 1));
        dl.setAttribute('download', 'image.jpg');
        dl.click();

    });


    /*html2canvas(document.getElementById(div_id), {
      onrendered: function(canvas) {
        var  _canvas = document.createElement("canvas");
        _canvas.setAttribute('width', 1080);
        _canvas.setAttribute('height', 1920);
        var ctx = _canvas.getContext('2d');
        ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, 1080, 1920);
        var dataURL = _canvas.toDataURL();  

        var dl = document.createElement('a');
          dl.setAttribute('href', _canvas.toDataURL("image/jpeg", 1));
          dl.setAttribute('download', 'image.jpeg');
          dl.click();
      },
      useCORS: true
    });*/


}





function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}





function observe() {

    //Toastz('info', "Nodes","here");
    const observer = new MutationObserver(function (mutations_list) {
        mutations_list.forEach(function (mutation) {

            mutation.addedNodes.forEach(function (added_node) {

                if (added_node.id == 'staff_idcard_details') {

                    //Toastz('info', "Nodes","Seen");

                    var element = document.getElementById("qrcode");
                    var content_to_use = document.getElementById("qr_content").innerHTML;

                    var bodyElement = document.body;
                    if (element.lastChild) {

                        element.replaceChild(showQRCode(content_to_use), element.lastChild);

                    } else {
                        element.appendChild(showQRCode(content_to_use));

                    }
                    //observer.disconnect();
                }




            });
        });
    });

    observer.observe(document.querySelector("#staff_fill"), {
        subtree: false,
        childList: true
    });


}



function message_observer(new_message) {

    //Toastz('info', "Nodes","here");
    const observer = new MutationObserver(function (mutations_list) {
        mutations_list.forEach(function (mutation) {

            mutation.addedNodes.forEach(function (added_node) {

                if (added_node.id == 'profile_settings_module') {

                    popup_message('', new_message);

                }


            });
        });
    });

    observer.observe(document.querySelector('#component_space'), {
        subtree: false,
        childList: true
    });

}



function not_allowed() {
    notif({
        // heading: 'Error',
        msg: 'Action not allowed',
        showHideTransition: 'slide',
        type: 'error',
        position: 'right'
    });
    return false;
}


function toggle(className, displayState) {
    let elements = document.getElementsByClassName(className);

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.display = displayState;
    }
}


function toggle_datatable(table_id) {

    $('#'+table_id).DataTable({
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print','colvis'
        ]
    });
}


// $( document ).on( "ajaxError", function() {
//     console.log( "Triggered ajaxError handler." );
//   } );





//prevent code inspection
/*document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    Toastz('danger', 'You Can not Do This!', '');
});

document.onkeydown = function(e) {

    if (event.keyCode == 123) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }
    /*if (e.ctrlKey && e.keyCode == 'C'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }

    if (e.ctrlKey && e.keyCode == 'V'.charCodeAt(0)) {
        Toastz('danger', 'You Can not Do This!', '');
        return false;
    }*/
//}