import { supabase } from "../config/supabase.js";

export const getHistory = async (req, res) => {
    try {

        const userId = req.user.id;

        // INGRESOS

        const { data: incomes, error: incomesError } = await supabase
            .from("incomes")
            .select("*")
            .eq("user_id", userId);

        if (incomesError) {
            return res.status(400).json({
                success: false,
                message: incomesError.message
            });
        }

        // GASTOS

        const { data: expenses, error: expensesError } = await supabase
            .from("expenses")
            .select("*")
            .eq("user_id", userId);

        if (expensesError) {
            return res.status(400).json({
                success: false,
                message: expensesError.message
            });
        }

        // FORMATO INGRESOS
        const incomeHistory = incomes.map(item => ({
            id: item.id,
            type: "Ingreso",
            badge: "Ingreso",
            icon: "💰",
            color: "#22C55E",

            title: item.title,
            category: "Ingreso",
            description: item.description,
            amount: item.amount,
            date: item.income_date,
            created_at: item.created_at
        }));
        // FORMATO GASTOS

        const expenseHistory = expenses.map(item => ({
            id: item.id,
            type: "Gasto",
            badge: "Gasto",
            icon: "💸",
            color: "#EF4444",

            title: item.title,
            category: item.category,
            description: item.description,
            amount: item.amount,
            date: item.expense_date,
            created_at: item.created_at
        }));

        // UNIR HISTORIAL

        const history = [
            ...incomeHistory,
            ...expenseHistory
        ];

        // ORDENAR

        history.sort(
            (a, b) =>
                new Date(b.created_at) - new Date(a.created_at)
        );

        return res.status(200).json({
            success: true,
            data: history
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};