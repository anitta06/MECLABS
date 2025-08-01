import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hostels from "./components/hostels-list/Hostels";
import FooterComponent from "./components/FooterComponent";
import { QueryClient, QueryClientProvider } from "react-query";
import AddEditHostel from "./components/hostels-list/AddEditHostel";

const queryClient = new QueryClient();
function App() {
	return (
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path="/" element={<Hostels />} />
					<Route path="/edit-hostel" element={<AddEditHostel />} />
					<Route path="/add-hostel" element={<AddEditHostel />} />
				</Routes>
				<FooterComponent />
			</QueryClientProvider>
		</BrowserRouter>
	);
}

export default App;
