import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import "./AddEditHostel.css"; // Assuming this is the CSS file
import { HostelService } from "../../service/HostelServices";

const AddEditHostel = () => {
	const [formData, setFormData] = useState({
		id: "",
		hostelName: "",
		address: "",
		type: "",
		contact: "",
		rent: "",
		imageUrl: "",
	});

	const location = useLocation();
	const navigate = useNavigate();

	// Extract hostel data from location state for editing
	const hostel = location.state?.hostel || {};

	// Pre-fill the form if hostel data is passed via location state
	useEffect(() => {
		if (hostel) {
			setFormData({
				id: hostel.id || "",
				hostelName: hostel.hostelName || "",
				address: hostel.address || "",
				type: hostel.type || "",
				contact: hostel.contact || "",
				rent: hostel.rent || "",
				imageUrl: hostel.imageUrl || "",
			});
		}
	}, []);

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Use mutation for adding and editing
	const { mutate: addHostelMutation } = useMutation(
		async (hostel) => {
			const { id, ...hostelDataWithoutId } = hostel;
			return await HostelService.addHostel(hostelDataWithoutId);
		},
		{
			onSuccess: () => {
				alert("Hostel added successfully!");
				navigate("/"); // Redirect to hostel list after adding
			},
			onError: (error) => {
				console.error("Error adding hostel:", error);
				alert("Failed to add hostel. Please try again.");
			},
		}
	);

	const { mutate: updateHostelMutation } = useMutation(
		async (hostel) => await HostelService.updateHostel(hostel),
		{
			onSuccess: () => {
				alert("Hostel updated successfully!");
				navigate("/"); // Redirect to hostel list after editing
			},
			onError: (error) => {
				console.error("Error updating hostel:", error);
				alert("Failed to update hostel. Please try again.");
			},
		}
	);

	// Handle submit
	const handleSubmit = () => {
		if (formData.id) {
			// If id exists, update the hostel
			updateHostelMutation(formData);
		} else {
			// Otherwise, add the new hostel
			addHostelMutation(formData);
		}
	};

	return (
		<div className="form-container">
			<h2>{hostel.id ? "Edit Hostel" : "Add Hostel"}</h2>
			<form>
				<label>
					Hostel Name:
					<input
						type="text"
						name="hostelName"
						value={formData.hostelName}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				<label>
					Address:
					<input
						type="text"
						name="address"
						value={formData.address}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				<label>
					Contact:
					<input
						type="text"
						name="contact"
						value={formData.contact}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				<label>
					Type:
					<input
						type="text"
						name="type"
						value={formData.type}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				<label>
					Rent:
					<input
						type="text"
						name="rent"
						value={formData.rent}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				<label>
					Image:
					<input
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleInputChange}
						style={{ color: "#6E6E56", backgroundColor: "#f0f0f0" }}
					/>
				</label>
				{formData.imageUrl && (
					<div className="image-preview">
						<img
							src={formData.imageUrl}
							alt="Hostel Preview"
							style={{ maxWidth: "300px", maxHeight: "300px" }}
						/>
					</div>
				)}
				<button type="button " onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddEditHostel;
