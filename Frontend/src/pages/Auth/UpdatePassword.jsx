import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getFriendlyError } from "../../utils/errorMessages";
import { supabase } from "../../services/supabaseClient";

import "../../styles/forgot-reset.css";
import { Eye, EyeOff } from "lucide-react";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    // VALIDACIONES
    if (!password || !confirmPassword) {
      setMessageType("error");
      setMessage("Completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    if (password.length < 8) {
      setMessageType("error");
      setMessage("La contraseña debe tener mínimo 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      // ACTUALIZAR PASSWORD EN SUPABASE
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      // ÉXITO
      setMessageType("success");
      setMessage("Contraseña actualizada correctamente.");
      setPassword("");
      setConfirmPassword("");

      // REDIRECCIÓN
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error(error);
      setMessageType("error");
      setMessage(getFriendlyError(error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Cambiar Contraseña</h2>

        <form onSubmit={handleUpdate}>
          {/* Campo Contraseña */}
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Campo Confirmar Contraseña */}
          <div className="password-container">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Botón de Enviar */}
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>

        {message && (
          <p className={`auth-message ${messageType}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;