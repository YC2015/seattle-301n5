/*webDB*/
(function(module) {

  // TODO: Write the code to populate your filters, and enable the search queries here in search.js
  (function() {
    //$('#state-select').attr('disabled', true);
    webDB.execute('SELECT DISTINCT state FROM zips ORDER BY state', function(stateresults){
      stateresults.forEach(function(row){
        var staterow = '<option value = '+row.state+'>'+row.state+'</option>'
        $('#state-select').append(staterow);
      })
    })
  })();

  $('#state-select').on('change',function(){
    $('#renew').siblings().remove();
    webDB.execute ('SELECT DISTINCT city FROM zips WHERE state = "'+$(this).val()+'" ORDER BY city', function(row){
      if(row)
        $('#city-select').removeAttr('disabled');
      row.forEach(function(row){
        var cityrow = '<option value = '+row.city+'>'+row.city+'</option>'
        $('#city-select').append(cityrow);
      })
    })
  })
  $('#city-select').on('change', function(e) {
    webDB.execute(
      'SELECT * FROM zips WHERE state="' + $('#state-select').val() + '" AND city="' + $(this).val() + '"',
      function(row) {
        initMap(row);
    })
  })
  $('#zipco').on('submit', function(e) {
    e.preventDefault();
    webDB.execute('SELECT * FROM zips WHERE zip =' + e.target.zip.value, function(row) {
      initMap(row);
    })
  })
// TODO: You will also interact with the map.js file here

})(window)
