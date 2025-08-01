import React from "react";
import "./Hostel.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpeg";
// Hostel Component that takes in hostel details as props

const Hostel = ({ hostel, onDelete }) => {
	const navigate = useNavigate();

	function handleUpdate() {
		navigate("/edit-hostel", { state: { hostel } });
	}

	return (
		<div className="col-md-3 mb-4">
			<div
				className="card"
				style={{
					width: "20rem",
					height: "40rem",
					border: "10px solid white", // Thicker white border
					outline: "2px solid #6E6E56",
				}}
			>
				{/* Image */}
				<img
					src={hostel.imageUrl || logo}
					alt="Hostel Img"
					className="img-fluid mb-3"
					style={{ height: "180px", objectFit: "cover" }}
				/>
				<div className="card-body">
					{/* Hostel Name and Contact */}
					<h5 className="card-title">{hostel.hostelName}</h5>
					<p className="card-text">
						<strong>Location:</strong> {hostel.address} <br />
						<strong>Type:</strong> {hostel.type} <br />
						<strong>Rent:</strong> {hostel.rent} <br />
						<strong>Contact:</strong> {hostel.contact}
					</p>
				</div>

				{/* Buttons (Update, Delete) */}
				<div className="card-footer text-center">
					<button
						className="btn btn-secondary"
						onClick={handleUpdate}
						style={{ backgroundColor: "#A88F6F", color: "white" }} // Custom color
					>
						Update
					</button>
					<button
						className="btn btn-secondary "
						onClick={() => onDelete(hostel.id)}
					>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default Hostel;
