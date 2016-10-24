import * as React from "react";
import {ProjectSurveyRoot} from "../surveys/base/ProjectSurveyRoot";
var ulrQuery = require('url-query');

export class MockProjectContext extends ProjectSurveyRoot<any, any> {

    constructor() {
        super({
            isLoggedIn: () => this.state.loggedIn,
            isNewUser: () => this.state.newUser,
            hasCreditCard: () => this.state.creditCard,
        });
    }

    componentWillMount(): void {
        this.setState(state => {

            try {
                var query = ulrQuery();
                state.loggedIn = Boolean(query['logged_in']);
                state.newUser = Boolean(query['new_user']);
                state.creditCard = Boolean(query['credit_card']);
            }
            catch (e) {

            }
            return state;
        })
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
            {super.render()}
        </div>
    }
}
