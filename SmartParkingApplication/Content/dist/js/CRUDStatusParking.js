//load page
$(document).ready(function () {
    loadDataStatusParking();
});

//Load Data function
function loadDataStatusParking() {
    //var timeTo = $('#txtTimeToSPP').val();
    //var timeFrom = $('#txtTimeFromSPP').val();
    $('#cbxListParking').on('change', function () {
        var ParkingPlaceID = $('#cbxListParking').val();
        
        $.ajax({
            url: "/ManagePPlace/LoadDataStatusPP",
            type: "GET",
            data: { ParkingPlaceID: ParkingPlaceID },
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
                    html += '<td>' + item.TypeOfVerhicleTran + '</td>';
                    html += '<td><button class="btn btn-primary" onclick = "return getDetailTranByID(' + item.TransactionID + ')"> Chi tiết</button></td>';
                    html += '</tr>';
                });
                $('#tbodyStatusPP').html(html);
                var table = $('#tbStatusPP').DataTable({
                    "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tbStatusPP_wrapper .col-md-6:eq(0)');
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

    })  }
function getDetailTranByID(TransactionID) {
    $.ajax({
        url: "/ManagePPlace/ParkingSSDetails/" + TransactionID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#Idd').val(result.TransactionID);
            $('#LicensePlatesd').val(result.LicensePlates);
            $('#TimeInd').val(result.TimeIn);
            $('#TimeOutvd').val(result.TimeOut);
            $('#TypeOfTicketd').val(result.typeTicket);
            $('#CardNumber').val(result.CardNumber);
            $('#TypeOfVe').val(result.typeVE);

          

            $('#myModalTranDetail').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + TransactionID + errormessage.responseText);
        }
    });
    return false;
}
//comboboxlistOfParking
function comboboxlistOfParking() {
    $.ajax({
        url: "/ManagePPlace/ComboboxListOfParking",
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
            $("#cblistOfParking").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
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

