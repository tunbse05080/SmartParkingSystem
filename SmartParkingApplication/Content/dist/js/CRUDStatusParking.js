//load page
$(document).ready(function () {
    loadDataStatusParking();
});

//Load Data function
function loadDataStatusParking() {
    //var timeTo = $('#txtTimeToSPP').val();
    //var timeFrom = $('#txtTimeFromSPP').val();
    $.ajax({
        url: "/ManagePPlace/LoadDataStatusPP",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        //data: {
        //    timeFrom: timeFrom,
        //    timeTo: timeTo
        //},
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
            var table = $('#tbStatusPP').DataTable();
            //pagingSPP(result.total, function () {
            //    loadDataStatusParking();
            //}, changePageSizeSPP);
        },
        error: function (errormessage) {
            if (timeFrom == null && timeTo == null) {
            } else {
                alert(errormessage.responseText);
            }
        }
    });
}

//load information follow PPlaceName
//function loadInfoPPlace() {
//    $.ajax({
//        url: "/ManagePPlace/LoadInfoPPlace",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result){
//            var data= result.result;
//            var html = "";
//            html += '<tr>';
//            html += '<td style="font-weight:bolder>' + 'Xe máy' + '</td>';
//            html += '<td>' + data.prkedMotobike + '</td>';
//            html += '<td>' + data.NumEmptyMotobike + '</td>';
//            html += '<td>' + data.NumMonthTicketMotobike + '</td>';
//            html += '<td>' + data.NumDayTicketMotobike + '</td>';
//            html += '<td>' + data.PriceMotobike + '</td>';
//            html += '</tr>';
//            html += '<tr>';
//            html += '<td style="font-weight:bolder>' + 'Xe máy' + '</td>';
//            html += '<td>' + data.prkedCar + '</td>';
//            html += '<td>' + data.NumEmptyCar + '</td>';
//            html += '<td>' + data.NumMonthTicketCar + '</td>';
//            html += '<td>' + data.NumDayTicketCar + '</td>';
//            html += '<td>' + data.PriceCar + '</td>';
//            html += '</tr>';
//            $('#tbodyInfoStatusPP').html(html);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

//paging Status ParkingPlace
//function pagingSPP(totalRowSPP, callback, changePageSizeSPP) {
//    var totalPageSPP = Math.ceil(totalRowSPP / 5);

//    //Unbind pagination if it existed or click change pageSize
//    if ($('#paginationSPP').length === 0 || changePageSizeSPP === true) {
//        $('#paginationSPP').empty();
//        $('#paginationSPP').removeData("twbs-pagination");
//        $('#paginationSPP').unbind("page");
//    }

//    $('#paginationSPP').twbsPagination({
//        totalPages: totalPageSPP,
//        first: "Đầu", 
//        next: "Tiếp",
//        last: "Cuối",
//        prev: "Trước",
//        visiblePages: 10,
//        onPageClick: function (event, pageSPP) {
//            pageConfigSPP = pageSPP;
//            setTimeout(callback, 200);
//        }
//    });
//}

