import * as React from "react";
import {SurveyView, SurveyPageState} from "./SurveyView";
import {SurveyFlow} from "../../core/survey-flow";
import {SelectionControl} from "../controls/SelectionControl";

/** Base type for project creation survey, provides intro page. */
export class ProjectSurvey<P extends ProjectSurveyProps, S extends ProjectSurveyState> extends SurveyView<P, S & SurveyPageState> implements React.ChildContextProvider<Survey.Context> {

    public static childContextTypes = SelectionControl.contextTypes;

    constructor(...args) {
        super(...args);
        this.props.flow.form.onPropertyChanged.attach(this, this.onFormPropertyChanged);
        this.resetSurvey(this.state);
    }

    getChildContext(): Survey.Context {
        return this.props.flow.context;
    }

    /** Move from initial page to actual survey. */
    startSurvey() {
        this.moveNext();
    }

    canMoveNext(): boolean {
        if (super.canMoveNext())
            return true;

        return this.state.pageType < ProjectSurveyPageType.Summary;
    }

    moveNext(): boolean {

        if (!this.state.isPageDone)
            return false;

        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                this.setState(state => {
                    this.resetSurvey(state);
                    state.pageID = this.selectNextPageID(this.state.pageID);
                    state.pageType += 1;
                    return state;
                });
                return true;

            case ProjectSurveyPageType.Survey:
                if (!this.isPageDone(this.state.pageID))
                    return false;

                const nextPageID = this.selectNextPageID(this.state.pageID);
                this.setState(state => {
                    if (nextPageID >= 0) {
                        state.step++;
                        state.pageID = nextPageID;
                        state.activeSteps = this.countActiveSteps();
                    }
                    else {
                        state.pageType += 1;
                    }
                    return state;
                });
                return true;

            case ProjectSurveyPageType.Summary:
                return false;

            default:
                return false;
        }
    }

    moveBack(): boolean {

        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return false;

            case ProjectSurveyPageType.Survey:
                const prevPageID = this.selectPrevPageID(this.state.pageID);
                if (prevPageID >= 0) {
                    this.setState(state => {
                        state.step--;
                        state.pageID = prevPageID;
                        return state;
                    });
                }
                else {
                    this.setState(state => {
                        state.pageType -= 1;
                        return state;
                    });
                }
                return true;

            case ProjectSurveyPageType.Summary:
                this.setState(state => {
                    state.pageType -= 1;
                    return state;
                });
                return true;
        }

        return false;
    }

    resetSurvey(state: S): void {
        super.resetSurvey(state);
        state.pageID = -1;
        state.isPageDone = true;
        state.pageType = ProjectSurveyPageType.Intro;
    }

    startProject() {
        console.log("START PROJECT: ", JSON.stringify(this.props.flow.form));
    }

    isPageDone(pageID: number): boolean {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;

        // page is out of range
        if (pageID < 0) return true;
        if (pageID >= pages.length) return true;

        // not done if any question is not done
        const page = pages[pageID];
        const questions = page.questions;
        for (let i = 0; i < questions.length; i++)
            if (!flow.isQuestionDone(questions[i]))
                return false;

        return true;
    }

    protected onFormPropertyChanged(key: string) {
        this.forceUpdate();
    }

    protected countActiveSteps(): number {
        let counter = 0;
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        for (let i = 0; i < pages.length; i++)
            if (flow.isPageActive(pages[i]))
                counter++;

        return counter;
    }

    protected selectNextPageID(pageID: number): number {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages) return -1;

        for (let i = Math.max(0, pageID + 1), max = pages.length; i < max; i++) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }

        return -1;
    }

    protected selectPrevPageID(pageID: number): number {
        const flow = this.props.flow;
        const pages = flow.questionnaire.pages;
        if (!pages || pageID < 0) return -1;

        for (let i = Math.min(pageID - 1, pages.length); i >= 0; i--) {
            let page = pages[i];
            if (flow.isPageActive(page))
                return i;
        }

        return -1;
    }

    protected renderQuestionPage(): JSX.Element|any {
        const questionnaire = this.props.flow.questionnaire;
        const page = questionnaire.pages[this.state.pageID];
        const state = this.props.flow.getPageView(page);

        if (state && state.render)
            return state.render(page);

        console.error("Page doesn't not provide render function!");
        this.moveNext();
        return null;
    }

    /** Render summary of the survey answers. */
    renderSurveySummary(): JSX.Element|any {
        return null;
    }

    componentWillUpdate(nextProps: P, nextState: S & SurveyPageState, nextContext: any): void {
        nextState.isPageDone = this.isPageDone(nextState.pageID);
    }

    render(): JSX.Element|any {
        switch (this.state.pageType) {
            case ProjectSurveyPageType.Intro:
                return this.renderIntroPage();
            case ProjectSurveyPageType.Survey:
                return super.render();
            case ProjectSurveyPageType.Summary:
                return this.renderSummaryPage();
        }
    }

    renderIntroPage() {
        return (
            <div className="order-wizzard-cover">
                <div className="order-wizzard-cover__logo">
                    <svg width="427.086" height="72.43" viewBox="0 0 427.086 72.43">
                        <path d="M42.446 25.12l20.37 43.104c.7 1.754.043 2.627-1.972 2.627H45.6c-1.05 0-1.86-.146-2.43-.46-.57-.303-1.074-.98-1.513-2.033L29.174 40.232 19.19 51.535v7.95c0 1.623-.024 3.223-.067 4.8a144.82 144.82 0 0 0-.065 4.072c0 .965-.152 1.623-.46 1.972-.308.35-1.073.52-2.3.52H2.762C.92 70.853 0 70.02 0 68.356V2.365C0 1.4.218.765.657.46 1.097.155 1.795 0 2.76 0h13.666c1.228 0 1.973.13 2.235.395.265.264.397.92.397 1.972v23.41l.525.266L39.67 1.84c.7-.7 1.293-1.183 1.775-1.445C41.923.13 42.778 0 44.005 0H60.04c1.227 0 1.905.285 2.037.854.13.57-.11 1.206-.723 1.905L42.446 25.12zm93.96 10.907c0 11.564-2.76 20.5-8.28 26.81-5.52 6.307-13.93 9.463-25.23 9.463-11.39 0-19.71-3.156-24.967-9.463-5.26-6.31-7.89-15.156-7.89-26.546 0-5.602.768-10.662 2.3-15.176 1.53-4.512 3.724-8.3 6.57-11.367 2.846-3.065 6.31-5.43 10.38-7.097C93.37.983 97.99.15 103.16.15c11.04 0 19.34 3.177 24.902 9.526 5.563 6.354 8.345 15.136 8.345 26.35zm-19.843.395c0-2.978-.222-5.693-.657-8.148-.44-2.45-1.183-4.554-2.233-6.308-1.053-1.75-2.41-3.13-4.073-4.14-1.666-1.006-3.726-1.51-6.18-1.51-4.642 0-8.08 1.77-10.312 5.32-2.234 3.548-3.353 8.345-3.353 14.39 0 6.57 1.03 11.564 3.088 14.98 2.06 3.417 5.455 5.126 10.186 5.126 2.45 0 4.53-.503 6.24-1.512 1.71-1.006 3.106-2.407 4.205-4.205 1.094-1.794 1.882-3.876 2.364-6.242.48-2.364.722-4.946.722-7.75zM178.85 15.92c-.877 0-2.125.022-3.745.065a32.787 32.787 0 0 0-5.19.593v51.91c0 .963-.153 1.598-.46 1.9-.31.313-1.073.462-2.3.462H153.62c-.967 0-1.667-.15-2.105-.46-.44-.306-.656-.94-.656-1.903V12.11c0-2.978.52-5.322 1.57-7.03 1.05-1.708 3.235-2.91 6.56-3.613.872-.175 2.116-.328 3.733-.46 1.617-.13 3.346-.264 5.18-.396a252.69 252.69 0 0 1 5.444-.324A99.237 99.237 0 0 1 178 .153c6.12 0 11.41.613 15.87 1.84 4.46 1.23 8.15 3.177 11.08 5.85 2.93 2.672 5.113 6.175 6.56 10.51 1.44 4.338 2.163 9.618 2.163 15.837v34.3c0 .963-.153 1.598-.46 1.9-.303.313-1.063.462-2.28.462H197.36c-.957 0-1.652-.15-2.09-.46-.435-.306-.65-.94-.65-1.902V33.005c0-2.893-.243-5.388-.724-7.49-.483-2.104-1.314-3.877-2.496-5.322-1.185-1.444-2.805-2.518-4.863-3.22-2.058-.702-4.62-1.052-7.687-1.052zm104.078 35.22c0 7.096-2.52 12.397-7.558 15.9-5.04 3.507-11.63 5.26-19.776 5.26-4.557 0-9.354-.51-14.39-1.513-5.04-1.01-9.483-2.648-13.34-4.93-.702-.437-1.116-.896-1.248-1.382-.13-.48.02-1.158.46-2.035l3.813-9.067c.434-.963.893-1.556 1.38-1.773.476-.218 1.2-.107 2.165.328 1.4.614 2.978 1.205 4.73 1.774a65.55 65.55 0 0 0 5.454 1.51c1.883.44 3.7.79 5.452 1.053s3.33.396 4.732.396c3.152 0 5.363-.543 6.636-1.64 1.27-1.096 1.907-2.476 1.907-4.14 0-1.753-.9-3.24-2.694-4.47-1.797-1.226-4.885-2.67-9.264-4.336-3.51-1.313-6.597-2.672-9.27-4.074-2.672-1.4-4.925-2.91-6.766-4.534-1.84-1.62-3.242-3.46-4.204-5.52-.966-2.058-1.446-4.445-1.446-7.162 0-2.892.525-5.585 1.576-8.082 1.052-2.495 2.627-4.664 4.728-6.503 2.104-1.844 4.753-3.31 7.952-4.404C247.156.7 250.944.15 255.326.15c3.942 0 7.95.374 12.024 1.117 4.073.745 7.773 1.862 11.104 3.352.962.435 1.487.895 1.575 1.38.084.48-.048 1.246-.397 2.3l-3.285 8.41c-.354.963-.746 1.51-1.186 1.64-.438.133-1.14.023-2.103-.328-3.24-.963-6.22-1.707-8.937-2.233a44.214 44.214 0 0 0-8.41-.787c-2.364 0-4.073.547-5.124 1.642-1.053 1.098-1.577 2.214-1.577 3.354 0 1.75.81 3.195 2.432 4.335 1.62 1.14 4.445 2.453 8.477 3.94a183.47 183.47 0 0 1 8.936 3.746c2.8 1.27 5.232 2.76 7.292 4.468a19.646 19.646 0 0 1 4.93 6.11c1.23 2.362 1.845 5.21 1.845 8.54zm46.998 5.52c.88 0 2.132-.045 3.763-.134a59.943 59.943 0 0 0 5.22-.524V2.498c0-.964.15-1.62.46-1.973.305-.35 1.07-.525 2.3-.525h13.534c1.84 0 2.76.834 2.76 2.498v57.84c0 2.98-.593 5.346-1.775 7.098-1.18 1.754-3.307 2.98-6.37 3.68a78.074 78.074 0 0 1-3.944.525c-1.575.177-3.265.33-5.06.46-1.796.13-3.57.22-5.322.267-1.754.043-3.283.065-4.6.065-6.308 0-11.675-.614-16.097-1.84-4.427-1.224-8.018-3.196-10.777-5.913-2.757-2.718-4.75-6.244-5.977-10.58-1.228-4.337-1.84-9.614-1.84-15.835V2.498c0-.964.153-1.62.456-1.973.3-.348 1.062-.525 2.28-.525h13.573c1.827 0 2.74.834 2.74 2.498v36.945c0 2.892.176 5.41.527 7.557.355 2.147 1.06 3.942 2.116 5.388 1.055 1.445 2.555 2.52 4.492 3.22 1.94.703 4.454 1.05 7.54 1.05zm97.16-5.52c0 7.096-2.52 12.397-7.558 15.9-5.037 3.507-11.628 5.26-19.777 5.26-4.554 0-9.35-.51-14.385-1.513-5.04-1.01-9.485-2.648-13.34-4.93-.702-.437-1.116-.896-1.247-1.382-.132-.48.02-1.158.46-2.035l3.81-9.067c.44-.963.897-1.556 1.38-1.773.48-.218 1.204-.107 2.17.328a51.3 51.3 0 0 0 4.728 1.774 65.46 65.46 0 0 0 5.454 1.51c1.883.44 3.7.79 5.453 1.053 1.752.263 3.33.396 4.73.396 3.153 0 5.364-.543 6.638-1.64 1.27-1.096 1.905-2.476 1.905-4.14 0-1.753-.898-3.24-2.693-4.47-1.795-1.226-4.885-2.67-9.262-4.336-3.506-1.313-6.597-2.672-9.266-4.074-2.674-1.4-4.928-2.91-6.77-4.534-1.84-1.62-3.24-3.46-4.202-5.52-.967-2.058-1.447-4.445-1.447-7.162 0-2.892.526-5.585 1.578-8.082 1.053-2.495 2.63-4.664 4.73-6.503 2.105-1.844 4.753-3.31 7.95-4.404C391.316.7 395.103.15 399.485.15c3.942 0 7.95.374 12.026 1.117 4.073.745 7.77 1.862 11.105 3.352.962.435 1.486.895 1.575 1.38.084.48-.05 1.246-.396 2.3l-3.285 8.41c-.356.963-.747 1.51-1.187 1.64-.438.133-1.14.023-2.103-.328-3.24-.963-6.22-1.707-8.935-2.233a44.254 44.254 0 0 0-8.412-.787c-2.363 0-4.072.547-5.124 1.642-1.055 1.098-1.58 2.214-1.58 3.354 0 1.75.81 3.195 2.433 4.335 1.62 1.14 4.445 2.453 8.478 3.94 3.15 1.23 6.133 2.478 8.937 3.746 2.803 1.27 5.233 2.76 7.292 4.468a19.63 19.63 0 0 1 4.93 6.11c1.23 2.362 1.843 5.21 1.843 8.54z" fill="#FFF"/>
                    </svg>
                </div>

                <div className="order-wizzard-cover__info">
                    <p>We’re asking you a few questions to understand what we can do for you.</p>
                    <p>We will then come back to you with a quote – and you decide whether we should get started!</p>
                </div>

                <div className="order-wizzard-cover__next">
                    <a href="#" className="b-button" onClick={() => this.startSurvey()}>Next</a>
                </div>
            </div>
        )
    }

    renderSummaryPage() {
        return (
            // <div className="order-wizzard">
            //     <div className="order-wizzard__step-title">Summary of your task!</div>
            //
            //     <div className="order-wizzard__step-survey">
            //         <div className="order-wizzard__summary">
            //             {this.renderSurveySummary()}
            //         </div>
            //     </div>
            //
            //     <div className="order-wizzard__cta text-center">
            //         <a href="#" className="b-button b-button--blue"
            //            onClick={() => this.startProject()}>Start project</a>
            //     </div>
            // </div>

            <div className="order-wizzard order-wizzard--login">
               <div className="order-wizzard__header">
                   <div className="order-wizzard__title">Thanks!</div>
                   <div className="order-wizzard__sub-title">Please log in and your quote will be with you shortly</div>
               </div>

               <div className="order-wizzard__login">
                   <div className="order-wizzard__login-form">
                       <div className="form-group">
                           <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                       </div>
                       <div className="form-group">
                           <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                       </div>
                       <div className="form-group">
                           <a href="#">Forgot password?</a>
                       </div>

                       <button type="submit" className="btn btn-primary btn-block">Log in</button>
                   </div>
               </div>
            </div>

            // <div className="order-wizzard order-wizzard--login">
            //     <div className="order-wizzard__header">
            //         <div className="order-wizzard__title">SUCCESS!</div>
            //         <div className="order-wizzard__sub-title">Your quote will be with you shortly</div>
            //     </div>
            //
            //     <div className="order-wizzard__login">
            //         <header>
            //             Meanwhile, can you please complete your profile so we are <br/>
            //             ready to go if you approve the quote:
            //         </header>
            //
            //         <div className="order-wizzard__login-form order-wizzard__login-form__next-step">
            //             <div className="form-group">
            //                 <div className="row">
            //                     <div className="col-md-6 col-xs-6">
            //                         <input type="text" className="form-control" placeholder="First name*" />
            //                     </div>
            //                     <div className="col-md-6 col-xs-6">
            //                         <input type="text" className="form-control" placeholder="Last name*" />
            //                     </div>
            //                 </div>
            //             </div>
            //
            //             <div className="form-group">
            //                 <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Company name" />
            //             </div>
            //             <div className="form-group">
            //                 <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Set a password*" />
            //             </div>
            //
            //             <button type="submit" className="btn btn-primary btn-block">Submit</button>
            //             <p>*Required</p>
            //         </div>
            //     </div>
            // </div>

        )
    }
}

export interface ProjectSurveyProps {
    flow: SurveyFlow;
}

export interface ProjectSurveyState extends SurveyPageState {
    pageType: ProjectSurveyPageType;
    /** Zero-based index of questionnaire page.*/
    pageID: number;
}

export enum ProjectSurveyPageType {
    /** Intro page with start survey button. */
    Intro = 1,
        /** Actual survey pages */
    Survey,
        /** Summary page with results of survey and submission button. */
    Summary,
}


