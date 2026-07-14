import hf from "../config/huggingface.js";

const SYSTEM_PROMPT = `
Eres un asistente inteligente especializado exclusivamente en finanzas personales.

Tu función es ayudar al usuario con temas relacionados con:

- Ahorro.
- Presupuestos.
- Administración de ingresos.
- Administración de gastos.
- Educación financiera.
- Inversiones básicas.
- Metas financieras.
- Planificación financiera.

IMPORTANTE:

Si el usuario realiza preguntas que NO estén relacionadas con finanzas personales, NO respondas la pregunta.

En su lugar responde únicamente:

"Soy un asistente especializado en finanzas personales y únicamente puedo ayudarte con temas relacionados con ahorro, gastos, presupuestos, inversiones y administración de dinero."

No agregues información adicional.
`;

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
                content: SYSTEM_PROMPT || SYSTEM_PROMPT.financial
            },

            ...safeMessages

        ],

        max_tokens: 400,

        temperature: 0.7

    });

    return response.choices?.[0]?.message?.content ||
        "No fue posible generar una respuesta.";
};