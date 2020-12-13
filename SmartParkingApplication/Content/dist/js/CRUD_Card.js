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

    $('#btnAdd').show();
    $('#btnUpdate').hide();
}

function AddCard(number) {
    var res = validateAddCard();
    if (res == false) {
        return false;
    }
    var empCardObj = {
        CardNumber: number,
        Date: $('#Date').val(),
        Status: 0,
    };
    $.ajax({
        url: "/ManageCard/Create",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            $('#tbCard').DataTable().clear().destroy();
            loadDataCard();
            $('#CardNumber').val("");
            $('#myModalCard').modal('show');
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
    var status = $('#cbxStatusCard').val();
    var empCardObj = {
        CardID: $('#IdCardEdit').val(),
        CardNumber: $('#CardNumberEdit').val(),
        Date: $('#DateCardEdit').val(),
        Status: status,
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
        Date: $('#DateCardUnLock').val(),
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
        Date: $('#DateCardLock').val(),
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
        Date: $('#DateCardBreak').val(),
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
    var temp = '0000000000';
    if ($('#CardNumber').val().length >= temp.length) {
        AddCard($('#CardNumber').val());
        
    }
}

function getCardByID(CardID) {
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
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Đã đăng kí":
                    $('#IdCardEdit').val(result.CardID);
                    $('#CardNumberEdit').val(result.CardNumber);
                    $('#DateCardEdit').val(result.date);
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
function validateAddCard() {
    var isValid = true;
    var rfidCard = new RegExp('^[0-9]{10,}$');
    if ($.trim($('#CardNumber').val()) == "" || !rfidCard.test($.trim($('#CardNumber').val()))) {
        $('#CardNumber').prop("title", "Số thẻ trống hoặc sai định dạng(>9 số).");
        $('#CardNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        isValid = true;
        $('#CardNumber').prop("title", "");
        $('#CardNumber').css('border-color', 'lightgrey');
    }
    return isValid;
}

function validateUpdateCard() {
    var isValid = true;
    var rfidCard = new RegExp('^[0-9]{10,}$');
    if ($.trim($('#CardNumberEdit').val()) == "" || !rfidCard.test($.trim($('#CardNumberEdit').val()))) {
        $('#CardNumberEdit').prop("title", "Số thẻ trống hoặc sai định dạng(>9 số).");
        $('#CardNumberEdit').css('border-color', 'Red');
        isValid = false;
    }
    else {
        isValid = true;
        $('#CardNumberEdit').prop("title", "");
        $('#CardNumberEdit').css('border-color', 'lightgrey');
    }
    return isValid;
}