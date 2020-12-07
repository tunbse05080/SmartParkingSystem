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
}