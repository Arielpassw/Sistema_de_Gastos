import { supabaseAdmin } from '../config/supabase.js';

// LISTAR USUARIOS
export const getUsers = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, first_name, last_name, age, salary, children_count, pets_count, categories, role, profile_completed, is_active, created_at, plan')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({
      success: true,
      message: 'Usuarios obtenidos correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// OBTENER USUARIO POR ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, first_name, last_name, age, salary, children_count, pets_count, categories, role, profile_completed, is_active, created_at, plan')
      .eq('id', id)
      .maybeSingle();

    if (error) return res.status(400).json({ success: false, message: error.message });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Usuario obtenido correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CAMBIAR ROL
export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        success: false,
        message: 'El rol es obligatorio'
      });
    }

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Rol inválido. Use user o admin'
      });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ role })
      .eq('id', id)
      .select('id, email, first_name, last_name, role')
      .maybeSingle();

    if (error) return res.status(400).json({ success: false, message: error.message });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Rol actualizado correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ACTIVAR / DESACTIVAR USUARIO
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_active } = req.body;

    if (typeof is_active !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'El estado is_active debe ser true o false'
      });
    }

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .update({ is_active })
      .eq('id', id)
      .select('id, email, first_name, last_name, role, is_active')
      .maybeSingle();

    if (error) return res.status(400).json({ success: false, message: error.message });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: is_active ? 'Usuario activado correctamente' : 'Usuario desactivado correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ELIMINAR PERFIL DE USUARIO
export const deleteUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', id)
      .select('id, email, first_name, last_name, role')
      .maybeSingle();

    if (error) return res.status(400).json({ success: false, message: error.message });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Perfil de usuario eliminado correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// RESUMEN DASHBOARD ADMIN
export const getAdminSummary = async (req, res) => {
  try {
    const { data: users, error } = await supabaseAdmin
      .from('profiles')
      .select('id, role, profile_completed, is_active, created_at, categories');

    if (error) return res.status(400).json({ success: false, message: error.message });

    const totalUsers = users.length;
    const totalAdmins = users.filter((u) => u.role === 'admin').length;
    const totalNormalUsers = users.filter((u) => u.role === 'user').length;
    const completedProfiles = users.filter((u) => u.profile_completed === true).length;
    const incompleteProfiles = users.filter((u) => u.profile_completed !== true).length;
    const activeUsers = users.filter((u) => u.is_active === true).length;
    const inactiveUsers = users.filter((u) => u.is_active !== true).length;

    return res.status(200).json({
      success: true,
      message: 'Resumen administrativo obtenido correctamente',
      data: {
        totalUsers,
        totalAdmins,
        totalNormalUsers,
        completedProfiles,
        incompleteProfiles,
        activeUsers,
        inactiveUsers
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// USUARIOS POR ROL
export const getUsersByRole = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('role');

    if (error) return res.status(400).json({ success: false, message: error.message });

    const result = {
      admin: data.filter((u) => u.role === 'admin').length,
      user: data.filter((u) => u.role === 'user').length
    };

    return res.status(200).json({
      success: true,
      message: 'Estadística de usuarios por rol obtenida correctamente',
      data: result
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ESTADO DE PERFILES
export const getProfileStatus = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('profile_completed');

    if (error) return res.status(400).json({ success: false, message: error.message });

    const result = {
      completed: data.filter((u) => u.profile_completed === true).length,
      incomplete: data.filter((u) => u.profile_completed !== true).length
    };

    return res.status(200).json({
      success: true,
      message: 'Estadística de estado de perfiles obtenida correctamente',
      data: result
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// CATEGORÍAS MÁS USADAS
export const getTopCategories = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('categories');

    if (error) return res.status(400).json({ success: false, message: error.message });

    const counter = {};

    data.forEach((user) => {
      (user.categories || []).forEach((category) => {
        counter[category] = (counter[category] || 0) + 1;
      });
    });

    const result = Object.entries(counter)
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total);

    return res.status(200).json({
      success: true,
      message: 'Categorías más usadas obtenidas correctamente',
      data: result
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ACTIVIDAD GENERAL DEL SISTEMA
export const getAdminActivity = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('id, email, first_name, last_name, role, profile_completed, is_active, created_at')
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) return res.status(400).json({ success: false, message: error.message });

    return res.status(200).json({
      success: true,
      message: 'Actividad general del sistema obtenida correctamente',
      data
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};