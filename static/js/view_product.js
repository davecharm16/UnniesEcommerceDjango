$('.add-cart').click(function(e) {
    e.preventDefault();
    let prod_id = parseInt($('.item-title').attr('data-id'))
    console.log(prod_id)
    let qty = parseInt($('.quantity').text())
    console.log(qty)
    var token = $("input[name=csrfmiddlewaretoken]").val();
    $.ajax({
        headers: { "X-CSRFToken": token },
        type: "POST",
        url: $('.add-form').attr('action'),
        data: {
            prod_id: prod_id,
            qty: qty,
        },
        success: function(response) {
            console.log("YOw")
        }
    });
});