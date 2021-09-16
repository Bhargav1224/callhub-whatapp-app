import React from "react";
import { useEffect, useState } from "react";
import {Sidebar} from "../Sidebar/Sidebar";
import {Chat} from "../Chat/Chat";
import Pusher from "pusher-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { loadData } from "../../utils/localstorage";
import "../../App.css";

export const Home = () => {
	// const { username } = useSelector((state) => state.auth);

	const login = true;
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		axios.get("http://localhost:8000/messages/sync").then((response) => {
			setMessages(response.data);
		});
	}, []);

	useEffect(() => {
		const pusher = new Pusher("1cce8781a854a5f7c39e", {
			cluster: "ap2",
		});

		const channel = pusher.subscribe("messages");
		channel.bind("inserted", (newMessage) => {
			setMessages([...messages, newMessage]);
		});

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [messages]);

	console.log(messages);
	return login ? (
		<div className="app">
			<div className="app__body">
				<Sidebar />
				<Chat messages={messages} />
			</div>
		</div>
	) : (
		<Redirect to="/login" />
	);
};
