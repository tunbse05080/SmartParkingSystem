$(document).ready(function () {
    loadDataTicket();
});

//reload modal when change combobox
function reloadModalETK() {
    if ($("#cbETK").val() == "1") {
        $('#ExpiryDateETk').val(DateETK(1));
        $('#priceETK').val("500.000 VND");
        $("#myModalExtendTicket").modal("show");
    }
    else if ($("#cbETK").val() == "2") {
        $('#ExpiryDateETk').val(DateETK(2));
        $('#priceETK').val("2.500.000 VND");
        $("#myModalExtendTicket").modal("show");
    }
    else {
        $('#ExpiryDateETk').val(DateETK(3));
        $('#priceETK').val("4.000.000 VND");
        $("#myModalExtendTicket").modal("show");
    }
}

//DateETK
function DateETK(dateExtend) {
    // body...
    if (dateExtend == 1) {
        dateExtend = 30;
    } else if (dateExtend == 2) {
        dateExtend = 180;
    } else {
        dateExtend = 365;
    }
    
    var date = new Date();
    date.setTime(date.getTime() + (dateExtend * 24 * 60 * 60 * 1000));
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
            $.each(data, function (key, item) {
                html += '<tr>';
                html += '<td>' + item.CusName + '</td>';
                html += '<td>' + item.Phone + '</td>';
                html += '<td>' + item.Email + '</td>';
                html += '<td>' + item.typeOfVehicle + '</td>';
                html += '<td>' + item.LicensePlates + '</td>';
                html += '<td>' + item.RegisDate + '</td>';
                html += '<td>' + item.ExpiryDate + '</td>';
                if (item.expiryFormEs <= DatePlus(7) && item.expiryFormEs >= loadDateNowToCompare() ) {
                    html += '<td>Sắp hết HĐ</td>';
                } else if (item.expiryFormEs > DatePlus(7)) {
                    html += '<td>Còn hợp đồng</td>';
                } else {
                    html += '<td>Hết Hợp đồng</td>'
                }
                html += '<td>' + item.CardNumber + '</td>';

                html += '<td><button class="btn btn-warning" onclick="return getTicketByID(' + item.MonthlyTicketID + ')" > Gia Hạn</button></td>';
                html += '</tr>';
            });

            $('#tbodyTicket').html(html);

            $("#tbTicket").DataTable({
                "responsive": true, "lengthChange": true, "autoWidth": true, "paging": true, "searching": true, "ordering": true, "info": true, retrieve:true,
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

//function pagingTicket(totalRowTicket, callback, changePageSizeTicket) {
//    var totalPageTicket = Math.ceil(totalRowTicket / 5);

//    //Unbind pagination if it existed or click change pageSize
//    if ($('#paginationTicket').length === 0 || changePageSizeTicket === true) {
//        $('#paginationTicket').empty();
//        $('#paginationTicket').removeData("twbs-pagination");
//        $('#paginationTicket').unbind("page");
//    }

//    $('#paginationTicket').twbsPagination({
//        totalPages: totalPageTicket,
//        first: "Đầu",
//        next: "Tiếp",
//        last: "Cuối",
//        prev: "Trước",
//        visiblePages: 10,
//        onPageClick: function (event, pageTicket) {
//            pageConfigTicket = pageTicket;
//            setTimeout(callback, 200);
//        }
//    });
//}

function clearTextBoxTicket() {
    var date = loadDateNow();
    ComboboxTicket();
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

function AddTicket() {
    var empTicketObj = {
        CusName: $('#CusNameTK').val(),
        IdentityCard: $('#IdentityCardTK').val(),
        Phone: $('#PhoneTK').val(),
        Email: $('#EmailTK').val(),
        TypeOfVehicle: $('#cbTypeOfVehicleTK').val(),
        LicensePlates: $('#LicensePlatesTK').val(),
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
            loadDataTicket();
            $('#myModalTicket').modal('hide');
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function UpdateExtendTK() {
    var empTicketObj = {
        MonthlyTicketID: $('#MonthlyTicketETK').val(),
        CusName: $('#CusNameETK').val(),
        IdentityCard: $('#IdentityCardETK').val(),
        Phone: $('#PhoneETK').val(),
        Email: $('#EmailETK').val(),
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
            loadDataTicket();
            $('#myModalExtendTicket').modal('hide');
             
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
            var date = $('#cbETK').val();
            $('#MonthlyTicketETK').val(result.MonthlyTicketID);
            $('#CusNameETK').val(result.CusName);
            $('#IdentityCardETK').val(result.IdentityCard);
            $('#PhoneETK').val(result.Phone);
            $('#EmailETK').val(result.Email);
            $('#TypeOfVehicleETK').val(result.TypeOfVehicle);
            $('#LicensePlatesETK').val(result.LicensePlates);
            $('#RegisDateETK').val(loadDateNow());
            $('#ExpiryDateETk').val(DateETK(date));
            $('#CardIDETK').val(result.CardID);

            $('#myModalExtendTicket').modal('show');
            $('#btnExtendTK').show();

        },
        error: function (errormessage) {
            alert("Exception:" + MonthlyTicketID + errormessage.responseText);
        }
    });
    return false;
}

//function getIdToDropContract() {
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

//            $('#myModalTicket').modal('show');
//            $('#btnTicketDrop').show();
//        },
//        error: function (errormessage) {
//            alert("Exception:" + EmployeeID + errormessage.responseText);
//        }
//    });
//    return false;
//}
