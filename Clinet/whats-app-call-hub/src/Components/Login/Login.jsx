//React with hooks
import React from "react";

//Material UI imports
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

//Local Components
import { useMergeState } from "./useMergeState";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

//Taking initial State which handles all the fields
const initialData = {
	email: "",
	password: "",
};

export const Login = () => {
	//custom hook -------useMergeState

	const { data, handleChange, handleSubmit } = useMergeState(initialData);
	//destructing the values from data
	const { password, email } = data;
	const classes = useStyles();

	return (
		<div>
			<div id="sign-in-button"></div>

			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Login
					</Typography>

					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Enter Email"
						name="email"
						autoComplete="email"
						autoFocus
						value={email}
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						type="password"
						id="password"
						label="Enter Password"
						name="password"
						autoComplete="password"
						autoFocus
						value={password}
						onChange={handleChange}
					/>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Login
					</Button>
				</div>
			</Container>
		</div>
	);
};
