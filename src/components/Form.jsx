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
		this.setState({
			peopleCount: 0,
			error: null
		});
	}

	handleSubmit(e, setData) {
		e.preventDefault();

		// TO DO - inform user of teams that will be excluded if less than 32 people are provided

		const {peopleCount} = this.state,
			peopleList = this.getPeopleList(e.target[0].value);

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
			setData(teams.slice(0, peopleList.length), peopleList);
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
		this.setState({
			peopleCount: this.getPeopleList(formData).length
		});
	}

	render() {
		const {teams, setData, dummyData} = this.props,
			{peopleCount, error} = this.state;

		return (
			<section>
				<form onSubmit={(e) => this.handleSubmit(e, setData)}>
					<textarea onInput={(e) => this.displayPeopleCount(e.target.value)} />
					<span>Sweepstake particiants: {peopleCount}</span>
					<button type="submit">Submit</button>
					{error !== null && <span>{error}</span>}
				</form>
				<button onClick={() => setData(teams, dummyData)}>Skip this step and show me an example draw</button>
			</section>
		);
	}
}
