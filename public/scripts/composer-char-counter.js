$(function(){
  $('.new-tweet > form > textarea').on('keyup', function(){
    const counter = $(this).closest('form').children('.counter');
    counter.text(140-this.value.length);
    if (this.value.length > 140){
      counter.addClass('overflow');
    } else {
      counter.removeClass('overflow');
    }
  });
});