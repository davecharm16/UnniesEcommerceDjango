// window.addEventListener("load", get_products);

function get_products() {
    $('#product_type_form').submit()
}

$('select[name="productType"]').change(get_products)