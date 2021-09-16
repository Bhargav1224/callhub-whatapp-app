// eslint-disable-next-line
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

export const useMergeState = (init) => {
	const [data, setData] = useState(init);

	const history = useHistory();
	//Dispatching the action
	const dispatch = useDispatch();
	const { username } = data;

	//handle change
	const handleChange = (e) => {
		let { name, value } = e.target;
		setData({ ...data, [name]: value });
	};
	//getting register username from localStorage

	const handleSubmit = (e) => {
		e.preventDefault();
		//dispatching action
	
			history.push("/");
		
	};

	return { data, handleChange, handleSubmit };
};
