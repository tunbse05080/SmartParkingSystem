var pageConfigpr = 1;

function loadDataPrice(changsizepr) {
    var namepr = $('#txtNameSearchpr').val();
    $.ajax({
        url: "/SettingPrice/LoadDataPrice",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            namepr: namepr,
            pagepr: pageConfigpr,
            pageSizepr: 5,

        },
        dataType: "json",
        success: function (result) {
            var data = result.datapr;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.TypeOfvehicle + '</td>';
                html += '<td>' + item.DayPrice + '</td>';
                html += '<td>' + item.MonthPrice + '</td>';
                html += '<td>' + item.FirstBlock + '</td>';
                html += '<td>' + item.NextBlock + '</td>';
                html += '</tr>';
            });
            $('#tbodypr').html(html);
            pagingpr(result.total, function () {
                loadDataPrice();
            }, changsizepr);
        },
        error: function () {

        }
    });
    function pagingpr(totalRowpr, callback, changePageSizepr) {
        var totalPagepr = Math.ceil(totalRowpr / 5);

        //Unbind pagination if it existed or click change pageSize
        if ($('#paginationpr').length === 0 || changePageSizepr === true) {
            $('#paginationpr').empty();
            $('#paginationpr').removeData("twbs-pagination");
            $('#paginationpr').unbind("page");
        }

        $('#paginationpr').twbsPagination({
            totalPages: totalPagepr,
            first: "Đầu",
            next: "Tiếp",
            last: "Cuối",
            prev: "Trước",
            visiblePages: 10,
            onPageClick: function (event, pagepr) {
                pageConfigpr = pagepr;
                setTimeout(callback, 200);
            }
        });
    }

}