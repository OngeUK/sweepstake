import {Component, h} from "preact";
import {AssignTeam} from "./AssignTeam";
import {dummyData} from "../js/dummy-data";

export class App extends Component {
	constructor() {
		super();
		this.nextTeam = this.nextTeam.bind(this);
	}

	componentWillMount() {
		this.setState({
			counter: 1,
			people: dummyData,
			assigned: []
		});
	}

	nextTeam(currentItem, nextIndex) {
		const {people, assigned} = this.state;

		assigned.push(`${currentItem} - ${people.splice(currentItem, 1)}`);

		this.setState({
			counter: nextIndex,
			people: people,
			assigned: assigned
		});
	}

	render() {
		const {people, counter, assigned} = this.state;
		let output = [];

		for (let i = 0; i < people.length; i++) {
			const active = i === this.state.counter;

			output.push(<AssignTeam data={people} id={i} counter={counter} nextTeam={this.nextTeam} assigned={assigned} active={active} />);
		}

		return <div>{output}</div>;
	}
}
