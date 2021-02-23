// $('#form-addProduct').on('submit', function(e) {
//     e.preventDefault();
//     $.ajax({
//         type: 'POST',
//         url: '/addProduct/',
//         data: this.serialize(),
//         dataType: 'json',
//         success: function(data) {
//             if (data.is_valid) {
//                 alert(data.success_message);
//             }
//         }
//     });
// })

$('.en-submit-test').click(function(e) {
    form = $('#form-addProduct')
    e.preventDefault();
    var token = $("input[name=csrfmiddlewaretoken]").val();
    var fd = new FormData(document.getElementById("form-addProduct"));
    $.ajax({
        headers: { "X-CSRFToken": token },
        type: "post",
        url: form.attr('action'),
        contentType: false,
        processData: false,
        data: fd,
        dataType: "json",
        success: function(response) {
            if (response.error) {
                alert(response.error);
            } else if (response.product_error) {
                error = JSON.parse(response.product_error)
                addingError(error);
            } else {
                $('.error').text("");
                alert(response.product + "added to products");
                form.trigger("reset");
                $('#product-main').load(location.href + "viewProduct");
            }
        }
    });
})

function addingError(error) {
    $('.error').text("");
    Object.keys(error).forEach(element => {
        error_message = error[element][0].message;
        // error_field = $('.er-`${element}`').text("`${error['element']}`")
        $(`.er-${element}`).text(error_message);
    });
}