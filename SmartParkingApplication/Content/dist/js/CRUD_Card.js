$(document).ready(function () {
    loadDataCard();
});

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
            pageSizeCard: 3
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
                html += '<td><button class="btn btn-primary" onclick = "return getDetailByID(' + item.CardID + ')"> Chi tiết</button> <button class="btn btn-success" onclick="return getByID(' + item.UserID + ')" > Sửa</button> <button class="btn btn-danger" data-toggle="modal" data-target="#myModalDropContract" onclick="return getByID(' + item.UserID + ')">Chấm dứt HĐ</button></td>';
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
        visiblePages: 5,
        onPageClick: function (event, pageCard) {
            pageConfigCard = pageCard;
            setTimeout(callback, 200);
        }
    });
}