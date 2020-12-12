$(document).ready(function () {
    loadChart();

});
//var data;
function loadChart() {
    $.ajax({
        url: "/ManageStatistic/LoadDataIncome",
        type: "GET",
        contents: "application/json",
        dataType: "json",
        success: function (result) {
            ChartIncome(result);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartIncome(result) {
    Highcharts.chart('ChartIncome', {
        chart: {
            type: 'line'
        },
        title: {
            text: 'Biểu đồ doanh thu'
        },
        xAxis: {
            title: {
                text: '12 tháng gần nhất'
            },
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Doanh Thu'
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
            data: result.listIncomeCar,

        }, {
            name: 'Xe máy',
            data: result.listIncomeMoto,

        }],
    });
}