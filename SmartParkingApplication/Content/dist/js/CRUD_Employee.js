//Function for getting detail data base on EmployeeID
function getByID(EmployeeID) {
    $('#Id').css('border-color', 'lightgrey');
    $('#UserName').css('border-color', 'lightgrey');
    $('#FullName').css('border-color', 'lightgrey');
    $('#DateOfBirth').css('border-color', 'lightgrey');
    $('#Gender').css('border-color', 'lightgrey');
    $('#Address').css('border-color', 'lightgrey');
    $('#IdentityCard').css('border-color', 'lightgrey');
    $('#PhoneNumber').css('border-color', 'lightgrey');
    $('#Email').css('border-color', 'lightgrey');
    $('#RoleName').css('border-color', 'lightgrey');
    $('#ParkingPlace').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ManageUser/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#Id').val(result.UserID)
            $('#UserName').val(result.UserName)
            $('#FullName').val(result.Name)
            $('#DateOfBirth').val(result.dateOfBirth)
            $('#Gender').val(result.gender)
            $('#Address').val(result.UserAddress)
            $('#IdentityCard').val(result.IdentityCard)
            $('#PhoneNumber').val(result.Phone)
            $('#Email').val(result.email)
            $('#RoleName').val(result.RoleName)
            $('#ParkingPlace').val(result.NameOfParking)

            $('#myModal').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').hide();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

function DropContract(EmployeeID) {
    $.ajax({
        url: "/ManageUser/DropContract/" + EmployeeID,
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('pDrop').text("Chấm dứt hợp đồng thành công!");
            $('btnDrop').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    })
}