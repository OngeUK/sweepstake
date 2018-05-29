import {Component, h} from "preact";
import {teams} from "./../js/teams";
//import styled from "styled-components";

// Styled components
// const Flag = styled.img.attrs({
// 	src: (props) => props.country
// })`
// 	height: 48px;
// 	width: 64px;
// `;

// const Wrapper = styled.div`
// 	align-items: center;
// 	display: flex;
// `;

// const Name = styled.div`
// 	margin: 0 1em;
// `;

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
				<h2>Who's in?</h2>
				<label for="text">
					<p>
						Add names here or{" "}
						<a href="#" onClick={() => setData(teams, dummyData, true)}>
							skip this step to see an example draw
						</a>.
					</p>
				</label>
				<form onSubmit={(e) => this.handleSubmit(e, setData)}>
					<textarea
						id="text"
						placeholder="Add the names of everyone who is participating in the sweepstake here (one per line)"
						onInput={(e) => this.displayPeopleCount(e.target.value)}
					>
						{previousData}
					</textarea>
					<span>Sweepstake particiants: {peopleCount}</span>
					<button type="submit">Submit</button>
					{error !== null && <span>{error}</span>}
				</form>

				{modal && (
					<div>
						<p>There are more teams than there are people in your sweepstake!</p>
						<p>That's fine - we can just remove the lowest ranked {32 - peopleCount} teams if you'd like?</p>
						<p>How would you like to proceed?</p>
						<button onClick={(e) => this.modalContinue(e, setData)} type="button">
							Please remove {32 - peopleCount} teams
						</button>
						<button onClick={(e) => this.modalClose(e)} type="button">
							I'll just add some more people
						</button>
					</div>
				)}
			</section>
		);
	}
}
