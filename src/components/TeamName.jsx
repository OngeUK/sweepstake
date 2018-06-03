import {Component, h} from "preact";
import {AssignTeam} from "./AssignTeam";
import {setFlag} from "./../js/flags";
import styled from "styled-components";

// Styled components
const FlagWrapper = styled.div`
	line-height: 1;
	width: 30%;
`;

const Flag = styled.img.attrs({
	src: (props) => props.country
})`
	border: 2px solid #2e2e2e;
	height: auto;
	width: 100%;
`;

const Wrapper = styled.div`
	align-items: center;
	display: flex;
	max-width: 18em;
	padding: 0.75em;
	width: 100%;
`;

const Name = styled.div`
	display: flex;
	flex-direction: column;
	line-height: 1;
	margin: 0 1rem;
	width: calc(70% - 2em);
`;

const Teams = styled.div`
	display: flex;
`;

export class TeamName extends Component {
	render() {
		const {id, teams, start, people, counter, nextTeam, assigned, active} = this.props;

		return (
			<Wrapper id={`t${id}`}>
				<Teams>
					<FlagWrapper>
						<Flag country={setFlag(teams[id].replace(" ", "-").toLowerCase())} />
					</FlagWrapper>
					<Name>
						{teams[id]}
						{start && <AssignTeam people={people} id={id} counter={counter} nextTeam={nextTeam} assigned={assigned} active={active} />}
					</Name>
				</Teams>
			</Wrapper>
		);
	}
}
