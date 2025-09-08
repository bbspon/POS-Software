import { useEffect, useState } from "react";
import axios from "../../services/axiosInstance";

export default function CreateSubcategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  const [selectedSellerId, setSelectedSellerId] = useState("");
  const [sellers, setSellers] = useState([]);
  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    try {
      const u = JSON.parse(localStorage.getItem("currentUser") || "{}");
      setRole(u?.role || "");
    } catch {}
  }, []);

  async function loadCategories() {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data?.data || []);
    } catch (e) {
      // ignore for now
    }
  }

  async function loadSubcategories() {
    setError("");
    try {
      const res = await axios.get("/api/subcategories");
      setList(res.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || e.message);
    }
  }

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  // admin only: fetch vendors for dropdown
  useEffect(() => {
    async function fetchVendors() {
      if (role === "admin" || role === "super_admin") {
        try {
          const res = await axios.get("/api/vendors?approved=true");
          setSellers(res.data?.data || res.data || []);
        } catch {}
      }
    }
    fetchVendors();
  }, [role]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const n = name.trim();
    if (!n) return setError("Name is required");
    if (!categoryId) return setError("Category is required");

    const payload = {
      name: n,
      description: description || "",
      category_id: categoryId,
    };

    if ((role === "admin" || role === "super_admin") && selectedSellerId) {
      payload.seller_id = selectedSellerId;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/subcategories", payload);
      if (res.data?.success) {
        setName("");
        setDescription("");
        setCategoryId("");
        setSelectedSellerId("");
        await loadSubcategories();
      } else {
        setError(res.data?.message || "Failed");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (err?.response ? `HTTP ${err.response.status}` : err.message);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Subcategory</h1>
        <p className="text-sm text-gray-600 mt-1">
          Choose a parent category. Admins can optionally assign a vendor.
        </p>
      </div>

      <div className="rounded-lg border bg-white shadow-sm">
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name *</label>
            <input
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
              placeholder="Eg. Smartphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
              placeholder="Short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Parent Category *
            </label>
            <select
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {(role === "admin" || role === "super_admin") && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Select Seller (optional)
              </label>
              <select
                className="w-full border rounded-md p-2 focus:outline-none focus:ring-2"
                value={selectedSellerId}
                onChange={(e) => setSelectedSellerId(e.target.value)}
              >
                <option value="">All Vendors (Global)</option>
                {sellers.map((v) => (
                  <option key={v._id} value={v._id}>
                    {v.name || v.storeName || v.email}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to make this subcategory global.
              </p>
            </div>
          )}

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-black text-white disabled:opacity-60"
            >
              {loading ? "Saving..." : "Create Subcategory"}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-medium mb-3">Existing Subcategories</h2>
        <div className="rounded-lg border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-2 border-b">Name</th>
                <th className="text-left p-2 border-b">Description</th>
                <th className="text-left p-2 border-b">Category</th>
                <th className="text-left p-2 border-b">Scope</th>
              </tr>
            </thead>
            <tbody>
              {list.map((s) => (
                <tr key={s._id}>
                  <td className="p-2 border-b">{s.name}</td>
                  <td className="p-2 border-b">{s.description || "-"}</td>
                  <td className="p-2 border-b">
                    {categories.find((c) => c._id === s.category_id)?.name ||
                      "—"}
                  </td>
                  <td className="p-2 border-b">
                    {s.seller_id ? "Vendor" : "Global"}
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td className="p-3 text-gray-500" colSpan={4}>
                    No subcategories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
