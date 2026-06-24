import { supabase } from '../config/supabase.js';

// URL del frontend
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// REGISTRO
export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      age,
      email,
      password,
      password_confirmation
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !age ||
      !email ||
      !password ||
      !password_confirmation
    ) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son obligatorios'
      });
    }

    if (age < 25) {
      return res.status(400).json({
        success: false,
        message: 'La edad mínima permitida es 25 años'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener mínimo 8 caracteres'
      });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({
        success: false,
        message: 'Las contraseñas no coinciden'
      });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name,
          last_name,
          age
        }
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente. Verifique su correo.',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN
// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email y contraseña requeridos'
      });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle();

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: profileError.message
      });
    }

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'Perfil no encontrado'
      });
    }

    if (profile.is_active === false) {
      return res.status(403).json({
        success: false,
        message: 'Usuario desactivado. Contacte al administrador.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Login exitoso',
      data: {
        user: data.user,
        session: data.session,
        profile
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LOGIN GOOGLE
export const loginWithGoogle = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${FRONTEND_URL}/dashboardUser`
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      url: data.url
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// MOSTRAR PERFIL
export const getProfile = async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
      profile
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ACTUALIZAR PERFIL
export const updateProfile = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      age,
      salary,
      children_count,
      pets_count,
      categories
    } = req.body;

    if (age && age < 25) {
      return res.status(400).json({
        success: false,
        message: 'La edad mínima permitida es 25 años'
      });
    }

    if (salary && salary < 0) {
      return res.status(400).json({
        success: false,
        message: 'El sueldo no puede ser negativo'
      });
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        age,
        salary,
        children_count,
        pets_count,
        categories,
        profile_completed: true
      })
      .eq('id', req.user.id)
      .select()
      .maybeSingle();

    if (profileError) {
      return res.status(400).json({
        success: false,
        message: profileError.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil actualizado correctamente',
      profile: profileData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// RECUPERAR CONTRASEÑA
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email requerido'
      });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${FRONTEND_URL}/update-password`
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Correo de recuperación enviado'
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ACTUALIZAR CONTRASEÑA
export const updatePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Nueva contraseña requerida'
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener mínimo 8 caracteres'
      });
    }

    const { data, error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contraseña actualizada correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};