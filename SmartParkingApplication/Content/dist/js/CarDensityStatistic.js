$(document).ready(function () {
    $('#fromDateVeDensity').val(loadDateNowformatdate());
    $('#toDateVeDensity').val(loadDateNowformatdate());
    loadChartCarDensity();
    loadChartCarDensityAll();
    KindOfStatisticDensity();
    ChartCarDensityAll();
    checkChoiceDateVeDensity();
});

function checkChoiceDateVeDensity() {
    if ($('#checkboxDateVeDensity').is(':checked')) {
        $('#dvChoiceCurrentMYVeDensity').hide();
        $('#dvfromDateVeDensity').show();
        $('#dvtoDateVeDensity').show();
    } else {
        $('#dvChoiceCurrentMYVeDensity').show();
        $('#dvfromDateVeDensity').hide();
        $('#dvtoDateVeDensity').hide();
    }
}

function KindOfStatisticDensity() {
    if ($('#cbKindOfStatisticDensity').val() == 0) {
        $('#eachParking').hide();
        $('#ChartCarDensity').hide();
        $('#dvChartCarDensityAll').show();
        $('#cbChoiceTimeDensity').show();
        $('#dvCheckboxDateVeDensity').show();
    } else {
        $('#eachParking').show();
        $('#ChartCarDensity').show();
        $('#dvChartCarDensityAll').hide();
        $('#cbChoiceTimeDensity').hide();
        $('#dvCheckboxDateVeDensity').hide();
        $('#dvfromDateVeDensity').hide();
        $('#dvtoDateVeDensity').hide();
    }
}

//load Chart of CarDensity all parking
function loadChartCarDensityAll() {
    var choice = $('#cbChoiceTimeDensity').val();
    var isCheckDate = $('#checkboxDateVeDensity').is(':checked');
    var dateFrom;
    var dateTo;
    if (isCheckDate) {
        var res = validateVehicleDensity();
        if (res == false) {
            return false;
        }
        dateFrom = $('#fromDateVeDensity').val();
        dateTo = $('#toDateVeDensity').val();
    } else {
        dateFrom = $('#fromDateVeDensity').val();
        dateTo = $('#toDateVeDensity').val();
    }
    if (!choice) {
        choice = 0;
    }
    $.ajax({
        url: "/StatisticReport/LoadChartCarDensityAll",
        type: "POST",
        data: { choice: choice, dateFrom: dateFrom, dateTo: dateTo, isCheckDate: isCheckDate },
        contents: "application/json",
        dataType: "json",
        success: function (result) {
            var html = '';
            var htmlHide = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.name + '</td>';
                html += '<td>' + item.dataMoto + '</td>';
                html += '<td>' + item.dataCar + '</td>';
                html += '</tr>';
                if (item.name != "Tổng lượt xe") {
                    htmlHide += '<tr>';
                    htmlHide += '<td>' + item.name + '</td>';
                    htmlHide += '<td>' + item.dataMoto + '</td>';
                    htmlHide += '<td>' + item.dataCar + '</td>';
                    htmlHide += '</tr>';
                }
            });
            //table hide
            $('#tbodyChartCarDensityAllHide').html(htmlHide);

            $('#tbodyChartCarDensityAll').html(html);
            $('#tbChartCarDensityAll').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": false, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf"]
            }).buttons().container().appendTo('#tbChartCarDensityAll_wrapper .col-md-6:eq(0)');
            ChartCarDensityAll();
        },
        error: function (errormessage) {
        }
    });
}

function ChartCarDensityAll() {
    Highcharts.chart('ChartCarDensityAll', {
        data: {
            table: 'tbChartCarDensityAllHide'
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
                html += '<td>' + item.datetime + '</td>';
                html += '<td>' + item.dataMoto + '</td>';
                html += '<td>' + item.dataCar + '</td>';
                html += '</tr>';
            });
            $('#tbodyChartCarDensity').html(html);
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

//validate using query
function validateVehicleDensity() {
    //Display css of error message
    var htmlcss = {
        'color': 'Red'
    }
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
            $(element).css('border-color', 'Red');
        },
        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
            $(element).css('border-color', 'lightgrey');
        },
        errorPlacement: function (error, element) {
            error.appendTo($(element).parent()).css(htmlcss);
        }
    });
    //Set custom valid by rule
    $.validator.addMethod('checkfromDateVeDensity', function (value, element) {
        return new Date(value) <= new Date($('#toDateVeDensity').val());
    });
    $.validator.addMethod('checktoDateVeDensity', function (value, element) {
        return new Date(value) >= new Date($('#fromDateVeDensity').val());
    });
    //Set rule + message for input by name
    $('#FormCheckDateVeDensity').validate({
        rules: {
            fromDateVeDensity: {
                checkfromDateVeDensity: true
            },
            toDateVeDensity: {
                checktoDateVeDensity: true
            }
        },
        messages: {
            fromDateVeDensity: {
                checkfromDateVeDensity: 'Phải nhỏ hơn hoặc bằng thời gian kết thúc!'
            },
            toDateVeDensity: {
                checktoDateVeDensity: 'Phải lớn hơn hoặc bằng thời gian bắt đầu!'
            }
        }
    });
    return $('#FormCheckDateVeDensity').valid();
}