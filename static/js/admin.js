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
            alert('1 product created');
        }
    });
})