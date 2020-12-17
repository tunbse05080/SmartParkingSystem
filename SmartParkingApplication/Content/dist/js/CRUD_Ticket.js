﻿
$(document).ready(function () {
    loadDataTicket();
    ComboboxTicket();
    clearETK();
});

var CardId;

var temp = {
    ExpiryDate: ""
};


//get endDate contract in modal extend ticket from comboboxDate
function DateETK(monthExtend) {
    // body...
    if (monthExtend == null) {
        monthExtend = 0;
    }
    var date = new Date(temp.ExpiryDate);
    date.setMonth(date.getMonth() + monthExtend);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    date = mm + '/' + dd + '/' + yyyy;
    return date;
}

//get endDate contract in modal register ticket from comboboxDate
function DateRegisterTK(monthExtend) {
    // body...
    var date = new Date($('#RegisDateTK').val());

    date.setMonth(date.getMonth() + monthExtend);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    date = mm + '/' + dd + '/' + yyyy;
    return date;
}

//get endDate contract in modal Re register ticket from comboboxDate
function DateReRegisterTK(monthExtend) {
    // body...
    var date = new Date($('#RegisDateRe').val());

    date.setMonth(date.getMonth() + monthExtend);

    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    date = mm + '/' + dd + '/' + yyyy;
    return date;
}


//reload modal ExtendTK when change combobox
function reloadModalETK(price) {

    for (var i = 1; i <= 12; i++) {
        if ($("#cbETK").val() == i) {
            price = price * i;
            $('#ExpiryDateETk').val(DateETK(i));
            $('#priceETK').val(new Intl.NumberFormat().format(price) + " VND");
            $("#myModalExtendTicket").modal("show");
            break;
        }
    }
}

//reload modal RegisterTK when change combobox
function reloadModalTK(price) {
    for (var i = 1; i <= 12; i++) {
        if ($("#cbTK").val() == i) {
            price = price * i;
            $('#ExpiryDateTK').val(DateRegisterTK(i));
            $('#priceTK').val(new Intl.NumberFormat().format(price) + " VND");
            $("#myModalTicket").modal("show");
            break;
        }
    }
}

//reload modal Re Register when change combobox
function reloadModalReRegister(price) {
    for (var i = 1; i <= 12; i++) {
        if ($("#cbRe").val() == i) {
            price = price * i;
            $('#ExpiryDateRe').val(DateReRegisterTK(i));
            $('#priceRe').val(new Intl.NumberFormat().format(price) + " VND");
            $("#myModalReRegisterTicket").modal("show");
            break;
        }
    }
}

//Combobox Type of Vehicle
function ComboboxTicket() {
    $.ajax({
        url: "/ManageTicket/ComboboxTicket",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 0;
            $.each(result.typeOfVehicles, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbTypeOfVehicleTK").html(html);
            $("#cbTypeOfVehicleEdit").html(html);
            html = '';
            $.each(result.numberCards, function (key, item) {
                html += '<option value="' + item.CardID + '">' + item.CardNumber + '</option>';
            });
            $("#cbCardNumberTK").html(html);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Load Data function
function loadDataTicket() {

    $.ajax({
        url: "/ManageTicket/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var data = result.dataTicket;
            var html = '';
            var totalTicket = '';
            var status = "";
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CusName + '</td>';
                html += '<td>' + item.LicensePlates + '</td>';
                html += '<td>' + item.ExpiryDate + '</td>';
                html += '<td>' + item.CardNumber + '</td>';
                if (item.ExpiryDateES < loadDateNowToCompare()) {
                    status = "Hết hạn HĐ";
                    html += '<td>' + status + '</td>';
                } else {
                    status = "Còn HĐ";
                    html += '<td>' + status + '</td>';
                }
                switch (status) {
                    case "Còn HĐ":
                        html += '<td><button class="btn btn-primary" onclick="return getTicketByIDDetail(' + item.MonthlyTicketID + ')" >Chi tiết</button><button class="btn btn-success" onclick="return getTicketByIDEdit(' + item.MonthlyTicketID + ')" >Sửa</button><button class="btn btn-warning" onclick="return getTicketByIDETK(' + item.MonthlyTicketID + ')" >Gia Hạn HĐ</button><button class="btn btn-danger" onclick="return getTicketByIDDropContract(' + item.MonthlyTicketID + ')" >Dừng HĐ</button></td>';
                        break;
                    case "Hết hạn HĐ":
                        html += '<td><button class="btn btn-primary" onclick="return getTicketByIDDetail(' + item.MonthlyTicketID + ')" >Chi tiết</button><button class="btn btn-warning" onclick="return getTicketReRegister(' + item.MonthlyTicketID + ')" >Ký lại HĐ</button></td>';
                        break;
                }
                html += '</tr>';
            });

            $('#tbodyTicket').html(html);

            $("#tbTicket").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbTicket_wrapper .col-md-6:eq(0)');
            totalTicket += '<h3>' + result.total + '<sup style="font-size: 20px"></sup></h3>';
            totalTicket += '<p>Tổng số vé tháng</p>';
            $('#totalTicket').html(totalTicket);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//clear textbox in modal Register ticket
function clearTextBoxTicket() {
    var date = loadDateNow();
    $('#IdTK').val("");
    $('#CusNameTK').val("");
    $('#IdentityCardTK').val("");
    $('#PhoneTK').val("");
    $('#EmailTK').val("");
    $('#LicensePlatesTK').val("");
    $('#RegisDateTK').val("" + date);
    $('#ExpiryDateTK').val("" + date);

    $('#btnAdd').show();
    $('#btnUpdate').hide();

}

//Create MonthlyIncomeStatment
function CreateMonthlyIncome(id, totalPrice) {
    $.ajax({
        url: "/ManageTicket/CreateMonthlyIncome",
        type: "POST",
        data: JSON.stringify({ id: id, totalPrice: totalPrice}),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function AddTicket() {
    var empTicketObj = {
        CusName: $('#CusNameTK').val(),
        IdentityCard: $('#IdentityCardTK').val(),
        Phone: $('#PhoneTK').val(),
        Email: $('#EmailTK').val(),
        TypeOfVehicle: $('#cbTypeOfVehicleTK').val(),
        LicensePlates: $('#LicensePlatesTK').val(),
        ParkingPlaceID: $('#cbNameParkingPlaceTK').val(),
        RegisDate: $('#RegisDateTK').val(),
        ExpiryDate: $('#ExpiryDateTK').val(),
        CardID: $('#cbCardNumberTK').val()
    };
    $.ajax({
        url: "/ManageTicket/Create",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbTicket').DataTable().clear().destroy();
            UpdateCardByNumber($('#cbCardNumberTK').val());
            CreateMonthlyIncome(result.MonthlyTicketID, $('#priceTK').val());
            loadDataTicket();
            $('#myModalTicket').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update Extend ticket
function UpdateExtendTK() {
    var empTicketObj = {
        MonthlyTicketID: $('#MonthlyTicketETK').val(),
        CusName: $('#CusNameETK').val(),
        IdentityCard: $('#IdentityCardETK').val(),
        Phone: $('#PhoneETK').val(),
        Email: $('#EmailETK').val(),
        ParkingPlaceID: $('#ParkingPlaceIDETK').val(),
        TypeOfVehicle: $('#TypeOfVehicleETK').val(),
        LicensePlates: $('#LicensePlatesETK').val(),
        RegisDate: $('#RegisDateETK').val(),
        ExpiryDate: $('#ExpiryDateETk').val(),
        CardID: $('#CardIDETK').val(),
    };
    $.ajax({
        url: "/ManageTicket/UpdateTicket",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbTicket').DataTable().clear().destroy();
            CreateMonthlyIncome($('#MonthlyTicketETK').val(), $('#priceETK').val());
            loadDataTicket();
            $('#myModalExtendTicket').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update Re Register ticket
function UpdateReRegister() {
    var empTicketObj = {
        MonthlyTicketID: $('#MonthlyTicketIDRe').val(),
        CusName: $('#CusNameRe').val(),
        IdentityCard: $('#IdentityCardRe').val(),
        Phone: $('#PhoneRe').val(),
        Email: $('#EmailRe').val(),
        ParkingPlaceID: $('#ParkingPlaceIDRe').val(),
        TypeOfVehicle: $('#TypeOfVehicleRe').val(),
        LicensePlates: $('#LicensePlatesRe').val(),
        RegisDate: $('#RegisDateRe').val(),
        ExpiryDate: $('#ExpiryDateRe').val(),
        CardID: $('#CardIDRe').val(),
    };
    $.ajax({
        url: "/ManageTicket/UpdateTicket",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbTicket').DataTable().clear().destroy();
            CreateMonthlyIncome($('#MonthlyTicketIDRe').val(), $('#priceRe').val());
            loadDataTicket();
            $('#myModalReRegisterTicket').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Edit info ticket
function UpdateInfoTicket() {
    var empTicketObj = {
        MonthlyTicketID: $('#MonthlyTicketIdEdit').val(),
        CusName: $('#CusNameEdit').val(),
        IdentityCard: $('#IdentityCardEdit').val(),
        Phone: $('#PhoneEdit').val(),
        Email: $('#EmailEdit').val(),
        ParkingPlaceID: $('#ParkingPlaceEdit').val(),
        TypeOfVehicle: $('#TypeOfVehicleEdit').val(),
        LicensePlates: $('#LicensePlatesEdit').val(),
        RegisDate: $('#RegisDateEdit').val(),
        ExpiryDate: $('#ExpiryDateEdit').val(),
        CardID: $('#CardIdEdit').val(),
    };
    $.ajax({
        url: "/ManageTicket/UpdateTicket",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbTicket').DataTable().clear().destroy();
            loadDataTicket();
            $('#myModalEditTicket').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Drop contract ticket
function UpdateDropContractTicket() {
    var empTicketObj = {
        MonthlyTicketID: $('#MonthlyTicketDC').val(),
        CusName: $('#CusNameDC').val(),
        IdentityCard: $('#IdentityCardDC').val(),
        Phone: $('#PhoneDC').val(),
        Email: $('#EmailDC').val(),
        TypeOfVehicle: $('#TypeOfVehicleDC').val(),
        ParkingPlaceID: $('#ParkingPlaceDC').val(),
        LicensePlates: $('#LicensePlatesDC').val(),
        RegisDate: $('#RegisDateDC').val(),
        ExpiryDate: $('#ExpiryDateDC').val(),
        CardID: $('#CardIDDC').val(),
    };
    $.ajax({
        url: "/ManageTicket/UpdateTicket",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbTicket').DataTable().clear().destroy();
            loadDataTicket();
            $('#myModalDropContractTicket').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get ticket by id to fill modal DetailTicket
function getTicketByIDDetail(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#MonthlyTicketIdDetail').val(result.MonthlyTicketID);
            $('#CusNameDetail').val(result.CusName);
            $('#IdentityCardDetail').val(result.IdentityCard);
            $('#PhoneDetail').val(result.Phone);
            $('#EmailDetail').val(result.Email);
            $('#TypeOfVehicleDetail').val(result.typeOfVehicle);
            $('#ParkingPlaceNameDetail').val(result.NameOfParking);
            $('#LicensePlatesDetail').val(result.LicensePlates);
            $('#RegisDateDetail').val(result.RegisDate);
            $('#ExpiryDateDetail').val(result.ExpiryDate);
            $('#CardNumberDetail').val(result.cardNumber);

            $('#myModalDetailTicket').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//get ticket by id to fill modal EditTicket
function getTicketByIDEdit(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#MonthlyTicketIdEdit').val(result.MonthlyTicketID);
            $('#CusNameEdit').val(result.CusName);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneEdit').val(result.Phone);
            $('#EmailEdit').val(result.Email);
            $('#ParkingPlaceEdit').val(result.ParkingPlaceID);
            $('#TypeOfVehicleEdit').val(result.TypeOfVehicle);
            $('#LicensePlatesEdit').val(result.LicensePlates);
            $('#RegisDateEdit').val(result.RegisDate);
            $('#ExpiryDateEdit').val(result.ExpiryDate);
            $('#CardIdEdit').val(result.cardId);
            $('#CardNumberEdit').val(result.cardNumber);

            $('#myModalEditTicket').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//get ticket by id to fill modal DropContractTicket
function getTicketByIDDropContract(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#MonthlyTicketDC').val(result.MonthlyTicketID);
            $('#CusNameDC').val(result.CusName);
            $('#IdentityCardDC').val(result.IdentityCard);
            $('#PhoneDC').val(result.Phone);
            $('#EmailDC').val(result.Email);
            $('#ParkingPlaceDC').val(result.ParkingPlaceID);
            $('#TypeOfVehicleDC').val(result.TypeOfVehicle);
            $('#LicensePlatesDC').val(result.LicensePlates);
            $('#RegisDateDC').val(result.RegisDate);
            $('#ExpiryDateDC').val(loadDateNow());
            $('#CardIDDC').val(result.cardId);

            $('#myModalDropContractTicket').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//get ticket by id to fill modal Extend Contract Ticket
function getTicketByIDETK(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var date = $('#cbETK').val();
            temp.ExpiryDate = result.ExpiryDate;
            $('#MonthlyTicketETK').val(result.MonthlyTicketID);
            $('#CusNameETK').val(result.CusName);
            $('#IdentityCardETK').val(result.IdentityCard);
            $('#PhoneETK').val(result.Phone);
            $('#EmailETK').val(result.Email);
            $('#ParkingPlaceIDETK').val(result.ParkingPlaceID);
            $('#TypeOfVehicleETK').val(result.TypeOfVehicle);
            $('#LicensePlatesETK').val(result.LicensePlates);
            $('#RegisDateETK').val(result.RegisDate);
            $('#ExpiryDateETk').val(DateETK(date));
            $('#CardIDETK').val(result.cardId);
            

            $('#myModalExtendTicket').modal('show');
            $('#btnExtendTK').show();
        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//get ticket by id to fill modal Re Register Contract ticket
function getTicketReRegister(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            var date = $('#cbRe').val();
            $('#MonthlyTicketIDRe').val(result.MonthlyTicketID);
            $('#CusNameRe').val(result.CusName);
            $('#IdentityCardRe').val(result.IdentityCard);
            $('#PhoneRe').val(result.Phone);
            $('#EmailRe').val(result.Email);
            $('#TypeOfVehicleRe').val(result.TypeOfVehicle);
            $('#LicensePlatesRe').val(result.LicensePlates);
            $('#ParkingPlaceIDRe').val(result.ParkingPlaceID);
            $('#RegisDateRe').val(loadDateNow());
            $('#ExpiryDateRe').val(DateReRegisterTK(date));
            $('#CardIDRe').val(result.cardId);

            $('#myModalReRegisterTicket').modal('show');
        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//get price of monthly extend ticket base on typeOfVehicle and parkingPlaceID
function GetPriceMonthlyExtendTK() {
    var typeOfVehicle = $('#TypeOfVehicleETK').val();
    var parkingPlaceID = $('#ParkingPlaceIDETK').val();
    $.ajax({
        url: "/ManageTicket/GetPriceMonthly",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, parkingPlaceID: parkingPlaceID}),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadModalETK(result.MonthlyPrice);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of monthly register ticket base on typeOfVehicle and parkingPlaceID
function GetPriceMonthlyRegisterTK() {
    var typeOfVehicle = $('#cbTypeOfVehicleTK').val();
    var parkingPlaceID = $('#cbNameParkingPlaceTK').val();
    $.ajax({
        url: "/ManageTicket/GetPriceMonthly",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, parkingPlaceID: parkingPlaceID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadModalTK(result.MonthlyPrice);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get price of monthly re register ticket base on typeOfVehicle and parkingPlaceID
function GetPriceMonthlyReRegisterTK() {
    var typeOfVehicle = $('#TypeOfVehicleRe').val();
    var parkingPlaceID = $('#ParkingPlaceIDRe').val();
    $.ajax({
        url: "/ManageTicket/GetPriceMonthly",
        type: "POST",
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, parkingPlaceID: parkingPlaceID }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            reloadModalReRegister(result.MonthlyPrice);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//clear modal ExtendTK
function clearETK() {
    $('#cbETK').val("");
    $('#RegisDateETK').val("");
    $('#ExpiryDateETk').val("");
    $('#priceETK').val("");
    $('#cbTK').val("");
    $('#ExpiryDateTK').val("");
    $('#priceTK').val("");
}

//function GetIdCardFromNumber(CardNumber) {

//    $.ajax({
//        url: "/ManageTicket/GetIdCardFromNumber",
//        data: JSON.stringify({ CardNumber: CardNumber }),
//        type: "POST",
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        success: function (result) {
//            $.each(result, function (key, item) {
//                CardId = item;
//            });
//        },
//        error: function (errormessage) {
//            alert(errormessage.responseText);
//        }
//    });
//}