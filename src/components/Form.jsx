import {Component, h} from "preact";
import styled, {css} from "styled-components";
import {teams} from "./../js/teams";

// Styled components
const Textarea = styled.textarea`
	border: 3px solid #0f4583;
	box-sizing: border-box;
	color: #2e2e2e;
	font-family: "Open Sans", "Arial";
	font-size: calc(1.2em + 0.25 * ((25vw - 26em) / 49.25));
	max-width: 768px;
	min-height: 15rem;
	padding: 0.5rem 0.75rem;
	width: 100%;
`;

const Counter = styled.span`
	display: block;
	font-size: 90%;
	margin: 1rem 0;
`;

export const Button = styled.button`
	background: #0f4583;
	border: 0;
	color: #fff;
	cursor: pointer;
	font-family: "Open Sans Bold", "Arial Bold", "Arial";
	font-size: calc(0.9em + 0.25 * ((75vw - 32em) / 49.25));
	margin-right: 1rem;
	padding: 0.75rem 1rem;

	&:hover,
	&:focus {
		background: #577da8;
	}

	&:disabled {
		background: #0f4583;
		opacity: 0.2;
	}

	/* stylelint-disable */
	${(props) =>
		props.modal &&
		css`
			margin-top: 0.5rem;
		`};
	/* stylelint-enable */
`;

const Error = styled.span`
	color: #f00;
	display: inline-block;
	margin: 0.5rem 0;
`;

const ModalWrapper = styled.div`
	align-items: center;
	background: rgba(255, 255, 255, 0.9);
	display: flex;
	height: 100%;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 10;
`;

const Modal = styled.div`
	background: #fff;
	border: 3px solid #0f4583;
	margin: 1rem;
	padding: 2rem;

	& p:first-child {
		margin-top: 0;
	}
`;

export class Form extends Component {
	componentWillMount() {
		// Set initial state
		this.setState({
			peopleCount: 0,
			error: null,
			modal: false,
			formData: localStorage.getItem("data") !== null ? localStorage.getItem("data").replace(/,/g, "\n") : ""
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
			peopleCount: this.getPeopleList(formData).length,
			formData: formData
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
			{peopleCount, error, modal, formData} = this.state;

		return (
			<section>
				<h2>So, who's in?</h2>
				<label for="text">
					<p>
						Add the names here or{" "}
						<a href="#" onClick={() => setData(teams, dummyData, true)}>
							skip this step to see an example draw
						</a>.
					</p>
				</label>
				<form onSubmit={(e) => this.handleSubmit(e, setData)}>
					<Textarea
						id="text"
						placeholder="Add the names of everyone who is participating in the sweepstake here (one per line)"
						onInput={(e) => this.displayPeopleCount(e.target.value)}
					>
						{formData}
					</Textarea>
					<Counter>Sweepstake participants: {peopleCount}</Counter>
					<Button type="submit">Let's go</Button>
					{error !== null && <Error>{error}</Error>}
				</form>

				{modal &&
					error === null && (
					<ModalWrapper>
						<Modal>
							<p>There are more teams than there are people in your sweepstake!</p>
							<p>That's fine &ndash; we can just remove the lowest ranked {32 - peopleCount} teams if you'd like?</p>
							<p>How would you like to proceed?</p>
							<Button modal onClick={(e) => this.modalContinue(e, setData)} type="Button">
									Please remove {32 - peopleCount} teams
							</Button>
							<Button modal onClick={(e) => this.modalClose(e)} type="Button">
									I'll add some more people
							</Button>
						</Modal>
					</ModalWrapper>
				)}
			</section>
		);
	}
}
