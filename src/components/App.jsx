import {Component, h} from "preact";
import {AssignTeam} from "./AssignTeam";
import {dummyData} from "../js/dummy-data";
import {EmailButton} from "./EmailButton";
import {Form} from "./Form";
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
		this.setData = this.setData.bind(this);
	}

	componentWillMount() {
		// Set initial state
		this.setState({
			dataInput: true,
			start: false,
			counter: 0,
			teams: teams,
			assigned: []
		});
	}

	start() {
		// Start assigning teams
		this.setState({
			start: true
		});
	}

	setData(teams, people) {
		// Set people and team data to use
		this.setState({
			dataInput: false,
			teams: shuffle(teams),
			people: shuffle(people)
		});

		// Store data in localStorage
		localStorage.setItem("data", people);
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
		const {people, counter, assigned, teams, dataInput, start} = this.state;
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
				{dataInput && <Form teams={teams} setData={this.setData} dummyData={dummyData} />}
				{!dataInput && (
					<section>
						{!start && <button onClick={this.start}>Start draw</button>}
						<EmailButton people={assigned} teams={teams} />
						{output}
					</section>
				)}
			</main>
		);
	}
}
