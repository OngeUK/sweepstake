import {render, h} from "preact";
import {App} from "./components/App";
require("preact/devtools");

render(<App />, document.body, document.body.lastElementChild);
