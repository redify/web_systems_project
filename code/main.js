$( document ).ready(function() {
    console.log( "document loaded" );
  
    getCurrentObsData();
    getDayRangeCurrentObsData();
  });
  
  function getCurrentObsData(){
      console.log('fetching current obs...');
      $.ajax({
          type: "GET",
          url: "php/getobsdata.php",
          data: "",
          success: function(data){
              console.log("returned data: " + data);
              // echo what the server sent back...
              $("#MainContentPanel #currentobs").html(data);
          },
          complete: function() {
            //set timeout and repeat ajax call to auto-update page
            setTimeout(getCurrentObsData, 180000);
          }
      });
  }
  
  
  function getDayRangeCurrentObsData(){
      console.log('fetching historical obs...');
      $.ajax({
          type: "GET",
          url: "php/range_get_obs_data.php",
          data: "",
          success: function(data){
              console.log("returned data: " + data);
              // echo what the server sent back...
              $("#MainContentPanel #rangeobs").html(data);
          },
          complete: function() {
            //set timeout and repeat ajax call to auto-update page
            setTimeout(getDayRangeCurrentObsData, 180000);
          },
          error: function(error){
            console.log("somethign went wrong with the historical fetch");
          }
      });
  }