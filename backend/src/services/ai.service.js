import hf from "../config/huggingface.js";

const SYSTEM_PROMPTS = {
 
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