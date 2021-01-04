
$(document).ready(function () {
    LoadDataAccount();
});

//fill UserID to modal CreateAccount
function getModalAddAccount(UserID) {
    clearForm();
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
    clearForm();
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

var checkExist;
//send new obj account and userid to ManageAccount to update accountId in user
function AddAccount() {
    var res = validateAddAcc();
    if (res == false) {
        return false;
    }
    checkExist = true;
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
            if (result == true) {
                validateAddAcc();
                checkExist = false;
                return false;
            } else {
                checkExist = true;
                $('#myModalAccount').modal("hide");
                $('#tbAccount').DataTable().clear().destroy();
                LoadDataAccount();
            }
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

var checkConfirmPass;
//Reset password for account base on AccountID
function UpdatePassword() {
    if ($('#AccountPasEdit').val() == $('#AccountPasEditConfirm').val()) {
        checkConfirmPass = true;
    } else {
        checkConfirmPass = false;
    }
    var res = validateEditPwd();
    if (res == false) {
        return false;
    }
    var AccountID = $('#AccountIDPasEdit').val();
    var Password = $('#AccountPasEdit').val();
    $.ajax({
        url: "/ManageAccount/CheckAccToResetPass",
        data: JSON.stringify({ AccountID: AccountID, Password: Password }),
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

//clear form register account
function clearForm() {
    $('.help-block').remove();
    $('.form-control').val('');
    $('.form-control').css('border-color', 'lightgrey');
}

//Valdidation using jquery
function validateAddAcc() {
    var pwd = new RegExp('((?!.*[\\s])(?=.*[A-Z])(?=.*[a-z])(?=.*[\\\\\!\@\#\$\&\*\+\-\/\[\\]\{\}\~\`\,\.\?\'\"\:\;\%\^\(\)\_\=\|])(?=.*\\d).{6,})');
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    //checkUserNameExist();
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set custom valid by rule
    $.validator.addMethod('checkAccPassWord', function (value, element) {
        return pwd.test(value);
    }, 'Mật khấu >= 6 ký tự (chữ hoa, thường, số, ký tự đặc biệt.)');
    $.validator.addMethod('checkAccUserName', function (value, element) {
        return $.trim(value).length > 4;
    }, 'Tên tài khoản > 4 ký tự.');

    $.validator.addMethod('checkAccUserNameExist', function (value, element) {
        return checkExist != true;
    }, 'Tên tài khoản đã tồn tại.');
    //Set rule + message for input by name
    $('#AddAccountForm').validate({
        rules: {
            UserNameAcc: {
                required: true,
                checkAccUserName: true,
                checkAccUserNameExist: true
            },
            PassWordAcc: {
                required: true,
                checkAccPassWord: true
            },
            cbRoleNameAcc: {
                required: true
            },

        },
        messages: {
            UserNameAcc: {
                required: '*Bắt buộc.'
            },
            PassWordAcc: {
                required: '*Bắt buộc.'
            },
            cbRoleNameAcc: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#AddAccountForm').valid();
}

function validateEditPwd() {
    var pwd = new RegExp('((?!.*[\\s])(?=.*[A-Z])(?=.*[a-z])(?=.*[\\\\\!\@\#\$\&\*\+\-\/\[\\]\{\}\~\`\,\.\?\'\"\:\;\%\^\(\)\_\=\|])(?=.*\\d).{6,})');
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set custom valid by rule
    $.validator.addMethod('checkAccPassWordE', function (value, element) {
        return pwd.test(value);
    }, 'Mật khấu >= 6 ký tự (chữ hoa, thường, số, ký tự đặc biệt.)');
    //check confirm pass
    $.validator.addMethod('checkConfirmPass', function (value, element) {
        return checkConfirmPass != false;
    }, 'Mật khẩu xác nhận không chính xác!');
    //Set rule + message for input by name
    $('#FormEditPwd').validate({
        rules: {
            AccountPasEdit: {
                required: true,
                checkAccPassWordE: true
            },
            AccountPasEditConfirm: {
                required: true,
                checkConfirmPass: true
            }
        },
        messages: {
            AccountPasEdit: {
                required: '*Bắt buộc.'
            },
            AccountPasEditConfirm: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormEditPwd').valid();
}
