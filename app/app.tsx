import * as React from "react";
import {render} from "react-dom";
import {SurveyWindow} from "../src/components/views/SurveyWindow";
import {PowerPointProject} from "../src/surveys/PowerPointProject";
import {DataEntryProject} from "../src/surveys/DataEntryProject";
import {WritingProject} from "../src/surveys/WritingProject";
import {DesignProject} from "../src/surveys/DesignProject";
import {ResearchProject} from "../src/surveys/ResearchProject";
import {WebProject} from "../src/surveys/WebProject";

class Container extends React.Component<any,any> {
    render(): JSX.Element|any {
        return (
            <div>
                <SurveyWindow name={"PowerPoint"}> <PowerPointProject/> </SurveyWindow>
                <SurveyWindow name={"DataEntry"}> <DataEntryProject/> </SurveyWindow>
                <SurveyWindow name={"Writing"}> <WritingProject/> </SurveyWindow>
                <SurveyWindow name={"Design"}> <DesignProject/> </SurveyWindow>
                <SurveyWindow name={"Research"}> <ResearchProject/> </SurveyWindow>
                <SurveyWindow name={"Web Design"}> <WebProject/> </SurveyWindow>
            </div>
        );
    }
}

require('../src/style/style.scss');
render(<Container/>, document.getElementById('root'));

