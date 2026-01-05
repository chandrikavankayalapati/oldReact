import { useState, useEffect } from "react";


const STATES = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Kerala",
  "Maharashtra",
  "Delhi",
  "Gujarat",
  "Rajasthan",
  "West Bengal",
];


const EmployeeForm = ({ initialData, onClose, onSave }) => {
  const [form, setForm] = useState({
    fullName: "",
    gender: "Male",
    dob: "",
    state: "",
    isActive: true,
    profileImage: "",
  });

  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setPreview(initialData.profileImage);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.fullName || !form.dob || !form.state) {
      alert("Please fill all required fields");
      return;
    }
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Employee" : "Add Employee"}
        </h2>

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

     <select
  name="state"
  value={form.state}
  onChange={handleChange}
  className="w-full border border-gray-300 rounded-lg px-3 py-2
             "
>
  <option value="">Select State</option>
  {STATES.map((state) => (
    <option key={state} value={state}>
      {state}
    </option>
  ))}
</select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

 <label className="flex flex-col items-center justify-center gap-2
                  border-2 border-dashed border-gray-300
                  rounded-lg p-4 cursor-pointer
                  hover:border-green-500 hover:bg-green-50
                  transition text-sm text-gray-600">

  <span className="font-medium text-gray-700">
    Choose Profile Picture
  </span>
  <span className="text-xs text-gray-400">
    PNG, JPG up to 5MB
  </span>

  <input
    type="file"
    accept="image/*"
    onChange={handleImage}
    className="hidden"
  />
</label>


    {preview && (
  <div className="flex justify-center">
    <img
      src={preview}
      alt="Preview"
      className="w-20 h-20 rounded-full object-cover"
    />
  </div>
)}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
