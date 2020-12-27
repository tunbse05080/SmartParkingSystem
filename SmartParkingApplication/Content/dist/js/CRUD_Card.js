$(document).ready(function () {
    loadDataCard();
});

//Load Data function
function loadDataCard() {
    $.ajax({
        url: "/ManageCard/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var data = result.dataCard;
            var html = '';
            var totalCard = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CardNumber + '</td>';
                html += '<td>' + item.Date + '</td>';
                html += '<td>' + item.Status + '</td>';
                switch (item.Status) {
                    case "Chưa đăng kí":
                        html += '<td><button class="btn btn-success" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Sửa</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getLockCardByID(' + item.CardID + ')" >Khóa thẻ</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getReportCardBreakByID(' + item.CardID + ')">Báo hỏng thẻ</button></td>';
                        break;
                    case "Đã đăng kí":
                        html += '<td><button class="btn btn-success" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Sửa</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getLockCardByID(' + item.CardID + ')" >Khóa thẻ</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getReportCardBreakByID(' + item.CardID + ')">Báo hỏng thẻ</button></td>';
                        break;
                    case "Đang sử dụng":
                        html += '<td><button class="btn btn-success" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Sửa</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getLockCardByID(' + item.CardID + ')" >Khóa thẻ</button><button class="btn btn-danger" style="margin-left:2px" onclick="return getReportCardBreakByID(' + item.CardID + ')">Báo hỏng thẻ</button></td>';
                        break;
                    case "Đã Khóa":
                        html += '<td><button class="btn btn-warning" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Mở Khóa</button></td>';
                        break;
                    case "Thẻ Hỏng":
                        html += '<td><h6 Hidden>The Hong</h6></td>'
                        break;
                }
                html += '</tr>';
            });

            $('#tbodyCard').html(html);
            $('#tbCard').DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": false, "paging": true, "searching": true, "ordering": true, "info": true, retrieve: true,
                "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
            }).buttons().container().appendTo('#tbCard_wrapper .col-md-6:eq(0)');
            totalCard += '<h3>' + result.total + '<sup style="font-size: 20px"></sup></h3>';
            totalCard += '<p>Tổng số thẻ</p>';
            $('#totalCard').html(totalCard);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

// clear textbox
function clearTextBoxCard() {
    var date = loadDateNow();
    $('#Id').val("");
    $('#CardNumber').val("");
    $('#Date').val("" + date);
    $('#Status').val("");
}

var checkExistCard;
function AddCard(number) {
    var empCardObj = {
        CardNumber: number,
        Date: $('#Date').val(),
        Status: 0,
    };
    $.ajax({
        url: "/ManageCard/CheckCardToAdd",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result == true) {
                validateAddCard();
                checkExistCard = false;
                return false;
            } else {
                checkExistCard = true;
                $('#tbCard').DataTable().clear().destroy();
                loadDataCard();
                $('#CardNumber').val("");
                $('#myModalCard').modal('show');
            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateCard() {
    var res = validateUpdateCard();
    if (res == false) {
        return false;
    }
    var empCardObj = {
        CardID: $('#IdCardEdit').val(),
        CardNumber: $('#CardNumberEdit').val(),
        Date: moment($('#DateCardEdit').val(), 'DD/MM/YYYY').format('MM/DD/YYYY'),
        Status: $('#StatusCard').val(),
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbCard').DataTable().clear().destroy();
            loadDataCard();
            $('#myModalUpdate').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//get detail card base on CardNumber
function UpdateCardByNumber(CardID) {
    var idC = CardID;
    $.ajax({
        url: "/ManageCard/UpdateCardByNumber",
        data: "{ idCard :" + idC + "}",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//Unlock card
function UnlockCard() {
    var empCardObj = {
        CardID: $('#IdCardUnLock').val(),
        CardNumber: $('#CardNumberUnLock').val(),
        Date: moment($('#DateCardUnLock').val(), 'DD/MM/YYYY').format('MM/DD/YYYY'),
        Status: 0,
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbCard').DataTable().clear().destroy();
            loadDataCard();
            $('#myModalUnLock').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//lock card
function LockCard() {
    var empCardObj = {
        CardID: $('#IdCardLock').val(),
        CardNumber: $('#CardNumberLock').val(),
        Date: moment($('#DateCardLock').val(), 'DD/MM/YYYY').format('MM/DD/YYYY'),
        Status: 3,
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbCard').DataTable().clear().destroy();
            loadDataCard();
            $('#myModalLock').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//update status cardBreak
function ReportCardBreak() {
    var empCardObj = {
        CardID: $('#IdCardBreak').val(),
        CardNumber: $('#CardNumberBreak').val(),
        Date: moment($('#DateCardBreak').val(), 'DD/MM/YYYY').format('MM/DD/YYYY'),
        Status: 2,
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbCard').DataTable().clear().destroy();
            loadDataCard();
            $('#myModalCardBreak').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function CheckChange() {
    checkExistCard = false;
    var res = validateAddCard();
    if (res == false) {
        return false;
    } else {
        checkExistCard = true;
        if ($('#CardNumber').val().length == 10) {
            var data = $('#CardNumber').val().substring(0, 10);
            AddCard(data);
            if (checkExistCard == false) {
                clearTextBoxCard();
            }
        } else {
            validateAddCard();
        }
    }
}

function getCardByID(CardID) {
    $('.help-block').remove();
    $('.form-control').css('border-color', 'lightgrey');
    $.ajax({
        url: "/ManageCard/CardDetails/" + CardID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            switch (result.Status) {
                case "Chưa đăng kí":
                    $('#IdCardEdit').val(result.CardID);
                    $('#CardNumberEdit').val(result.CardNumber);
                    $('#DateCardEdit').val(result.date);
                    $('#StatusCard').val(result.StatusNumber);
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Đã đăng kí":
                    $('#IdCardEdit').val(result.CardID);
                    $('#CardNumberEdit').val(result.CardNumber);
                    $('#DateCardEdit').val(result.date);
                    $('#StatusCard').val(result.StatusNumber);
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Đã Khóa":
                    $('#IdCardUnLock').val(result.CardID);
                    $('#CardNumberUnLock').val(result.CardNumber);
                    $('#DateCardUnLock').val(result.date);
                    $('#StatusCardUnLock').val(result.Status);
                    $('#myModalUnLock').modal('show');
                    break;
                case "Đang sử dụng":
                    $('#IdCardEdit').val(result.CardID);
                    $('#CardNumberEdit').val(result.CardNumber);
                    $('#DateCardEdit').val(result.date);
                    $('#StatusCard').val(result.StatusNumber);
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Thẻ Hỏng":
                    break;
            }
        },
        error: function (errormessage) {
            alert("Exception:" + CardID + errormessage.responseText);
        }
    });
    return false;
}
//Get card follow ID to lock
function getLockCardByID(CardID) {
    $.ajax({
        url: "/ManageCard/CardDetails/" + CardID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdCardLock').val(result.CardID);
            $('#CardNumberLock').val(result.CardNumber);
            $('#DateCardLock').val(result.date);
            $('#myModalLock').modal('show');
            $('#btnLockCard').show();
        },
        error: function (errormessage) {
            alert("Exception:" + CardID + errormessage.responseText);
        }
    });
    return false;
}

//Get card follow ID to report CardBreak
function getReportCardBreakByID(CardID) {
    $.ajax({
        url: "/ManageCard/CardDetails/" + CardID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdCardBreak').val(result.CardID);
            $('#CardNumberBreak').val(result.CardNumber);
            $('#DateCardBreak').val(result.date);
            $('#myModalCardBreak').modal('show');
            $('#btnReportCardBreak').show();
        },
        error: function (errormessage) {
            alert("Exception:" + CardID + errormessage.responseText);
        }
    });
    return false;
}

//Valdidation using jquery
function validateUpdateCard() {
    var rfidCard = new RegExp('^[0-9]{10,}$');
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
    $.validator.addMethod('checkCardEdit', function (value, element) {
        return rfidCard.test(value);
    });
    //Set rule + message for input by name
    $('#FormEditCard').validate({
        rules: {
            CardNumberEdit: {
                required: true,
                checkCardEdit: true
            }
        },
        messages: {
            CardNumberEdit: {
                required: '*Bắt buộc.',
                checkCardEdit: 'Số thẻ sai định dạng(>9 số).'
            }
        }
    });
    return $('#FormEditCard').valid();
}

function validateAddCard() {
    var rfidCard = new RegExp('^[0-9]{10}$');
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
    $.validator.addMethod('checkCardAdd', function (value, element) {
        return rfidCard.test(value);
    });

    $.validator.addMethod('checkCardAddExist', function (value, element) {
        return checkExistCard != true;
    },'Số thẻ đã tồn tại.');
    //Set rule + message for input by name
    $('#FormAddCard').validate({
        rules: {
            CardNumber: {
                required: true,
                checkCardAdd: true,
                checkCardAddExist: true
            }
        },
        messages: {
            CardNumber: {
                required: '*Bắt buộc.',
                checkCardAdd: 'Số thẻ sai định dạng(10 số).'
            }
        }
    });
    return $('#FormAddCard').valid();
}
