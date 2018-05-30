import {Component, h} from "preact";
import styled, {css, injectGlobal} from "styled-components";
import {AssignTeam} from "./AssignTeam";
import {dummyData} from "../js/dummy-data";
import {EmailButton} from "./EmailButton";
import {Form} from "./Form";
import OpenSansWoff from "./../fonts/open-sans-v15-latin-regular.woff";
import OpenSansWoff2 from "./../fonts/open-sans-v15-latin-regular.woff2";
import OpenSansWoff2Bold from "./../fonts/open-sans-v15-latin-700.woff2";
import OpenSansWoffBold from "./../fonts/open-sans-v15-latin-700.woff";
import {TeamName} from "./TeamName";
import {teams} from "./../js/teams";
const trophyImg = require("./../images/trophy.svg");
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.10#shuffle

// Styled components
injectGlobal`
	body {
		margin: 0 auto;
	}

	h1,
	h2,
	a {
		font-family: "Open Sans Bold";
		font-weight: normal;
	}

	h1 {
		line-height: 1.1;
		text-shadow: 1px 1px 1px #000;
	}

	a {
		color: #0f4583;
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}
`;

const Main = styled.main`
	color: #2e2e2e;
	font-family: "Open Sans";

	@font-face {
		font-family: "Open Sans";
		font-style: normal;
		font-weight: 400;
		src: url(${OpenSansWoff}) format("woff2"), url(${OpenSansWoff2}) format("woff");
	}

	@font-face {
		font-family: "Open Sans Bold";
		font-style: normal;
		font-weight: 400;
		src: url(${OpenSansWoffBold}) format("woff2"), url(${OpenSansWoff2Bold}) format("woff");
	}
`;

const Header = styled.header`
	background: linear-gradient(#0d6cb5, #102b66);
	color: #fff;
	position: relative;
	z-index: 1;

	&::after {
		background: url(${trophyImg}) no-repeat 0 21%;
		background-size: 16rem;
		content: "";
		height: 100%;
		opacity: 0.4;
		position: absolute;
		right: 0;
		top: 0;
		width: 15rem;
		z-index: -1;
	}
`;

const Image = styled.img`
	height: auto;
	margin: 0.75rem 1.5rem 0.75rem 0;
	width: 40px;
`;

const PageWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 1280px;
	padding: 0 1rem;

	/* stylelint-disable */
	${(props) =>
		props.header &&
		css`
			align-items: center;
			flex-direction: row;
		`};
	/* stylelint-enable */
`;

const TeamWrapper = styled.div`
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

	setData(teams, people, dummyData = false) {
		// Set people and team data to use
		this.setState({
			dataInput: false,
			teams: shuffle(teams),
			people: shuffle(people)
		});

		if (!dummyData) {
			// Store data in localStorage (except if it's dummy data)
			localStorage.setItem("data", people);
		}
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
				<TeamWrapper>
					<TeamName id={i} teams={teams} />
					{this.state.start && <AssignTeam data={people} id={i} counter={counter} nextTeam={this.nextTeam} assigned={assigned} active={active} />}
				</TeamWrapper>
			);
		}

		return (
			<Main>
				<Header>
					<PageWrapper header>
						<Image src={trophyImg} alt="" />
						<h1>World Cup 2018 sweepstake tool</h1>
					</PageWrapper>
				</Header>
				{dataInput && (
					<section>
						<PageWrapper>
							<p>Picking teams out of a hat is so 20th century. Use this online tool to help you run your office World Cup 2018 sweepstake!</p>
							<h2>How it works</h2>
							<ul>
								<li>Sign-up everyone who wants to take part (up to 32 people)</li>
								<li>Get the money off everyone before anything else!</li>
								<li>Enter all your sweepstake participants in the form below</li>
								<li>Some people want two teams? Add their names twice into the form</li>
								<li>Gather everyone round and start the draw!</li>
							</ul>
							<Form teams={teams} setData={this.setData} dummyData={dummyData} />
						</PageWrapper>
					</section>
				)}
				{!dataInput && (
					<section>
						{!start && <button onClick={this.start}>Start draw</button>}
						<EmailButton people={assigned} teams={teams} />
						{output}
					</section>
				)}
			</Main>
		);
	}
}
