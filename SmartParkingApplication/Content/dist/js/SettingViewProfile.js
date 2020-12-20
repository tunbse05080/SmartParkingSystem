$(document).ready(function () {
    getSVDetailByID();
    
});
function getSVDetailByID() {
    $.ajax({
        
        url: "/Setting/SVDetails",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {

            $('#email').val(result.email);
            $('#DateOfBirth').val(result.DateOfBirth);
            $('#Gender').val(result.Gender);
            $('#Name').val(result.Name);
            $('#Phone').val(result.Phone);
            $('#UserAddress').val(result.UserAddress);
     

            $('#myModalSVDetail').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + AccountID + errormessage.responseText);
        }
    });
    return false;
}