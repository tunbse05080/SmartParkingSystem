﻿$(document).ready(function () {
    loadChartIncome();
    ComboboxNameParking();
});

//Load Chart Income
function loadChartIncome() {
    var idParking = $('#cbNameParkingPlace').val();
    var idTypeOfTicket = $('#cbTypeOfTicket').val();
    if (!idParking) {
        idParking = 1;
    }
    if (!idTypeOfTicket) {
        idTypeOfTicket = 0;
    }
    $.ajax({
        url: "/StatisticReport/LoadDataIncome",
        type: "POST",
        contents: "application/json",
        data: { idParking: idParking, idTypeOfTicket: idTypeOfTicket},
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
                pointStart: Date.UTC(2020, 1),
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
        url: "/StatisticReport/ComboboxNameParking",
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<option value=' + item.ParkingPlaceID + '>' + item.NameOfParking + '</option>';
            });
            $('#cbNameParkingPlace').html(html);
            $('#cbNameParkingPlaceTK').html(html);
            $('#cbNameParkingPlaceD').html(html);
            $('#cbNameParkingPlaceDaily').html(html);
            $('#cbNameParkingPlaceBlock').html(html);
            $('#cbNameParkingPlaceMonthly').html(html);
            $('#cbNameParkingPlaceReport').html(html);

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}