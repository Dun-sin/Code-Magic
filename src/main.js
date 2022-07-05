"use strict";
exports.__esModule = true;
var FilePond = require("filepond");
var attributeValue;
var generators = document.querySelectorAll('[data-gen]');
// const countElement = document.querySelector('.count > span');
var textInput = (document.getElementById("".concat('pic-text', "-text")));
var buttonElement = (document.querySelector("[data-button = ".concat('pic-text', "]")));
// File Pond
var imageElement = (document.getElementById("".concat('pic-text', "-file")));
var pond = FilePond.create(imageElement);
console.log(pond);
buttonElement.addEventListener('click', function () {
    console.log(textInput === null || textInput === void 0 ? void 0 : textInput.value);
});
generators.forEach(function (generator) {
    generator === null || generator === void 0 ? void 0 : generator.addEventListener('click', function () {
        attributeValue = generator.getAttribute('data-gen');
        if (attributeValue === null) {
            return;
        }
        else {
            console.log(attributeValue);
        }
    });
});
