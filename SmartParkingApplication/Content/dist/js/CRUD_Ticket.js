
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
            $('#cbCardNumberTK').val(null).trigger('change');
            $("#cbCardNumberTK").select2({
                placeholder: "Chọn số thẻ",
                allowClear: true
            });
            $("#cbCardNumberEdit").html(html);
            $("#cbCardNumberEdit").select2({
                placeholder: "Chọn số thẻ",
                allowClear: true
            });
            $('#cbCardNumberEdit').val(null).trigger('change');
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
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    var date = loadDateNow();
    var test = date.split('/');
    $('#IdTK').val("");
    $('#CusNameTK').val("");
    $('#IdentityCardTK').val("");
    $('#PhoneTK').val("");
    $('#EmailTK').val("");
    $('#LicensePlatesTK').val("");
    $('#RegisDateTK').val(test[2] + '-' + test[0] + '-' + test[1]);
    $('#ExpiryDateTK').val("");
    $('#cbCardNumberTK').val(null).trigger('change');
}

//Create MonthlyIncomeStatment
function CreateMonthlyIncome(id, totalPrice) {
    $.ajax({
        url: "/ManageTicket/CreateMonthlyIncome",
        type: "POST",
        data: JSON.stringify({ id: id, totalPrice: totalPrice }),
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

var checkLicensePlateExist;
function AddTicket() {
    var res = validateAddTicket();
    if (res == false) {
        return false;
    }
    checkLicensePlateExist = true;
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
        url: "/ManageTicket/CheckExistLicensePlatesToAdd",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.check == true) {
                validateAddTicket();
                checkLicensePlateExist = false;
                return false;
            } else {
                checkLicensePlateExist = false;
                $('#tbTicket').DataTable().clear().destroy();
                UpdateCardByID($('#cbCardNumberTK').val());
                CreateMonthlyIncome(result.MonthlyTicketID, $('#priceTK').val());
                loadDataTicket();
                $('#myModalTicket').modal('hide');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Update Extend ticket
function UpdateExtendTK() {
    var res = validateExtendTK();
    if (res == false) {
        return false;
    }
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
    var res = validateReRegister();
    if (res == false) {
        return false;
    }
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

var checkLicensePlateExistUpdate;
//Edit info ticket
function UpdateInfoTicket() {
    var res = validateEditTicket();
    if (res == false) {
        return false;
    }
    checkLicensePlateExistUpdate = true;
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
        CardID: $('#cbCardNumberEdit').val(),
    };
    $.ajax({
        url: "/ManageTicket/CheckExistLicensePlatesToUpdate",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == true) {
                validateEditTicket();
                checkLicensePlateExistUpdate = false;
                return false;
            } else {
                checkLicensePlateExistUpdate = false;
                UpdateCardByID($('#cbCardNumberEdit').val());
                $('#tbTicket').DataTable().clear().destroy();
                ComboboxTicket();
                loadDataTicket();
                $('#myModalEditTicket').modal('hide');
            }

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
            $('#PhoneDetail').val('0' + result.Phone);
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
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#cbCardNumberEdit').val(null).trigger('change');
            $('#MonthlyTicketIdEdit').val(result.MonthlyTicketID);
            $('#CusNameEdit').val(result.CusName);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneEdit').val('0' + result.Phone);
            $('#EmailEdit').val(result.Email);
            $('#ParkingPlaceEdit').val(result.ParkingPlaceID);
            $('#TypeOfVehicleEdit').val(result.TypeOfVehicle);
            $('#LicensePlatesEdit').val(result.LicensePlates);
            $('#RegisDateEdit').val(result.RegisDate);
            $('#ExpiryDateEdit').val(result.ExpiryDate);
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
    clearETK();
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
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
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
            var date = loadDateNow();
            var test = date.split('/');
            $('#RegisDateRe').val(test[2] + '-' + test[0] + '-' + test[1]);
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
        data: JSON.stringify({ typeOfVehicle: typeOfVehicle, parkingPlaceID: parkingPlaceID }),
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
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
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

//Valdidation using jquery
function validateAddTicket() {
    var phone = new RegExp('^((09|03|07|08|05)+([0-9]{8})\\b)$');
    var idcard = new RegExp('^[0-9]{9,}$');
    var plate = new RegExp('^[0-9]{2}[A-Z]{1}[0-9]{5,6}$');
    //Díplay css of error message
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
    $.validator.addMethod('checkOwnerName', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkIDCardT', function (value, element) {
        return idcard.test(value);
    });
    $.validator.addMethod('checkPhoneT', function (value, element) {
        return phone.test(value);
    });
    $.validator.addMethod('checkPlateT', function (value, element) {
        return plate.test(value);
    });
    $.validator.addMethod('checkRegisDateTK', function (value, element) {
        return new Date(value) > new Date();
    });
    $.validator.addMethod('checkPlateTExist', function (value, element) {
        return checkLicensePlateExist != true;
    }, 'Biển số đã đăng ký trong bãi này.');
    //Set rule for input by name
    $('#FormAddTicket').validate({
        rules: {
            CusNameTK: {
                required: true,
                checkOwnerName: true
            },
            PhoneTK: {
                required: true,
                checkPhoneT: true
            },
            IdentityCardTK: {
                required: true,
                checkIDCardT: true
            },
            EmailTK: {
                required: true,
                email: true
            },
            LicensePlatesTK: {
                required: true,
                checkPlateT: true,
                checkPlateTExist: true
            },
            cbTK: {
                required: true
            },
            cbCardNumberTK: {
                required: true
            },
            RegisDateTK: {
                required: true,
                checkRegisDateTK: true
            }
        },
        messages: {
            CusNameTK: {
                required: '*Bắt buộc.',
                checkOwnerName: 'Tên chủ xe có ít nhất 5 kí tự!'
            },
            PhoneTK: {
                required: '*Bắt buộc.',
                checkPhoneT: 'Số điện thoại định dạng sai!'
            },
            IdentityCardTK: {
                required: '*Bắt buộc.',
                checkIDCardT: 'CMND/CCCD định dạng sai!'
            },
            EmailTK: {
                required: '*Bắt buộc.',
                email: 'Email định dạng sai!'
            },
            LicensePlatesTK: {
                required: '*Bắt buộc.',
                checkPlateT: 'Biển số định dạng sai!'
            },
            cbTK: {
                required: '*Bắt buộc.'
            },
            cbCardNumberTK: {
                required: '*Bắt buộc.'
            },
            RegisDateTK: {
                required: '*Bắt buộc.',
                checkRegisDateTK: 'Phải lớn hơn ngày hiện tại!'
            }
        }
    });
    return $('#FormAddTicket').valid();
}

function validateReRegister() {
    //Díplay css of error message
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
    $.validator.addMethod('checkReRegis', function (value, element) {
        return new Date(value) > new Date();
    });
    //Set rule for input by name
    $('#FormReRegis').validate({
        rules: {
            RegisDateRe: {
                required: true,
                checkReRegis: true
            }
        },
        messages: {
            RegisDateRe: {
                required: '*Bắt buộc.',
                checkReRegis: 'Ngày phải lớn hơn hiện tại!'
            }
        }
    });
    return $('#FormReRegis').valid();
}

function validateExtendTK() {
    //Díplay css of error message
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
    //Set rule for input by name
    $('#FormExTK').validate({
        rules: {
            cbETK: {
                required: true
            }
        },
        messages: {
            cbETK: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormExTK').valid();
}

function validateEditTicket() {
    var phone = new RegExp('^((09|03|07|08|05)+([0-9]{8})\\b)$');
    var idcard = new RegExp('^[0-9]{9,}$');
    var plate = new RegExp('^[0-9]{2}[A-Z]{1}[0-9]{5,6}$');
    //Díplay css of error message
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
    $.validator.addMethod('checkOwnerNameE', function (value, element) {
        return $.trim(value).length > 4;
    });
    $.validator.addMethod('checkIDCardE', function (value, element) {
        return idcard.test(value);
    });
    $.validator.addMethod('checkPhoneE', function (value, element) {
        return phone.test(value);
    });
    $.validator.addMethod('checkPlateE', function (value, element) {
        return plate.test(value);
    });
    $.validator.addMethod('checkPlateEExist', function (value, element) {
        return checkLicensePlateExistUpdate != true;
    }, 'Biển số đã tồn tại trong bãi.');
    //Set rule for input by name
    $('#FormEditTicket').validate({
        rules: {
            CusNameEdit: {
                required: true,
                checkOwnerNameE: true
            },
            PhoneEdit: {
                required: true,
                checkPhoneE: true
            },
            IdentityCardEdit: {
                required: true,
                checkIDCardE: true
            },
            EmailEdit: {
                required: true,
                email: true
            },
            LicensePlatesEdit: {
                required: true,
                checkPlateE: true,
                checkPlateEExist: true
            },
            cbCardNumberEdit: {
                required: true
            }
        },
        messages: {
            CusNameEdit: {
                required: '*Bắt buộc.',
                checkOwnerNameE: 'Tên chủ xe có ít nhất 5 kí tự!'
            },
            PhoneEdit: {
                required: '*Bắt buộc.',
                checkPhoneE: 'Số điện thoại định dạng sai!'
            },
            IdentityCardEdit: {
                required: '*Bắt buộc.',
                checkIDCardE: 'CMND/CCCD định dạng sai!'
            },
            EmailEdit: {
                required: '*Bắt buộc.',
                email: 'Email định dạng sai!'
            },
            LicensePlatesEdit: {
                required: '*Bắt buộc.',
                checkPlateE: 'Biển số định dạng sai!'
            },
            cbCardNumberEdit: {
                required: '*Bắt buộc.'
            }
        }
    });
    return $('#FormEditTicket').valid();
}
