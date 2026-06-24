import { supabase } from '../config/supabase.js';

// CREAR GASTO
export const createExpense = async (req, res) => {
    try {
        const {
            title,
            description,
            amount,
            category,
            expense_date
        } = req.body;

        if (!title || !amount || !category || !expense_date) {
            return res.status(400).json({
                success: false,
                message: 'Título, monto, categoría y fecha son obligatorios'
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                success: false,
                message: 'El monto debe ser mayor a 0'
            });
        }

        const { data, error } = await supabase
            .from('expenses')
            .insert([
                {
                    user_id: req.user.id,
                    title,
                    description,
                    amount,
                    category,
                    expense_date
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
            message: 'Gasto registrado correctamente',
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// LISTAR GASTOS
export const getExpenses = async (req, res) => {
    try {
        const { category, start_date, end_date } = req.query;

        let query = supabase
            .from('expenses')
            .select('*')
            .eq('user_id', req.user.id)
            .order('expense_date', { ascending: false });

        if (category) {
            query = query.eq('category', category);
        }

        if (start_date) {
            query = query.gte('expense_date', start_date);
        }

        if (end_date) {
            query = query.lte('expense_date', end_date);
        }

        const { data, error } = await query;

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Gastos obtenidos correctamente',
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// OBTENER GASTO POR ID
export const getExpenseById = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('expenses')
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
                message: 'Gasto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Gasto obtenido correctamente',
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ACTUALIZAR GASTO
export const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, amount, category, expense_date } = req.body;

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
        if (category !== undefined) updateData.category = category;
        if (expense_date !== undefined) updateData.expense_date = expense_date;

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Debe enviar al menos un campo para actualizar'
            });
        }

        updateData.updated_at = new Date();

        const { data, error } = await supabase
            .from('expenses')
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
                message: 'Gasto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Gasto actualizado correctamente',
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ELIMINAR GASTO
export const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const { data, error } = await supabase
            .from('expenses')
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
                message: 'Gasto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Gasto eliminado correctamente',
            data
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};