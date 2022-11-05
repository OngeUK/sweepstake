import {Button, Form} from "./Form";
import {Component, h} from "preact";
import styled, {css, injectGlobal} from "styled-components";
import {dummyData} from "./../js/dummy-data";
import {EmailButton} from "./EmailButton";
import OpenSansWoff from "./../fonts/open-sans-v15-latin-regular.woff";
import OpenSansWoff2 from "./../fonts/open-sans-v15-latin-regular.woff2";
import OpenSansWoff2Bold from "./../fonts/open-sans-v15-latin-700.woff2";
import OpenSansWoffBold from "./../fonts/open-sans-v15-latin-700.woff";
import {TeamName} from "./TeamName";
import {teams} from "./../js/teams";
const trophyImg = require("./../images/trophy.svg");
const shuffle = require("lodash/shuffle"); // https://lodash.com/docs/4.17.10#shuffle
const zenscroll = require("zenscroll");

// Styled components
injectGlobal`
	:root {
		--primary-colour: #9a0d35;
		--secondary-colour: #cb0b44;
		--dark-colour: #020f2a;
	}

	html {
		display: flex;
		height: 100%;
		width: 100%;
	}

	body {
		font-family: "Open Sans", "Arial";
		font-size: calc(0.95em + 0.25 * ((75vw - 32em) / 49.25));
		height: 100%;
		margin: 0 auto;
		min-width: 320px;
		overflow-x: hidden; /* IE11 fix */
		width: 100%;
	}

	h1,
	h2,
	a {
		font-family: "Open Sans Bold", "Arial Bold", "Arial";
		font-weight: normal;
	}

	h1 {
		line-height: 1.1;
		text-shadow: 1px 1px 1px #000;
	}

	h2 {
		margin: 1rem 0 0;
	}

	a {
		color: var(--primary-colour);
		text-decoration: none;

		&:hover,
		&:focus {
			text-decoration: underline;
		}
	}

	a,
	button {
		outline: none;
	}
`;

const Main = styled.main`
	box-sizing: border-box;
	color: var(--dark-colour);
	display: flex;
	flex-direction: column;
	padding: 0 0 1rem;

	@font-face {
		font-display: swap;
		font-family: "Open Sans";
		font-style: normal;
		font-weight: 400;
		src: url(${OpenSansWoff2}) format("woff2"), url(${OpenSansWoff}) format("woff");
	}

	@font-face {
		font-display: swap;
		font-family: "Open Sans Bold";
		font-style: normal;
		font-weight: 400;
		src: url(${OpenSansWoff2Bold}) format("woff2"), url(${OpenSansWoffBold}) format("woff");
	}
`;

const Header = styled.header`
	background: var(--primary-colour);
	color: #fff;
	position: relative;
	z-index: 1;
	overflow: hidden;

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
	margin: 0 1.5rem 0 0;
	width: 40px;
`;

const PageWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	margin: auto;
	max-width: 1280px;
	padding: 1rem;

	/* stylelint-disable */
	${(props) =>
		props.header &&
		css`
			align-items: center;
			flex-direction: row;
		`};
	/* stylelint-enable */
`;

const Intro = styled.p`
	font-size: 120%;
	margin-top: 2rem;
	max-width: 960px;
`;

const List = styled.ul`
	padding: 0 0 0 1.25rem;
`;

const DrawWrapper = styled.section`
	display: flex;
	flex: 1 0 auto;
	flex-direction: column;
	margin: auto;
	max-width: 1920px;

	/* stylelint-disable */
	${(props) =>
		props.hidden === true &&
		css`
			margin-top: -999rem;
			opacity: 0;
			position: absolute;
			z-index: -1;
		`};
	/* stylelint-enable */
`;

const StartButtonWrapper = styled.div`
	padding: 2rem 0;
	text-align: center;
`;

const TeamsWrapper = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	height: 100%;
	justify-content: center;
	width: 100%;
`;

const TeamWrapper = styled.div`
	border: 3px solid var(--dark-colour);
	margin: 0.5em;
	max-height: 5.5em;
`;

const Teams = styled.div`
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
`;

export const numberOfCountries = 32;

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

		zenscroll.to(document.getElementById("t0"), 350);
	}

	setData(teams, people, usingDummyData = false) {
		// Set people and team data to use
		this.setState({
			dataInput: false,
			teams: shuffle(teams),
			people: shuffle(people)
		});

		if (!usingDummyData) {
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
					<TeamName
						id={i}
						teams={teams}
						start={this.state.start}
						people={people}
						counter={counter}
						nextTeam={this.nextTeam}
						assigned={assigned}
						active={active}
					/>
				</TeamWrapper>
			);
		}

		return (
			<Main>
				<Header>
					<PageWrapper header>
						<Image src={trophyImg} alt="" />
						<h1>World Cup 2022 sweepstake tool</h1>
					</PageWrapper>
				</Header>
				{dataInput && (
					<section>
						<PageWrapper>
							<Intro>
								Picking teams out of a hat is so 20th century &ndash; use this online tool to help you run your office World Cup 2022
								sweepstake!
							</Intro>
							<h2>How it works</h2>
							<List>
								<li>Sign-up a maximum of {numberOfCountries} people who want to take part (and get payment off them!)</li>
								<li>Enter all your sweepstake participants in the form below</li>
								<li>Some people want two teams? Add their names twice into the form</li>
								<li>Gather everyone round (via Zoom?) and start the draw!</li>
							</List>
							<Form teams={teams} setData={this.setData} dummyData={dummyData} />
						</PageWrapper>
					</section>
				)}
				<DrawWrapper hidden={dataInput}>
					<StartButtonWrapper>
						<Button onClick={this.start} disabled={start}>
							Start draw
						</Button>
					</StartButtonWrapper>
					<TeamsWrapper>
						<Teams>{output}</Teams>
					</TeamsWrapper>
					<EmailButton people={assigned} teams={teams} />
				</DrawWrapper>
			</Main>
		);
	}
}
