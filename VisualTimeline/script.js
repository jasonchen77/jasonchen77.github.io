$('#search').keyup(function() {
  var searchField = $('#search').val();
  var myExp = new RegExp(searchField, "i");
  $.getJSON('data.json', function(data) {
    var output = '<ul class="searchResults">';
    $.each(data, function(key, val) {
      if (val.name.search(myExp) != -1) {
        output += '<li>';
        output += '<h2>' + val.name + '</h2>';
        output += '<img src="images/' + val.shortname +'.jpg" alt="'+val.name +'"/>';
        output += '</li>';
      }
    });
    output += '</ul>';
    $('#indexBody').html(output);
});
});
