var pageConfigCard = 1;

//Load Data function
function loadDataTicket(changePageSizeTicket) {
    var nameCard = $('#txtSearchTicket').val();
    $.ajax({
        url: "/ManageTicket/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            nameT: nameCard,
            pageTicket: pageConfigTicket,
            pageSizeTicket: 5
        },
        dataType: "json",
        success: function (result) {
            var data = result.dataTicket;
            var html = '';
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CusName + '</td>';
                html += '<td>' + item.IdentityCard + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.TypeOfVehicle + '</td>';
                html += '<td>' + item.LicensePlates + '</td>';
                html += '<td>' + item.RegisDate + '</td>';
                html += '<td>' + item.ExpiryDate + '</td>';
                html += '<td><button class="btn btn-success" onclick="return getCardByID(' + item.CardID + ')" > Sửa </button> <button class="btn btn-danger" data-toggle="modal" data-target="#myModalDropContract" onclick="return getCardByID(' + item.CardID + ')">Khóa thẻ</button></td>';
                html += '</tr>';
            });
            $('#tbodyTicket').html(html);
            pagingTicket(result.total, function () {
                loadDataTicket();
            }, changePageSizeTicket);
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function pagingTicket(totalRowTicket, callback, changePageSizeTicket) {
    var totalPageTicket = Math.ceil(totalRowTicket / 5);

    //Unbind pagination if it existed or click change pageSize
    if ($('#paginationTicket').length === 0 || changePageSizeTicket === true) {
        $('#paginationTicket').empty();
        $('#paginationTicket').removeData("twbs-pagination");
        $('#paginationTicket').unbind("page");
    }

    $('#paginationTicket').twbsPagination({
        totalPages: totalPageTicket,
        first: "Đầu",
        next: "Tiếp",
        last: "Cuối",
        prev: "Trước",
        visiblePages: 10,
        onPageClick: function (event, pageTicket) {
            pageConfigTicket = pageTicket;
            setTimeout(callback, 200);
        }
    });
}

function clearTextBoxTicket() {
    var date = loadDateTicketNow();
    $('#Id').val("");
    $('#CusName').val("");
    $('#IdentityCard').val("");
    $('#Phone').val("");
    $('#Email').val("");
    $('#TypeOfVehicle').val("");
    $('#LicensePlates').val("");
    $('#RegisDate').val("" + date);
    $('#ExpiryDate').val("" + date);

    $('#btnAdd').show();
    $('#btnUpdate').hide();

}

function loadDateTicketNow() {
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

function AddTicket() {
    var empTicketObj = {
        CusName: $('#CusName').val(),
        IdentityCard: $('#IdentityCard').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        TypeOfVehicle: $('#TypeOfVehicle').val(),
        LicensePlates: $('#LicensePlates').val(),
        RegisDate: $('#RegisDate').val(),
        ExpiryDate: $('#ExpiryDate').val(),
    };
    $.ajax({
        url: "/ManageTicket/Create",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataTicket(true);
            $('#myModalTicket').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateTicket() {
    var empTicketObj = {
        CusName: $('#CusName').val(),
        IdentityCard: $('#IdentityCard').val(),
        Phone: $('#Phone').val(),
        Email: $('#Email').val(),
        TypeOfVehicle: $('#TypeOfVehicle').val(),
        LicensePlates: $('#LicensePlates').val(),
        RegisDate: $('#RegisDate').val(),
        ExpiryDate: $('#ExpiryDate').val(),
    };
    $.ajax({
        url: "/ManageTicket/Create",
        data: JSON.stringify(empTicketObj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            loadDataTicket(true);
            $('#myModalUpdateTicket').modal('hide');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function getTicketByID(MonthlyTicketID) {
    $.ajax({
        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (result) {
            $('#MonthlyTicketIDEdit').val(result.MonthlyTicketID);
            $('#CusNameEdit').val(result.CusName);
            $('#IdentityCardEdit').val(result.IdentityCard);
            $('#PhoneEdit').val(result.Phone);
            $('#EmailEdit').val(result.Email);
            $('#TypeOfVehicleEdit').val(result.TypeOfVehicle);
            $('#LicensePlatesEdit').val(result.LicensePlates);
            $('#RegisDateEdit').val(result.RegisDate);
            $('#ExpiryDateEdit').val(result.ExpiryDate);

            $('#myModalUpdateTicket').modal('show');
            $('#btnAddTicket').hide();
            $('#btnUpdateTicket').show();
        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}