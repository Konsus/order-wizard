import * as React from "react";
import {render} from "react-dom";
import Container from "./components/Container";

require('./style/style.scss');

render(<Container/>, document.getElementById('container'));
