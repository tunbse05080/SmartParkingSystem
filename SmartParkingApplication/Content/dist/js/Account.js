
$(document).ready(function () {
    LoadDataAccount();
});

//Function for getting data to fill in modal UpdateRole base on AccountID
function getAccountModalRole(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + AccountID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#AccountIDEdit').val(result.AccountID);
            $('#AccountNameEdit').val(result.UserName);
            $('#PasswordEdit').val(result.PassWord);
            $('#StatusAccountEdit').val(result.StatusOfAccount);
            $('#cbRoleNameREdit').val(result.RoleID);
            $('#myModalRoleAccountEdit').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + AccountID + errormessage.responseText);
        }
    });
}

//Function for getting data to fill in modal UpdatePassword base on AccountID
function getAccountModalPassword(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + AccountID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#AccountIDPasEdit').val(result.AccountID);
            $('#AccountNamePasEdit').val(result.UserName);
            $('#PasswordPasEdit').val(result.PassWord);
            $('#StatusAccountPasEdit').val(result.StatusOfAccount);
            $('#RoleNamePasEdit').val(result.RoleID);
            $('#myModalPassAccountEdit').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + AccountID + errormessage.responseText);
        }
    });
}

//Function for getting data to fill in modal UpdateStatus base on AccountID
function getAccountModalStatus(AccountID) {
    $.ajax({
        url: "/ManageAccount/Details/" + AccountID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#AccountIDStatusEdit').val(result.AccountID);
            $('#AccountNameStatusEdit').val(result.UserName);
            $('#PasswordStatusEdit').val(result.PassWord);
            $('#StatusAccountStatusEdit').val(result.StatusOfAccount);
            $('#RoleNameStatusEdit').val(result.RoleID);
            $('#myModalStatusAccountEdit').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + AccountID + errormessage.responseText);
        }
    });
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
                        html += '<td><button class="btn btn-primary" onclick = "return getAccountModalRole(' + item.AccountID + ')">Phân lại quyền</button><button class="btn btn-warning" style="margin-left:1px" onclick = "return getAccountModalPassword(' + item.AccountID + ')">Đặt lại mật khẩu</button><button class="btn btn-danger" style="margin-left:1px" onclick = "return getAccountModalStatus(' + item.AccountID + ')">Khóa tài khoản</button></td>';
                        break;
                    case 1:
                        html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.AccountID + ')"> Chi tiết</button></td>';
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
function AddAccount() {
    var res = validateAccAdd();
    if (res == false) {
        return false;
    }
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
function UpdateAccount() {
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

//Valdidation using jquery
function validateAccAdd() {
    var pwd = new RegExp('(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
    var idcard = new RegExp('^[0-9]{9,}$');
    var phone = new RegExp('^(09|03|07|08|05){1}([0-9]{8})$');
    var htmlcss = {
        'color': 'Red',
        'display': 'block'
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
    $.validator.addMethod('checkAccIdentityCard', function (value, element) {
        return idcard.test(value);
    }, 'CMND/CCCD sai định dạng.');
    $.validator.addMethod('checkAccPhoneNumber', function (value, element) {
        return phone.test(value);
    }, 'Số điện thoại định dạng sai.');
    $.validator.addMethod('checkAccAddress', function (value, element) {
        return $.trim(value).length > 4;
    }, 'Địa chỉ > 4 ký tự.');
    $.validator.addMethod('checkAccFullName', function (value, element) {
        return $.trim(value).length > 4;
    }, 'Tên đầy đủ > 4 ký tự.');
    $.validator.addMethod('checkAccPassWord', function (value, element) {
        return pwd.test(value);
    }, 'Mật khấu >= 6 ký tự (chữ hoa, thường, số, ký tự đặc biệt.)');
    $.validator.addMethod('checkAccUserName', function (value, element) {
        return $.trim(value).length > 4;
    }, 'Tên tài khoản > 4 ký tự.');
    $.validator.addMethod('checkAccBDate', function (value, element) {
        return new Date(value) < new Date();
    }, 'Ngày sinh phải nhỏ hơn hiện tại!');
    $('#AddAccountForm').validate({
        rules: {
            DateOfBirth: {
                required: true,
                checkBDate: true
            },
            UserName: {
                required: true,
                checkAccUserName: true
            },
            PassWord: {
                required: true,
                checkAccPassWord: true
            },
            FullName: {
                required: true,
                checkAccFullName: true
            },
            Address: {
                required: true,
                checkAccAddress: true
            },
            PhoneNumber: {
                required: true,
                checkAccPhoneNumber: true
            },
            Email: {
                required: true,
                email: true
            },
            IdentityCard: {
                required: true,
                checkAccIdentityCard: true
            }
        },
        messages: {
            DateOfBirth: {
                required: '*Bắt buộc.'
            },
            UserName: {
                required: '*Bắt buộc.'
            },
            PassWord: {
                required: '*Bắt buộc.'
            },
            FullName: {
                required: '*Bắt buộc.'
            },
            Address: {
                required: '*Bắt buộc.'
            },
            PhoneNumber: {
                required: '*Bắt buộc.'
            },
            Email: {
                required: '*Bắt buộc.',
                email: 'Email không đúng định dạng.'
            },
            IdentityCard: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#AddAccountForm').valid();
}
