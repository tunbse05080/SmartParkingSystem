﻿$(document).ready(function () {
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
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
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
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
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
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
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
    $('#DayPriceBlockTK').val("");
    $('#FBlockPriceBlockTK').val("");
    $('#NBlockPriceBlockTK').val("");
    $('#TimeFBlockPriceBlockTK').val("");
    $('#TimeNBlockPriceBlockTK').val("");
    $('#cbTypeOfTicketSP').val("");
}