$(document).ready(function () {
    checkBoxChoiceDateHis();
    $('#TimeFromHis').val(loadDateNowformatdate());
    $('#TimeToHis').val(loadDateNowformatdate());
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
            if (result == "LoadFalse") {
                alert("Tải dữ liệu không thành công!");
            } else {
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

                    html += '</tr>';
                });
                $('#tbodyHis').html(html);
                $('#tbHistory').DataTable({
                    "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": false, "ordering": true, "info": true, retrieve: true,
                    "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
                }).buttons().container().appendTo('#tbHistory_wrapper .col-md-6:eq(0)');
            }
            
        },
        error: function (errormessage) {
            if (errormessage.responseText != '') {
                alert(errormessage.responseText);
            }
        }
    });
}
