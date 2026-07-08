import { generateResponse } from "../services/ai.service.js";

export const chat = async (req, res) => {

    try {

        const { messages, mode = "financial" } = req.body;

        if (!Array.isArray(messages) || messages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Debe enviar al menos un mensaje."
            });
        }

        const answer = await generateResponse(messages, mode);

        return res.status(200).json({

            success: true,

            message: "Respuesta generada correctamente.",

            data: {
                answer
            }

        });

    } catch (error) {

        console.error("Error IA:", error);

        return res.status(500).json({

            success: false,

            message: "Error al generar la respuesta.",

            error: error.message

        });

    }

};