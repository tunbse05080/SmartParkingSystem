//load page
$(document).ready(function () {
    loadDataHistoryParking();
});

//Load Data function
function loadDataHistoryParking() {
    //var timeTo = $('#txtTimeToSPP').val();
    //var timeFrom = $('#txtTimeFromSPP').val();
    var ParkingPlaceID = $('#cbNameParkingPlaceD').val();
    if (ParkingPlaceID) {
    } else {
        ParkingPlaceID = 1;
    }
    $.ajax({
        url: "/ManageHistoryParking/LoadHistoryParking",
        type: "GET",
        data: { ParkingPlaceID: ParkingPlaceID },
        contentType: "application/json;charset=utf-8",
        //data: {
        //    timeFrom: timeFrom,
        //    timeTo: timeTo
        //},
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.LicensePlates + '</td>';
                html += '<td>' + item.timeIn + '</td>';
                html += '<td>' + item.timeOut + '</td>';
                html += '<td>' + item.CardNumber + '</td>';
                html += '<td>' + item.typeofTicket + '</td>';
                html += '<td>' + item.TotalPrice + '</td>';
                html += '<td>TuNB</td>';
                html += '<td>TuNB</td>';

                //html += '<td><button class="btn btn-primary" onclick = "return getDetailHisByID(' + item.TransactionID + ')"> Chi tiết</button></td>';
                html += '</tr>';
            });
            $('#tbodyHis').html(html);
            var table = $('#tbHistory').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbHistory_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            if (timeFrom == null && timeTo == null) {
            } else {
                alert(errormessage.responseText);
            }
        }
    });
}

//get info transacsion from transactionID
//function getDetailHisByID(TransactionID) {
//    $.ajax({
//        url: "/ManagePPlace/ParkingSSDetails/" + TransactionID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#LicensePlatesHis').val(result.LicensePlates);
//            $('#TimeInHis').val(result.TimeIn);
//            $('#TimeOutHis').val(result.TimeOut);
//            $('#TypeOfTicketHis').val(result.typeTicket);
//            $('#CardNumberHis').val(result.CardNumber);
//            $('#TotalPriceHis').val(result.TotalPrice);
//            $('#TypeOfVehicleHis').val(result.typeVE);
//            $('#StaffInHis').val("TuNB");
//            $('#StaffOutHis').val("TuNB");

//            $('#myModalHistoryDetail').modal('show');
//        },
//        error: function (errormessage) {
//            alert("Exception:" + TransactionID + errormessage.responseText);
//        }
//    });
//    return false;
//}
