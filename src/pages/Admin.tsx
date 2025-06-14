import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";

// REMOVE these hardcoded constants:
// const ADMIN_USERNAME = "admin";
// const ADMIN_PASSWORD = "aidirectorysupersecret";

function parseBulkToolsInput(input: string) {
  // Try to parse as JSON array first
  try {
    const parsed = JSON.parse(input);
    if (Array.isArray(parsed)) {
      return parsed;
    } else if (typeof parsed === "object") {
      return [parsed];
    }
  } catch {
    // Not JSON, try CSV
  }
  // For demo, only support JSON
  return null;
}

const AdminPage = () => {
  const [loginState, setLoginState] = useState({ username: "", password: "" });
  const [loggedIn, setLoggedIn] = useState(false);
  const [tab, setTab] = useState<"single" | "bulk">("single");
  const [loginLoading, setLoginLoading] = useState(false);

  // Single tool
  const [singleTool, setSingleTool] = useState<ToolInput>({
    name: "",
    logo: "",
    description: "",
    shortDescription: "",
    category: [],
    pricing: "",
    rating: 5,
    reviewCount: 0,
    features: [],
    url: "",
    apiAccess: false,
    pros: [],
    cons: [],
    useCases: [],
  });

  // Bulk tools
  const [bulkToolsString, setBulkToolsString] = useState("");
  const [uploadResult, setUploadResult] = useState<null | { success: boolean; message: string }> (null);
  const [uploading, setUploading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    // Call edge function for secure admin auth
    try {
      const res = await fetch("https://favhnurmqbtzttzxvfmm.supabase.co/functions/v1/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginState),
      });
      const json = await res.json();
      if (json.success) {
        setLoggedIn(true);
      } else {
        alert("Invalid admin credentials!");
      }
    } catch (err) {
      alert("Error during login.");
    } finally {
      setLoginLoading(false);
    }
  };

  async function handleSingleUpload(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setUploadResult(null);

    // Validate essential fields
    if (!singleTool.name) {
      setUploadResult({ success: false, message: "Tool name is required" });
      setUploading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from("ai_tools")
        .insert([
          {
            name: singleTool.name,
            logo: singleTool.logo,
            description: singleTool.description,
            shortdescription: singleTool.shortDescription,
            category: singleTool.category,
            pricing: singleTool.pricing,
            rating: singleTool.rating,
            reviewcount: singleTool.reviewCount,
            features: singleTool.features,
            url: singleTool.url,
            apiaccess: singleTool.apiAccess,
            pros: singleTool.pros,
            cons: singleTool.cons,
            usecases: singleTool.useCases,
          },
        ]);

      if (error) {
        setUploadResult({ success: false, message: error.message });
      } else {
        setUploadResult({ success: true, message: "Tool uploaded!" });
        setSingleTool({
          name: "",
          logo: "",
          description: "",
          shortDescription: "",
          category: [],
          pricing: "",
          rating: 5,
          reviewCount: 0,
          features: [],
          url: "",
          apiAccess: false,
          pros: [],
          cons: [],
          useCases: [],
        });
      }
    } catch (err) {
      setUploadResult({ success: false, message: "Unknown error" });
    } finally {
      setUploading(false);
    }
  }

  async function handleBulkUpload(e: React.FormEvent) {
    e.preventDefault();
    setUploading(true);
    setUploadResult(null);

    const tools = parseBulkToolsInput(bulkToolsString);
    if (!tools || !Array.isArray(tools)) {
      setUploadResult({ success: false, message: "Unable to parse JSON input! Make sure you input a valid array of tools." });
      setUploading(false);
      return;
    }

    const formattedTools = tools.map(tool => ({
      name: tool.name,
      logo: tool.logo,
      description: tool.description,
      shortdescription: tool.shortDescription,
      category: tool.category,
      pricing: tool.pricing,
      rating: tool.rating,
      reviewcount: tool.reviewCount,
      features: tool.features,
      url: tool.url,
      apiaccess: tool.apiAccess,
      pros: tool.pros,
      cons: tool.cons,
      usecases: tool.useCases,
    }));

    try {
      const { error } = await supabase
        .from("ai_tools")
        .insert(formattedTools);

      if (error) {
        setUploadResult({ success: false, message: error.message });
      } else {
        setUploadResult({ success: true, message: `${formattedTools.length} tools uploaded!` });
        setBulkToolsString("");
      }
    } catch (err) {
      setUploadResult({ success: false, message: "Unknown error" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8">
      <Helmet>
        <title>Admin Tool Upload | AIDirectory</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-8">Admin: Upload Tool(s)</h1>
      {!loggedIn ? (
        <form className="w-full max-w-sm p-6 bg-white rounded-lg shadow space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-semibold mb-1">Username</label>
            <input 
              type="text"
              className="w-full border rounded px-3 py-2"
              value={loginState.username}
              onChange={e => setLoginState(s => ({ ...s, username: e.target.value }))}
              autoFocus
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={loginState.password}
              onChange={e => setLoginState(s => ({ ...s, password: e.target.value }))}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90"
            disabled={loginLoading}
          >
            {loginLoading ? "Verifying..." : "Login"}
          </button>
        </form>
      ) : (
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
          <div className="flex space-x-4 mb-6">
            <button
              className={`px-4 py-2 rounded ${tab === "single" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setTab("single")}
            >
              Upload Single Tool
            </button>
            <button
              className={`px-4 py-2 rounded ${tab === "bulk" ? "bg-primary text-white" : "bg-gray-200 text-gray-800"}`}
              onClick={() => setTab("bulk")}
            >
              Bulk Upload (JSON)
            </button>
          </div>

          {tab === "single" && (
            <form onSubmit={handleSingleUpload} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.name} onChange={e => setSingleTool(s => ({ ...s, name: e.target.value }))} required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Logo URL</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.logo} onChange={e => setSingleTool(s => ({ ...s, logo: e.target.value }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea className="w-full border rounded px-3 py-2" rows={2} value={singleTool.description} onChange={e => setSingleTool(s => ({ ...s, description: e.target.value }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.shortDescription} onChange={e => setSingleTool(s => ({ ...s, shortDescription: e.target.value }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category (comma separated)</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.category.join(",")} onChange={e => setSingleTool(s => ({ ...s, category: e.target.value.split(",").map(str => str.trim()).filter(Boolean) }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Pricing</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.pricing} onChange={e => setSingleTool(s => ({ ...s, pricing: e.target.value }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">URL</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.url} onChange={e => setSingleTool(s => ({ ...s, url: e.target.value }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Features (comma separated)</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.features.join(",")} onChange={e => setSingleTool(s => ({ ...s, features: e.target.value.split(",").map(str => str.trim()).filter(Boolean) }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">API Access</label>
                <select className="w-full border rounded px-3 py-2" value={singleTool.apiAccess ? 'true' : 'false'} onChange={e => setSingleTool(s => ({ ...s, apiAccess: e.target.value === "true" }))}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Pros (comma separated)</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.pros?.join(",") ?? ""} onChange={e => setSingleTool(s => ({ ...s, pros: e.target.value.split(",").map(str => str.trim()).filter(Boolean) }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Cons (comma separated)</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.cons?.join(",") ?? ""} onChange={e => setSingleTool(s => ({ ...s, cons: e.target.value.split(",").map(str => str.trim()).filter(Boolean) }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Use Cases (comma separated)</label>
                <input className="w-full border rounded px-3 py-2" value={singleTool.useCases?.join(",") ?? ""} onChange={e => setSingleTool(s => ({ ...s, useCases: e.target.value.split(",").map(str => str.trim()).filter(Boolean) }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Rating</label>
                <input type="number" min={0} max={5} step={0.1} className="w-full border rounded px-3 py-2" value={singleTool.rating} onChange={e => setSingleTool(s => ({ ...s, rating: parseFloat(e.target.value) || 0 }))} />
              </div>
              <div>
                <label className="block font-semibold mb-1">Review Count</label>
                <input type="number" min={0} className="w-full border rounded px-3 py-2" value={singleTool.reviewCount} onChange={e => setSingleTool(s => ({ ...s, reviewCount: parseInt(e.target.value, 10) || 0 }))} />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload Tool"}
              </button>
            </form>
          )}

          {tab === "bulk" && (
            <form onSubmit={handleBulkUpload} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">
                  Paste JSON array (array of tool objects):
                </label>
                <textarea
                  className="w-full h-40 border rounded px-3 py-2 font-mono resize-y"
                  value={bulkToolsString}
                  onChange={e => setBulkToolsString(e.target.value)}
                  placeholder='[{"name":"Tool1",...}, {...}]'
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded hover:bg-primary/90"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Bulk Upload"}
              </button>
            </form>
          )}

          {uploadResult && (
            <div className={`mt-6 p-4 rounded ${uploadResult.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {uploadResult.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
