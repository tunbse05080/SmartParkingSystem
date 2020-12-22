$(document).ready(function () {
    checkLoadData();
    clear();
});

//get format date
function Getformatdate(date) {
    var today = new Date(parseInt(date.substr(6)));
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var result = dd + '/' + mm + '/' + yyyy;
    return result;
}

//Check load data price follow parkingplace and type of ticket
function checkLoadData() {
    if ($('#cbTypeOfTicketLoad').val() == 0) {
        $('#tbPriceMonth').hide();
        $('#tbPrice').show();
        $('#tbPrice').DataTable().clear().destroy();
        $('#tbPriceMonth').DataTable().clear().destroy();
        loadDataPrice();
    } else {
        $('#tbPrice').hide();
        $('#tbPriceMonth').show();
        $('#tbPrice').DataTable().clear().destroy();
        $('#tbPriceMonth').DataTable().clear().destroy();
        loadDataPriceMonthly();
    }
}

//load data price to table Price
function loadDataPrice() {
    var ParkingPlaceID = $('#cbNameParkingPlaceD').val();
    if (ParkingPlaceID) {
    } else {
        ParkingPlaceID = 1;
    }
    $.ajax({
        url: "/SettingPrice/LoadDataPrice",
        type: "POST",
        data: JSON.stringify({ ParkingPlaceID: ParkingPlaceID }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.typeOfVehicle + '</td>';
                html += '<td>' + item.DayPrice + '</td>';
                html += '<td>' + item.FirstBlock + '</td>';
                html += '<td>' + item.NextBlock + '</td>';
                html += '<td>' + item.TimeApply + '</td>';
                html += '<td><button class="btn btn-primary" onclick="return getDetailPriceByID(' + item.PriceID + ')" >Chi tiết</button></td>';
                html += '</tr>';
            });
            $('#tbodypr').html(html);

            $("#tbPrice").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tbPrice_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//load data price monthly to table Price
function loadDataPriceMonthly() {
    var ParkingPlaceID = $('#cbNameParkingPlaceD').val();
    if (ParkingPlaceID) {
    } else {
        ParkingPlaceID = 1;
    }
    $.ajax({
        url: "/SettingPrice/LoadDataPriceMonthly",
        type: "POST",
        data: JSON.stringify({ ParkingPlaceID: ParkingPlaceID }),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            $.each(result, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.typeOfVehicle + '</td>';
                html += '<td>' + item.MonthlyPrice + '</td>';
                html += '<td>' + item.TimeApply + '</td>';
                html += '<td><button class="btn btn-primary" onclick="return getDetailPriceMonthByID(' + item.MonthlyPriceID + ')" >Chi tiết</button></td>';
                html += '</tr>';
            });
            $('#tbodyprMonth').html(html);

            $("#tbPriceMonth").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print"]
            }).buttons().container().appendTo('#tbPriceMonth_wrapper .col-md-6:eq(0)');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


//function ComboboxTypeOfvehicle() {
//    $.ajax({
//        url: "/SettingPrice/ComboboxTypeOfVehicle",
//        type: "GET",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            var html = '';
//            var i = 1;
//            $.each(result, function (key, item) {
//                html += '<option value="' + i + '">' + item + '</option>';
//                i++;
//            });
//            $("#cbTypeOfvehicle").html(html);
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}


//Update daily price
function UpdateDailyPrice() {
    var res = validateDailyPrice();
    if (res == false) {
        return false;
    }
    var dayPrice = $('#DayPriceDailyTK').val();
    dayPrice = dayPrice.replace(" đ", "");
    var empPRObj = {
        TypeOfvehicle: $('#cbTypeOfvehicleSP').val(),
        DayPrice: dayPrice,
        FirstBlock: 0,
        NextBlock: 0,
        ParkingPlaceID: $('#cbNameParkingPlaceDaily').val(),
        TimeOfFirstBlock: 0,
        TimeOfNextBlock: 0,
        TimeOfApply: $('#TimeOfApplyDailyTK').val(),
    }
    $.ajax({
        url: "/SettingPrice/CheckUpdateDailyPrice",
        data: JSON.stringify(empPRObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbPrice').DataTable().clear().destroy();
            checkLoadData();
            $('#myModalSettingDailyPrice').modal('hide');
            clear();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update Monthly price
function UpdateMonthlyPrice() {
    var res = validateMonthlyPrice();
    if (res == false) {
        return false;
    }
    var monthlyPrice = {
        TypeOfvehicle: $('#cbTypeOfvehicleMonthly').val(),
        MonthlyPrice: $('#MonthlyPriceTK').val(),
        ParkingPlaceID: $('#cbNameParkingPlaceMonthly').val(),
        TimeOfApplyMontlhyPrice: $('#TimeOfApplyMonthlyTK').val()
    }
    $.ajax({
        url: "/SettingPrice/CheckMonthlyPrice",
        data: JSON.stringify({ monthlyPrice: monthlyPrice}),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbPriceMonth').DataTable().clear().destroy();
            checkLoadData();
            $('#myModalSettingMonthlyPrice').modal('hide');
            clear();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update block price
function UpdateBlockPrice() {
    var res = validateBlockPrice();
    if (res == false) {
        return false;
    }
    var empPRObj = {
        TypeOfvehicle: $('#cbTypeOfvehicleBlock').val(),
        DayPrice: 0,
        FirstBlock: $('#FBlockPriceBlockTK').val(),
        NextBlock: $('#NBlockPriceBlockTK').val(),
        ParkingPlaceID: $('#cbNameParkingPlaceBlock').val(),
        TimeOfFirstBlock: $('#TimeFBlockPriceBlockTK').val(),
        TimeOfNextBlock: $('#TimeNBlockPriceBlockTK').val(),
        TimeOfApply: $('#TimeOfApplyBlockTK').val(),
    }
    $.ajax({
        url: "/SettingPrice/CheckUpdateBlockPrice",
        data: JSON.stringify(empPRObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbPrice').DataTable().clear().destroy();
            loadDataPrice();
            $('#myModalSettingBlockPrice').modal('hide');
            clear();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Set default value to cb price
function setDefaultCbPrice() {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    clear();
    $('#cbTypeOfTicketSP').val('');
}

//load modal price follow type ticket
function loadModalPrice() {
    if ($('#cbTypeOfTicketSP').val() == 0) {
        $('#myModalTypeTicket').modal("hide");
        $('#myModalSettingDailyPrice').modal("show");
    } else if ($('#cbTypeOfTicketSP').val() == 1) {
        $('#myModalTypeTicket').modal("hide");
        $('#myModalSettingMonthlyPrice').modal("show");
    } else {
        $('#myModalTypeTicket').modal("hide");
        $('#myModalSettingBlockPrice').modal("show");
    }
}

//get info of price into modal detail price
function getDetailPriceByID(PriceID) {
    $.ajax({
        url: "/SettingPrice/PriceDetails/" + PriceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#TypeOfVehicleDetailP').val(result.typeOfVehicle);
            $('#DailyPriceDetail').val(result.DayPrice + " VNĐ");
            $('#FBlockPriceDetail').val(result.FirstBlock + " VNĐ");
            $('#NBlockPriceDetail').val(result.NextBlock + " VNĐ");
            $('#TimeOfFirstBlock').val(result.TimeOfFirstBlock + " giờ");
            $('#TimeOfNextBlock').val(result.TimeOfNextBlock + " giờ");
            $('#TimeApply').val(result.TimeOfApply);
            $('#myModalDetailPrice').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get info of price into modal detial price month
function getDetailPriceMonthByID(PriceID) {
    $.ajax({
        url: "/SettingPrice/PriceMonthDetails/" + PriceID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#TypeOfVehicleDetailMonth').val(result.typeOfVehicle);
            $('#MonthlyPriceDetail').val(result.MonthlyPrice + " VNĐ");
            $('#TimeApplyMonthly').val(result.TimeOfApply);

            $('#myModalDetailPriceMonth').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//clear
function clear() {
    $('#DayPriceDailyTK').val("");
    $('#TimeOfApplyDailyTK').val("");
    $('#MonthlyPriceTK').val("");
    $('#TimeOfApplyMonthlyTK').val("");
    $('#FBlockPriceBlockTK').val("");
    $('#NBlockPriceBlockTK').val("");
    $('#TimeFBlockPriceBlockTK').val("");
    $('#TimeNBlockPriceBlockTK').val("");
    $('#cbTypeOfTicketSP').val("");
}

//Validate using Jquery
function validateDailyPrice() {
    var currency = new RegExp('\\d+');
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
    $.validator.addMethod('checkDailyPrice', function (value, element) {
        return currency.test(value);
    });
    //Set rule + message for input by name
    $('#FormDailyPrice').validate({
        rules: {
            DayPriceDailyTK: {
                required: true,
                checkDailyPrice: true
            },
            TimeOfApplyDailyTK: {
                required: true
            }
        },
        messages: {
            DayPriceDailyTK: {
                required: '*Bắt buộc.',
                checkDailyPrice: 'Giá phải là số!'
            },
            TimeOfApplyDailyTK: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormDailyPrice').valid();
}

function validateMonthlyPrice() {
    var currency = new RegExp('\\d+');
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
    $.validator.addMethod('checkMonthlyPrice', function (value, element) {
        return currency.test(value);
    });
    //Set rule + message for input by name
    $('#FormMonthlyPrice').validate({
        rules: {
            MonthlyPriceTK: {
                required: true,
                checkMonthlyPrice: true
            },
            TimeOfApplyMonthlyTK: {
                required: true
            }
        },
        messages: {
            MonthlyPriceTK: {
                required: '*Bắt buộc.',
                checkMonthlyPrice: 'Giá phải là số!'
            },
            TimeOfApplyMonthlyTK: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormMonthlyPrice').valid();
}

function validateBlockPrice() {
    var currency = new RegExp('\\d+');
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
    $.validator.addMethod('checkBlockPrice', function (value, element) {
        return currency.test(value);
    });
    $.validator.addMethod('checkBlockTime', function (value, element) {
        return currency.test(value) && value > 0;
    });
    //Set rule + message for input by name
    $('#FormBlockPrice').validate({
        rules: {
            FBlockPriceBlockTK: {
                required: true,
                checkBlockPrice: true
            },
            NBlockPriceBlockTK: {
                required: true,
                checkBlockPrice: true
            },
            TimeFBlockPriceBlockTK: {
                required: true,
                checkBlockTime: true
            },
            TimeNBlockPriceBlockTK: {
                required: true,
                checkBlockTime: true
            },
            TimeOfApplyBlockTK: {
                required: true
            }
        },
        messages: {
            FBlockPriceBlockTK: {
                required: '*Bắt buộc.',
                checkBlockPrice: 'Giá phải là số!'
            },
            NBlockPriceBlockTK: {
                required: '*Bắt buộc.',
                checkBlockPrice: 'Giá phải là số!'
            },
            TimeFBlockPriceBlockTK: {
                required: '*Bắt buộc.',
                checkBlockTime: 'Thời gian là giờ lớn hơn 0!'
            },
            TimeNBlockPriceBlockTK: {
                required: '*Bắt buộc.',
                checkBlockTime: 'Thời gian là số lớn hơn 0!'
            },
            TimeOfApplyBlockTK: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormBlockPrice').valid();
}
