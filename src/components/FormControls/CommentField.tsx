import * as React from "react";

class CommentField extends React.Component<any, any> {


    render() {
        const {commentPlaceholder, commentId} = this.props.data;
        return (
            <div className="order-wizzard__text-comment">
                        <textarea placeholder={commentPlaceholder} id={commentId}
                                  className="form-control"></textarea>
            </div>
        )
    }

}

export default CommentField;