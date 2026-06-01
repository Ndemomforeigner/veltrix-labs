"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AnalyticsCharts from "@/components/dashboard/AnalyticsCharts";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import StatCard from "@/components/dashboard/StatCard";
import ProjectForm from "@/components/dashboard/ProjectForm";
import ProjectTable from "@/components/dashboard/ProjectTable";

export default function DashboardPage() {
  const router = useRouter();

  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // Check authentication and load projects
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchProjects();
  }, []);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);

      const data = await res.json();

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
        method: "DELETE",
      });

      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    router.push("/login");
    return;
  }

  fetchProjects();
  fetchStats();
  }, []);

  // Start editing
  const startEdit = (project) => {
    setEditingProject(project);
  };

  // Clear edit mode
  const clearEdit = () => {
    setEditingProject(null);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const [stats, setStats] = useState({
  total: 0,
  active: 0,
  completed: 0,
  pending: 0
});


  const fetchStats = async () => {
    const res = await fetch(`${API}/api/stats`);
    const data = await res.json();
    setStats(data);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Topbar />

        <div className="stats-grid">
          <StatCard title="Total Projects" value={stats.total} />
          <StatCard title="Active" value={stats.active} />
          <StatCard title="Completed" value={stats.completed} />
          <StatCard title="Pending" value={stats.pending} />
        </div>
<AnalyticsCharts />
        <ProjectForm
          refreshProjects={fetchProjects}
          editingProject={editingProject}
          clearEdit={clearEdit}
        />

        <ProjectTable
          projects={projects}
          deleteProject={deleteProject}
          startEdit={startEdit}
        />

        <button
          onClick={logout}
          className="logout-btn"
        >
          Logout
        </button>
      </main>
    </div>
  );
}

