$(document).ready(function () {
    loadChartIncome();
    ComboboxStaffName();
});

//Load Chart Income
function loadChartIncome() {
    var idParking = $('#cbNameParkingPlace').val();
    var idTypeOfTicket = $('#cbNameStaff').val();
    if (!idParking) {
        idParking = 1;
    }
    if (!idTypeOfTicket) {
        idTypeOfTicket = 0;
    }
    if ($('#cbTypeOfTicket').val() == 0) {
        $('#dvParking').hide();
    } else {
        $('#dvParking').show();
    }
    $.ajax({
        url: "/StatisticReport/LoadDataIncome",
        type: "POST",
        contents: "application/json",
        data: { idParking: idParking, idTypeOfTicket: idTypeOfTicket },
        dataType: "json",
        success: function (result) {
            ChartIncome(result);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ComboboxStaffName() {
    $.ajax({
        url: "/StatisticReport/ComboboxStaffName",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value=' + item.UserID + '>' + item.UserName + '</option>';
            });
            $('#cbNameStaff').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}