module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/backend/src/lib/response.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "badRequest",
    ()=>badRequest,
    "jsonResponse",
    ()=>jsonResponse,
    "notFound",
    ()=>notFound,
    "optionsResponse",
    ()=>optionsResponse
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/node_modules/next/server.js [app-route] (ecmascript)");
;
const allowedOrigin = "*";
function jsonResponse(data, init) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        ...init,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            ...init?.headers ?? {}
        }
    });
}
function optionsResponse() {
    return new __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"](null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization"
        }
    });
}
function notFound(message = "Resource not found") {
    return jsonResponse({
        message
    }, {
        status: 404
    });
}
function badRequest(message, details) {
    return jsonResponse({
        message,
        details
    }, {
        status: 400
    });
}
}),
"[project]/backend/src/lib/schemas.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogSchema",
    ()=>blogSchema,
    "contactSchema",
    ()=>contactSchema,
    "loginSchema",
    ()=>loginSchema,
    "orderSchema",
    ()=>orderSchema,
    "productSchema",
    ()=>productSchema,
    "registerSchema",
    ()=>registerSchema,
    "slugify",
    ()=>slugify
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/backend/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
;
const productSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).optional(),
    description: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    thumbnail: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    gallery: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()).default([]),
    price: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative(),
    salePrice: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().optional(),
    stock: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().nonnegative(),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "Rings",
        "Necklaces",
        "Earrings",
        "Bracelets"
    ]),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "in_stock",
        "out_of_stock"
    ]).default("in_stock"),
    isTrending: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false),
    isNew: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].boolean().default(false)
});
const orderSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    customer: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
        phone: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(8),
        address: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(5),
        email: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email()
    }),
    items: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].array(__TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        productId: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        price: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative(),
        quantity: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().int().positive()
    })).min(1),
    shippingFee: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().nonnegative().default(0)
});
const blogSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    title: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    slug: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2).optional(),
    coverImage: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    summary: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    content: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
    category: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "Tips",
        "Collections",
        "News"
    ]),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].enum([
        "draft",
        "published"
    ]).default("draft")
});
const contactSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email(),
    subject: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    message: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(5)
});
const loginSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    email: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
});
const registerSchema = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    name: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(2),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].email(),
    password: __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(6)
});
function slugify(value) {
    return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}
}),
"[project]/backend/src/lib/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "blogs",
    ()=>blogs,
    "contacts",
    ()=>contacts,
    "createId",
    ()=>createId,
    "orders",
    ()=>orders,
    "products",
    ()=>products,
    "users",
    ()=>users
]);
const products = [
    {
        id: "prod_1",
        name: "Medium Flat Hoops",
        slug: "medium-flat-hoops",
        description: "Minimal polished hoop earrings for everyday styling.",
        thumbnail: "/media/product/1.jpg",
        gallery: [
            "/media/product/1.jpg",
            "/media/product/1-2.jpg"
        ],
        price: 180,
        salePrice: 150,
        stock: 12,
        category: "Earrings",
        status: "in_stock",
        isTrending: true,
        isNew: true,
        createdAt: new Date().toISOString()
    },
    {
        id: "prod_2",
        name: "Twin Hoops",
        slug: "twin-hoops",
        description: "Elegant twin hoop earrings with a clean jewelry-store finish.",
        thumbnail: "/media/product/3.jpg",
        gallery: [
            "/media/product/3.jpg",
            "/media/product/3-2.jpg"
        ],
        price: 150,
        stock: 8,
        category: "Earrings",
        status: "in_stock",
        isTrending: true,
        isNew: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "prod_3",
        name: "Diamond Bracelet",
        slug: "diamond-bracelet",
        description: "Classic bracelet inspired by the Mojuri template product grid.",
        thumbnail: "/media/product/5.jpg",
        gallery: [
            "/media/product/5.jpg",
            "/media/product/5-2.jpg"
        ],
        price: 220,
        salePrice: 199,
        stock: 5,
        category: "Bracelets",
        status: "in_stock",
        isTrending: false,
        isNew: true,
        createdAt: new Date().toISOString()
    }
];
const orders = [];
const blogs = [
    {
        id: "blog_1",
        title: "Bridal Fair Collections 2023",
        slug: "bridal-fair-collections-2023",
        coverImage: "/media/blog/1.jpg",
        summary: "A short guide to bridal jewelry styling and collection choices.",
        content: "Choose elegant pieces that complement the dress without overpowering it.",
        category: "Collections",
        status: "published",
        createdAt: new Date().toISOString()
    },
    {
        id: "blog_2",
        title: "How To Care For Sterling Silver",
        slug: "how-to-care-for-sterling-silver",
        coverImage: "/media/blog/2.jpg",
        summary: "Simple care habits to keep silver jewelry bright.",
        content: "Store silver pieces dry, clean them gently, and avoid harsh chemicals.",
        category: "Tips",
        status: "published",
        createdAt: new Date().toISOString()
    }
];
const contacts = [];
const users = [
    {
        id: "user_admin",
        name: "Mojuri Admin",
        email: "admin@mojuri.local",
        password: "admin123",
        role: "admin",
        createdAt: new Date().toISOString()
    }
];
function createId(prefix) {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
}),
"[project]/backend/app/api/auth/register/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OPTIONS",
    ()=>OPTIONS,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/schemas.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/store.ts [app-route] (ecmascript)");
;
;
;
function OPTIONS() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["optionsResponse"])();
}
async function POST(request) {
    try {
        const body = await request.json();
        const parsed = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$schemas$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["registerSchema"].safeParse(body);
        if (!parsed.success) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])("Dữ liệu đăng ký không hợp lệ", parsed.error.flatten());
        }
        const { name, email, password } = parsed.data;
        // Check if user already exists
        const existingUser = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].find((u)=>u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])("Email đã được sử dụng bởi một tài khoản khác");
        }
        const newUser = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createId"])("user"),
            name,
            email,
            password,
            role: "user",
            createdAt: new Date().toISOString()
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].push(newUser);
        // Don't return password in response
        const { password: _, ...userWithoutPassword } = newUser;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
            message: "Đăng ký thành công",
            user: userWithoutPassword
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["badRequest"])("Đã xảy ra lỗi khi xử lý yêu cầu");
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__19vs2z_._.js.map