import {Component, render, h} from "preact";
import styled from "styled-components";

const Title = styled.h1`
	text-align: center;
	font-family: sans-serif;
`;

class App extends Component {
	render() {
		return (
			<div>
				<Title>Example...</Title>
			</div>
		);
	}
}

if (typeof window !== "undefined") {
	render(<App />, document.getElementById("root"));
}
