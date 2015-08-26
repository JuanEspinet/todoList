$(document).ready(function(){
  $('form').hide();
  $('img.menu').click(function(){
    $('form').toggle(250);
  });
  $('button').click(function(){
    var todo = $('input[name="todo"]').val();
    $newListItem = $('<li>').html('<input type="checkbox" class="completeItem">' + todo).addClass("highlight");
    $('#theList').prepend($newListItem); 
    $newListItem.removeClass("highlight", 1000);
    event.preventDefault();
  }); 
  $('#theList').on('click', '.completeItem', function(){
    $(this).parent().addClass('complete').fadeOut(3000,function(){
      $(this).remove();
    });
  });
});