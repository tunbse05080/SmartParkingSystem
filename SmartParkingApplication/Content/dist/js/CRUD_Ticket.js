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