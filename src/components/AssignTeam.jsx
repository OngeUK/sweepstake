import {Component, h} from "preact";
import styled from "styled-components";
const random = require("lodash/random"); // https://lodash.com/docs/4.17.5#random
const zenscroll = require("zenscroll");

// Styled components
const Name = styled.div`
	align-items: flex-end;
	display: flex;
	flex: 1 0 auto;
	font-family: "Open Sans Bold", "Arial Bold", "Arial";
	font-size: 140%;
`;

export class AssignTeam extends Component {
	componentWillMount() {
		// Set initial state
		this.state = {
			currentCount: 0,
			people: this.props.people
		};
	}

	componentDidMount() {
		this.startTimer();
	}

	componentWillReceiveProps() {
		setTimeout(() => {
			this.startTimer();
		}, 250);
	}

	startTimer() {
		// Start cycling of names
		const {counter, nextTeam, active} = this.props;

		if (active) {
			this.intervalId = setInterval(this.cycleNames.bind(this), 75);

			setTimeout(() => {
				clearInterval(this.intervalId);
				nextTeam(this.state.currentCount, counter + 1);

				// Ensure active team assignment is on-screen
				zenscroll.to(document.getElementById(`t${counter}`), 350);
			}, random(1850, 2150)); // Randomise how long names cycle, in ms
		}
	}

	cycleNames() {
		// Iterate to the next item
		this.setState({
			currentCount: this.state.currentCount + 1
		});

		// Restart cycle when we reach the end
		if (this.state.currentCount === this.state.people.length) {
			this.setState({currentCount: 0});
		}
	}

	render() {
		const {id, assigned, active} = this.props;
		let output = "";

		if (active) {
			// Show names cycling
			output = this.state.people[this.state.currentCount];
		} else if (typeof assigned[id] !== "undefined") {
			// Name already assigned
			output = assigned[id];
		}

		return <Name>{output}</Name>;
	}
}
