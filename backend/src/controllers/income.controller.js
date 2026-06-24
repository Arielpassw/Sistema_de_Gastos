import { supabase } from '../config/supabase.js';

// CREAR INGRESO
export const createIncome = async (req, res) => {
  try {
    const { title, description, amount, income_date } = req.body;

    if (!title || !amount || !income_date) {
      return res.status(400).json({
        success: false,
        message: 'Título, monto y fecha son obligatorios'
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El monto debe ser mayor a 0'
      });
    }

    const { data, error } = await supabase
      .from('incomes')
      .insert([
        {
          user_id: req.user.id,
          title,
          description,
          amount,
          income_date
        }
      ])
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Ingreso registrado correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// LISTAR INGRESOS
export const getIncomes = async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    let query = supabase
      .from('incomes')
      .select('*')
      .eq('user_id', req.user.id)
      .order('income_date', { ascending: false });

    if (start_date) query = query.gte('income_date', start_date);
    if (end_date) query = query.lte('income_date', end_date);

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ingresos obtenidos correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// OBTENER INGRESO POR ID
export const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('incomes')
      .select('*')
      .eq('id', id)
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Ingreso no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ingreso obtenido correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ACTUALIZAR INGRESO
export const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, amount, income_date } = req.body;

    if (amount !== undefined && Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El monto debe ser mayor a 0'
      });
    }

    const updateData = {};

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (amount !== undefined) updateData.amount = amount;
    if (income_date !== undefined) updateData.income_date = income_date;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Debe enviar al menos un campo para actualizar'
      });
    }

    updateData.updated_at = new Date();

    const { data, error } = await supabase
      .from('incomes')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Ingreso no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ingreso actualizado correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ELIMINAR INGRESO
export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('incomes')
      .delete()
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .maybeSingle();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Ingreso no encontrado'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Ingreso eliminado correctamente',
      data
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};