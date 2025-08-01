import React, { useState, useEffect } from "react";
import Hostel from "../hostel/Hostel";
import { useQuery } from "react-query";
import { HostelService } from "../../service/HostelServices";
import { useNavigate } from "react-router-dom";
import "./Hostels.css";

// Function to fetch hostels via HostelService
const fetchHostels = async () => {
	try {
		const response = await HostelService.getAllHostels();
		return response; // Returning data to be cached by useQuery
	} catch (error) {
		throw new Error("Error fetching hostels: " + error.message);
	}
};

const Hostels = () => {
	const [searchTerm, setSearchTerm] = useState(""); // For search
	const [selectedType, setSelectedType] = useState(""); // For filtering by type
	const [filteredHostels, setFilteredHostels] = useState([]); // Filtered hostels state
	const navigate = useNavigate();
	// Use useQuery to fetch hostels data
	const {
		data: hostels = [],
		isLoading,
		error,
	} = useQuery("hostels", fetchHostels);

	// Update filteredHostels when searchTerm, selectedType or hostels data changes
	useEffect(() => {
		// Check if there is no filter (both searchTerm and selectedType are empty)
		if (!searchTerm && !selectedType) {
			// If no filter is applied, show all hostels
			setFilteredHostels(hostels);
			return;
		}

		// Apply filters if searchTerm or selectedType is provided
		const filtered = hostels.filter((hostel) => {
			const matchesSearch = hostel?.hostelName
				?.toLowerCase()
				?.includes(searchTerm.toLowerCase());

			const matchesType = selectedType
				? hostel.type.toLowerCase() === selectedType.toLowerCase()
				: true; // If no type is selected, it will match all types

			return matchesSearch && matchesType;
		});

		setFilteredHostels(filtered); // Update filteredHostels
	}, [hostels, searchTerm, selectedType]); // Re-run when hostels, searchTerm, or selectedType change

	// Handle delete action
	const handleDelete = async (id) => {
		try {
			await HostelService.deleteHostel(id);
			// Optimistic update to remove deleted hostel from UI
			setFilteredHostels((prevFilteredHostels) =>
				prevFilteredHostels.filter((hostel) => hostel.id !== id)
			);
		} catch (error) {
			console.error("Failed to delete hostel:", error);
		}
	};
	const handleAddHostel = () => {
		navigate("/add-hostel");
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error fetching hostels: {error.message}</div>;
	}

	return (
		<div
			className="container mt-5 w-auto"
			style={{
				border: "15px solid white", // Thicker white border
				outline: "2px solid #6E6E56",
			}}
		>
			<h1 className={"heading"}>H E I M</h1>
			<button
				className="btn btn-secondary d-flex justify-content-start btn-lg"
				onClick={handleAddHostel}
			>
				Add Hostel
			</button>
			{/* Search and Filter Section */}
			<div className="d-flex justify-content-between mb-4">
				{/* Search Input */}
				<input
					type="text"
					className="form-control fixed-width"
					placeholder="Search by hostel name..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				{/* Filter Dropdown */}
				<select
					className="form-control w-25"
					value={selectedType}
					onChange={(e) => setSelectedType(e.target.value)}
				>
					<option value="">Filter by type</option>
					<option value="boys hostel">Boys Hostel</option>
					<option value="boys pg">Boys PG</option>
					<option value="girls hostel">Girls Hostel</option>
					<option value="girls pg">Girls PG</option>
				</select>
			</div>

			{/* Display filtered hostels */}
			{filteredHostels.length > 0 ? (
				<div className="row" style={{ width: "1250px", minWidth: "1250px" }}>
					{filteredHostels.map((hostel) => (
						<Hostel key={hostel.id} hostel={hostel} onDelete={handleDelete} />
					))}
				</div>
			) : (
				<p>No hostels match your search.</p>
			)}
		</div>
	);
};

export default Hostels;
