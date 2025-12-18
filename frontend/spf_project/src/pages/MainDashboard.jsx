// 
import React, { useEffect, useState } from "react";

import { FaUsers, FaChartLine, FaPercent } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MainDashboard() {
  const [stats, setStats] = useState({
    totalLoans: 0,
    activeLoans: 0,
    inactiveLoans: 0,
  });

  // ⬅️ Fetch data from backend (same as BorrowersTable)
  useEffect(() => {
    fetch("http://localhost:5000/api/borrowers")
      .then((res) => res.json())
      .then((data) => {
        const total = data.length;
        const active = data.filter((b) =>b.status?.toString().trim().toLowerCase() === "active" ).length;

        const inactive = data.filter((b) => b.status?.toString().trim().toLowerCase() === "inactive").length;

        setStats({
          totalLoans: total,
          activeLoans: active,
          inactiveLoans: inactive,
        });
      })
      .catch((err) => console.error("Error loading dashboard data:", err));
  }, []);

  const pieData = [
    { name: "Total Loans", value: stats.totalLoans },
    { name: "Active Loans", value: stats.activeLoans },
    { name: "Inactive Loans", value: stats.inactiveLoans },
  ];

  const COLORS = ["#007bff", "#28a745", "#dc3545"];

  return (
    <div>
      <div className="dashboard-cards">

        {/* Total Loans */}
        <div className="col-md-4 card">
          <div className="card shadow-sm p-4 border-0 rounded-4 dashboard-card">
            <h6 className="text-secondary mb-2 total-loans">Total Borrowers</h6>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold text-primary">{stats.totalLoans}</h3>
              <FaUsers size={28} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Active Loans */}
        <div className="col-md-4 card">
          <div className="card shadow-sm p-4 border-0 rounded-4">
            <h6 className="text-secondary mb-2 active-loans">Active Loans</h6>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold text-success">{stats.activeLoans}</h3>
              <FaChartLine size={28} className="text-success" />
            </div>
          </div>
        </div>

        {/* Inactive Loans */}
        <div className="col-md-4 card">
          <div className="card shadow-sm p-4 border-0 rounded-4">
            <h6 className="text-secondary mb-2 inactive-loans">Inactive Loans</h6>
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="fw-bold text-danger">{stats.inactiveLoans}</h3>
              <FaPercent size={28} className="text-danger" />
            </div>
          </div>
        </div>

      </div>

      {/* PIE CHART */}
      <div className="mt-5">
        <h5 className="text-center mb-3">Loans Overview</h5>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
