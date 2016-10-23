import * as React from "react";
import {ProjectSurvey} from "../surveys/base/ProjectSurvey";
var ulrQuery = require('url-query');

export class MockProjectAPI extends React.Component<any,any> implements React.ChildContextProvider<Survey.Project.API> {

    public static childContextTypes = ProjectSurvey.contextTypes;

    componentWillMount(): void {
        this.setState(state => {
            var query = ulrQuery();
            state.loggedIn = Boolean(query['logged_in']);
            state.newUser = Boolean(query['new_user']);
            state.creditCard = Boolean(query['credit_card']);
            return state;
        })
    }

    getChildContext(): Survey.Project.API {
        return {
            isLoggedIn: () => this.state.loggedIn,
            isNewUser: () => this.state.newUser,
            hasCreditCard: () => this.state.creditCard,
        }
    }

    handleCheckBox(name: string, event: any) {
        this.setState(state => {
            state[name] = event.target.checked;
            return state;
        })
    }

    render(): JSX.Element|any {
        return <div>
            <div style={{margin :2}}>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.loggedIn}
                                   onChange={e => this.handleCheckBox("loggedIn", e)}/>
                        Logged In</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.newUser}
                                   onChange={e => this.handleCheckBox("newUser", e)}/>
                        New User</label>
                </div>
                <div className="checkbox">
                    <label> <input type="checkbox"
                                   checked={this.state.creditCard}
                                   onChange={e => this.handleCheckBox("creditCard", e)}/>
                        Has Credit Card</label>
                </div>
            </div>
            {this.props.children}
        </div>
    }
}
