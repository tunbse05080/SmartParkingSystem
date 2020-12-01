
$(document).ready(function () {
    loadDataStatusParking();
});

var pageConfig = 1;



//paging
function pagingParkingPlace(totalRow, callback, changePageSize) {
    var totalPage = Math.ceil(totalRow / 5);

    //Unbind pagination if it existed or click change pageSize
    if ($('#pagination').length === 0 || changePageSize === true) {
        $('#pagination').empty();
        $('#pagination').removeData("twbs-pagination");
        $('#pagination').unbind("page");
    }

    $('#pagination').twbsPagination({
        totalPages: totalPage,
        first: "Đầu",
        next: "Tiếp",
        last: "Cuối",
        prev: "Trước",
        visiblePages: 10,
        onPageClick: function (event, page) {
            pageConfig = page;
            setTimeout(callback, 200);
        }
    });
}

//Add Data Function
