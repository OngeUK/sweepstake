import {Component, h} from "preact";
import styled from "styled-components";

const Title = styled.h1`
	font-family: sans-serif;
	text-align: center;
`;

export class AssignTeam extends Component {
	componentWillMount() {
		this.state = {
			currentCount: 0,
			data: this.props.data
		};
	}

	componentDidMount() {
		this.startTimer();
	}

	componentWillReceiveProps() {
		setTimeout(() => {
			this.startTimer();
		}, 500);
	}

	startTimer() {
		const {counter, nextTeam, active} = this.props;

		if (active) {
			this.intervalId = setInterval(this.cycleNames.bind(this), 75);

			setTimeout(() => {
				clearInterval(this.intervalId);
				nextTeam(this.state.currentCount, counter + 1);
			}, 2000); // Randomise this number
		}
	}

	cycleNames() {
		this.setState({
			currentCount: this.state.currentCount + 1
		});

		if (this.state.currentCount === this.state.data.length) {
			this.setState({currentCount: 0});
		}
	}

	render() {
		const {id} = this.props;

		return (
			<div>
				<Title>
					{id} {this.state.data[this.state.currentCount]}
				</Title>
			</div>
		);
	}
}
