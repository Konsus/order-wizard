import * as React from "react";
import {render} from "react-dom";
import {SurveyWindow} from "../src/components";
import {
    PowerPointProject,
    DataEntryProject,
    WritingProject,
    DesignProject,
    ResearchProject,
    WebProject,
} from "../src/surveys";

class Container extends React.Component<any,any> {
    render(): JSX.Element|any {
        return (
            <div className="row">
                <div className="col-md-2">

                    <div style={{margin :2}}>
                        <div className="checkbox">
                            <label><input type="checkbox"/>Legged In</label>
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox"/>New User</label>
                        </div>
                    </div>

                    <SurveyWindow name={"PowerPoint"} debug={true}> <PowerPointProject/> </SurveyWindow>
                    <SurveyWindow name={"DataEntry"} debug={true}> <DataEntryProject/> </SurveyWindow>
                    <SurveyWindow name={"Writing"} debug={true}> <WritingProject/> </SurveyWindow>
                    <SurveyWindow name={"Design"} debug={true}> <DesignProject/> </SurveyWindow>
                    <SurveyWindow name={"Research"} debug={true}> <ResearchProject/> </SurveyWindow>
                    <SurveyWindow name={"Web Design"} debug={true}> <WebProject/> </SurveyWindow>
                </div>
            </div>
        );
    }
}

require('../src/style/style.scss');
render(<Container/>, document.getElementById('root'));
