import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import HomePage from '../components/HomePage';
import CreaturePage from '../components/CreaturePage';

export const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/creature/:id",
				element: <CreaturePage />
			},
			{
				path: "*",
				element: <h1 style={{ textAlign: "center", fontSize: "6rem" }}>Page Not Found :/</h1>,
			},
		],
	},
]);