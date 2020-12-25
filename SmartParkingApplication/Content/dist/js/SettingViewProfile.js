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
function ComboboxGender() {
    $.ajax({
        url: "/ManageUser/ComboboxGender",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 0;
            $.each(result, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbGender").html(html);
            $("#cbGenderEdit").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function UpdateUserView() {

    var empObj = {
        UserID: $('#IdEdit').val(),
        Name: $('#FullNameEdit').val(),
        DateOfBirth: $('#DateOfBirthEdit').val(),
        Gender: $('#cbGenderEdit').val(),
        UserAddress: $('#AddressEdit').val(),
        Phone: $('#PhoneNumberEdit').val(),
        email: $('#EmailEdit').val(),
        IdentityCard: $('#IdentityCardEdit').val(),
        StatusOfWork: $('#StatusOfWorkingEdit').val(),
        AccountID: $('#AccountID').val(),
        ParkingPlaceID: $('#cbparkingPlaceUEdit').val(),

    };
    $.ajax({
        url: "/ManageUser/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}