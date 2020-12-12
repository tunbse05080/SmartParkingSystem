$(document).ready(function () {
    loadChart();
    ComboboxNameParking();
});
//var data;
function loadChart() {
    var idParking = $('#cbNameParkingPlace').val();
    if (!idParking) {
        idParking = 1;
    }
    $.ajax({
        url: "/ManageStatistic/LoadDataIncome",
        type: "POST",
        contents: "application/json",
        data: { id: idParking },
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

function ComboboxNameParking() {
    $.ajax({
        url: "/ManageStatistic/ComboboxNameParking",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value=' + item.ParkingPlaceID + '>' + item.NameOfParking + '</option>';
            });
            $('#cbNameParkingPlace').html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}