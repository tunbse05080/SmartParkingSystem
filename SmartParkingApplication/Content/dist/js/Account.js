﻿$(document).ready(function () {
    LoadDataAccount();
});

//fill UserID to modal CreateAccount
function getModalAddAccount(UserID) {
    $('#UserIDAcc').val(UserID);
    $('#myModalAccount').modal('show');
}

//fill AccountID to modal UpdateRole
function getAccountModalRole(AccountID) {
    $('#AccountIDEdit').val(AccountID);
    $('#myModalRoleAccountEdit').modal('show');
}

//fill AccountID to modal reset password
function getAccountModalPassword(AccountID) {
    $('#AccountIDPasEdit').val(AccountID);
    $('#myModalPassAccountEdit').modal('show');
}

//fill AccountID to modal lock account
function getAccountModalLock(AccountID) {
    $('#AccountIDLockAccEdit').val(AccountID);
    $('#myModalLockAccountEdit').modal('show');
}

//fill AccountID to modal unlock account
function getAccountModalUnlock(AccountID) {
    $('#AccountIDUnlockAccEdit').val(AccountID);
    $('#myModalUnlockAccountEdit').modal('show');
}

//load Info user and account
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
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.IdentityCard + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.status + '</td>';
                if (item.status == "Trống") {
                    html += '<td><button class="btn btn-primary" onclick = "return getModalAddAccount(' + item.UserID + ')">Thêm tài khoản</button></td>';
                } else {
                    switch (item.StatusOfAccount) {
                        case 0:
                            html += '<td><button class="btn btn-primary" onclick = "return getAccountModalRole(' + item.AccountID + ')">Phân lại quyền</button><button class="btn btn-warning" style="margin-left:1px" onclick = "return getAccountModalPassword(' + item.AccountID + ')">Đặt lại mật khẩu</button><button class="btn btn-danger" style="margin-left:1px" onclick = "return getAccountModalLock(' + item.AccountID + ')">Khóa tài khoản</button></td>';
                            break;
                        case 1:
                            html += '<td><button class="btn btn-warning" style="margin-left:1px" onclick = "return getAccountModalUnlock(' + item.AccountID + ')">Mở khóa tài khoản</button></td>';
                            break;
                    }
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

//send new obj account and userid to ManageAccount to update accountId in user
function AddAccount() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var UserID = $('#UserIDAcc').val();
    var accObj = {
        UserName: $('#UserNameAcc').val(),
        PassWord: $('#PassWordAcc').val(),
        RoleID: $('#cbRoleNameAcc').val(),
        StatusOfAccount: 0
    };
    $.ajax({
        url: "/ManageAccount/CheckUserToAdd",
        data: JSON.stringify({ account: accObj, UserID: UserID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //AddAccountForUser(result.AccountID, result.UserID);
            $('#myModalAccount').modal('hide');
            $('#tbAccount').DataTable().clear().destroy();
            LoadDataAccount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update role for account base on RoleID and AccountID
function UpdateRole() {
    var AccountID = $('#AccountIDEdit').val();
    var RoleID = $('#cbRoleNameREdit').val();
    $.ajax({
        url: "/ManageAccount/CheckAccToUpdateRole",
        data: JSON.stringify({ AccountID: AccountID, RoleID: RoleID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            //AddAccountForUser(result.AccountID, result.UserID);
            $('#myModalRoleAccountEdit').modal('hide');
            $('#tbAccount').DataTable().clear().destroy();
            LoadDataAccount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Reset password for account base on AccountID
function UpdatePassword() {
    var AccountID = $('#AccountIDPasEdit').val();
    $.ajax({
        url: "/ManageAccount/CheckAccToResetPass",
        data: JSON.stringify({ AccountID: AccountID }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalPassAccountEdit').modal('hide');
            $('#tbAccount').DataTable().clear().destroy();
            LoadDataAccount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update status for account base on AccountID
function UpdateStatus(status) {
    if (status == 1) {
        var AccountID = $('#AccountIDLockAccEdit').val();
        var Status = 1;
    } else {
        var AccountID = $('#AccountIDUnlockAccEdit').val();
        var Status = 0;
    }
    $.ajax({
        url: "/ManageAccount/CheckAccToUpdateStatus",
        data: JSON.stringify({ AccountID: AccountID, Status: Status }),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.StatusOfAccount == 0) {
                $('#myModalUnlockAccountEdit').modal('hide');
            } else {
                $('#myModalLockAccountEdit').modal('hide');
            }
            $('#tbAccount').DataTable().clear().destroy();
            LoadDataAccount();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//Valdidation using jquery
function validateAccEdit() {
    var isValid = true;
    var email = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
    var pwd = new RegExp('(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    var idcard = new RegExp('^[0-9]{9,}$');
    var phone = new RegExp('^(09|03|07|08|05){1}([0-9]{8})$');
    if ($.trim($('#UserName').val()) == "" || $.trim($('#UserName').val()).length < 4) {
        $('#UserName').prop("title", "Tên tài khoản > 4 ký tự.");
        $('#UserName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#UserName').prop("title", "");
        $('#UserName').css('border-color', 'lightgrey');
    }
    if ($.trim($('#PassWord').val()) == "" || !pwd.test($.trim($('#PassWord').val()))) {
        $('#PassWord').prop("title", "Mật khấu >= 6 ký tự (chữ hoa, thường, số, ký tự đặc biệt.)");
        $('#PassWord').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PassWord').prop("title", "");
        $('#PassWord').css('border-color', 'lightgrey');
    }
    if ($.trim($('#FullName').val()) == "" || $.trim($('#FullName').val()).length < 4) {
        $('#FullName').prop("title", "Tên đầy đủ > 4 ký tự.");
        $('#FullName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FullName').prop("title", "");
        $('#FullName').css('border-color', 'lightgrey');
    }
    if ($.trim($('#DateOfBirth').val()) == "") {
        $('#DateOfBirth').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#DateOfBirth').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Gender').val()) == "") {
        $('#Gender').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Gender').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Address').val()) == "") {
        $('#Address').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Address').css('border-color', 'lightgrey');
    }
    if ($.trim($('#PhoneNumber').val()) == "" || !phone.test($.trim($('#PhoneNumber').val()))) {
        $('#PhoneNumber').prop("title", "Số điện thoại trống hoặc định dạng sai.");
        $('#PhoneNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#PhoneNumber').prop("title", "");
        $('#PhoneNumber').css('border-color', 'lightgrey');
    }
    if ($.trim($('#Email').val()) == "" || !email.test($.trim($('#Email').val()))) {
        $('#Email').prop("title", "Email trống hoặc không đúng định dạng.");
        $('#Email').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#Email').prop("title", "");
        $('#Email').css('border-color', 'lightgrey');
    }
    if ($.trim($('#IdentityCard').val()) == "" || !idcard.test($.trim($('#IdentityCard').val()))) {
        $('#IdentityCard').prop("title", "CMND/CCCD trống hoặc sai định dạng.");
        $('#IdentityCard').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#IdentityCard').prop("title", "")
        $('#IdentityCard').css('border-color', 'lightgrey');
    }
    if ($.trim($('#ParkingPlace').val()) == "") {
        $('#ParkingPlace').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#ParkingPlace').css('border-color', 'lightgrey');
    }
    if ($.trim($('#RoleName').val()) == "") {
        $('#RoleName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RoleName').css('border-color', 'lightgrey');
    }
    return isValid;
}
