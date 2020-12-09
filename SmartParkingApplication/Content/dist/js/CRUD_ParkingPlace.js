//load page
$(document).ready(function () {
    loadDataParkingPlace();
});

function loadDataParkingPlace() {
    $.ajax({
        url: "/ManagePPlace/loadDataParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var data = result.datapp;
            var html = '';
            var totalPlace = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td>' + item.Location + '</td>';
                html += '<td>' + item.NumberOfCar + '</td>';
                html += '<td>' + item.NumberOfMotoBike + '</td>';
                html += '<td>' + item.NumberCarBlank + '</td>';
                html += '<td>' + item.NumberMotoBikeBlank + '</td>';
                html += '<td>' + item.StatusOfParkingPlace+ '</td>';
                
                switch (item.StatusOfParkingPlace) {
                    case "Dừng hoạt động":
                        html += '<td><button class= "btn btn-danger" disabled>Tạm dừng hoạt động</button></td>'
                        break;
                    case "Đang hoạt động":
                        html += '<td><button class="btn btn-primary" style="width:109px" onclick = "return getPPDetailByID(' + item.ParkingPlaceID + ')"> Chi tiết</button><button class="btn btn-success" style="width:109px" onclick="return getPPByID(' + item.ParkingPlaceID + ')" > Sửa</button></td>';
                        break;
                   
                }
                
                html += '</tr>';
            });
            $('#tbodypp').html(html);
            $('#tbPPlace').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbPPlace_wrapper .col-md-6:eq(0)');
            totalPlace += '<h3>' + result.total + '<sup style="font-size: 20px"></sup></h3>';
            totalPlace += '<p>Tổng Số Bãi Đỗ</p>';
            $('#totalParkingPlace').html(totalPlace);
        },
        error: function () {
            
        }
    });


}

    //function pagingpp(totalRowpp, callback, changePageSizepp) {
    //    var totalPagepp = Math.ceil(totalRowpp / 5);

    //    //Unbind pagination if it existed or click change pageSize
    //    if ($('#paginationpp').length === 0 || changePageSizepp === true) {
    //        $('#paginationpp').empty();
    //        $('#paginationpp').removeData("twbs-pagination");
    //        $('#paginationpp').unbind("page");
    //    }

    //    $('#paginationpp').twbsPagination({
    //        totalPages: totalPagepp,
    //        first: "Đầu",
    //        next: "Tiếp",
    //        last: "Cuối",
    //        prev: "Trước",
    //        visiblePages: 10,
    //        onPageClick: function (event, pagepp) {
    //            pageConfigpp = pagepp;
    //            setTimeout(callback, 200);
    //        }
    //    });
    //}

//function getTicketByID(ParkingPlaceID) {
//    $.ajax({
//        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#ParkingPlaceIDEdit').val(result.ParkingPlaceID);
//            $('#NameOfParkingEdit').val(result.NameOfParking);
//            $('#LocationEdit').val(result.Location);
//            $('#NumberOfSlotEdit').val(result.NumberOfSlot);
//            $('#NumberOfCarEdit').val(result.NumberOfCar);
//            $('#NumberOfMotoBikeEdit').val(result.NumberOfMotoBike);
//            $('#NumberCarBlankEdit').val(result.NumberCarBlank);
//            $('#NumberMotoBikeBlankEdit').val(result.NumberMotoBikeBlank);
            

//            $('#myModalPPUpdate').modal('show');
//            $('#btnUpdatePP').modal('show');

//        },
//        error: function (errormessage) {
//            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
//        }
//    });
//    return false;
//}

function UpdatePP() {
    var res = validateUpdatePP();
    if (res == false) {
        return false;
    }
    
    var empPPObj = {
        ParkingPlaceID: $('#ParkingPlaceIDEdit').val(),
        NameOfParking: $('#NameOfParkingEdit').val(),
        Location: $('#LocationEdit').val(),
        NumberOfCar: $('#NumberOfCarEdit').val(),
        NumberOfMotoBike: $('#NumberOfMotoBikeEdit').val(),
        NumberCarBlank: $('#NumberCarBlankEdit').val(),
        NumberMotoBikeBlank: $('#NumberMotoBikeBlankEdit').val(),
        StatusOfParkingPlace: $('#cbStatusOfParking').val() ,
    };
    $.ajax({
        url: "/ManagePPlace/UpdatePP",
        data: JSON.stringify(empPPObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbPPlace').DataTable().clear().destroy();
            loadDataParkingPlace();
            $('#myModalUpdatePP').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function getPPByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#ParkingPlaceID').val(result.ParkingPlaceID);
            $('#NameOfParking').val(result.NameOfParking);
            $('#Location').val(result.Location);
            $('#NumberOfCarEdit').val(result.NumberOfCar);
            $('#NumberOfMotoBikeEdit').val(result.NumberOfMotoBike);
            $('#NumberCarBlankEdit').val(result.NumberCarBlank);
            $('#NumberMotoBikeBlank').val(result.NumberMotoBikeBlank);
            $('#StatusOfParkingPlace').val(result.statusOfParking);

            $('#myModalPP').modal('show');
           
            $('#btnAddPP').hide();
            $('#btnUpdatePP').show();
        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}
function getPPDetailByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#ParkingPlaceIDd').val(result.ParkingPlaceID);
            $('#NameOfParkingd').val(result.NameOfParking);
            $('#Locationd').val(result.Location);
            $('#NumberOfCardd').val(result.NumberOfCar);
            $('#NumberOfMotoBiked').val(result.NumberOfMotoBike);
            $('#NumberCarBlankd').val(result.NumberCarBlank);
            $('#NumberMotoBikeBlankd').val(result.NumberMotoBikeBlank);
            $('#StatusOfParkingPlaced').val(result.statusOfParking);




            $('#myModalDetailPP').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}


function AddPP() {
    var res = validateAddPP();
    if (res == false) {
        return false;
    }
    var empPPObj = {
        NameOfParking: $('#NameOfParking').val(),
        Location: $('#Location').val(),
        NumberOfCar: $('#NumberOfCar').val(),
        NumberOfMotoBike: $('#NumberOfMotoBike').val(),
        NumberCarBlank: $('#NumberOfCar').val(),
        NumberMotoBikeBlank: $('#NumberOfMotoBike').val(),
        StatusOfParkingPlace: $('#cbStatusOfParking').val(),
    };
    $.ajax({
        url: "/ManagePPlace/Create",
        data: JSON.stringify(empPPObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbPPlace').DataTable().clear().destroy();
            loadDataParkingPlace();
            $('#myModalPP').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function clearTextBoxPP() {
    ComboboxStatusOfParking();
    $('#Id').val("");
    $('#NameOfParking').val("");
    $('#Location').val("");
    $('#NumberOfCar').val("");
    $('#NumberOfMotoBike').val("");
    $('#NumberCarBlank').val("");
    $('#NumberMotoBikeBlank').val("");
    $('#cbStatusOfParking').val("");



    $('#btnAddPP').show();
    $('#btnUpdatePP').hide();
}

//validate using Jquery
function validateAddPP() {
    var isValid = true;
    var numberSlot = new RegExp('^[0-9]{2,}$');
    if ($.trim($('#NumberOfCar').val()) == "" || !numberSlot.test($.trim($('#NumberOfCar').val()))) {
        $('#NumberOfCar').prop("title", "Sức chứa ô tô trống, sai định dạng(>2 số).");
        $('#NumberOfCar').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberOfCar').prop("title", "");
        $('#NumberOfCar').css('border-color', 'lightgrey');
    }
    if ($.trim($('#NumberOfMotoBike').val()) == "" || !numberSlot.test($.trim($('#NumberOfMotoBike').val()))) {
        $('#NumberOfMotoBike').prop("title", "Sức chứa xe máy trống hoặc sai định dạng(>2 số).");
        $('#NumberOfMotoBike').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberOfMotoBike').prop("title", "");
        $('#NumberOfMotoBike').css('border-color', 'lightgrey');
    }
    return isValid;
}

function validateUpdatePP() {
    var isValid = true;
    var numberSlot = new RegExp('^[0-9]{2,}$');
    if ($.trim($('#NumberOfCarEdit').val()) == "" || !numberSlot.test($.trim($('#NumberOfCarEdit').val()))) {
        $('#NumberOfCarEdit').prop("title", "Sức chứa ô tô trống hoặc sai định dạng(>2 số).");
        $('#NumberOfCarEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberOfCarEdit').prop("title", "");
        $('#NumberOfCarEdit').css('border-color', 'lightgrey');
    }
    if ($.trim($('#NumberOfMotoBikeEdit').val()) == "" || !numberSlot.test($.trim($('#NumberOfMotoBikeEdit').val()))) {
        $('#NumberOfMotoBikeEdit').prop("title", "Sức chứa xe máy trống hoặc sai định dạng(>2 số).");
        $('#NumberOfMotoBikeEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberOfMotoBikeEdit').prop("title", "");
        $('#NumberOfMotoBikeEdit').css('border-color', 'lightgrey');
    }
    if ($.trim($('#NumberCarBlankEdit').val()) == "" || !numberSlot.test($.trim($('#NumberCarBlankEdit').val())) || + $('#NumberCarBlankEdit').val() > + $('#NumberOfCarEdit').val()) {
        $('#NumberCarBlankEdit').prop("title", "Chỗ trống ô tô trống, sai định dạng(>2 số) hoặc lớn hơn sức chứa.");
        $('#NumberCarBlankEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberCarBlankEdit').prop("title", "");
        $('#NumberCarBlankEdit').css('border-color', 'lightgrey');
    }
    if ($.trim($('#NumberMotoBikeBlankEdit').val()) == "" || !numberSlot.test($.trim($('#NumberMotoBikeBlankEdit').val())) || + $('#NumberMotoBikeBlankEdit').val() > + $('#NumberOfMotoBikeEdit').val()) {
        $('#NumberMotoBikeBlankEdit').prop("title", "Chỗ trống xe máy trống, sai định dạng(>2 số) hoặc lớn hơn sức chứa.");
        $('#NumberMotoBikeBlankEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#NumberMotoBikeBlankEdit').prop("title", "");
        $('#NumberMotoBikeBlankEdit').css('border-color', 'lightgrey');
    }
    return isValid;
}
//comboboxStatusOfParking
function ComboboxStatusOfParking() {
    $.ajax({
        url: "/ManagePPlace/ComboboxStatusOfParking",
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
            $("#cbStatusOfParking").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}