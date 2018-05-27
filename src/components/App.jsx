import {Component, h} from "preact";
import {AssignTeam} from "./AssignTeam";
import {dummyData} from "../js/dummy-data";
import styled from "styled-components";
import {TeamName} from "./TeamName";
import {teams} from "./../js/teams";
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.10#shuffle

// Styled components
const Wrapper = styled.div`
	align-items: center;
	display: flex;
	font-family: sans-serif;
`;

export class App extends Component {
	constructor() {
		super();
		this.nextTeam = this.nextTeam.bind(this);
		this.start = this.start.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.useDummyData = this.useDummyData.bind(this);
	}

	componentWillMount() {
		this.setState({
			start: false,
			counter: 0,
			teams: teams, // Delete this
			assigned: []
		});
	}

	start() {
		this.setState({
			start: true
		});
	}

	handleSubmit(e) {
		// TO DO - error if over 32 lines entered
		// Offer 2x or 3x teams per person if people.length % 2 is whole number
		e.preventDefault();

		// Get user submitted people list, remove any empty lines
		const people = e.target[0].value
			.trim()
			.split("\n")
			.filter((item) => item !== "");

		// Have enough teams for the number of players
		this.setState({
			teams: shuffle(teams.slice(0, people.length)),
			people: shuffle(people)
		});
	}

	useDummyData() {
		this.setState({
			teams: shuffle(teams),
			people: shuffle(dummyData)
		});
	}

	nextTeam(currentItem, nextIndex) {
		const {assigned, people} = this.state;

		// Remove selected person and add them to the assigned array
		assigned.push(`${people.splice(currentItem, 1)}`);

		this.setState({
			counter: nextIndex,
			people: people,
			assigned: assigned
		});
	}

	render() {
		const {people, counter, assigned, teams} = this.state;
		let output = [];

		for (let i = 0; i < teams.length; i++) {
			const active = i === this.state.counter;

			output.push(
				<Wrapper>
					<TeamName id={i} teams={teams} />
					{this.state.start && <AssignTeam data={people} id={i} counter={counter} nextTeam={this.nextTeam} assigned={assigned} active={active} />}
				</Wrapper>
			);
		}

		return (
			<main>
				<form onSubmit={this.handleSubmit}>
					<textarea />
					<button type="submit">Submit</button>
				</form>
				<button onClick={this.useDummyData}>Skip this step and show me an example draw</button>
				<section>
					<button onClick={this.start}>Start</button>
					{output}
				</section>
			</main>
		);
	}
}
