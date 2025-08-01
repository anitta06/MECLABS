import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/hostels"; // Replace with your API base URL

export class HostelService {
	static async getAllHostels() {
		try {
			const response = await axios.get(`${API_BASE_URL}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching hostels:", error);
			throw error;
		}
	}

	static async deleteHostel(id) {
		try {
			const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
			return response.data;
		} catch (error) {
			console.error("Error deleting hostels:", error);
			throw error;
		}
	}

	static async updateHostel(formData) {
		try {
			const response = await axios.put(`${API_BASE_URL}/update`, formData);
			return response.data;
		} catch (error) {
			console.error("Error updating hostels:", error);
			throw error;
		}
	}

	static async addHostel(formData) {
		try {
			const response = await axios.post(`${API_BASE_URL}/create`, formData);
			return response.data;
		} catch (error) {
			console.error("Error creating hostels:", error);
			throw error;
		}
	}
}
