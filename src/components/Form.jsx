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
			error: null,
			modal: false
		});
	}

	handleSubmit(e, setData) {
		e.preventDefault();

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

			// We don't have enough people for every team
			if (peopleCount < 32) {
				this.setState({
					modal: true
				});
			} else {
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
		this.setState({
			peopleCount: this.getPeopleList(formData).length
		});
	}

	modalContinue(e, setData) {
		e.preventDefault();

		const peopleList = this.getPeopleList(document.getElementById("text").value);

		this.setState({
			modal: false
		});

		setData(teams.slice(0, peopleList.length), peopleList);
	}

	modalClose(e) {
		e.preventDefault();

		this.setState({
			modal: false
		});
	}

	render() {
		const {teams, setData, dummyData} = this.props,
			{peopleCount, error, modal} = this.state;

		return (
			<section>
				<form onSubmit={(e) => this.handleSubmit(e, setData)}>
					<textarea id="text" onInput={(e) => this.displayPeopleCount(e.target.value)} />
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
				<button onClick={() => setData(teams, dummyData)}>Skip this step and show me an example draw</button>
			</section>
		);
	}
}
