﻿
$(document).ready(function () {
    loadData();
    loadDateNow();
});

var pageConfig = 1;

function loadDateNow() {
    // body...
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("ContractSigningDate").defaultValue = today + " 12:00:00AM";
}


//Function for getting data base on EmployeeID
function getByID(EmployeeID) {
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
            $('#ContractSigningDate').val(result.contractSigningDate);
            $('#ContractExpirationDate').val(result.contractExpirationDate);

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
//Function for getting detail data base on EmployeeID
function getDetailByID(EmployeeID) {
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
            $('#ContractSigningDateD').val(result.contractSigningDate);
            $('#ContractExpirationDateD').val(result.contractExpirationDate);

            $('#myModalDetail').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}
//Function for getting detail data base on EmployeeID
function getIdToDropContract() {
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
            $('#btnDrop').show();
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
        data: {
            page: pageConfig,
            pageSize: 5
        },
        dataType: "json",
        success: function (result) {
            var data = result.data;
            var html = '';
            $.each(data, function (key, item) {
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
            paging(result.total, function () {
                loadData();
            });
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function paging(totalRow, callback) {
    var totalPage = Math.ceil(totalRow / 5)
    $('#pagination').twbsPagination({
        totalPages: totalPage,
        visiblePages: 10,
        onPageClick: function (event, page) {
            pageConfig = page;
            setTimeout(callback, 200);
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
        PassWork: $('#PassWord').val(),
        DateOfBirth: $('#DateOfBirth').val(),
        Gender: $('#Gender').val(),
        UserAddress: $('#Address').val(),
        Phone: $('#PhoneNumber').val(),
        email: $('#Email').val(),
        IdentityCard: $('#IdentityCard').val(),
        ContractSigningDate: $('#ContractSigningDate').val(),
        ContractExpirationDate: $('#ContractExpirationDate').val(),
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
        ContractSigningDate: $('#ContractSigningDate').val(),
        ContractExpirationDate: $('#ContractExpirationDate').val(),
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
    if ($('#PassWord').val().trim() == "") {
        $('#PassWord').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PassWord').css('border-color', 'lightgrey');
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
    if ($('#ParkingPlace').val().trim() == "") {
        $('#ParkingPlace').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ParkingPlace').css('border-color', 'lightgrey');
    }
    if ($('#RoleName').val().trim() == "") {
        $('#RoleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoleName').css('border-color', 'lightgrey');
    }
    return isValid;
}