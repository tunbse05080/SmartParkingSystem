
$(document).ready(function () {
    checkBoxChoiceDateHis();
});

function checkBoxChoiceDateHis() {
    if ($('#checkboxDateHis').is(':checked')) {
        $('#dvFromHis').show();
        $('#dvToHis').show();
    } else {
        $('#dvFromHis').hide();
        $('#dvToHis').hide();
    }
}

//Load Data function
function loadDataHistoryParking() {
    ////var res = validateHistoryPP();
    //if (res == false) {
    //    return false;
    //}
    var timeTo;
    var timeFrom;
    $('#tbHistory').DataTable().clear().destroy();
    var checkboxDate = document.getElementById("checkboxDateHis");
    if (checkboxDate.checked == false) {
        timeTo = new Date();
        timeFrom = "1970-01-01";
    } else {
        timeTo = $('#TimeToHis').val();
        timeFrom = $('#TimeFromHis').val();
    }
    var ParkingPlaceID = $('#cbNameParkingPlaceHistory').val();
    var txtSearch = $('#txtSearchHistoryPP').val();
    if (ParkingPlaceID) {

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
                html += '<td>' + item.userIn + '</td>';
                html += '<td>' + item.userOut + '</td>';

                //html += '<td><button class="btn btn-primary" onclick = "return getDetailHisByID(' + item.TransactionID + ')"> Chi tiết</button></td>';
                html += '</tr>';
            });
            $('#tbodyHis').html(html);
            $('#tbHistory').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": false, "ordering": true, "info": true, retrieve: true,
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
            },
            txtSearchHistoryPP: {
                required: true
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
            },
            txtSearchHistoryPP: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormHistory').valid();
}