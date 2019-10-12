import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

class StreamShow extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    render() {
        const { title, description } = this.props.stream;
        return (
            <div>
                <h2>{title}</h2>
                <h5>{description}</h5>
            </div>
        )
    }
}
const mapStateToProps = ({ streams }, ownProps) => {
    return { stream: streams[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);