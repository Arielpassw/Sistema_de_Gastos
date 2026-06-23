import React from "react";
import "../../styles/admin.css";

import {
  Users,
  UserCheck,
  FileCheck,
  ShieldAlert,
  RefreshCw,
  UserPlus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Tags,
  LogOut,
} from "lucide-react";

// DATOS DE PRUEBA
const statsData = [
  {
    id: 1,
    title: "Total de usuarios",
    value: "56",
    label: "+12 este mes",
    icon: Users,
    color: "#eef2ff",
    iconColor: "#4f46e5",
    labelColor: "#6366f1",
  },
  {
    id: 2,
    title: "Usuarios activos",
    value: "48",
    label: "85.7% del total",
    icon: UserCheck,
    color: "#ecfdf5",
    iconColor: "#059669",
    labelColor: "#10b981",
  },
  {
    id: 3,
    title: "Perfiles completados",
    value: "42",
    label: "75.0% del total",
    icon: FileCheck,
    color: "#eff6ff",
    iconColor: "#2563eb",
    labelColor: "#3b82f6",
  },
  {
    id: 4,
    title: "Perfiles incompletos",
    value: "14",
    label: "25.0% del total",
    icon: ShieldAlert,
    color: "#fffbeb",
    iconColor: "#d97706",
    labelColor: "#f59e0b",
  },
];

const usersTableData = [
  {
    id: 1,
    name: "Ariel Admin",
    email: "ariel.2004alx@gmail.com",
    role: "admin",
    status: "Completado",
    date: "12/05/2025",
    initial: "A",
    avatarBg: "#4f46e5",
  },
  {
    id: 2,
    name: "Emilia Tana",
    email: "emilia.tana@epn.edu.ec",
    role: "user",
    status: "Completado",
    date: "12/05/2025",
    initial: "E",
    avatarBg: "#2563eb",
  },
  {
    id: 3,
    name: "Juan Pérez",
    email: "juan.perez@email.com",
    role: "user",
    status: "Incompleto",
    date: "13/05/2025",
    initial: "J",
    avatarBg: "#6366f1",
  },
];

const categoriesData = [
  { name: "Alimentación", count: 38, percentage: "67.9%" },
  { name: "Transporte", count: 32, percentage: "57.1%" },
  { name: "Vivienda", count: 28, percentage: "50.0%" },
  { name: "Salud", count: 24, percentage: "42.9%" },
  { name: "Educación", count: 18, percentage: "32.1%" },
];

const recentUsersData = [
  {
    email: "maria.garcia@email.com",
    time: "Hace 2 horas",
  },
  {
    email: "juan.perez@email.com",
    time: "Hace 5 horas",
  },
  {
    email: "ana.ruiz@email.com",
    time: "Hace 1 día",
  },
];

export default function DashboardAdmin() {
  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo-icon">
                <BarChart3 size={28} />
              </div>
              <div>
                <h2>Finanzas App</h2>
                <span>Panel de Administrador</span>
              </div>
            </div>
          </div>

          <nav className="sidebar-menu">
            <button className="menu-item active">
              <Users size={18} />
              Dashboard
            </button>
            <button className="menu-item">
              <UserCheck size={18} />
              Usuarios
            </button>
            <button className="menu-item">
              <BarChart3 size={18} />
              Estadísticas
            </button>
            <button className="menu-item">
              <Tags size={18} />
              Categorías
            </button>
          </nav>
        </div>

        {/* PERFIL */}
        <div className="sidebar-footer">
          <div className="profile-card">
            <div className="profile-avatar">E</div>
            <div className="profile-info">
              <h4>Emilia Tana</h4>
              <span>Administrador</span>
            </div>
          </div>
          <button className="logout-btn">
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-admin">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard Administrativo</h1>
          <p className="dashboard-subtitle">Resumen general del sistema</p>
        </div>

        {/* TARJETAS */}
        <div className="stats-grid">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="card stat-card">
                <div>
                  <p className="stat-title">{stat.title}</p>
                  <h3 className="stat-value">{stat.value}</h3>
                  <span
                    className="stat-label"
                    style={{ color: stat.labelColor }}
                  >
                    {stat.label}
                  </span>
                </div>
                <div
                  className="stat-icon"
                  style={{
                    backgroundColor: stat.color,
                    color: stat.iconColor,
                  }}
                >
                  <Icon size={24} />
                </div>
              </div>
            );
          })}
        </div>

        {/* SECCIÓN INTERMEDIA */}
        <div className="middle-grid">
          {/* Usuarios por rol */}
          <div className="card">
            <h3 className="section-title">Usuarios por rol</h3>
            <div className="role-chart">
              <div className="circle-chart">
                <div className="circle-center">
                  <span className="circle-total">56</span>
                  <p className="circle-label">Total</p>
                </div>
              </div>
              <div className="legend-container">
                <div className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: "#4f46e5" }}
                  ></span>
                  <span>
                    User: <strong>47 (83.9%)</strong>
                  </span>
                </div>
                <div className="legend-item">
                  <span
                    className="legend-color"
                    style={{ backgroundColor: "#10b981" }}
                  ></span>
                  <span>
                    Admin: <strong>9 (16.1%)</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="card">
            <h3 className="section-title">Categorías más seleccionadas</h3>
            <div className="categories-list">
              {categoriesData.map((cat, i) => (
                <div key={i} className="category-item">
                  <span className="category-name">{cat.name}</span>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: cat.percentage }}
                    ></div>
                  </div>
                  <span className="category-count">
                    {cat.count}
                    <span className="category-percentage">
                      ({cat.percentage})
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Usuarios recientes */}
          <div className="card">
            <h3 className="section-title">Usuarios recientes</h3>
            <div className="recent-users-list">
              {recentUsersData.map((user, i) => (
                <div key={i} className="recent-user">
                  <div className="avatar avatar-gray">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="user-info">
                    <p className="user-email">{user.email}</p>
                    <p className="user-time">{user.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="view-all-btn">Ver todos</button>
          </div>
        </div>

        {/* TABLA */}
        <div className="card users-card">
          <div className="table-header">
            <h3 className="section-title">Gestión de usuarios</h3>
            <div className="header-actions">
              <button className="btn btn-outline">
                <RefreshCw size={14} />
                Actualizar
              </button>
              <button className="btn btn-primary">
                <UserPlus size={14} />
                Nuevo administrador
              </button>
            </div>
          </div>

          <div className="table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Estado del perfil</th>
                  <th>Fecha de registro</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usersTableData.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="name-cell">
                        <div
                          className="avatar"
                          style={{
                            backgroundColor: user.avatarBg,
                            color: "#fff",
                          }}
                        >
                          {user.initial}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge-${user.role}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <span className={`badge badge-${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{user.date}</td>
                    <td>
                      <div className="actions-cell">
                        <button className="btn btn-outline">Cambiar rol</button>
                        <button className="delete-btn">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINACIÓN */}
          <div className="pagination">
            <span>Mostrando 1 a 5 de 56 usuarios</span>
            <div className="pagination-controls">
              <button className="page-btn">
                <ChevronLeft size={14} />
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span>...</span>
              <button className="page-btn">12</button>
              <button className="page-btn">
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}