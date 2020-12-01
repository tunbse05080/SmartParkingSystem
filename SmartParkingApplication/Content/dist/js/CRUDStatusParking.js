
var pageConfigSPP = 1;

//Load Data function
function loadDataStatusParking(changePageSizeSPP) {
    var nameSPP = $('#txtNameSearchSPP').val();
    var timeTo = $('#txtTimeToSPP').val();
    var timeFrom = $('#txtTimeFromSPP').val();
    $.ajax({
        url: "/ManagePPlace/LoadDataStatusPP",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            nameSSP: nameSPP,
            pageSPP: pageConfigSPP,
            pageSizeSPP: 5,
            timeFrom: timeFrom,
            timeTo: timeTo
        },
        dataType: "json",
        success: function (result) {
            var data = result.dataSSP;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.LicensePlates + '</td>';
                html += '<td>' + item.TimeIn + '</td>';
                html += '<td>' + item.TimeOutv + '</td>';
                html += '<td>' + item.TypeOfTicket + '</td>';
                html += '<td>' + item.CardNumber + '</td>';
                html += '<td>' + 'Xe máy' + '</td>';
                html += '</tr>';
            });
            $('#tbodyStatusPP').html(html);
            pagingSPP(result.total, function () {
                loadDataStatusParking();
            }, changePageSizeSPP);
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

//paging
function pagingSPP(totalRowSPP, callback, changePageSizeSPP) {
    var totalPageSPP = Math.ceil(totalRowSPP / 5);

    //Unbind pagination if it existed or click change pageSize
    if ($('#paginationSPP').length === 0 || changePageSizeSPP === true) {
        $('#paginationSPP').empty();
        $('#paginationSPP').removeData("twbs-pagination");
        $('#paginationSPP').unbind("page");
    }

    $('#paginationSPP').twbsPagination({
        totalPages: totalPageSPP,
        first: "Đầu", 
        next: "Tiếp",
        last: "Cuối",
        prev: "Trước",
        visiblePages: 10,
        onPageClick: function (event, pageSPP) {
            pageConfigSPP = pageSPP;
            setTimeout(callback, 200);
        }
    });
}

