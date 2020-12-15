$(document).ready(function () {
    loadDataPrice();
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

//load data price from table Price
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
                html += '<td>' + item.MonthPrice + '</td>';
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

function CheckTypeOfTK() {
    if ($('#cbTypeOfTicketSP').val() == 0) {
        
    } else if ($('#cbTypeOfTicketSP').val() == 1) {

    } else {

    }
}


function UpdateDailyPrice() {
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
    $.ajax({
        url: "/SettingPrice/UpdateSP",
        data: JSON.stringify(empPRObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataPrice(true);
            $('#myModalSettingPrice').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of monthly SettingPrice base on typeOfVehicle
function GetPriceMonthlySP() {
    var typeOfVehicle = $('#cbTypeOfvehicleSP').val();
    $.ajax({
        url: "/ManageTicket/GetPriceMonthly",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#PriceSP').val(new Intl.NumberFormat().format(result.MonthPrice) + " VNĐ");
            $("#myModalSettingPrice").modal("show");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of daily SettingPrice base on typeOfVehicle,ParkingPlace
function GetPriceDaily() {
    var typeOfVehicle = $('#cbTypeOfvehicleSP').val();
    var ParkingPlaceID = $('#cbNameParkingPlaceSP').val();
    $.ajax({
        url: "/SettingPrice/GetPriceDaily",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, ParkingPlaceID: ParkingPlaceID}),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#PriceIDDailyTK').val(result.PriceID);
            $('#DayPriceDailyTK').val(result.DayPrice + "đ");
            $('#MonthlyPriceDailyTK').val(result.MonthPrice);
            $('#FBlockPriceDailyTK').val(result.FirstBlock);
            $('#NBlockPriceDailyTK').val(result.NextBlock);
            $('#TimeFBlockPriceDailyTK').val(result.TimeOfFirstBlock);
            $('#TimeNBlockPriceDailyTK').val(result.TimeOfNextBlock);
            $('#TimeOfApply').val(Getformatdate(result.TimeOfApply));
            //$('#PriceSP').val(new Intl.NumberFormat().format(result.DayPrice) + " VNĐ");
            $('#myModalSettingDailyPrice').modal("show");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of block SettingPrice base on typeOfVehicle,ParkingPlace
function GetPriceBlockSP() {
    var typeOfVehicle = $('#cbTypeOfvehicleSP').val();
    var ParkingPlaceID = $('#cbNameParkingPlaceSP').val();
    $.ajax({
        url: "/SettingPrice/GetPrice",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, ParkingPlaceID: ParkingPlaceID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#PriceFB').val(new Intl.NumberFormat().format(result.FirstBlock) + " VNĐ");
            $('#PriceNB').val(new Intl.NumberFormat().format(result.NextBlock) + " VNĐ");
            $("#myModalSettingPrice").modal("show");
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
        GetPriceDaily();

    } else if ($('#cbTypeOfTicketSP').val() == 1) {
        $('#myModalTypeTicket').modal("hide");
        $('#myModalSettingMonthlyPrice').modal("show");
    } else {
        $('#myModalTypeTicket').modal("hide");
        $('#myModalSettingBlockPrice').modal("show");
    }
}

//reload modal setting price
function reloadModalPR() {
    if ($('#cbTypeOfTicketSP').val() == 1) {
        $('#dvParkingPlaceSP').hide();
        $('#dvFirstBlock').hide();
        $('#dvPercent').hide();
        $('#dvNextBlock').hide();
        $('#dvTimeOfBlock').hide();

        $('#dvPriceSP').show();

        GetPriceMonthlySP();
    } else if ($('#cbTypeOfTicketSP').val() == 0) {
        $('#dvParkingPlaceSP').show();
        $('#dvFirstBlock').hide();
        $('#dvPercent').hide();
        $('#dvNextBlock').hide();
        $('#dvTimeOfBlock').hide();
        $('#dvPriceSP').show();
        GetPriceDailySP();
    } else {
        $('#dvParkingPlaceSP').show();
        $('#dvPriceSP').hide();
        $('#dvFirstBlock').show();
        $('#dvPercent').show();
        $('#dvNextBlock').show();
        $('#dvTimeOfBlock').show();
        GetPriceBlockSP();
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
            $('#MonthlyPriceDetail').val(result.DayPrice +" VNĐ");
            $('#DailyPriceDetail').val(result.MonthPrice +" VNĐ");
            $('#FBlockPriceDetail').val(result.FirstBlock +" VNĐ");
            $('#NBlockPriceDetail').val(result.NextBlock +" VNĐ");
            $('#TimeOfFirstBlock').val(result.TimeOfFirstBlock +" giờ");
            $('#TimeOfNextBlock').val(result.TimeOfNextBlock + " giờ");
            $('#TimeApply').val(result.TimeOfApply);

            $('#myModalDetailPrice').modal('show');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//
function clear() {
    $('#dvFirstBlock').hide();
    $('#dvPercent').hide();
    $('#dvNextBlock').hide();
    $('#dvTimeOfBlock').hide();

    $('#cbTypeOfTicketSP').val("");
}