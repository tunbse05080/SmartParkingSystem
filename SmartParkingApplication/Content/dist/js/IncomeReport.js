$(document).ready(function () {
    $('#timeWorking').val(loadDateNowformatdate());
});

//Load Chart Income
function LoadDataIncomeReport() {
    $('#tbIncomeReport').DataTable().clear().destroy();
    var id1 = $('#cbNameParkingPlaceReport').val();
    var dateTime = $('#timeWorking').val();
    var workingShift1 = $('#cbWorkShift').val();
    $.ajax({
        url: "/StatisticReport/LoadDataIncomeReport",
        type: "POST",
        contents: "application/json",
        data: { id: id1, dateTime: dateTime, workingShift: workingShift1},
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.UserName + '</td>';
                html += '<td>' + item.Name + '</td>';
                html += '<td>' + item.totalPrice + '</td>';
                html += '</tr>';
            });
            $('#tbodyIR').html(html);

            $("#tbIncomeReport").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tbIncomeReport_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function ComboboxStaffName() {
//    $.ajax({
//        url: "/StatisticReport/ComboboxStaffName",
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            var html = '';
//            $.each(result, function (key, item) {
//                html += '<option value=' + item.UserID + '>' + item.UserName + '</option>';
//            });
//            $('#cbNameStaff').html(html);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}