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

 useEffect(() => {

  setLoading(true);

  api.get(
    `/all?page=${page}&size=5&sort=${sortField},${sortDir}`
  )

    .then((res) => {

      console.log("API Response:", res.data);

      setData(res.data.content);

      setTotalPages(res.data.totalPages);

    })

    .catch((err) => {

  console.error("API Error:", err);

  // Mock data for frontend testing
  setData([
    {
      id: 1,
      name: "Spoorthi",
      status: "Approved",
    },
    {
      id: 2,
      name: "Rahul",
      status: "Pending",
    },
    {
      id: 3,
      name: "Ananya",
      status: "Rejected",
    },
  ]);

  setTotalPages(3);

})

    .finally(() => {

      setLoading(false);

    });

}, [page, sortField, sortDir]);

      

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
const handleSort = (field) => {

  // If same field clicked → toggle direction
  if (field === sortField) {

    setSortDir(sortDir === "asc" ? "desc" : "asc");

  } else {

    // New field → default ascending
    setSortField(field);
    setSortDir("asc");

  }

};
  // Render table when data is available
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Records</h1>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            <th
  className="p-2 cursor-pointer"
  onClick={() => handleSort("id")}
>
  ID
</th>

<th
  className="p-2 cursor-pointer"
  onClick={() => handleSort("name")}
>
  Name
</th>

<th
  className="p-2 cursor-pointer"
  onClick={() => handleSort("status")}
>
  Status
</th>
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

{/* Pagination Controls */}
<div className="flex justify-center gap-4 mt-4">

  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 0}
    className="px-3 py-1 bg-gray-300 rounded"
  >
    Prev
  </button>

  <span>
    Page {page + 1} of {totalPages}
  </span>

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages - 1}
    className="px-3 py-1 bg-gray-300 rounded"
  >
    Next
  </button>

</div>


    </div>
  );
}