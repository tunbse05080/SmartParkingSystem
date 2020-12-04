var pageConfigpp = 1;

function loadDataParkingPlace(changsizepp) {
    var namepp = $('#txtNameSearchpp').val();
    $.ajax({
        url: "/ManagePPlace/loadDataParkingPlace",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            namepp: namepp,
            pagepp: pageConfigpp,
            pageSizepp: 5,

        },
        dataType: "json",
        success: function (result) {
            var data = result.datapp;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td>' + item.Location + '</td>';
                html += '<td>' + item.NumberOfCar + '</td>';
                html += '<td>' + item.NumberOfMotoBike + '</td>';
                html += '<td>' + item.NumberCarBlank + '</td>';
                html += '<td>' + item.NumberMotoBikeBlank + '</td>';
                html += '<td><button class="btn btn-success" onclick="return getPPByID(' + item.ParkingPlaceID + ')" > Sửa</button></td>';


                html += '</tr>';
            });
            $('#tbodypp').html(html);
            pagingpp(result.total, function () {
                loadDataParkingPlace();
            }, changsizepp);
        },
        error: function (errormessage) {
            if (timeFrom == null && timeTo == null) {
                alert("Làm ơn nhập thời gian vào và ra!");
            } else {
                alert(errormessage.responseText);
            }
        }
    });

    function pagingpp(totalRowpp, callback, changePageSizepp) {
        var totalPagepp = Math.ceil(totalRowpp / 5);

        //Unbind pagination if it existed or click change pageSize
        if ($('#paginationpp').length === 0 || changePageSizepp === true) {
            $('#paginationpp').empty();
            $('#paginationpp').removeData("twbs-pagination");
            $('#paginationpp').unbind("page");
        }

        $('#paginationpp').twbsPagination({
            totalPages: totalPagepp,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            visiblePages: 10,
            onPageClick: function (event, pagepp) {
                pageConfigpp = pagepp;
                setTimeout(callback, 200);
            }
        });
    }
}
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
    //function UpdateCard() {
    //    var res = validate();
    //    if (res == false) {
    //        return false;
    //    }
        var empPPObj = {
            ParkingPlaceID: $('#ParkingPlaceIDEdit').val(),
            NameOfParking: $('#NameOfParkingEdit').val(),
            Location: $('#LocationEdit').val(),
            NumberOfSlot: $('#NumberOfSlotEdit').val(),
            NumberOfCar: $('#NumberOfCarEdit').val(),
            NumberOfMotoBike: $('#NumberOfMotoBikeEdit').val(),
            NumberCarBlank: $('#NumberCarBlankEdit').val(),
            NumberMotoBikeBlank: $('#NumberMotoBikeBlankEdit').val(),
        };
        $.ajax({
            url: "/ManagePPlace/UpdatePP",
            data: JSON.stringify(empPPObj),
            type: "POST",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                loadDataParkingPlace(true);
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
            $('#ParkingPlaceIDEdit').val(result.ParkingPlaceID);
            $('#NameOfParkingEdit').val(result.NameOfParking);
            $('#LocationEdit').val(result.Location);
            $('#NumberOfSlotEdit').val(result.NumberOfSlot);
            $('#NumberOfCarEdit').val(result.NumberOfCar);
            $('#NumberOfMotoBikeEdit').val(result.NumberOfMotoBike);
            $('#NumberCarBlankEdit').val(result.NumberCarBlank);
            $('#NumberMotoBikeBlankEdit').val(result.NumberMotoBikeBlank);

            $('#myModalUpdatePP').modal('show');
           
            $('#btnAddPP').hide();
            $('#btnUpdatePP').show();
        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}
function AddPP() {
    //var res = validate();
    //if (res == false) {
    //    return false;
    //}
    var empPPObj = {
        NameOfParking: $('#NameOfParkingEdit').val(),
        Location: $('#LocationEdit').val(),
        NumberOfSlot: $('#NumberOfSlotEdit').val(),
        NumberOfCar: $('#NumberOfCarEdit').val(),
        NumberOfMotoBike: $('#NumberOfMotoBikeEdit').val(),
        NumberCarBlank: $('#NumberCarBlankEdit').val(),
        NumberMotoBikeBlank: $('#NumberMotoBikeBlankEdit').val(),
    };
    $.ajax({
        url: "/ManagePPlace/Create",
        data: JSON.stringify(empPPObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataParkingPlace(true);
            $('#myModalPP').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}
function clearTextBoxPP() {

    $('#Id').val("");
    $('#NameOfParking').val("");
    $('#Location').val("");
    $('#NumberOfSlot').val("");
    $('#NumberOfCar').val("");
    $('#NumberOfMotoBike').val("");
    $('#NumberCarBlank').val("");
    $('#NumberMotoBikeBlank').val("");


    $('#btnAddPP').show();
    $('#btnUpdatePP').hide();
}

