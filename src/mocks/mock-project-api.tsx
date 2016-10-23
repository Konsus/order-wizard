import * as React from "react";
import {ProjectSurvey} from "../surveys/base/ProjectSurvey";

export class MockProjectAPI extends React.Component<any,any> implements React.ChildContextProvider<Survey.Project.API> {

    public static childContextTypes = ProjectSurvey.contextTypes;

    public loggedIn: boolean;
    public newUser: boolean;
    public creditCard: boolean;

    getChildContext(): Survey.Project.API {
        return {
            isLoggedIn: () => this.loggedIn,
            isNewUser: () => this.newUser,
            hasCreditCard: () => this.creditCard,
        }
    }

    render(): JSX.Element|any {
        return <div>
            <div style={{margin :2}}>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   onChange={e => {this.loggedIn = (e.target as any).checked}}/>
                        Logged In</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   onChange={e => {this.newUser = (e.target as any).checked}}/>
                        New User</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   onChange={e => {this.creditCard = (e.target as any).checked}}/>
                        Has Credit Card</label>
                </div>
            </div>
            {this.props.children}
        </div>
    }
}
