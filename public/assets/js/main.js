$(function () {

    // Future improvement
    // $('.select2').select2();

    // document.querySelector("#menu-btn").addEventListener("click", function () {
    //     var chosenBurger = document.querySelector("#list").value;
    //     console.log(chosenBurger);

    //     var readyToDevourList = document.querySelector(".order");
    //     var readyToDevourItem = document.createElement("p");

    //     var devourBtn = $("<button class='change-devour' data-id='{{this.id}}' data-newDevoured='{{devour}}'>Devour</button>")
    //     readyToDevourItem.textContent = chosenBurger;

    //     readyToDevourList.appendChild(readyToDevourItem);
    //     $(".order").append(devourBtn);

    $("#customize-btn").on("click", function (event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#customize").val().trim(),
            devoured: 0
        };

        var input = document.querySelector("#customize");
        if (input.value !== "") {
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function () {
            console.log("New customized burger");

            $("#customized-finish-alert").text("Your customized burger has been successfully added to the menu.");

            setTimeout(function () {
                location.reload();
            }, 2000);
        });
        } else {
            $("#empty-input-alert").text("Please enter a burger name.")
            setTimeout(function () {
                location.reload();
            }, 2000);
        };
    });

    $(".change-devoured").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");
        var newDevouredState = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevouredState
        }).then(function () {
            console.log("Burger is devoured!");
            location.reload();
        });
    });

    $(".delete-burger").on("click", function (event) {
        event.preventDefault();

        var id = $(this).data("id");

        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(function () {
            console.log("Burger is deleted", id);
            location.reload();
        });
    });
});
