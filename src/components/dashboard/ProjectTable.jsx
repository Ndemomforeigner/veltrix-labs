export default function ProjectTable({
  projects,
  deleteProject,
  startEdit
}) {

  return (
    <div className="table-container">

      <table>

        <thead>
          <tr>
            <th>Project</th>
            <th>Client</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project) => (
            <tr key={project._id}>

              <td>{project.title}</td>
              <td>{project.client}</td>
              <td>
                <span className={`status-${project.status.toLowerCase()}`}>
                  {project.status}
                </span>
              </td>

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
                  onClick={() => deleteProject(project._id)}
                >
                  Delete
                </button>
</div>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}