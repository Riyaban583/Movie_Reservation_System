"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTheaterSchema = void 0;
const zod_1 = require("zod");
exports.createTheaterSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    location: zod_1.z.string().min(2),
    city: zod_1.z.string().min(2),
});
//# sourceMappingURL=theater.validation.js.map