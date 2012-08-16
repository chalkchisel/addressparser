var testCase = require('nodeunit').testCase,
    addressparser = require("./index");

exports["General tests"] = {
    "Single address": function(test){
        var input = "andris@tr.ee",
            expected = [{name: "andris@tr.ee", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Multiple addresses": function(test){
        var input = "andris@tr.ee, andris@example.com",
            expected = [{name: "andris@tr.ee", address:"andris@tr.ee"}, {name: "andris@example.com", address:"andris@example.com"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "With unquoted name": function(test){
        var input = "andris <andris@tr.ee>",
            expected = [{name: "andris", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "With quoted name": function(test){
        var input = "\"reinman, andris\" <andris@tr.ee>",
            expected = [{name: "reinman, andris", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Unquoted name, unquoted address": function(test){
        var input = "andris andris@tr.ee",
            expected = [{name: "andris", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Emtpy group": function(test){
        var input = "Undisclosed:;",
            expected = [];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Address group": function(test){
        var input = "Disclosed:andris@tr.ee, andris@example.com;",
            expected = [{name: "Disclosed", address:"andris@tr.ee"}, {name: "Disclosed", address:"andris@example.com"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Name from comment": function(test){
        var input = "andris@tr.ee (andris)",
            expected = [{name: "andris", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "Skip comment": function(test){
        var input = "andris@tr.ee (reinman) andris",
            expected = [{name: "andris", address:"andris@tr.ee"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    },
    "No address": function(test){
        var input = "andris",
            expected = [{name: "andris", address:"andris"}];
        test.deepEqual(addressparser(input), expected);
        test.done();
    }
}