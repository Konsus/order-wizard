import * as React from "react";


class RadioItem extends React.Component<any,any> {
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


class RadioGroup extends React.Component<any, any> {

    rebderList = data => {
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
                {this.rebderList(data)}
            </div>
        )
    }

}

export default RadioGroup;