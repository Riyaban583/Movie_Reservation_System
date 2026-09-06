"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const express_1 = require("express");
const errorHandler = (error, req, res, next) => {
    res.status(500).json({
        success: false,
        message: error.message,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middleware.js.map