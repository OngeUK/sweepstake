import {Component, h} from "preact";
import {AssignTeam} from "./AssignTeam";
import {dummyData} from "../js/dummy-data";
import {TeamName} from "./TeamName";
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.10#shuffle

export class App extends Component {
	constructor() {
		super();
		this.nextTeam = this.nextTeam.bind(this);
	}

	componentWillMount() {
		this.setState({
			counter: 0,
			people: shuffle(dummyData),
			assigned: []
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
		const {people, counter, assigned} = this.state;
		let output = [];

		for (let i = 0; i < 32; i++) {
			const active = i === this.state.counter;

			output.push(
				<div>
					<TeamName id={i} /> <AssignTeam data={people} id={i} counter={counter} nextTeam={this.nextTeam} assigned={assigned} active={active} />
				</div>
			);
		}

		return <div>{output}</div>;
	}
}
