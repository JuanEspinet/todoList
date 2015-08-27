var currentKey;
$(document).ready(function(){
  // Set up unique key numbering for localStorage
  currentKey = getKeyList();
  // Check to see whether local storage library has any values and populate list on page load
  if (currentKey === 0) {
    populateDefault();
  };
  populateInitial();
  // Visibility function for add item input.
  $('form').hide();
  $('img.menu').click(function(){
    $('form').toggle(250);
  });
  // Add and style new items
  $('button').click(addTodo); 
  // Completed items animations/styling
  $('#theList').on('click', '.completeItem', function(){
    $(this).parent().addClass('complete').fadeOut(3000,function(){
      $(this).remove();
    });
  });
});
// Read master key list for current key index
function getKeyList(){
  if (!localStorage.getItem('keys')){
    // Generate current key index if no existing index is found
    localStorage.setItem('keys', 0);
  }
  var keys = parseInt(localStorage.getItem('keys'));
  return(
    keys
  );  
};
// Add default list items to Local Storage
function populateDefault(){
  var initialList = {
    item3:"Lorem ipsum dolor sit amet, consectetuer adipiscing elit.",
    item2:"Aliquam tincidunt mauris eu risus.",
    item1:"Vestibulum auctor dapibus neque."
  };
  $.each(initialList, function(index, item){
    localStorage.setItem(index, item);
    currentKey += 1;
    localStorage.setItem('keys', currentKey);
  });
};
// Add all items from local storage to the list
function populateInitial(){
  for (i = 1; i <= currentKey; i++){
    var itemName = 'item' + i;
    var currentItem = localStorage.getItem(itemName);
    if (!currentItem){
      // Skip null items
      continue;
    };
    $('#theList').prepend($('<li>').html('<input type="checkbox" class="completeItem">' + currentItem));
  };
};
// Add new item to the document and save that item to local storage
function addTodo(){
  var todo = $('input[name="todo"]').val();
  $newListItem = $('<li>').html('<input type="checkbox" class="completeItem">' + todo).addClass("highlight");
  $('#theList').prepend($newListItem); 
  $newListItem.removeClass("highlight", 1000);
  currentKey += 1;
  localStorage.setItem('item' + currentKey, todo);
  localStorage.setItem('keys', currentKey);
  event.preventDefault();
};
// Remove item from the document and from local storage