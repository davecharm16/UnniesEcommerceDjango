// console.log("hello");

$('input[name="username"]').change(checkUsernameAndEmail);
$('input[name="email"]').change(checkUsernameAndEmail);


function checkUsernameAndEmail() {
    username = $('input[name="username"]').val()
    email = $('input[name="email"]').val()

    $.ajax({
        type: "get",
        url: $('form').attr('action'),
        data: {
            username: username,
            email: email,
        },
        success: function(response) {
            // $('.error-username').text(response.message)
            responses = Object.keys(response)

            for (let key of responses) {
                let err_class = `.error-${key}`;
                $(err_class).text(response[key]);
            }

        }
    });
}

function checkPhonePassAndAddress() {
    $.ajax({
        type: "get",
        url: $('form').attr('action'),
        data: {

        },
        success: function(response) {
            // $('.error-username').text(response.message)
            responses = Object.keys(response)

            for (let key of responses) {
                let err_class = `.error-${key}`;
                $(err_class).text(response[key]);
            }

        }
    });
}

$('#form').on('submit', function(e) {
    e.preventDefault()
    var token = $("input[name=csrfmiddlewaretoken]").val();
    var data = new FormData(document.getElementById('form'));
    $.ajax({
        headers: { "X-CSRFToken": token },
        type: "POST",
        contentType: false,
        processData: false,
        url: "",
        data: data,
        dataType: "json",
        success: function(response) {
            if (response.success == 'success') {
                $('#form').trigger('reset')
                var path = $('.login-path').attr('href')
                alert("Succesfully Created Your Account!")
                console.log(path)
                window.location.href = path
            } else {
                user_error = JSON.parse(response.user_error)
                profile_error = JSON.parse(response.profile_error)
                    // console.log(user_error)
                try {
                    $('.error-password2').text(user_error.password2[0].message);
                } catch (error) {
                    $('.error-password2').text("");
                }
                keys = Object.keys(profile_error);
                if (keys.length != 0) {
                    for (let i = 0; i < keys.length; i++) {
                        var err_msg = profile_error[keys[i]][0].message;
                        console.log(err_msg);
                        $(`.error-${keys[i]}`).text(err_msg);
                    }
                } else {
                    $('.error-phone').text("");
                    $('.error-address').text("");
                }
            }

        }
    });
})