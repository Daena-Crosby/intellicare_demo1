module.exports = [
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[project]/lib/supabase-anon.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAnonClient",
    ()=>createAnonClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/esm/wrapper.mjs [app-rsc] (ecmascript)");
;
function createAnonClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$esm$2f$wrapper$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createClient"])(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
        auth: {
            persistSession: false,
            autoRefreshToken: false
        }
    });
}
}),
"[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"403a62b006a726707bba1c263c8fd94c5b112d7716":"registerDoctor"},"",""] */ __turbopack_context__.s([
    "registerDoctor",
    ()=>registerDoctor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/resend/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2d$anon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase-anon.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const resend = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$resend$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Resend"](process.env.RESEND_API_KEY);
async function registerDoctor(formData) {
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2d$anon$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAnonClient"])();
        const doctorId = crypto.randomUUID();
        const createdAt = new Date().toISOString();
        console.log("[v0] Attempting to register doctor:", formData.email);
        const { data: dbData, error: dbError } = await supabase.from("doctors_form_data").insert({
            doctor_id: doctorId,
            name: formData.name,
            email: formData.email,
            country: formData.country,
            medical_role: formData.medicalRole,
            specialty: formData.specialty,
            work_preference: formData.workPreference,
            availability: formData.availability,
            phone: formData.phone,
            createdat: createdAt,
            photo_url: null,
            approved: false
        }).select();
        if (dbError) {
            console.error("[v0] Database error:", dbError.message);
            return {
                success: false,
                error: "Failed to save registration. Please try again.",
                details: dbError.message
            };
        }
        console.log("[v0] Successfully saved to database:", doctorId);
        try {
            const webhookUrl = "https://daena.app.n8n.cloud/webhook/doctor-registration";
            const webhookPayload = {
                doctorId,
                name: formData.name,
                email: formData.email,
                country: formData.country,
                medicalRole: formData.medicalRole,
                specialty: formData.specialty,
                workPreference: formData.workPreference,
                availability: formData.availability,
                phone: formData.phone,
                createdAt,
                approved: false
            };
            console.log("[v0] Sending notification to n8n webhook");
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(webhookPayload)
            });
            if (!response.ok) {
                console.log("[v0] Webhook notification failed (non-critical):", response.status);
            } else {
                console.log("[v0] Webhook notification sent successfully");
            }
        } catch (webhookError) {
            console.log("[v0] Webhook error (non-critical):", webhookError);
        }
        console.log("[v0] Registration successful, sending welcome email");
        try {
            const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <p>Hey Dr. ${formData.name},</p>

          <p>
            Thank you for your interest in the Intellibus Care Foundation. We are grateful that you are
            taking the time to explore how your skills can support our mission of strengthening healthcare
            access and response.
          </p>

          <p>
            The next step is to schedule a short introductory call. This call helps us get to know you and
            share the Care Foundation charter, the goals of the program, and how the entire mission works.
          </p>

          <p>
            Please use the link below to choose a time that works for you:<br />
            <a href="https://calendly.com/daniel-callaghan-intellibus/30min" style="color: #2563eb;">
              https://calendly.com/daniel-callaghan-intellibus/30min
            </a>
          </p>

          <p>I look forward to meeting you and learning more about your experience.</p>

          <p>
            Warm regards,<br />
            Daniel Callaghan<br />
            Intellibus Care Foundation
          </p>
        </div>
      `;
            const { data: emailData, error: emailError } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: formData.email,
                subject: "Welcome to the Intellibus Care Foundation",
                html: emailHtml
            });
            if (emailError) {
                console.error("[v0] Email error:", emailError);
                return {
                    success: true,
                    warning: "Registration successful, but we couldn't send the welcome email. You'll be contacted soon."
                };
            }
            console.log("[v0] Welcome email sent successfully:", emailData?.id);
        } catch (emailError) {
            console.error("[v0] Email sending failed:", emailError);
            return {
                success: true,
                warning: "Registration successful, but we couldn't send the welcome email. You'll be contacted soon."
            };
        }
        return {
            success: true
        };
    } catch (error) {
        console.error("[v0] Registration error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unexpected error occurred during registration",
            details: error instanceof Error ? error.stack : String(error)
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    registerDoctor
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(registerDoctor, "403a62b006a726707bba1c263c8fd94c5b112d7716", null);
}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$register$2d$doctor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "403a62b006a726707bba1c263c8fd94c5b112d7716",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$register$2d$doctor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerDoctor"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2f$register$2d$doctor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/register/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2f$register$2d$doctor$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions/register-doctor.tsx [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__9efd25a8._.js.map