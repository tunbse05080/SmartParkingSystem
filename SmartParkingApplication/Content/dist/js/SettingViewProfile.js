function getSVDetailByID(UserID,AccountID) {
    $.ajax({
        url: "/Setting/SVDetails/" + UserID, AccountID,
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
            alert("Exception:" + UserID + errormessage.responseText);
        }
    });
    return false;
}