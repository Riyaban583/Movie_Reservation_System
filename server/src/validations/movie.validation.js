"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMovieSchema = void 0;
const zod_1 = require("zod");
exports.createMovieSchema = zod_1.z.object({
    title: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    duration: zod_1.z.number().positive(),
    genre: zod_1.z.string().min(1),
    language: zod_1.z.string().min(1),
    releaseDate: zod_1.z.string(),
});
//# sourceMappingURL=movie.validation.js.map