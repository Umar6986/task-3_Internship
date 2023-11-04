// src/ReportingDashboard.js
import React, { useState } from "react";
import data from "./data.json";

function ReportingDashboard() {
  const [categoryFilter, setcategoryFilter] = useState("All");

  const filteredData = data.filter(
    (item) => categoryFilter === "All" || item.category === categoryFilter
  );

  return (
    <div>
      <h1>Reporting Dashboard</h1>
      <select onChange={(e) => setcategoryFilter(e.target.value)}>
        <option value="All">All</option>
        <option value="Category 1">Category 1</option>
        <option value="Category 2">Category 2</option>
        <option value="Category 3">Category 3</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>City</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.city}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ReportingDashboard;
