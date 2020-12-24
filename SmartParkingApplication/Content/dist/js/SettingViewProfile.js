//$(document).ready(function () {
//    getSVDetailByID();
    
//});
function getSVDetailByID() {
    $.ajax({
        
        url: "/Setting/Details",
        type: "GET",
        contentType: "application/json" + UserID,
        dataType: "json",
        success: function (result) {
            $('#email').val(result.email);
            $('#DateOfBirth').val(result.DateOfBirth);
            $('#Gender').val(result.Gender);
            $('#Name').val(result.Name);
            $('#Phone').val(result.Phone);
            $('#UserAddress').val(result.UserAddress);
     

           

        },
        error: function (errormessage) {
            alert("Exception:" + UserID + errormessage.responseText);
        }
    });
    return false;
}