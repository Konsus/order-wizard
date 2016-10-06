import * as React from "react";

export class RadioItem extends React.Component<any,any> {
    render() {

        console.log(this.props);

        const {radioId, radioName, radioLabel} = this.props;
        console.log(radioId, radioName, radioLabel);

        return (
            <div className="order-wizzard__list-item order-wizzard__radio">
                <input id={radioId} name={radioName} type="radio"/>
                <label htmlFor={radioId}>{radioLabel}</label>
            </div>
        )
    }
}

export class RadioGroup extends React.Component<any, any> {

    renderList = data => {
        return data.map((item, index) => {
            return <RadioItem
                key={ index }
                { ...item }/>;
        });
    };

    render() {
        const data = this.props.data;
        return (
            <div className="order-wizzard__radio-group">
                {this.renderList(data)}
            </div>
        )
    }

}

