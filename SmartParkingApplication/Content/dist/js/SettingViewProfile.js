
function getSVDetailByID() {
    $.ajax({
        
        url: "/Setting/Details",
        type: "GET",
        contentType: "application/json" + UserID,
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                $('#email').val(result.email);
                $('#DateOfBirth').val(result.DateOfBirth);
                $('#Gender').val(result.Gender);
                $('#Name').val(result.Name);
                $('#Phone').val(result.Phone);
                $('#UserAddress').val(result.UserAddress);
            }

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
            if (result == "LoadFalse") {
                alert("Lấy dữ liệu không thành công!");
            } else {
                var html = '';
                var i = 0;
                $.each(result, function (key, item) {
                    html += '<option value="' + i + '">' + item + '</option>';
                    i++;
                });
                $("#cbGender").html(html);
                $("#cbGenderEdit").html(html);
            }

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
            if (result == "UpdateFalse") {
                alert("Cập nhật không thành công!");
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Valdidation using jquery
function validateProfileEdit() {
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
    $.validator.addMethod('checkProAddress', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkProPhone', function (value, element) {
        return phone.test(value);
    });
    $.validator.addMethod('checkProIDCard', function (value, element) {
        return idcard.test(value);
    });
    //Set rule for input by name
    $('#FormEditProfile').validate({
        rules: {
            UserAddress: {
                required: true,
                checkProAddress: true
            },
            Phone: {
                required: true,
                checkProPhone: true
            },
            email: {
                required: true,
                email: true
            },
            IdentityCard: {
                required: true,
                checkProIDCard: true
            }
        },
        messages: {
            UserAddress: {
                required: '*Bắt buộc.',
                checkProAddress: 'Địa chỉ có ít nhất 5 kí tự!'
            },
            Phone: {
                required: '*Bắt buộc.',
                checkProPhone: 'Số điện thoại sai định dạng!'
            },
            email: {
                required: '*Bắt buộc.',
                email: 'Email sai định dạng!'
            },
            IdentityCard: {
                required: '*Bắt buộc.',
                checkProIDCard: 'CMND/CCCD sai định dạng!'
            }
        }
    });
    return $('#FormEditProfile').valid();
}
