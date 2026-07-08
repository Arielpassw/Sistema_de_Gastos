export const proMiddleware = async (req, res, next) => {

    try {

        if (!req.profile) {
            return res.status(401).json({
                success: false,
                message: "Perfil no encontrado."
            });
        }

        if (
            req.profile.plan !== "PRO" ||
            req.profile.is_pro !== true
        ) {
            return res.status(403).json({
                success: false,
                message: "Esta función está disponible únicamente para usuarios PRO."
            });
        }

        next();

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};