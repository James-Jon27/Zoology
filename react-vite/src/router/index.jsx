import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../components/HomePage";
import CreaturePage from "../components/CreaturePage";
import UploadLore from "../components/UploadLore/UploadLore";
import UpdateLore from "../components/UploadLore/UpdateLore";
import UploadCreature from "../components/UploadCreature";
import UpdateCreature from "../components/UploadCreature/UpdateCreature";
import UserPage from "../components/UserPage";

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
				path: "user/:id",
				element: <UserPage/>
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
				element: <UpdateCreature />,
			},
			{
				path: "creature/new",
				element: <UploadCreature />
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
