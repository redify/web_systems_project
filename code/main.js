function returnwasset(){
    alert('javascript seems to work!  Sending message to php...');
    $.ajax({
        type: "GET",
        url: "php/server.php",
        data: "",
        success: function(data){
            console.log(data);
            // echo what the server sent back...
        }
    });
}