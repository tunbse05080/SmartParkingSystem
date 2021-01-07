$(document).ready(function () {
    loadChartIncome();
    loadChartIncomeAll();
    ComboboxNameParking();
    KindOfStatisticIncome();
    //checkChoiceDateIncome();
});

//function checkChoiceDateIncome() {
//    if ($('#checkboxDateIncome').is(':checked')) {
//        $('#dvChoiceCurrentMY').hide();
//        $('#dvfromDateIncome').show();
//        $('#dvtoDateIncome').show();
//    } else {
//        $('#dvChoiceCurrentMY').show();
//        $('#dvfromDateIncome').hide();
//        $('#dvtoDateIncome').hide();
//    }
//}

function KindOfStatisticIncome() {
    if ($('#cbKindOfStatisticIncome').val() == 0) {
        $('#eachParkingIncome').hide();
        $('#ChartIncome').hide();
        $('#dvChartIncomeAll').show();
        $('#cbChoiceTimeIncome').show();
    } else {
        $('#eachParkingIncome').show();
        $('#ChartIncome').show();
        $('#dvChartIncomeAll').hide();
        $('#cbChoiceTimeIncome').hide();
        $('#dvChoiceDateIncome').hide();
    }
}

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
        data: { idParking: idParking, idTypeOfTicket: idTypeOfTicket },
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.datetime + '</td>';
                html += '<td>' + item.sumMoto + '</td>';
                html += '<td>' + item.sumCar + '</td>';
                html += '</tr>';
            });
            $('#tbodyChartIncome').html(html);
            ChartIncome();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartIncome() {
    Highcharts.chart('ChartIncome', {
        data: {
            table: 'tbChartIncome'
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

//Load Chart Income all parking
function loadChartIncomeAll() {
    var choice = $('#cbChoiceTimeIncome').val();
    if (!choice) {
        choice = 0;
    }
    $.ajax({
        url: "/StatisticReport/LoadDataIncomeAll",
        type: "POST",
        contents: "application/json",
        data: { choice: choice },
        dataType: "json",
        success: function (result) {
            var html = '';
            var htmlHide = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.sumMoto + '</td>';
                html += '<td>' + item.sumCar + '</td>';
                html += '<td>' + item.totalAll + '</td>';
                html += '</tr>';
                if (item.name != "Tổng tiền") {
                    //tbody hide
                    htmlHide += '<tr>';
                    htmlHide += '<td>' + item.name + '</td>';
                    htmlHide += '<td>' + item.sumMoto + '</td>';
                    htmlHide += '<td>' + item.sumCar + '</td>';
                    htmlHide += '</tr>';
                }
            });
            //table hide
            $('#tbodyChartIncomeAllHide').html(htmlHide);

            $('#tbodyChartIncomeAll').html(html);
            $('#tbChartIncomeAll').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": false, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf"]
            }).buttons().container().appendTo('#tbChartIncomeAll_wrapper .col-md-6:eq(0)');
            ChartIncomeAll();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function ChartIncomeAll() {
    Highcharts.chart('ChartIncomeAll', {
        data: {
            table: 'tbChartIncomeAllHide'
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Biểu đồ doanh thu'
        },
        xAxis: {
            title: {
                text: 'Tên bãi đỗ'
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