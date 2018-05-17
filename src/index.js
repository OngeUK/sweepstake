import {Component, render, h} from "preact";
import styled from "styled-components";

const Title = styled.h1`
	font-family: sans-serif;
	position: absolute;
	text-align: center;
`;

class App extends Component {
	render() {
		return (
			<div>
				<Title>Example</Title>
			</div>
		);
	}
}

if (typeof window !== "undefined") {
	render(<App />, document.body, document.body.lastElementChild);
	require("preact/devtools");
}
