import * as React from "react";


class CheckboxItem extends React.Component<any,any> {
    render() {

        console.log(this.props);

        const {checkboxId, checkboxName, checkboxLabel} = this.props;
        console.log(checkboxId, checkboxName, checkboxLabel);



        return (
            <div className="order-wizzard__list-item order-wizzard__checkbox">
                <input id={checkboxId} name={checkboxName} type="checkbox"/>
                <label htmlFor={checkboxId}>{checkboxLabel}</label>
            </div>
        )
    }
}


class CheckboxGroup extends React.Component<any, any> {

    rebderList = data => {
        return data.map((item, index) => {
            return <CheckboxItem
                key={ index }
                { ...item }/>;
        });
    };

    render() {
        const data = this.props.data;
        return (
            <div className="order-wizzard__checkbox-group">
                {this.rebderList(data)}
            </div>
        )
    }

}

export default CheckboxGroup;