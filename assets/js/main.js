let url = location.host; // chạy được local và online

// ================== Responsive Tables ==================
$("table").rtResponsiveTables();

// ================== ADD DRUG ==================
$("#add_drug").submit(function (event) {
    event.preventDefault();

    let formData = $(this).serializeArray();
    let data = {};
    $.map(formData, function (n) {
        data[n["name"]] = n["value"];
    });

    $.ajax({
        url: `http://${url}/api/drugs`,
        method: "POST",
        data: data,
    })
        .done(function () {
            alert(data.name + " added successfully!");
            window.location.href = "/manage";
        })
        .fail(function (xhr) {
            let errMsg = "Something went wrong!";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errMsg = xhr.responseJSON.message;
            }
            alert("Error: " + errMsg);
        });
});

// ================== UPDATE DRUG ==================
$("#update_drug").submit(function (event) {
    event.preventDefault();

    let formData = $(this).serializeArray();
    let data = {};
    $.map(formData, function (n) {
        data[n["name"]] = n["value"];
    });

    $.ajax({
        url: `http://${url}/api/drugs/${data.id}`,
        method: "PUT",
        data: data,
    })
        .done(function () {
            alert(data.name + " updated successfully!");
            window.location.href = "/manage";
        })
        .fail(function (xhr) {
            let errMsg = "Something went wrong!";
            if (xhr.responseJSON && xhr.responseJSON.message) {
                errMsg = xhr.responseJSON.message;
            }
            alert("Error: " + errMsg);
        });
});

// // ================== DELETE DRUG ==================
// if (window.location.pathname === "/manage") {
//     $("table tbody td a.delete").click(function () {
//         let id = $(this).attr("data-id");

//         if (confirm("Do you really want to delete this drug?")) {
//             $.ajax({
//                 url: `http://${url}/api/drugs/${id}`,
//                 method: "DELETE",
//             })
//                 .done(function () {
//                     alert("Drug deleted successfully!");
//                     location.reload();
//                 })
//                 .fail(function (xhr) {
//                     let errMsg = "Something went wrong!";
//                     if (xhr.responseJSON && xhr.responseJSON.message) {
//                         errMsg = xhr.responseJSON.message;
//                     }
//                     alert("Error: " + errMsg);
//                 });
//         }
//     });
// }

if (window.location.pathname == "/purchase") {
    //$("#purchase_table").hide();

    $("#drug_days").submit(function (event) {//on a submit event
        event.preventDefault();//prevent default submit behaviour
        $("#purchase_table").show();
        let days = +$("#days").val();
        alert("Drugs for " + days + " days!");//alert this in the browser

        // 👉 sau khi hiển thị kết quả thì thêm nút "Buy"
        if ($("#buyBtn").length === 0) {
            $("#main").append('<button id="buyBtn">Buy</button>');
        }

        // Xử lý khi nhấn mua
        $("#buyBtn").off("click").on("click", function () {
            // Lấy dữ liệu từ bảng purchase_table
            let purchaseList = [];
            $("#purchase_table tbody tr").each(function () {
                let id = $(this).find("td:eq(0)").text();
                let name = $(this).find("td:eq(1)").text();
                let cards = $(this).find("td:eq(2)").text();
                let packs = $(this).find("td:eq(3)").text();

                purchaseList.push({
                    id, name, cards, packs
                });
            });

            let request = {
                url: `http://${url}/api/purchase`,  // dùng http thay vì https cho local
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify({ drugs: purchaseList })
            };

            $.ajax(request).done(function (response) {
                alert("Purchase successful!");
                console.log(response);
            }).fail(function (err) {
                alert("Purchase failed!");
                console.error(err);
            });
        });
    })
}
