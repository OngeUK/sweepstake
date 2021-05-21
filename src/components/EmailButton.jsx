import {Component, h} from "preact";
import styled from "styled-components";

// Styled components
const Wrapper = styled.a`
	font-size: 125%;
	margin: 1rem;
	text-align: center;
`;

export class EmailButton extends Component {
	render() {
		const {people, teams} = this.props;
		let output = "",
			results = "";

		if (teams.length === people.length) {
			for (let i = 0; i < people.length; i++) {
				results += `${people[i]}%20-%20${teams[i]}%0A`;
			}

			// mailto link with results of the draw
			output = (
				<Wrapper>
					<a
						href={`mailto:?subject=Euro%202020%20Sweepstake%21&body=Hi%20everybody%21%0A%0AThe%20draw%20for%20the%20Euro%202020%20Sweepstake%20has%20been%20made%20and%20here%20are%20the%20results%3A%0A%0A${results}%0AGood%20luck%20everyone!`}
					>
						Email draw results
					</a>
				</Wrapper>
			);
		}

		return output;
	}
}
