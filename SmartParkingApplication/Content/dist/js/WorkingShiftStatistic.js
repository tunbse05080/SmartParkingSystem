$(document).ready(function () {
    loadChartWorkingShift();
    ComboboxUserName(3);
    //loadChartWorkingShiftAll();
    //KindOfWorkingShiftStatistic();
});

//function KindOfWorkingShiftStatistic() {
//    if ($('#cbKindOfStatisticWorkingShift').val() == 0) {
//        $('#eachParkingWorkingShift').hide();
//        $('#ChartWorkingShift').hide();
//        $('#dvChartWorkingShiftAll').show();
//        $('#cbChoiceTimeWorkingShift').show();

//    } else {
//        $('#eachParkingWorkingShift').show();
//        $('#ChartWorkingShift').show();
//        $('#dvChartWorkingShiftAll').hide();
//        $('#cbChoiceTimeWorkingShift').hide();
//    }
//}

//Load Chart WorkingShift
function loadChartWorkingShift() {
    var id = $('#cbUserNameWS').val();
    if (!id) {
        return false;
    }
    $.ajax({
        url: "/StatisticReport/LoadDataWorkingShift",
        type: "POST",
        contents: "application/json",
        data: { id: id },
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>Tháng' + item.Month + '</td>';
                html += '<td>' + item.total + '</td>';
                html += '</tr>';
            });
            $('#tbodyChartWorkingShift').html(html);
            ChartWorkingShift();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartWorkingShift() {
    Highcharts.chart('ChartWorkingShift', {
        data: {
            table: 'tbChartWorkingShift'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ số ca làm việc'
        },
        xAxis: {
            title: {
                text: 'Các tháng'
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Số ca làm việc'
            }
        },
    });
}

//load table working shift all staff 
//function loadChartWorkingShiftAll() {
//    $.ajax({
//        url: "/StatisticReport/LoadDataWorkingShiftAll",
//        type: "GET",
//        contents: "application/json",
//        dataType: "json",
//        success: function (result) {
//            var html = '';
//            $.each(result, function (key, item) {
//                $.each(item, function (key, item2) {
//                    html += '<tr>';
//                    html += '<td>' + item2.Name + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '<td>' + item2.total + '</td>';
//                    html += '</tr>';
//                });
//            });
//            $('#tbodyChartWorkingShiftAll').html(html);
//            $('#tbChartWorkingShiftAll').DataTable({
//                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
//                "buttons": ["copy", "csv", "excel", "pdf"]
//            }).buttons().container().appendTo('#tbChartWorkingShiftAll_wrapper .col-md-6:eq(0)');
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}

////Load Chart Income all parking
//function loadChartIncomeAll() {
//    var choice = $('#cbChoiceTimeIncome').val();
//    if (!choice) {
//        choice = 0;
//    }
//    $.ajax({
//        url: "/StatisticReport/LoadDataIncomeAll",
//        type: "POST",
//        contents: "application/json",
//        data: { choice: choice },
//        dataType: "json",
//        success: function (result) {
//            var html = '';
//            var htmlHide = '';
//            $.each(result, function (key, item) {
//                html += '<tr>';
//                html += '<td>' + item.name + '</td>';
//                html += '</tr>';
//            });
//            //table hide
//            $('#tbodyChartIncomeAllHide').html(htmlHide);

//            $('#tbodyChartIncomeAll').html(html);
//            $('#tbChartWorkingShiftAll').DataTable({
//                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": false, "info": true, retrieve: true,
//                "buttons": ["copy", "csv", "excel", "pdf"]
//            }).buttons().container().appendTo('#tbChartWorkingShiftAll_wrapper .col-md-6:eq(0)');
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}