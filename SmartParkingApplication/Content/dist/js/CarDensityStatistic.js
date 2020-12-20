$(document).ready(function () {
    loadChartCarDensity();
});

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
        data: { idParking: idParking},
        dataType: "json",
        success: function (result) {
            ChartCarDensity(result);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartCarDensity(result) {
    Highcharts.chart('ChartCarDensity', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Biểu đồ mật độ xe'
        },
        xAxis: {
            title: {
                text: '12 tháng gần nhất'
            },
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Mật độ xe'
            }
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            series: {
                pointStart: Date.UTC(2020, 1, 1),
                pointInterval: 2635000000  // one month
            }
        },
        series: [{
            name: 'Ô tô',
            data: result.listCarDestiny,

        }, {
            name: 'Xe máy',
                data: result.listMotoDestiny,

        }],
    });
}