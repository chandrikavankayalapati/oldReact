import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../hooks/useEmployees";
import { useAuth } from "../auth/AuthContext";
import EmployeeForm from "../components/EmployeeForm";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data: employees, isLoading, isError } = useEmployees();

  // UI states
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Data states
  const [localEmployees, setLocalEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Sync API → local
  useEffect(() => {
    if (employees) setLocalEmployees(employees);
  }, [employees]);

  // Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Toggle status
  const toggleStatus = (id) => {
    setLocalEmployees((prev) =>
      prev.map((emp) =>
        emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
      )
    );
  };

  // Delete
  const handleDelete = () => {
    if (!selectedId) return;

    const ok = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!ok) return;

    setLocalEmployees((prev) =>
      prev.filter((emp) => emp.id !== selectedId)
    );
    setSelectedId(null);
  };

  // Edit
  const handleEdit = () => {
    if (!selectedId) return;
    setShowForm(true);
  };

  const selectedEmployee = localEmployees.find(
    (e) => e.id === selectedId
  );

  // ✅ ADD + EDIT SAVE LOGIC
  const handleSave = (data) => {
    if (selectedId) {
      // EDIT
      setLocalEmployees((prev) =>
        prev.map((emp) =>
          emp.id === selectedId ? { ...emp, ...data } : emp
        )
      );
    } else {
      // ADD
      const newEmployee = {
        ...data,
        id: `EMP${Date.now()}`,
        profileImage:
          data.profileImage ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(
            data.fullName
          )}`,
      };
      setLocalEmployees((prev) => [...prev, newEmployee]);
    }

    setShowForm(false);
  };

  // Summary
  const total = localEmployees.length;
  const activeCount = localEmployees.filter((e) => e.isActive).length;
  const inactiveCount = total - activeCount;

  // Filters
  const filteredEmployees = useMemo(() => {
    return localEmployees.filter((emp) => {
      const matchSearch = emp.fullName
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchGender =
        genderFilter === "all" || emp.gender === genderFilter;

      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && emp.isActive) ||
        (statusFilter === "inactive" && !emp.isActive);

      return matchSearch && matchGender && matchStatus;
    });
  }, [localEmployees, search, genderFilter, statusFilter]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Employee Management Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:scale-105 transition"
        >
          Logout
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {activeCount}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-sm text-gray-500">Inactive</p>
          <p className="text-2xl font-bold text-red-600">
            {inactiveCount}
          </p>
        </div>
         {/* ✅ ADD EMPLOYEE */}
        <button
          onClick={() => {
            setSelectedId(null);
            setShowForm(true);
          }}
        className="px-3 py-1.5 text-md font-bold rounded bg-green-300 border-0  text-black-600 cursor-pointer hover:bg-green-400 hover:scale-105 hover:text-white transition-all duration-200"

        >
          Add Employee
        </button>
      </div>

      {/* Search + Actions */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/3"
        />

        <select
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/4"
        >
          <option value="all">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full md:w-1/4"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

       

        <button
          onClick={handleEdit}
          disabled={!selectedId}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50 cursor-pointer hover:scale-105  transition-all duration-200 "
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          disabled={!selectedId}
          className="px-4 py-2 rounded bg-red-600 text-white disabled:opacity-50 cursor-pointer hover:scale-105  transition-all duration-200"
        >
          Delete
        </button>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded bg-gray-700 text-white cursor-pointer hover:scale-105  transition-all duration-200"
        >
          Print
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Profile</th>
              <th className="p-3">Name</th>
              <th className="p-3">Gender</th>
              <th className="p-3">DOB</th>
              <th className="p-3">State</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.map((emp) => (
              <tr
                key={emp.id}
                onClick={() => setSelectedId(emp.id)}
                className={`border-t cursor-pointer ${
                  selectedId === emp.id
                    ? "bg-blue-50 border-l-4 border-blue-500"
                    : ""
                }`}
              >
                <td className="p-3">{emp.id}</td>
                <td className="p-3">
                  <img
                    src={emp.profileImage}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{emp.fullName}</td>
                <td className="p-3">{emp.gender}</td>
                <td className="p-3">{emp.dob}</td>
                <td className="p-3">{emp.state}</td>
                <td className="p-3">
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStatus(emp.id);
                    }}
                    className={`status-toggle w-11 h-5 flex items-center rounded-full p-1 ${
                      emp.isActive ? "bg-green-500" : "bg-red-400"
                    }`}
                  >
                    <div
                      className={`bg-white w-3 h-3 rounded-full transform ${
                        emp.isActive
                          ? "translate-x-6"
                          : "translate-x-0"
                      }`}
                    />
                  </div>
                  <span className="status-text hidden">
                    {emp.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showForm && (
        <EmployeeForm
          initialData={selectedEmployee}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;
