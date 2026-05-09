import { useEffect, useState } from "react";
import api from "../services/api";

export default function ListPage() {

  // Stores the data returned from the API
  const [data, setData] = useState([]);

  // Tracks whether the API call is still in progress
  const [loading, setLoading] = useState(true);

  // Stores any error message from the API call
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
const [totalPages, setTotalPages] = useState(0);
const [sortField, setSortField] = useState("id");
const [sortDir, setSortDir] = useState("asc");

  // Runs once when the component is mounted
  useEffect(() => {

    // Call the backend API to fetch all records
    api.get("/all")

      .then((res) => {
        // Logs response for debugging purposes
        console.log("API Response:", res.data);

        // Handles both paginated and non-paginated responses
        setData(res.data.content || res.data);
      })

      .catch((err) => {
        // Logs error in console for debugging
        console.error("API Error:", err);

        // Sets error message to display in UI
        setError("Failed to fetch data");
      })

      .finally(() => {
        // Stops loading once API call is complete
        setLoading(false);
      });

  }, []);

  // If an error occurs, display error message
  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  // Display loading skeleton while fetching data
  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-2">
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  // If API returns no data, show empty state
  if (data.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No records found</p>
      </div>
    );
  }

  // Render table when data is available
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Records</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {/* Iterate through data and render each row */}
          {data.map((item) => (
            <tr key={item.id} className="text-center border-t">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}