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

// ================== DELETE DRUG ==================
if (window.location.pathname === "/manage") {
    $("table tbody td a.delete").click(function () {
        let id = $(this).attr("data-id");

        if (confirm("Do you really want to delete this drug?")) {
            $.ajax({
                url: `http://${url}/api/drugs/${id}`,
                method: "DELETE",
            })
                .done(function () {
                    alert("Drug deleted successfully!");
                    location.reload();
                })
                .fail(function (xhr) {
                    let errMsg = "Something went wrong!";
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errMsg = xhr.responseJSON.message;
                    }
                    alert("Error: " + errMsg);
                });
        }
    });
}

// ================== PURCHASE ==================
if (window.location.pathname === "/purchase") {
    $("#drug_days").submit(function (event) {
        event.preventDefault();
        $("#purchase_table").show();
        let days = +$("#days").val();
        alert("Drugs for " + days + " days!");
    });
}
