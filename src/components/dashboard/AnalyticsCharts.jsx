"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsCharts() {
  const projectStatusData = [
    { name: "Active", value: 8 },
    { name: "Completed", value: 5 },
    { name: "Pending", value: 3 },
  ];

  const monthlyProjects = [
    { month: "Jan", projects: 2 },
    { month: "Feb", projects: 4 },
    { month: "Mar", projects: 6 },
    { month: "Apr", projects: 8 },
    { month: "May", projects: 10 },
    { month: "Jun", projects: 12 },
  ];

  const COLORS = ["#00f5d4", "#4f46e5", "#f59e0b"];

  return (
    <div className="charts-grid">

      <div className="chart-card">
        <h3>Project Status</h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={projectStatusData}
              dataKey="value"
              outerRadius={100}
            >
              {projectStatusData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Monthly Projects</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyProjects}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="projects" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}