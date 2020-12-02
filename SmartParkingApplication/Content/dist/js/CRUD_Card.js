
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
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CardNumber + '</td>';
                html += '<td>' + item.Date + '</td>';
                html += '<td>' + item.Status + '</td>';
                html += '<td><button class="btn btn-success" onclick="return getCardByID(' + item.CardID + ')" > Sửa </button> <button class="btn btn-danger" data-toggle="modal" data-target="#myModalDropContract" onclick="return getCardByID(' + item.CardID + ')">Khóa thẻ</button></td>';
                html += '</tr>';
            });
            $('#tbodyCard').html(html);
            pagingCard(result.total, function () {
                loadDataCard();
            }, changePageSizeCard);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

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
function clearTextBoxCard() {
    var date = loadDateCardNow();
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

function loadDateCardNow() {
    // body...
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = mm + '/' + dd + '/' + yyyy;
    today = today + " 12:00:00AM";
    return today;
}

function AddCard() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var empCardObj = {
        CardNumber: $('#CardNumber').val(),
        Date: $('#Date').val(),
        Status: $('#Stauts').val(),
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
    var res = validate();
    if (res == false) {
        return false;
    }
    var empCardObj = {
        CardID: $('#IdCardEdit').val(),
        CardNumber: $('#CardNumberEdit').val(),
        Date: $('#DateCardEdit').val(),
        Status: $('#StatusCardEdit').val(),
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

function getCardByID(CardID) {
    $.ajax({
        url: "/ManageCard/CardDetails/" + CardID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#IdCardEdit').val(result.CardID);
            $('#CardNumberEdit').val(result.CardNumber);
            $('#DateCardEdit').val(result.Date);
            $('#StatusCardEdit').val(result.Status);

            $('#myModalUpdate').modal('show');
            $('#btnAddCard').hide();
            $('#btnUpdateCard').show();
        },
        error: function (errormessage) {
            alert("Exception:" + CardID + errormessage.responseText);
        }
    });
    return false;
}

function validate{
    var isValid = true;
    var rfidCard = new RegExp('^[0-9]{10,}$');
    if ($('#CardNumber').val().trim() == "" || !rfidCard.test($('#CardNumber').val().trim())) {
        $('#CardNumber').prop("title", "Số thẻ trống hoặc sai định dạng(>9 số).");
        $('#CardNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#CardNumber').prop("title", "");
        $('#CardNumber').css('border-color', 'lightgrey');
    }
    return isValid;
}