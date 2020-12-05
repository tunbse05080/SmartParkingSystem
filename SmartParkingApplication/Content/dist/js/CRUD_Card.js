
var pageConfigCard = 1;

//Load Data function
function loadDataCard(changePageSizeCard) {
    var nameCard = $('#txtSearchCard').val();
    $.ajax({
        url: "/ManageCard/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            nameC: nameCard,
            pageCard: pageConfigCard,
            pageSizeCard: 5
        },
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
                        html += '<td><button class="btn btn-success" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Sửa</button></td>';
                        break;
                    case "Đã đăng kí":
                        html += '<td><button class="btn btn-success" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Sửa</button></td>';
                        break;
                    case "Đã Khóa":
                        html += '<td><button class="btn btn-warning" style="width:95px" onclick="return getCardByID(' + item.CardID + ')" >Mở Khóa</button></td>';
                        break;
                    case "Thẻ Hỏng":
                        html += '<td><button class= "btn btn-danger" disabled>Thẻ Hỏng</button></td>'
                        break;
                }
                html += '</tr>';
            });
            $('#tbodyCard').html(html);
            pagingCard(result.total, function () {
                loadDataCard();
            }, changePageSizeCard);
            totalCard += '<h3>' + result.totalCard + '<sup style="font-size: 20px"></sup></h3>';
            totalCard += '<p>Tổng số thẻ</p>';
            $('#totalCard').html(totalCard);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


// paging
function pagingCard(totalRowCard, callback, changePageSizeCard) {
    var totalPageCard = Math.ceil(totalRowCard / 5);

    //Unbind pagination if it existed or click change pageSize
    if ($('#paginationCard').length === 0 || changePageSizeCard === true) {
        $('#paginationCard').empty();
        $('#paginationCard').removeData("twbs-pagination");
        $('#paginationCard').unbind("page");
    }

    $('#paginationCard').twbsPagination({
        totalPages: totalPageCard,
        first: "Đầu",
        next: "Tiếp",
        last: "Cuối",
        prev: "Trước",
        visiblePages:   10 ,
        onPageClick: function (event, pageCard) {
            pageConfigCard = pageCard;
            setTimeout(callback, 200);
        }
    });
}

//ComboboxStatusCard
function comboboxStatusCard() {
    $.ajax({
        url: "/ManageCard/ComboboxStatusCard",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            var html = '';
            var i = 0;
            $.each(result, function (key, item) {
                html += '<option value="' + i + '">' + item + '</option>';
                i++;
            });
            $("#cbxStatusCard").html(html);
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
    //$('#Email').css('border-color', 'lightgrey');
    //$('#IdentityCard').css('border-color', 'lightgrey');
    //$('#State').css('border-color', 'lightgrey');
    //$('#Country').css('border-color', 'lightgrey');
}

function AddCard() {
    //var res = validateCard();
    //if (res == false) {
    //    return false;
    //}
    var empCardObj = {
        CardNumber: $('#CardNumber').val(),
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
            loadDataCard(true);
            $('#myModalCard').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateCard() {
    var res = validateCard();
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
            loadDataCard(true);
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
            alert("Success!");
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

//lock card
function UnlockCard() {
    var empCardObj = {
        CardID: $('#IdCardLock').val(),
        CardNumber: $('#CardNumberLock').val(),
        Date: $('#DateCardLock').val(),
        Status: 0,
    };
    $.ajax({
        url: "/ManageCard/UpdateCard",
        data: JSON.stringify(empCardObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataCard(true);
            $('#myModalLock').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
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
                    comboboxStatusCard();
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Đã đăng kí":
                    $('#IdCardEdit').val(result.CardID);
                    $('#CardNumberEdit').val(result.CardNumber);
                    $('#DateCardEdit').val(result.date);
                    comboboxStatusCard();
                    $('#myModalUpdate').modal('show');
                    $('#btnUpdateCard').show();
                    break;
                case "Đã Khóa":
                    $('#IdCardLock').val(result.CardID);
                    $('#CardNumberLock').val(result.CardNumber);
                    $('#DateCardLock').val(result.date);
                    $('#StatusCardLock').val(result.Status);
                    $('#myModalLock').modal('show');
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

//Valdidation using jquery
function validateCard() {
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