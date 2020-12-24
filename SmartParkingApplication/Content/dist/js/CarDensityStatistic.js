$(document).ready(function () {
    loadChartCarDensity();
    loadChartCarDensityAll();
    KindOfStatisticDensity();
    ChartCarDensityAll();
});

function KindOfStatisticDensity() {
    if ($('#cbKindOfStatisticDensity').val() == 0) {
        $('#eachParking').hide();
        $('#ChartCarDensity').hide();
        $('#dvChartCarDensityAll').show();
        $('#cbChoiceTimeDensity').show();

    } else {
        $('#eachParking').show();
        $('#ChartCarDensity').show();
        $('#dvChartCarDensityAll').hide();
        $('#cbChoiceTimeDensity').hide();
    }
}

//load Chart of CarDensity all parking
function loadChartCarDensityAll() {
    var choice = $('#cbChoiceTimeDensity').val();
    if (!choice) {
        choice = 0;
    }
    $.ajax({
        url: "/StatisticReport/LoadChartCarDensityAll",
        type: "POST",
        data: { choice: choice },
        contents: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result.listData, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.NameOfParking + '</td>';
                html += '<td>' + item.dataMoto + '</td>';
                html += '<td>' + item.dataCar + '</td>';
                html += '</tr>';
            });
            $('#tbodyChartCarDensityAll').html(html);
            $('#tbChartCarDensityAll').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf"]
            }).buttons().container().appendTo('#tbChartCarDensityAll_wrapper .col-md-6:eq(0)');
            ChartCarDensityAll();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function ChartCarDensityAll() {
    Highcharts.chart('ChartCarDensityAll', {
        data: {
            table: 'tbChartCarDensityAll'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ mật độ xe'
        },
        xAxis: {
            allowDecimals: false,
            title: {
                text: 'Các bãi đỗ'
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Số lượt xe'
            }
        },
    });
}

//load Chart of CarDensity
function loadChartCarDensity() {
    var idParking = $('#cbNameParkingPlaceD').val();
    if (!idParking) {
        idParking = 1;
    }
    $.ajax({
        url: "/StatisticReport/LoadChartCarDensity",
        type: "POST",
        contents: "application/json",
        data: { idParking: idParking },
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>Tháng' + item.Month + '</td>';
                html += '<td>' + item.dataMoto + '</td>';
                html += '<td>' + item.dataCar + '</td>';
                html += '</tr>';
            });
            $('#tbodyChartCarDensity').html(html);
            $('#tbChartCarDensity').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf"]
            }).buttons().container().appendTo('#tbChartCarDensity_wrapper .col-md-6:eq(0)');
            ChartCarDensity();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartCarDensity() {
    Highcharts.chart('ChartCarDensity', {
        data: {
            table: 'tbChartCarDensity'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ mật độ xe'
        },
        xAxis: {
            title: {
                text: 'Các tháng'
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Số lượt xe'
            }
        },
    });
}