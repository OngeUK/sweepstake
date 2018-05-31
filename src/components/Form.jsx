import {Component, h} from "preact";
import styled from "styled-components";
import {teams} from "./../js/teams";

// Styled components
const Textarea = styled.textarea`
	border: 3px solid #0f4583;
	box-sizing: border-box;
	color: #2e2e2e;
	font-family: "Open Sans";
	font-size: calc(1.2em + 0.25 * ((25vw - 26em) / 49.25));
	max-width: 768px;
	min-height: 15rem;
	padding: 0.5rem 0.75rem;
	width: 100%;
`;

const Counter = styled.span`
	display: block;
	font-size: 90%;
	margin: 1rem 0;
`;

const Button = styled.button`
	background: #0f4583;
	border: 0;
	color: #fff;
	cursor: pointer;
	font-family: "Open Sans Bold";
	font-size: calc(0.9em + 0.25 * ((75vw - 32em) / 49.25));
	margin-right: 1rem;
	padding: 0.75rem 1rem;

	&:hover,
	&:focus {
		background: #577da8;
	}
`;

const Error = styled.span`
	color: #f00;
	display: inline-block;
	margin: 0.5rem 0;
`;

export class Form extends Component {
	componentWillMount() {
		// Set initial state
		this.setState({
			peopleCount: 0,
			error: null,
			modal: false
		});
	}

	componentDidMount() {
		// Show counter
		this.setState({
			peopleCount: this.getPeopleList(document.getElementById("text").value).length
		});
	}

	handleSubmit(e, setData) {
		e.preventDefault();

		const {peopleCount} = this.state,
			peopleList = this.getPeopleList(e.target[0].value);

		// Check number of people added is between 8 and 32, show error if not
		if (peopleCount < 8) {
			this.setState({
				error: "Please enter the names of at least 8 people"
			});
		} else if (peopleCount > 32) {
			this.setState({
				error: "Too many people entered! A maximum of 32 is allowed"
			});
		} else {
			this.setState({
				error: null
			});

			// We don't have enough people for every team
			if (peopleCount < 32) {
				this.setState({
					modal: true
				});
			} else {
				// All good - set data for next step
				setData(teams.slice(0, peopleList.length), peopleList);
			}
		}
	}

	getPeopleList(formData) {
		// Get user submitted people list, remove any empty lines
		return formData
			.trim()
			.split("\n")
			.filter((item) => item !== "");
	}

	displayPeopleCount(formData) {
		// Show counter
		this.setState({
			peopleCount: this.getPeopleList(formData).length
		});
	}

	modalContinue(e, setData) {
		// Close modal and set data for next step
		e.preventDefault();

		const peopleList = this.getPeopleList(document.getElementById("text").value);

		this.setState({
			modal: false
		});

		setData(teams.slice(0, peopleList.length), peopleList);
	}

	modalClose(e) {
		// Close modal, but don't move onto the next step
		e.preventDefault();

		this.setState({
			modal: false
		});
	}

	render() {
		const {teams, setData, dummyData} = this.props,
			{peopleCount, error, modal} = this.state,
			previousData = localStorage.getItem("data") !== null ? localStorage.getItem("data").replace(/,/g, "\n") : "";

		return (
			<section>
				<h2>So, who's in?</h2>
				<label for="text">
					<p>
						Add the names here or{" "}
						<a href="#" onClick={() => setData(teams, dummyData, true)}>
							skip this step to see an example draw
						</a>.
					</p>
				</label>
				<form onSubmit={(e) => this.handleSubmit(e, setData)}>
					<Textarea
						id="text"
						placeholder="Add the names of everyone who is participating in the sweepstake here (one per line)"
						onInput={(e) => this.displayPeopleCount(e.target.value)}
					>
						{previousData}
					</Textarea>
					<Counter>Sweepstake particiants: {peopleCount}</Counter>
					<Button type="submit">Let's go</Button>
					{error !== null && <Error>{error}</Error>}
				</form>

				{modal &&
					error === null && (
					<div>
						<p>There are more teams than there are people in your sweepstake!</p>
						<p>That's fine &ndash; we can just remove the lowest ranked {32 - peopleCount} teams if you'd like?</p>
						<p>How would you like to proceed?</p>
						<Button onClick={(e) => this.modalContinue(e, setData)} type="Button">
								Please remove {32 - peopleCount} teams
						</Button>
						<Button onClick={(e) => this.modalClose(e)} type="Button">
								I'll add some more people
						</Button>
					</div>
				)}
			</section>
		);
	}
}
