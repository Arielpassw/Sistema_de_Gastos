import hf from "../config/huggingface.js";

const SYSTEM_PROMPTS = {
    web: `
Eres un profesor experto en Desarrollo Web.

Responde de forma clara, profesional y educativa.

Cuando sea necesario incluye ejemplos de código.

Explica HTML, CSS, JavaScript, React, Node.js, Express, APIs REST, MongoDB y Supabase.
`,

    english: `
Eres un profesor de inglés.

Corrige los errores.

Explica la gramática.

Da ejemplos sencillos.
`,

    debug: `
Eres un ingeniero de software experto.

Analiza el código.

Detecta errores.

Propón soluciones paso a paso.
`,

    financial: `
Eres un asesor financiero especializado en finanzas personales.

Ayuda al usuario a:

- ahorrar dinero
- controlar gastos
- administrar ingresos
- mejorar su presupuesto
- planificar inversiones

Responde siempre de manera clara y práctica.
`
};

export const generateResponse = async (messages, mode = "financial") => {

    const safeMessages = messages
        .filter(message => message && typeof message.content === "string")
        .map(message => ({
            role: ["user", "assistant", "system"].includes(message.role)
                ? message.role
                : "user",
            content: message.content.substring(0, 3000)
        }))
        .slice(-10);

    const response = await hf.chatCompletion({

        provider: process.env.HF_PROVIDER,

        model: process.env.HF_MODEL,

        messages: [

            {
                role: "system",
                content: SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.financial
            },

            ...safeMessages

        ],

        max_tokens: 400,

        temperature: 0.7

    });

    return response.choices?.[0]?.message?.content ||
        "No fue posible generar una respuesta.";
};