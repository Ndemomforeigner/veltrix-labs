"use client";

import { useState, useEffect } from "react";

export default function ProjectForm({
  refreshProjects,
  editingProject,
  clearEdit
}) {

  const [form, setForm] = useState({
    title: "",
    client: ""
  });

  useEffect(() => {
    if (editingProject) {
      setForm({
        title: editingProject.title,
        client: editingProject.client
      });
    }
  }, [editingProject]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {

    if (editingProject) {

      await fetch(
        `http://localhost:5000/api/projects/${editingProject._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      clearEdit();

    } else {

      await fetch(
        "http://localhost:5000/api/projects",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );
    }

    setForm({
      title: "",
      client: ""
    });

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