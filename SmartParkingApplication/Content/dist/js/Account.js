
$(document).ready(function () {
    LoadDataAccount();
});

//Function for getting data to fill in modal UpdateRole base on AccountID
function getAccountModalRole(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.UserID);
            $('#FullNameEdit').val(result.Name);
            $('#DateOfBirthEdit').val(result.dateOfBirth);
            $('#AddressEdit').val(result.UserAddress);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneNumberEdit').val(result.Phone);
            $('#EmailEdit').val(result.email);
            $('#StatusOfWorkingEdit').val(result.StatusOfwork);
            $('#AccountID').val(result.AccountID);
            $('#myModalUserEdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

//Function for getting data to fill in modal UpdatePassword base on AccountID
function getAccountModalPassword(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.UserID);
            $('#FullNameEdit').val(result.Name);
            $('#DateOfBirthEdit').val(result.dateOfBirth);
            $('#AddressEdit').val(result.UserAddress);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneNumberEdit').val(result.Phone);
            $('#EmailEdit').val(result.email);
            $('#StatusOfWorkingEdit').val(result.StatusOfwork);
            $('#AccountID').val(result.AccountID);
            $('#myModalUserEdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

//Function for getting data to fill in modal UpdateStatus base on AccountID
function getAccountModalStatus(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.UserID);
            $('#FullNameEdit').val(result.Name);
            $('#DateOfBirthEdit').val(result.dateOfBirth);
            $('#AddressEdit').val(result.UserAddress);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneNumberEdit').val(result.Phone);
            $('#EmailEdit').val(result.email);
            $('#StatusOfWorkingEdit').val(result.StatusOfwork);
            $('#AccountID').val(result.AccountID);
            $('#myModalUserEdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}


function LoadDataAccount() {
    $.ajax({
        url: "/ManageAccount/LoadDataAccount",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.UserName + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.status + '</td>';
                switch (item.StatusOfAccount) {
                    case 0:
                        html += '<td><button class="btn btn-primary" onclick = "return getAccountModalRole(' + item.UserID + ')">Phân lại quyền</button><button class="btn btn-warning" style="margin-left:1px" onclick = "return getAccountModalPassword(' + item.UserID + ')">Đặt lại mật khẩu</button><button class="btn btn-danger" style="margin-left:1px" onclick = "return getAccountModalStatus(' + item.UserID + ')">Khóa tài khoản</button></td>';
                        break;
                    case 1:
                        html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button></td>';
                        break;
                }
                html += '</tr>';
            });
            $('#tbodyAccount').html(html);

            $("#tbAccount").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbAccount_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function
function Add() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var empObj = {
        Name: $('#FullName').val(),
        DateOfBirth: $('#DateOfBirth').val(),
        Gender: $('#cbGender').val(),
        UserAddress: $('#Address').val(),
        Phone: $('#PhoneNumber').val(),
        email: $('#Email').val(),
        IdentityCard: $('#IdentityCard').val(),
        ContractSigningDate: $('#ContractSigningDate').val(),
        ContractExpirationDate: $('#ContractExpirationDate').val(),
        StatusOfWork: 1,
        AccountID: $('#cbAccountAdd').val(),
        ParkingPlaceID: $('#cbparkingPlaceU').val(),

    };
    $.ajax({
        url: "/ManageUser/Create",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalUser').modal('hide');
            $('#tbUser').DataTable().clear().destroy();
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function for updating employee's record
function Update() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
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
        AccountID: $('#StatusOfWorkingEdit').val(),
        ParkingPlaceID: $('#cbparkingPlaceUEdit').val(),

    };
    $.ajax({
        url: "/ManageUser/Update",
        data: JSON.stringify(empObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalUserEdit').modal('hide');
            $('#tbUser').DataTable().clear().destroy();
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}