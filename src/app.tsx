import * as React from "react";
import {render} from "react-dom";
import {SurveyWindow} from "./components/views/SurveyWindow";
import {PowerPointProject} from "./surveys/PowerPointProject";
import {DataEntryProject} from "./surveys/DataEntryProject";

class Container extends React.Component<any,any> {
    render(): JSX.Element|any {
        return (
            <div>
                <SurveyWindow name={"PowerPoint"} visible={true}> <PowerPointProject/> </SurveyWindow>
                <SurveyWindow name={"DataEntry"}> <DataEntryProject/> </SurveyWindow>
            </div>
        );
    }
}

require('./style/style.scss');
render(<Container/>, document.getElementById('container'));

