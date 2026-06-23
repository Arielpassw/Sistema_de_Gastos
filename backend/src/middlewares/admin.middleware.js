export const adminMiddleware = (req, res, next) => {
  try {
    if (!req.profile) {
      return res.status(401).json({
        success: false,
        message: 'Perfil no encontrado en la solicitud'
      });
    }

    if (req.profile.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acceso denegado. Se requiere rol administrador'
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