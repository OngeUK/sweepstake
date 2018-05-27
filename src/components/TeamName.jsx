import {Component, h} from "preact";
import {setFlag} from "./../js/flags";
import styled from "styled-components";

// Styled components
const Flag = styled.img.attrs({
	src: (props) => props.country
})`
	height: 48px;
	width: 64px;
`;

const Wrapper = styled.div`
	align-items: center;
	display: flex;
`;

const Name = styled.div`
	margin: 0 1em;
`;

export class TeamName extends Component {
	render() {
		const {id, teams} = this.props;

		return (
			<Wrapper>
				<Flag country={setFlag(teams[id].replace(" ", "-").toLowerCase())} />
				<Name>{teams[id]}</Name>
			</Wrapper>
		);
	}
}
