$(document).ready(function () {
    loadChartDashboard();
});

//Load Chart Income
function loadChartDashboard() {
    $.ajax({
        url: "/Home/loadChartDashboard",
        type: "GET",
        contents: "application/json",
        dataType: "json",
        success: function (result) {
            if (result == "LoadFalse") {
                alert("Tải biểu đồ không thành công!");
            } else {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.datetime + '</td>';
                    html += '<td>' + item.sumMoto + '</td>';
                    html += '<td>' + item.sumCar + '</td>';
                    html += '</tr>';
                });
                $('#tbodyChartIncomeTotal').html(html);
                ChartIncomeTotal();
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Draw chart income total
function ChartIncomeTotal() {
    Highcharts.chart('ChartIncomeTotal', {
        data: {
            table: 'tbChartIncomeTotal'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ doanh thu'
        },
        xAxis: {
            title: {
                text: 'Các tháng'
            }
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Doanh thu'
            }
        },
    });
}