
$(document).ready(function () {
    loadData();
    ComboboxGender();
    ComboboxStatusOfwork();
    ComboboxRoleNameU();
    ComboboxParkingPlaceU();
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
    $.ajax({
        url: "/ManageUser/Details/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdEdit').val(result.UserID);
            $('#UserNameEdit').val(result.UserName);
            $('#FullNameEdit').val(result.Name);
            $('#PassWordEdit').val(result.PassWork);
            $('#DateOfBirthEdit').val(result.dateOfBirth);
            $('#AddressEdit').val(result.UserAddress);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneNumberEdit').val(result.Phone);
            $('#EmailEdit').val(result.email);
            $('#StatusOfWorkingEdit').val(result.status);
            $('#ContractSigningDateEdit').val(result.contractSigningDate);
            $('#ContractExpirationDateEdit').val(result.contractExpirationDate);
            $('#myModalUserEdit').modal('show');
            $('#btnUpdate').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}

//getID Contract
function getGHByID(EmployeeID) {
    $.ajax({
        url: "/ManageUser/DetailsGH/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
                    $('#UserIDGH').val(result.UserID);
                    $('#UserNameGH').val(result.UserName);
                    $('#FullNameGH').val(result.Name);
                    $('#PassWordGH').val(result.PassWork);
                    $('#DateOfBirthGH').val(result.dateOfBirth);
                    $('#GenderGH').val(result.Gender);
                    $('#AddressGH').val(result.UserAddress);
                    $('#IdentityCardGH').val(result.IdentityCard);
                    $('#PhoneNumberGH').val(result.Phone);
                    $('#EmailGH').val(result.email);
                    $('#RoleNameGH').val(result.RoleID);
                    $('#ParkingPlaceGH').val(result.ParkingPlaceID);
                    $('#ContractSigningDateGH').val(loadDateNow());
                    $('#ContractExpirationDateGH').val(result.contractExpirationDate);
                    $('#myModalGH').modal('show');
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
            $('#IdD').val(result.UserID);
            $('#UserNameD').val(result.UserName);
            $('#FullNameD').val(result.Name);
            $('#PasswordD').val(result.PassWork);
            $('#DateOfBirthD').val(result.dateOfBirth);
            $('#GenderD').val(result.gender);
            $('#AddressD').val(result.UserAddress);
            $('#IdentityCardD').val(result.IdentityCard);
            $('#PhoneNumberD').val(result.Phone);
            $('#EmailD').val(result.email);
            $('#StatusOfWorkD').val(result.statusOfwork);
            $('#RoleNameD').val(result.RoleName);
            $('#ParkingPlaceD').val(result.NameOfParking);
            $('#ContractSigningDateD').val(result.contractSigningDate);
            $('#ContractExpirationDateD').val(result.contractExpirationDate);

            $('#myModalDetailUser').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}
//Function for getting detail data base on EmployeeID
function getDropContractByID(EmployeeID) {
    $.ajax({
        url: "/ManageUser/DetailsGH/" + EmployeeID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#UserIDDrop').val(result.UserID);
            $('#UserNameDrop').val(result.UserName);
            $('#FullNameDrop').val(result.Name);
            $('#PassWordDrop').val(result.PassWork);
            $('#DateOfBirthDrop').val(result.dateOfBirth);
            $('#GenderDrop').val(result.Gender);
            $('#AddressDrop').val(result.UserAddress);
            $('#IdentityCardDrop').val(result.IdentityCard);
            $('#PhoneNumberDrop').val(result.Phone);
            $('#EmailDrop').val(result.email);
            $('#RoleNameDrop').val(result.RoleID);
            $('#ParkingPlaceDrop').val(result.ParkingPlaceID);
            $('#ContractSigningDateDrop').val(result.contractSigningDate);
            $('#ContractExpirationDateDrop').val(result.contractExpirationDate);

            $('#myModalDropContract').modal('show');
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
        dataType: "json",
        success: function (result) {
            var data = result.data;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.RoleName + '</td>';
                html += '<td>' + item.ContractExpirationDate + '</td>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td>' + item.StatusOfWork + '</td>';     
                switch (item.StatusOfWork) {
                    case "Hết hạn HĐ":
                        html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button><button class="btn btn-warning" onclick="return getGHByID(' + item.UserID + ')" > Gia Hạn HĐ</button></td>';
                        break;
                    case "Còn hợp đồng":
                        html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.UserID + ')"> Chi tiết</button><button class="btn btn-success" style="width:109px" onclick="return getEditByID(' + item.UserID + ')" > Sửa</button><button class="btn btn-danger" onclick="return getDropContractByID(' + item.UserID + ')" >Chấm dứt HĐ</button></td>';

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

//paging
//function paging(totalRow, callback, changePageSize) {
//    var totalPage = Math.ceil(totalRow / 5);

//    //Unbind pagination if it existed or click change pageSize
//    if ($('#pagination').length === 0 || changePageSize === true) {
//        $('#pagination').empty();
//        $('#pagination').removeData("twbs-pagination");
//        $('#pagination').unbind("page");
//    }

//    $('#pagination').twbsPagination({
//        totalPages: totalPage,
//        first: "Đầu",
//        next: "Tiếp",
//        last: "Cuối",
//        prev: "Trước",
//        visiblePages: 10,
//        onPageClick: function (event, page) {
//            pageConfig = page;
//            setTimeout(callback, 200);
//        }
//    });
//}

//Add Data Function
function Add() {
    var date = loadDateNow();
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var empObj = {
        UserName: $('#UserName').val(),
        Name: $('#FullName').val(),
        PassWork: $('#PassWord').val(),
        DateOfBirth: $('#DateOfBirth').val(),
        Gender: $('#cbGender').val(),
        UserAddress: $('#Address').val(),
        Phone: $('#PhoneNumber').val(),
        email: $('#Email').val(),
        IdentityCard: $('#IdentityCard').val(),
        ContractSigningDate: $('#ContractSigningDate').val(),
        ContractExpirationDate: $('#ContractExpirationDate').val(),
        StatusOfWork: $('#cbStatusOfwork').val(),
        RoleID: $('#cbRoleNameU').val(),
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
    var gender = $('#cbGenderEdit').val();
    var roleName = $('#cbRoleNameUEdit').val();
    var nameParking = $('#cbparkingPlaceUEdit').val();
    var empObj = {
        UserID: $('#IdEdit').val(),
        UserName: $('#UserNameEdit').val(),
        Name: $('#FullNameEdit').val(),
        PassWork: $('#PassWordEdit').val(),
        DateOfBirth: $('#DateOfBirthEdit').val(),
        Gender: gender,
        UserAddress: $('#AddressEdit').val(),
        Phone: $('#PhoneNumberEdit').val(),
        email: $('#EmailEdit').val(),
        IdentityCard: $('#IdentityCardEdit').val(),
        ContractSigningDate: $('#ContractSigningDateEdit').val(),
        ContractExpirationDate: $('#ContractExpirationDateEdit').val(),
        StatusOfWork: $('#StatusOfWorkingEdit').val(),
        RoleID: roleName,
        ParkingPlaceID: nameParking,

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

function CloseAdd() {
    $('#UserName').css('border-color', 'Grey');
    $('#PassWord').css('border-color', 'Grey');
    $('#FullName').css('border-color', 'Grey');
    $('#DateOfBirth').css('border-color', 'Grey');
    $('#Gender').css('border-color', 'Grey');
    $('#Address').css('border-color', 'Grey');
    $('#PhoneNumber').css('border-color', 'Grey');
    $('#Email').css('border-color', 'Grey');
    $('#IdentityCard').css('border-color', 'Grey');
    $('#RoleName').css('border-color', 'Grey');
    $('#ParkingPlace').css('border-color', 'Grey');
    $('#ContractSigningDate').css('border-color', 'Grey');
    $('#ContractExpirationDate').css('border-color', 'Grey');
    $('#StatusOfWork').css('border-color', 'Grey');
}

//Function for clearing the textboxes
function clearTextBox() {
    var date = loadDateNow();
    $('#Id').val("");
    $('#UserName').val("");
    $('#FullName').val("");
    $('#PassWord').val("");
    $('#DateOfBirth').val("");
    $('#cbGender').val("");
    $('#Address').val("");
    $('#PhoneNumber').val("");
    $('#Email').val("");
    $('#IdentityCard').val("");
    $('#cbRoleNameU').val("");
    $('#cbparkingPlaceU').val("");
    $('#ContractSigningDate').val("" + date);
    $('#ContractExpirationDate').val("" + date);
    $('#cbStatusOfwork').val("");


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

// gia han HĐ
function ContractGH() {
    var emGHObj = {
        UserID: $('#UserIDGH').val(),
        UserName: $('#UserNameGH').val(),
        Name: $('#FullNameGH').val(),
        PassWork: $('#PassWordGH').val(),
        DateOfBirth: $('#DateOfBirthGH').val(),
        Gender: $('#GenderGH').val(),
        UserAddress: $('#AddressGH').val(),
        Phone: $('#PhoneNumberGH').val(),
        email: $('#EmailGH').val(),
        IdentityCard: $('#IdentityCardGH').val(),
        ContractSigningDate: $('#ContractSigningDateGH').val(),
        ContractExpirationDate: $('#ContractExpirationDateGH').val(),
        StatusOfWork:1,
        RoleID: $('#RoleNameGH').val(),
        ParkingPlaceID: $('#ParkingPlaceGH').val(),
    };
    $.ajax({
        url: "/ManageUser/Update",
        data: JSON.stringify(emGHObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalGH').modal('hide');
            $('#tbUser').DataTable().clear().destroy();
            loadData(true);
            
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function dropContract() {
    var emGHObj = {
        UserID: $('#UserIDDrop').val(),
        UserName: $('#UserNameDrop').val(),
        Name: $('#FullNameDrop').val(),
        PassWork: $('#PassWordGH').val(),
        DateOfBirth: $('#DateOfBirthDrop').val(),
        Gender: $('#GenderDrop').val(),
        UserAddress: $('#AddressDrop').val(),
        Phone: $('#PhoneNumberDrop').val(),
        email: $('#EmailDrop').val(),
        IdentityCard: $('#IdentityCardDrop').val(),
        ContractSigningDate: $('#ContractSigningDateDrop').val(),
        ContractExpirationDate: loadDateNow(),
        StatusOfWork: 0,
        RoleID: $('#RoleNameDrop').val(),
        ParkingPlaceID: $('#ParkingPlaceDrop').val(),
    };
    $.ajax({
        url: "/ManageUser/Update",
        data: JSON.stringify(emGHObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#myModalDropContract').modal('hide');
            $('#tbUser').DataTable().clear().destroy();
            loadData(true);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


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
function ComboboxStatusOfwork() {
    $.ajax({
        url: "/ManageUser/ComboboxStatusOfwork",
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
            $("#cbStatusOfwork").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ComboboxParkingPlaceU() {
    $.ajax({
        url: "/ManageUser/ComboboxParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 1;
            $.each(result, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbparkingPlaceU").html(html);
            $("#cbparkingPlaceUEdit").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ComboboxRoleNameU() {
    $.ajax({
        url: "/ManageUser/ComboboxRoleName",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 1;
            $.each(result, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbRoleNameU").html(html);
            $("#cbRoleNameUEdit").html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}