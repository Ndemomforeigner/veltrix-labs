"use client";

import API from "@/lib/api";

export default function ProjectTable({
  projects,
  deleteProject,
  startEdit
}) {

  const handleDelete = async (id) => {
    await fetch(`${API}/api/projects/${id}`, {
      method: "DELETE"
    });

    deleteProject(id); // refresh from parent if you use it
  };

  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Title</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <tr key={project._id}>

                <td>{project.title}</td>
                <td>{project.client}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => startEdit(project)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                No projects found
              </td>
            </tr>
          )}
        </tbody>

      </table>

    </div>
  );
}
