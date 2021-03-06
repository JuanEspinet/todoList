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
  $('#the_button').click(addTodo); 
  $('#the_clear_button').click(clearList);
  // Completed items animations/styling
  $('#theList').on('click', '.completeItem', removeTodo);
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
    $('#theList').prepend($('<li>').html('<input type="checkbox" class="completeItem">' + currentItem).attr('id', itemName));
  };
};

// Add new item to the document and save that item to local storage
function addTodo(){
  var todo = $('input[name="todo"]').val();
  $newListItem = $('<li>').html('<input type="checkbox" class="completeItem">' + todo).addClass("highlight").attr('id', 'item' + currentKey);
  $('#theList').prepend($newListItem); 
  $newListItem.removeClass("highlight", 1000);
  localStorage.setItem('item' + currentKey, todo);
  currentKey += 1;
  localStorage.setItem('keys', currentKey);
  event.preventDefault();
};

// Remove item from the document and from local storage
function removeTodo(){
  $(this).parent().addClass('complete').fadeOut(500,function(){
    var itemID = $(this).attr('id');
    $(this).remove();
    localStorage.removeItem(itemID);
  });
};

// Clear all items from list and local storage
function clearList(){
  if(confirm("Are you sure you want to clear your To Do list?")){
    $('.completeItem').each(removeTodo);
  };
  event.preventDefault();
};