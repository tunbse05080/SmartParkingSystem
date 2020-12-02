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
                html += '<td>' + item.NumberOfMotoBikeicket + '</td>';

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