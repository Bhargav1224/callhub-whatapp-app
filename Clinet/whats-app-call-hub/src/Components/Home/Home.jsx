import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { loadData } from "../../utils/localstorage";

export const Home = () => {
	// const { username } = useSelector((state) => state.auth);

	const login = true;

	return login ? (
		<div>
			{/* after login username was displayed here */}
			<h1 className="title">Welcome</h1>
			{/* Slider component */}
		</div>
	) : (
		<Redirect to="/login" />
	);
};
