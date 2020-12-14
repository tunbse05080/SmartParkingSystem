$(document).ready(function () {
    loadDataPrice();
    clear();
});

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


function UpdatePR() {
    //var res = validateUpdatePP();
    //if (res == false) {
    //    return false;
    //}
    if ($('#cbTypeOfTicketSP').val() == 0) {
        var empPRObj = {
            TypeOfvehicle: $('#cbTypeOfvehicleSP').val(),
            ParkingPlaceID: $('#cbNameParkingPlaceSP').val(),
            DayPrice: $('#PriceSP').val(),
        };
    } else if ($('#cbTypeOfTicketSP').val() == 1) {
        var empPRObj = {
            TypeOfvehicle: $('#cbTypeOfvehicleSP').val(),
            ParkingPlaceID: $('#cbNameParkingPlaceSP').val(),
            MonthPrice: $('#PriceSP').val(),
        };
    } else {
        var empPRObj = {
            TypeOfvehicle: $('#cbTypeOfvehicleSP').val(),
            ParkingPlaceID: $('#cbNameParkingPlaceSP').val(),
            FirstBlock: $('#PriceFB').val(),
            NextBlock: $('#PriceNB').val(),
        };
    }
    $.ajax({
        url: "/SettingPrice/UpdatePR",
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
            $('#PriceSP').val(new Intl.NumberFormat().format(result.MonthPrice) + " VND");
            $("#myModalSettingPrice").modal("show");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of daily SettingPrice base on typeOfVehicle,ParkingPlace
function GetPriceDailySP() {
    var typeOfVehicle = $('#cbTypeOfvehicleSP').val();
    var ParkingPlaceID = $('#cbNameParkingPlaceSP').val();
    $.ajax({
        url: "/SettingPrice/GetPrice",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, ParkingPlaceID: ParkingPlaceID}),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#PriceSP').val(new Intl.NumberFormat().format(result.DayPrice) + " VND");
            $("#myModalSettingPrice").modal("show");
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
            $('#PriceFB').val(new Intl.NumberFormat().format(result.FirstBlock) + " VND");
            $('#PriceNB').val(new Intl.NumberFormat().format(result.NextBlock) + " VND");
            $("#myModalSettingPrice").modal("show");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//function getByTypeOfVehicle(PriceID) {
//    $.ajax({
//        url: "/SettingPrice/Details/" + PriceID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#Idd').val(result.PriceID);
//            $('#TypeOfvehicled').val(result.TypeOfvehicle);
//            $('#DayPriced').val(result.DayPrice);
//            $('#MonthPriced').val(result.MonthPrice);
//            $('#DateOfBirthd').val(result.FirstBlock);
//            $('#FirstBlockd').val(result.NextBlock);
//            $('#myModalSettingPrice').modal('show');
//            $('#btnUpdate').show();
//        },
//        error: function (errormessage) {
//            alert("Exception:" + PriceID + errormessage.responseText);
//        }
//    });
//    return false;
//}

function reloadModalPR() {
    if ($('#cbTypeOfTicketSP').val() == 1) {
        $('#dvParkingPlaceSP').hide();
        $('#dvFirstBlock').hide();
        $('#dvPercent').hide();
        $('#dvNextBlock').hide();
        $('#dvPriceSP').show();

        GetPriceMonthlySP();
    } else if ($('#cbTypeOfTicketSP').val() == 0) {
        $('#dvParkingPlaceSP').show();
        $('#dvFirstBlock').hide();
        $('#dvPercent').hide();
        $('#dvNextBlock').hide();
        $('#dvPriceSP').show();
        GetPriceDailySP();
    } else {
        $('#dvParkingPlaceSP').show();
        $('#dvPriceSP').hide();
        $('#dvFirstBlock').show();
        $('#dvPercent').show();
        $('#dvNextBlock').show();
        GetPriceBlockSP();
    }
}
//function getEditPriceByID(PriceID) {
//    $.ajax({
//        url: "/SettingPrice/PriceDetails/" + PriceID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#PriceIDed').val(result.PriceID);
//            $('#TypeOfvehicled').val(result.TypeOfvehicle);
//            $('#DayPriced').val(result.DayPrice);
//            $('#MonthPriced').val(result.MonthPrice);
//            $('#FirstBlockd').val(result.FirstBlock);
//            $('#NextBlockd').val(result.NextBlock);

//            $('#myModalPREdit').modal('show');
//            $('#btnUpdate').show();
//        },
//        error: function (errormessage) {
//            alert("Exception:" + EmployeeID + errormessage.responseText);
//        }
//    });
//    return false;
//}
function clear() {
    $('#dvFirstBlock').hide();
    $('#dvPercent').hide();
    $('#dvNextBlock').hide();
    $('#cbTypeOfTicketSP').val("");

}