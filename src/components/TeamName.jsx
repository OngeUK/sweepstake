import {Component, h} from "preact";
import styled from "styled-components";
import {teams} from "../js/teams";

// Styled components
const Flag = styled.span.attrs({
	// backgroundImage: (props) => require(`../images/flags/${props.country}`)
})`
	/* background-image: url(${(props) => props.backgroundImage}); */
	clear: both;
	display: block;
	float: left;
	height: 48px;
	width: 64px;
`;

const Wrapper = styled.div`
	overflow: hidden;
`;

const Name = styled.div`
	float: left;
`;

//const Input = styled.input.attrs({
// 	// we can define static props
// 	type: 'password',

// 	// or we can define dynamic ones
// 	margin: props => props.size || '1em',
// 	padding: props => props.size || '1em'
//   })`
// 	color: palevioletred;
// 	font-size: 1em;
// 	border: 2px solid palevioletred;
// 	border-radius: 3px;

// 	/* here we use the dynamically computed props */
// 	margin: ${props => props.margin};
// 	padding: ${props => props.padding};
//   `;

//   render(
// 	<div>
// 	  <Input placeholder="A small text input" size="1em" />
// 	  <br />
// 	  <Input placeholder="A bigger text input" size="2em" />
// 	</div>
//   );

export class TeamName extends Component {
	render() {
		const {id} = this.props;

		// const blah = `./../images/flags/${teams[id][1].replace(" ", "").toLowerCase()}.svg`;
		// const flag = require(blah);

		console.log(`../images/flags/${teams[id][1].replace(" ", "").toLowerCase()}.svg`); // Cannot find module

		return (
			<Wrapper>
				<Flag country={`${teams[id][1].replace(" ", "").toLowerCase()}.svg`} />
				<Name>{teams[id][1]}</Name>
			</Wrapper>
		);
	}
}
