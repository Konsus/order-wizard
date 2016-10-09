import * as React from "react";
import {render} from "react-dom";
import {SurveyWindow} from "./components/views/SurveyWindow";
import {PowerPointProject} from "./surveys/PowerPointProject";

class Container extends React.Component<any,any> {
    render(): JSX.Element|any {
        return <SurveyWindow>
            <PowerPointProject/>
        </SurveyWindow>
    }
}

require('./style/style.scss');
render(<Container/>, document.getElementById('container'));

