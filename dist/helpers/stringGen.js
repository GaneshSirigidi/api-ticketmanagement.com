"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringGen = void 0;
const stringGen = () => {
    var text = "TCKT-";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};
exports.stringGen = stringGen;
