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
			counter: 1
		});
	}

	nextTeam(nextItem) {
		this.setState({
			counter: nextItem
		});
	}

	render() {
		let output = [];

		for (let i = 1; i <= 32; i++) {
			const active = i === this.state.counter;

			output.push(<AssignTeam data={dummyData} id={i} counter={this.state.counter} nextTeam={this.nextTeam} active={active} />);
		}

		return <div>{output}</div>;
	}
}
