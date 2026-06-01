"use client";

import { useState, useEffect } from "react";
import API from "@/lib/api";

export default function ProjectForm({
  refreshProjects,
  editingProject,
  clearEdit
}) {

  const [form, setForm] = useState({
    title: "",
    client: ""
  });

  // Fill form when editing
  useEffect(() => {
    if (editingProject) {
      setForm({
        title: editingProject.title,
        client: editingProject.client
      });
    } else {
      setForm({
        title: "",
        client: ""
      });
    }
  }, [editingProject]);

  // Handle input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // Submit form (CREATE or UPDATE)
  const handleSubmit = async () => {

    if (editingProject) {
      // UPDATE project
      await fetch(`${API}/api/projects/${editingProject._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      clearEdit();

    } else {
      // CREATE project
      await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
    }

    // Reset form
    setForm({
      title: "",
      client: ""
    });

    // Refresh table
    refreshProjects();
  };

  return (
    <div className="project-form">

      <input
        name="title"
        placeholder="Project Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="client"
        placeholder="Client"
        value={form.client}
        onChange={handleChange}
      />

      <button onClick={handleSubmit}>
        {editingProject ? "Update Project" : "Add Project"}
      </button>

    </div>
  );
}