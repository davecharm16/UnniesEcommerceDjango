$('.plus-cart').click(function(e) {
    e.preventDefault();

    var token = $("input[name=csrfmiddlewaretoken]").val();
    var id = parseInt($(this).parent().parent().parent().attr("data-cartId"));
    var qty = parseInt($(this).parent().find('.quantity').text());
    // qty += 1;


    $.ajax({
        headers: { "X-CSRFToken": token },
        type: "POST",
        url: $('.cart-item').attr('action'),
        data: {
            prod_id: id,
        },
        dataType: "json",
        success: function(response) {
            if (response.success == 'success') {
                $(this).parent().find('.quantity').text(response.prod_qty);
                console.log("yes")
            } else {
                alert("there is something wrong in backend");
            }
        }
    });
});