import React from 'react';
// import { useAdmin } from './AdminContext';
import { useAdmin } from '../../Context/AdminContext';
import StatCard from './StatCard';
const AdminDashboard = () => {
  const { adminUser } = useAdmin();

  return (
    <section className = "">
 
 <div style={{ marginLeft: "250px", paddingTop: "80px", padding: "20px" }}>
      <h1>Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <StatCard title="Total Users" value="120" />
        <StatCard title="Active Models" value="35" />
        <StatCard title="Pending Requests" value="15" />
        <StatCard title="Revenue" value="$10,000" />
      </div>
    </div>
    </section>
  );
};

export default AdminDashboard;
