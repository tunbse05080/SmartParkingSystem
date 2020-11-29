$(document).ready(function () {
    loadData();
});

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
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

function getDetailByID(EmployeeID) {
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
            $('#IdD').val(result.UserID)
            $('#UserNameD').val(result.UserName)
            $('#FullNameD').val(result.Name)
            $('#DateOfBirthD').val(result.dateOfBirth)
            $('#GenderD').val(result.gender)
            $('#AddressD').val(result.UserAddress)
            $('#IdentityCardD').val(result.IdentityCard)
            $('#PhoneNumberD').val(result.Phone)
            $('#EmailD').val(result.email)
            $('#RoleNameD').val(result.RoleName)
            $('#ParkingPlaceD').val(result.NameOfParking)

            $('#myModalDetail').modal('show');
            $('#btnAdd').hide();
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

//Load Data function
function loadData() {
    $.ajax({
        url: "/ManageUser/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.DateOfBirth + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button> <button class="btn btn-success" onclick="return getByID(' + item.UserID + ')" > Sửa</button> <button class="btn btn-danger" data-toggle="modal" data-target="#myModalDropContract" onclick="return getByID(' + item.UserID + ')">Chấm dứt HĐ</button></td>';
                html += '</tr>';
            });
            $('.tbody').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        UserName: $('#UserName').val(),
        Name: $('#FullName').val(),
        Password: $('#Password').val(),
        DateOfBirth: $('#DateOfBirth').val(),
        Gender: $('#Gender').val(),
        UserAddress: $('#Address').val(),
        Phone: $('#PhoneNumber').val(),    
        email: $('#Email').val(),
        IdentityCard: $('#IdentityCard').val(),
        ContractSigningDate: $('ContractSigningDate').val(),
        ContractExpirationDate: $('ContractExpirationDate').val(),
        RoleID: $('#RoleName').val(),
        ParkingPlaceID: $('#ParkingPlace').val(),
    };
    $.ajax({
        url: "/ManageUser/Create",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating employee's record
function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empObj = {
        UserID: $('#Id').val(),
        UserName: $('#UserName').val(),
        Name: $('#FullName').val(),
        DateOfBirth: $('#DateOfBirth').val(),
        Gender: $('#Gender').val(),
        UserAddress: $('#Address').val(),
        Phone: $('#PhoneNumber').val(),
        email: $('#Email').val(),
        IdentityCard: $('#IdentityCard').val(),
        RoleID: $('#RoleName').val(),
        ParkingPlaceID: $('#ParkingPlace').val(),
    };
    $.ajax({
        url: "/ManageUser/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadData();
            $('#myModal').modal('hide');
            //$('#Id').val("");
            //$('#UserName').val("");
            //$('#FullName').val("");
            //$('#DateOfBirth').val("");
            //$('#Gender').val("");
            //$('#Address').val("");
            //$('#PhoneNumber').val("");
            //$('#Email').val("");
            //$('#IdentityCard').val("");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#Id').val("");
    $('#UserName').val("");
    $('#FullName').val("");
    $('#DateOfBirth').val("");
    $('#Gender').val("");
    $('#Address').val("");
    $('#PhoneNumber').val("");
    $('#Email').val("");
    $('#IdentityCard').val("");
    $('#RoleName').val("");
    $('#ParkingPlace').val("");
    $('#btnAdd').show();
    $('#btnUpdate').hide();
    //$('#Email').css('border-color', 'lightgrey');
    //$('#IdentityCard').css('border-color', 'lightgrey');
    //$('#State').css('border-color', 'lightgrey');
    //$('#Country').css('border-color', 'lightgrey');
}

//Valdidation using jquery
function validate() {
    var isValid = true;
    if ($('#UserName').val().trim() == "") {
        $('#UserName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserName').css('border-color', 'lightgrey');
    }
    if ($('#FullName').val().trim() == "") {
        $('#FullName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FullName').css('border-color', 'lightgrey');
    }
    if ($('#DateOfBirth').val().trim() == "") {
        $('#DateOfBirth').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateOfBirth').css('border-color', 'lightgrey');
    }
    if ($('#Gender').val().trim() == "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    if ($('#Address').val().trim() == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($('#PhoneNumber').val().trim() == "") {
        $('#PhoneNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PhoneNumber').css('border-color', 'lightgrey');
    }
    if ($('#Email').val().trim() == "") {
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($('#IdentityCard').val().trim() == "") {
        $('#IdentityCard').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdentityCard').css('border-color', 'lightgrey');
    }
    return isValid;
}