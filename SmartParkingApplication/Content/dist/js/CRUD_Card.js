
//$(document).ready(function () {
//    loadDataCard();
//});

//var pageConfig = 2;

//function loadDateNow() {
//    // body...
//    var today = new Date();
//    var dd = today.getDate();
//    var mm = today.getMonth() + 1; //January is 0!
//    var yyyy = today.getFullYear();

//    if (dd < 10) {
//        dd = '0' + dd;
//    }
//    if (mm < 10) {
//        mm = '0' + mm;
//    }

//    today = mm + '/' + dd + '/' + yyyy;
//    today = today + " 12:00:00AM";
//    return today;
//}


////Load Data function
//function loadDataCard(changePageSize) {
//    var name= $('#txtSearchCard').val();
//    $.ajax({
//        url: "/ManageCardController/LoadData",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        data: {
//            name: name,
//            page: pageConfig,
//            pageSize: 3
//        },
//        dataType: "json",
//        success: function (result) {
//            var data = result.dataCard;
//            var html = '';
//            $.each(data, function (key, item) {
//                html += '<tr>';
//                html += '<td>' + item.CardNumber + '</td>';
//                html += '<td>' + item.Date + '</td>';
//                html += '<td>' + item.Status + '</td>';
//                html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.CardID + ')"> Chi tiết</button> <button class="btn btn-success" onclick="return getByID(' + item.UserID + ')" > Sửa</button> <button class="btn btn-danger" data-toggle="modal" data-target="#myModalDropContract" onclick="return getByID(' + item.UserID + ')">Chấm dứt HĐ</button></td>';
//                html += '</tr>';
//            });
//            $('#tbodyCard').html(html);
//            paging(result.total, function () {
//                loadData();
//            }, changePageSize);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

////paging
//function paging(totalRow, callback, changePageSize) {
//    var totalPage = Math.ceil(totalRow / 5);

//    //Unbind pagination if it existed or click change pageSize
//    if ($('#paginationCard').length === 0 || changePageSize === true) {
//        $('#paginationCard').empty();
//        $('#paginationCard').removeData("twbs-pagination");
//        $('#paginationCard').unbind("page");
//    }

//    $('#paginationCard').twbsPagination({
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

////Add Data Function
//function Add() {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var empObj = {
//        UserName: $('#UserName').val(),
//        Name: $('#FullName').val(),
//        PassWork: $('#PassWord').val(),
//        DateOfBirth: $('#DateOfBirth').val(),
//        Gender: $('#Gender').val(),
//        UserAddress: $('#Address').val(),
//        Phone: $('#PhoneNumber').val(),
//        email: $('#Email').val(),
//        IdentityCard: $('#IdentityCard').val(),
//        ContractSigningDate: $('#ContractSigningDate').val(),
//        ContractExpirationDate: $('#ContractExpirationDate').val(),
//        RoleID: $('#RoleName').val(),
//        ParkingPlaceID: $('#ParkingPlace').val(),
//    };
//    $.ajax({
//        url: "/ManageUser/Create",
//        data: JSON.stringify(empObj),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            loadData(true);
//            $('#myModal').modal('hide');
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

////function for updating employee's record
//function Update() {
//    var res = validate();
//    if (res == false) {
//        return false;
//    }
//    var empObj = {
//        UserID: $('#Id').val(),
//        UserName: $('#UserName').val(),
//        Name: $('#FullName').val(),
//        DateOfBirth: $('#DateOfBirth').val(),
//        Gender: $('#Gender').val(),
//        UserAddress: $('#Address').val(),
//        Phone: $('#PhoneNumber').val(),
//        email: $('#Email').val(),
//        IdentityCard: $('#IdentityCard').val(),
//        ContractSigningDate: $('#ContractSigningDate').val(),
//        ContractExpirationDate: $('#ContractExpirationDate').val(),
//        RoleID: $('#RoleName').val(),
//        ParkingPlaceID: $('#ParkingPlace').val(),

//    };
//    $.ajax({
//        url: "/ManageUser/Update",
//        data: JSON.stringify(empObj),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            loadData(true);
//            $('#myModal').modal('hide');

//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

////Function for clearing the textboxes
//function clearTextBox() {
//    var date = loadDateNow();
//    $('#Id').val("");
//    $('#UserName').val("");
//    $('#FullName').val("");
//    $('#DateOfBirth').val("");
//    $('#Gender').val("");
//    $('#Address').val("");
//    $('#PhoneNumber').val("");
//    $('#Email').val("");
//    $('#IdentityCard').val("");
//    $('#RoleName').val("");
//    $('#ParkingPlace').val("");
//    $('#ContractSigningDate').val("" + date);
//    $('#ContractExpirationDate').val("");

//    $('#btnAdd').show();
//    $('#btnUpdate').hide();
//    //$('#Email').css('border-color', 'lightgrey');
//    //$('#IdentityCard').css('border-color', 'lightgrey');
//    //$('#State').css('border-color', 'lightgrey');
//    //$('#Country').css('border-color', 'lightgrey');
//}

////Valdidation using jquery
//function validate() {
//    var isValid = true;
//    var email = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$');
//    var pwd = new RegExp('(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})');
//    if ($('#UserName').val().trim() == "") {
//        $('#UserName').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#UserName').css('border-color', 'lightgrey');
//    }
//    if ($('#PassWord').val().trim() == "" || !pwd.test($('#PassWord').val().trim())) {
//        $('#PassWord').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#PassWord').css('border-color', 'lightgrey');
//    }
//    if ($('#FullName').val().trim() == "") {
//        $('#FullName').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#FullName').css('border-color', 'lightgrey');
//    }
//    if ($('#DateOfBirth').val().trim() == "") {
//        $('#DateOfBirth').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#DateOfBirth').css('border-color', 'lightgrey');
//    }
//    if ($('#Gender').val().trim() == "") {
//        $('#Gender').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#Gender').css('border-color', 'lightgrey');
//    }
//    if ($('#Address').val().trim() == "") {
//        $('#Address').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#Address').css('border-color', 'lightgrey');
//    }
//    if ($('#PhoneNumber').val().trim() == "") {
//        $('#PhoneNumber').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#PhoneNumber').css('border-color', 'lightgrey');
//    }
//    if ($('#Email').val().trim() == "" || !email.test($('#Email').val().trim())) {
//        $('#Email').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#Email').css('border-color', 'lightgrey');
//    }
//    if ($('#IdentityCard').val().trim() == "") {
//        $('#IdentityCard').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#IdentityCard').css('border-color', 'lightgrey');
//    }
//    if ($('#ParkingPlace').val().trim() == "") {
//        $('#ParkingPlace').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#ParkingPlace').css('border-color', 'lightgrey');
//    }
//    if ($('#RoleName').val().trim() == "") {
//        $('#RoleName').css('border-color', 'Red');
//        isValid = false;
//    }
//    else {
//        $('#RoleName').css('border-color', 'lightgrey');
//    }
//    return isValid;
//}
