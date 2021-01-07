$(document).ready(function () {
    loadChartWorkingShift();
    ComboboxUserName(3);
});

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
                html += '<td>' + item.datetime + '</td>';
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