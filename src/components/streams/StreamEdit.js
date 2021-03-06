import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }
    onSubmit(formValues) {
        this.props.editStream(this.props.match.params.id, formValues)
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <StreamForm onSubmit={this.onSubmit.bind(this)} initialValues={_.pick(this.props.stream, 'title', 'description')} />
            </div>
        )
    }

}

const mapStateToProps = ({ streams }, OwnProps) => {
    return { stream: streams[OwnProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);