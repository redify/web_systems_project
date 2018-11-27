function getCurrentTemp(){
    console.log('fetching data from mysql...');
    $.ajax({
        type: "GET",
        url: "php/getobsdata.php",
        data: "",
        success: function(data){
            console.log("returned data: " + data);
            // echo what the server sent back...
        }
    });
}