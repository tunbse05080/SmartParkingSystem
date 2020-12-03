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
                html += '<td><button class="btn btn-success" onclick="return getParkingPlaceID(' + item.MonthlyTicketID + ')" > Sửa</button></td>';


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
function getTicketByID(ParkingPlaceID) {
    $.ajax({
        url: "/ManagePPlace/ParkingPlaceDetails/" + ParkingPlaceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#ParkingPlaceIDPP').val(result.ParkingPlaceID);
            $('#NameOfParkingPP').val(result.NameOfParking);
            $('#LocationPP').val(result.Location);
            $('#NumberOfSlotPP').val(result.NumberOfSlot);
            $('#NumberOfCarPP').val(result.NumberOfCar);
            $('#NumberOfMotoBikePP').val(result.NumberOfMotoBike);
            $('#NumberCarBlankPP').val(result.NumberCarBlank);
            $('#NumberMotoBikeBlankPP').val(result.NumberMotoBikeBlank);
            

            $('#myModalPPUpdate').modal('show');
            $('#btnUpdatePP').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + ParkingPlaceID + errormessage.responseText);
        }
    });
    return false;
}
function UpdateCard() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empCardObj = {
        CardID: $('#IdCardEdit').val(),
        CardNumber: $('#CardNumberEdit').val(),
        Date: $('#DateCardEdit').val(),
        Status: $('#StatusCardEdit').val(),
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataCard(true);
            $('#myModalUpdate').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}