
$(document).ready(function () {
    loadData();
    ComboboxGender();
    ComboboxRoleName();
    ComboboxParkingPlace();
});

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
    return today;
}

function loadDateNowToCompare() {
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

    today = yyyy + '/' + mm + '/' + dd;
    return today;
}

//DateETK
function DatePlus(datePlus) {
    // body...

    var date = new Date();
    date.setTime(date.getTime() + (datePlus * 24 * 60 * 60 * 1000));
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    date = yyyy + '/' + mm + '/' + dd;
    return date;
}

//Function for getting data base on EmployeeID
function getEditByID(EmployeeID) {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ManageUser/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var str = result.dateOfBirth;
            var test = str.split("/");
            $('#IdEdit').val(result.UserID);
            $('#FullNameEdit').val(result.Name);
            $('#DateOfBirthEdit').val(test[2] + '-' + test[0] + '-' + test[1]);
            $('#AddressEdit').val(result.UserAddress);
            $('#cbGenderEdit').val(result.Gender);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneNumberEdit').val(result.Phone);
            $('#EmailEdit').val(result.email);
            $('#StatusOfWorkingEdit').val(result.StatusOfwork);
            $('#AccountID').val(result.AccountID);
            $('#cbparkingPlaceUEdit').val(result.ParkingPlaceID);
            $('#myModalUserEdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

////getID Contract
//function getGHByID(EmployeeID) {
//    $.ajax({
//        url: "/ManageUser/DetailsGH/" + EmployeeID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//                    $('#UserIDGH').val(result.UserID);
//                    $('#UserNameGH').val(result.UserName);
//                    $('#FullNameGH').val(result.Name);
//                    $('#PassWordGH').val(result.PassWork);
//                    $('#DateOfBirthGH').val(result.dateOfBirth);
//                    $('#GenderGH').val(result.Gender);
//                    $('#AddressGH').val(result.UserAddress);
//                    $('#IdentityCardGH').val(result.IdentityCard);
//                    $('#PhoneNumberGH').val(result.Phone);
//                    $('#EmailGH').val(result.email);
//                    $('#RoleNameGH').val(result.RoleID);
//                    $('#ParkingPlaceGH').val(result.ParkingPlaceID);
//                    $('#ContractSigningDateGH').val(loadDateNow());
//                    $('#ContractExpirationDateGH').val(result.contractExpirationDate);
//                    $('#myModalGH').modal('show');
//        },
//        error: function (errormessage) {
//            alert("Exception:" + EmployeeID + errormessage.responseText);
//        }
//    });
//    return false;
//}
//Function for getting detail data base on EmployeeID
function getDetailByID(EmployeeID) {
    $.ajax({
        url: "/ManageUser/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdD').val(result.UserID);
            $('#FullNameD').val(result.Name);
            $('#DateOfBirthD').val(result.dateOfBirth);
            $('#GenderD').val(result.gender);
            $('#AddressD').val(result.UserAddress);
            $('#IdentityCardD').val(result.IdentityCard);
            $('#PhoneNumberD').val(result.Phone);
            $('#EmailD').val(result.email);
            $('#StatusOfWorkD').val(result.statusOfwork);
            $('#AccountName').val(result.UserName);
            $('#ParkingPlaceD').val(result.NameOfParking);

            $('#myModalDetailUser').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}
//Function for getting detail data base on EmployeeID
//function getDropContractByID(EmployeeID) {
//    $.ajax({
//        url: "/ManageUser/DetailsGH/" + EmployeeID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#UserIDDrop').val(result.UserID);
//            $('#UserNameDrop').val(result.UserName);
//            $('#FullNameDrop').val(result.Name);
//            $('#PassWordDrop').val(result.PassWork);
//            $('#DateOfBirthDrop').val(result.dateOfBirth);
//            $('#GenderDrop').val(result.Gender);
//            $('#AddressDrop').val(result.UserAddress);
//            $('#IdentityCardDrop').val(result.IdentityCard);
//            $('#PhoneNumberDrop').val(result.Phone);
//            $('#EmailDrop').val(result.email);
//            $('#RoleNameDrop').val(result.RoleID);
//            $('#ParkingPlaceDrop').val(result.ParkingPlaceID);
//            $('#ContractSigningDateDrop').val(result.contractSigningDate);
//            $('#ContractExpirationDateDrop').val(result.contractExpirationDate);

//            $('#myModalDropContract').modal('show');
//            $('#btnDrop').show();
//        },
//        error: function (errormessage) {
//            alert("Exception:" + EmployeeID + errormessage.responseText);
//        }
//    });
//    return false;
//}

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
                html += '<td>' + item.Phone + '</td>';
                html += '<td>' + item.email + '</td>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td>' + item.StatusOfWork + '</td>';     
                switch (item.StatusOfAccount) {
                    case 0:
                        if (item.StatusOfWork == 'Không trong ca') {
                            html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button><button class="btn btn-success" style="margin-left:1px" onclick = "return getEditByID(' + item.UserID + ')">Sửa</button></td>';
                            break;
                        } else {
                            html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button></td>';
                            break;
                        }
                        break;
                    case 1:
                        html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button></td>';
                        break;
                }
                html += '</tr>';
            });
            $('#tbodyUser').html(html);

            $("#tbUser").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbUser_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Add Data Function
function AddUser() {
    var res = validateUserAdd();
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
        StatusOfWork: 1,
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
function UpdateUser() {
    var res = validateUserEdit();
    if (res == false) {
        return false;
    }
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
            $('#myModalUserEdit').modal('hide');
            $('#tbUser').DataTable().clear().destroy();
            loadData();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Function for clearing the textboxes
function clearTextBox() {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    var date = loadDateNow();
    $('#Id').val("");
    $('#FullName').val("");
    $('#DateOfBirth').val("");
    $('#cbGender').val("");
    $('#Address').val("");
    $('#PhoneNumber').val("");
    $('#Email').val("");
    $('#IdentityCard').val("");
    $('#cbparkingPlaceU').val("");
    $('#ContractSigningDate').val("" + date);
    $('#ContractExpirationDate').val("" + date);
    $('#cbStatusOfwork').val("");
    $('#FullName').css('border-color', 'Grey');
    $('#DateOfBirth').css('border-color', 'Grey');
    $('#cbGender').css('border-color', 'Grey');
    $('#Address').css('border-color', 'Grey');
    $('#PhoneNumber').css('border-color', 'Grey');
    $('#Email').css('border-color', 'Grey');
    $('#IdentityCard').css('border-color', 'Grey');
    $('#cbparkingPlaceU').css('border-color', 'Grey');
    $('#ContractSigningDate').css('border-color', 'Grey');
    $('#ContractExpirationDate').css('border-color', 'Grey');
    $('#cbStatusOfwork').css('border-color', 'Grey');
}

//Valdidation using jquery
function validateUserEdit() {
    var phone = new RegExp('^((09|03|07|08|05)+([0-9]{8})\\b)$');
    var idcard = new RegExp('^[0-9]{9,}$');
    //Díplay css of error message
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
    $.validator.addMethod('checkUserFullNameE', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkBDateE', function (value, element) {
        return this.optional(element) || new Date(value) < new Date();
    });
    $.validator.addMethod('checkUserAddressE', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkUserPhoneE', function (value, element) {
        return phone.test(value);
    });
    $.validator.addMethod('checkUserIDCardE', function (value, element) {
        return idcard.test(value);
    });
    //Set rule for input by name
    $('#FormUserEdit').validate({
        rules: {
            DateOfBirthEdit: {
                required: true,
                checkBDateE: true
            },
            FullNameEdit: {
                required: true,
                checkUserFullNameE: true
            },
            AddressEdit: {
                required: true,
                checkUserAddressE: true
            },
            PhoneNumberEdit: {
                required: true,
                checkUserPhoneE: true
            },
            EmailEdit: {
                required: true,
                email: true
            },
            IdentityCardEdit: {
                required: true,
                checkUserIDCardE: true
            }
        },
        messages: {
            DateOfBirthEdit: {
                required: '*Bắt buộc.',
                checkBDateE: 'Ngày phải nhỏ hơn hiện tại!'
            },
            FullNameEdit: {
                required: '*Bắt buộc.',
                checkUserFullNameE: 'Tên đầy đủ ít nhất 5 kí tự!'
            },
            AddressEdit: {
                required: '*Bắt buộc.',
                checkUserAddressE: 'Địa chỉ phải có ít nhất 5 kí tự!'
            },
            PhoneNumberEdit: {
                required: '*Bắt buộc.',
                checkUserPhoneE: 'Số điện thoại sai định dạng!'
            },
            EmailEdit: {
                required: '*Bắt buộc.',
                email: 'Email không đúng định dạng.'
            },
            IdentityCardEdit: {
                required: '*Bắt buộc.',
                checkUserIDCardE: 'CMND/CCCD sai định dạng!'
            }
        }
    });
    return $('#FormUserEdit').valid();
}

function validateUserAdd() {
    var phone = new RegExp('^((09|03|07|08|05)+([0-9]{8})\\b)$');
    var idcard = new RegExp('^[0-9]{9,}$');
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
    $.validator.addMethod('checkUserFullName', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkBDate', function (value, element) {
        return this.optional(element) || new Date(value) < new Date();
    });
    $.validator.addMethod('checkUserAddress', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkUserPhone', function (value, element) {
        return phone.test(value);
    });
    $.validator.addMethod('checkUserIDCard', function (value, element) {
        return idcard.test(value);
    });
    //Set rule for input by name
    $('#FormAddUser').validate({
        rules: {
            DateOfBirth: {
                required: true,
                checkBDate: true
            },
            FullName: {
                required: true,
                checkUserFullName: true
            },
            Address: {
                required: true,
                checkUserAddress: true
            },
            PhoneNumber: {
                required: true,
                checkUserPhone: true
            },
            Email: {
                required: true,
                email: true
            },
            IdentityCard: {
                required: true,
                checkUserIDCard: true
            },
            cbGender: {
                required: true
            },
            cbparkingPlaceU: {
                required: true
            }
        },
        messages: {
            DateOfBirth: {
                required: '*Bắt buộc.',
                checkBDate: 'Ngày phải nhỏ hơn hiện tại!'
            },
            FullName: {
                required: '*Bắt buộc.',
                checkUserFullName: 'Tên đầy đủ ít nhất 5 kí tự!'
            },
            Address: {
                required: '*Bắt buộc.',
                checkUserAddress: 'Địa chỉ ít nhất 5 kí tự!'
            },
            PhoneNumber: {
                required: '*Bắt buộc.',
                checkUserPhone: 'Số điện thoại sai định dạng!'
            },
            Email: {
                required: '*Bắt buộc.',
                email: 'Email sai định dạng!'
            },
            IdentityCard: {
                required: '*Bắt buộc.',
                checkUserIDCard: 'CMND/CCCD sai định dạng!'
            },
            cbGender: {
                required: '*Bắt buộc.'
            },
            cbparkingPlaceU: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormAddUser').valid();
}


// gia han HĐ
//function ContractGH() {
//    var emGHObj = {
//        UserID: $('#UserIDGH').val(),
//        UserName: $('#UserNameGH').val(),
//        Name: $('#FullNameGH').val(),
//        PassWork: $('#PassWordGH').val(),
//        DateOfBirth: $('#DateOfBirthGH').val(),
//        Gender: $('#GenderGH').val(),
//        UserAddress: $('#AddressGH').val(),
//        Phone: $('#PhoneNumberGH').val(),
//        email: $('#EmailGH').val(),
//        IdentityCard: $('#IdentityCardGH').val(),
//        ContractSigningDate: $('#ContractSigningDateGH').val(),
//        ContractExpirationDate: $('#ContractExpirationDateGH').val(),
//        StatusOfWork:1,
//        RoleID: $('#RoleNameGH').val(),
//        ParkingPlaceID: $('#ParkingPlaceGH').val(),
//    };
//    $.ajax({
//        url: "/ManageUser/Update",
//        data: JSON.stringify(emGHObj),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            $('#myModalGH').modal('hide');
//            $('#tbUser').DataTable().clear().destroy();
//            loadData(true);
            
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//function dropContract() {
//    var emGHObj = {
//        UserID: $('#UserIDDrop').val(),
//        UserName: $('#UserNameDrop').val(),
//        Name: $('#FullNameDrop').val(),
//        PassWork: $('#PassWordGH').val(),
//        DateOfBirth: $('#DateOfBirthDrop').val(),
//        Gender: $('#GenderDrop').val(),
//        UserAddress: $('#AddressDrop').val(),
//        Phone: $('#PhoneNumberDrop').val(),
//        email: $('#EmailDrop').val(),
//        IdentityCard: $('#IdentityCardDrop').val(),
//        ContractSigningDate: $('#ContractSigningDateDrop').val(),
//        ContractExpirationDate: loadDateNow(),
//        StatusOfWork: 0,
//        RoleID: $('#RoleNameDrop').val(),
//        ParkingPlaceID: $('#ParkingPlaceDrop').val(),
//    };
//    $.ajax({
//        url: "/ManageUser/Update",
//        data: JSON.stringify(emGHObj),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            $('#myModalDropContract').modal('hide');
//            $('#tbUser').DataTable().clear().destroy();
//            loadData(true);

//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}


//comboboxgender
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

//comboboxStatusOfwork
//function ComboboxStatusOfwork() {
//    $.ajax({
//        url: "/ManageUser/ComboboxStatusOfwork",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var html = '';
//            var i = 0;
//            $.each(result, function (key, item) {
//                html += '<option value="' + i + '">' + item + '</option>';
//                i++;
//            });
//            $("#cbStatusOfwork").html(html);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

function ComboboxParkingPlace() {
    $.ajax({
        url: "/ManageUser/ComboboxParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.ParkingPlaceID + '">' + item.NameOfParking + '</option>';
            });
            $("#cbparkingPlaceU").html(html);
            $("#cbparkingPlaceUEdit").html(html);
            $("#cbparkingPlaceEmp").html(html);
            $("#cbparkingPlaceEmpEdit").html(html);
            $("#cbparkingPlaceWorkingCalendar").html(html);
            $("#cbNameParkingPlaceHistory").html(html);
            $("#cbparkingPlaceWS").html(html);
        },
        error: function (errormessage) {
            //alert(errormessage.responseText);
        }
    });
}

function ComboboxRoleName() {
    $.ajax({
        url: "/ManageUser/ComboboxRoleName",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value="' + item.RoleID + '">' + item.RoleName + '</option>';
            });
            $("#cbRoleNameU").html(html);
            $("#cbRoleNameUEdit").html(html);
            $("#cbRoleNameREdit").html(html);
            $("#cbRoleNameAcc").html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

