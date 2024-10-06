import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import CreaturePage from "../components/CreaturePage";
import UploadLore from "../components/UploadLore/UploadLore";
import UpdateLore from "../components/UploadLore/UpdateLore";

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: ":category",
				element: <HomePage />,
			},
			{
				path: "creature/:id",
				element: <CreaturePage />,
			},
			{
				path: "creature/:id/lore",
				element: <UploadLore />,
			},
			{
				path: "creature/:id/edit",
				element: <h1>Update Creature</h1>,
			},

			{
				path: "lore/:id",
				element: <UpdateLore />,
			},
			{
				path: "*",
				element: <h1 style={{ textAlign: "center", fontSize: "6rem" }}>Page Not Found :/</h1>,
			},
		],
	},
]);
