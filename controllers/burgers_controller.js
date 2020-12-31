var express = require("express");
var burger = require("../models/burger");

var router = express.Router();

router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var hbsObj = {
            burgers: data
        };
        console.log(hbsObj);
        res.render("index", hbsObj);
    });
});

router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function (result) {
        res.json({ id: result });
    });
});

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log(condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result == 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end()
        };
    });
});

router.delete("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;
    console.log(condition);

    burger.delete(condition, function(result) {
        if (result == 0) {
            return res.status(404).end();
        } else {
            return res.status(200).end()
        };
    });
});

module.exports = router;
