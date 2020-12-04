var pageConfigTicket = 1;

//Load Data function
function loadDataTicket(changePageSizeTicket) {
    var nameTicket = $('#txtSearchTicket').val();
    $.ajax({
        url: "/ManageTicket/LoadData",
        type: "GET",
        contentType: "application/json;charset=utf-8",
        data: {
            nameT: nameTicket,
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
                html += '<td>' + item.CardNumber + '</td>';
                html += '<td>' + item.NameOfParking + '</td>';

                html += '<td><button class="btn btn-success" onclick="return getTicketByID(' + item.MonthlyTicketID + ')" > Gia Hạn</button></td>';
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
        url: "/ManageTicket/Ticket",
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
            $('#MonthlyTicketTK').val(result.MonthlyTicketID);
            $('#CusNameTK').val(result.CusName);
            $('#IdentityCardTK').val(result.IdentityCard);
            $('#PhoneTK').val(result.Phone);
            $('#EmailTK').val(result.Email);
            $('#TypeOfVehicleTK').val(result.TypeOfVehicle);
            $('#LicensePlatesTK').val(result.LicensePlates);
            $('#RegisDateTK').val(result.RegisDate);
            $('#ExpiryDateTk').val(result.ExpiryDate);

            $('#myModalTicket1').modal('show');
            $('#btnAddTicket').modal('show');

        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//Function for getting detail data base on MonthtlyTicketID
//function getDetailTicketByID(MonthlyTicketID) {
//    $.ajax({
//        url: "/ManageTicket/TicketDetails/" + MonthlyTicketID,
//        type: "GET",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (result) {
//            $('#MonthlyTicketIDEdit').val(result.MonthlyTicketID);
//            $('#CusNameEdit').val(result.CusName);
//            $('#IdentityCardEdit').val(result.IdentityCard);
//            $('#PhoneEdit').val(result.Phone);
//            $('#EmailEdit').val(result.Email);
//            $('#TypeOfVehicleEdit').val(result.TypeOfVehicle);
//            $('#LicensePlatesEdit').val(result.LicensePlates);
//            $('#RegisDateEdit').val(result.RegisDate);
//            $('#ExpiryDateEdit').val(result.ExpiryDate);

//            $('#myModalDetailTicket').modal('show');
//        },
//        error: function (errormessage) {
//            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
//        }
//    });
//    return false;
//}

function getIdToDropContract() {
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

            $('#myModalTicket').modal('show');
            $('#btnTicketDrop').show();
        },
        error: function (errormessage) {
            alert("Exception:" + EmployeeID + errormessage.responseText);
        }
    });
    return false;
}
