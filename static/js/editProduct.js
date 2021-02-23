function deleteDisable() {
    console.log($('.formset-edit > p').eq(1).children());
    var del = $('.formset-edit > p').eq(1);
    // del.children().eq(0).css("text-decoration", "line-through");
    del.children().eq(1).prop("disabled", true);

}
deleteDisable()