import {Component, h} from "preact";
// import styled from "styled-components";

// // Styled components
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
				<a
					href={`mailto:?subject=World%20Cup%202018%20Sweepstake%21&body=Hi%20everybody%21%0A%0AThe%20draw%20for%20the%20World%20Cup%202018%20Sweepstake%20has%20been%20made%20and%20here%20are%20the%20results%3A%0A%0A${results}%0AGood%20luck%20everyone!`}
				>
					Email draw results
				</a>
			);
		}

		return output;
	}
}
