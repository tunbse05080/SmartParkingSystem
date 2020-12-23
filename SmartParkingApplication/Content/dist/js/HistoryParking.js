//load page
//$(document).ready(function () {
    //getDayFirstInLastOut();
//    loadDataHistoryParking();
//});

//var temp = {
//    timeFrom: "",
//    timeTo: ""
//}


//Load Data function
function loadDataHistoryParking() {
    var res = validateHistoryPP();
    if (res == false) {
        return false;
    }
    var timeTo = $('#TimeToHis').val();
    var timeFrom = $('#TimeFromHis').val();
    var ParkingPlaceID = $('#cbNameParkingPlaceHistory').val();
    var txtSearch = $('#txtSearchHistoryPP').val();
    if (ParkingPlaceID) {
        $('#tbHistory').DataTable().clear().destroy();
    } else {
        ParkingPlaceID = 1;
    }
    $.ajax({
        url: "/ManagePPlace/LoadHistoryParking",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ timeFrom: timeFrom, timeTo: timeTo, ParkingPlaceID: ParkingPlaceID, txtSearchHistory: txtSearch }),

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
            $('#tbHistory').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbHistory_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            if (errormessage.responseText != '') {
                alert(errormessage.responseText);
            }
        }
    });
}

//get day firstTime and lastOut
//function getDayFirstInLastOut() {
//    $.ajax({
//        url: "/ManageHistoryParking/getDayFirstInLastOut",
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#TimeFromHis').val(result.firstIn);
//            $('#TimeToHis').val(result.lastOut);
//            temp.timeFrom = result.firstIn;
//            temp.timeTo = result.lastOut;
//        },
//        error: function (errormessage) {
//            alert("Exception:" + errormessage.responseText);
//        }
//    });
//}
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
//}

//clear text
function clearTextHis() {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
}

//validate using jquery
function validateHistoryPP() {
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set custom valid by rule
    $.validator.addMethod('checkTimeFH', function (value, element) {
        return new Date(value) < new Date($('#TimeToHis').val());
    });
    $.validator.addMethod('checkTimeTH', function (value, element) {
        return new Date(value) > new Date($('#TimeFromHis').val());
    });
    //Set rule + message for input by name
    $('#FormHistory').validate({
        rules: {
            TimeFromHis: {
                required: true,
                checkTimeFH: true
            },
            TimeToHis: {
                required: true,
                checkTimeTH: true
            }
        },
        messages: {
            TimeFromHis: {
                required: '*Bắt buộc.',
                checkTimeFH: 'Phải nhỏ hơn "Đến ngày"!'
            },
            TimeToHis: {
                required: '*Bắt buộc.',
                checkTimeTH: 'Phải lớn hơn "Từ ngày"!'
            }
        }
    });
    return $('#FormHistory').valid();
}