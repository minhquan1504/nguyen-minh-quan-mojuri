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
"[project]/backend/src/lib/supabase.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/backend/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
let supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.");
}
// Sanitize URL: strip trailing slash or "/rest/v1/" suffix
supabaseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey);
}),
"[project]/backend/app/api/users/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "OPTIONS",
    ()=>OPTIONS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/response.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/backend/src/lib/supabase.ts [app-route] (ecmascript)");
;
;
;
function OPTIONS() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["optionsResponse"])();
}
async function GET() {
    try {
        const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$supabase$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from("users").select("id, name, email, role, createdAt").order("createdAt", {
            ascending: false
        });
        if (error) {
            console.warn("Supabase users fetch failed, falling back to local memory:", error.message);
            const usersWithoutPasswords = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].map(({ password: _, ...u })=>u);
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
                items: usersWithoutPasswords
            });
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
            items: data || []
        });
    } catch (err) {
        console.error("Supabase users fetch error:", err);
        const usersWithoutPasswords = __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["users"].map(({ password: _, ...u })=>u);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$backend$2f$src$2f$lib$2f$response$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jsonResponse"])({
            items: usersWithoutPasswords
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1o-rt0h._.js.map