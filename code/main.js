function returnwasset(){
    alert('return sent');
    $.ajax({
        type: "GET",
        url: "server.php",
        data: somedata,
        success: function(){
            // echo what the server sent back...
        }
    });
}