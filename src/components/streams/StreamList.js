import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';


class StreamList extends Component {
    componentDidMount() {
        this.props.fetchStreams();
    }
    renderCreate() {
        if (this.props.isSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link to='/stream/new' className='ui button primary'>Create Stream</Link>
                </div>
            )
        }
    }
    renderAdmin(stream) {
        const { currentUserId } = this.props;
        if (stream.userId === currentUserId) {
            return (
                <div className='right floated content'>
                    <Link to={`/stream/edit/${stream.id}`} className='ui button primary'>
                        Edit
                    </Link>
                    <Link to={`/stream/delete/${stream.id}`} className='ui button negative'>
                        Delete
                    </Link>

                </div>
            )
        }
    }
    renderList() {
        const { streams } = this.props;
        return streams.map(stream => {
            return (
                <div className='item' key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className='large middle aligned icon camera' />
                    <div className='content'>
                        <Link to={`/stream/${stream.id}`} className='header'>{stream.title}</Link>
                        <div className='description'>{stream.description}</div>
                    </div>

                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className='ui celled list'>
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = ({ streams, auth }) => {
    return {
        streams: Object.values(streams),
        currentUserId: auth.userId,
        isSignedIn: auth.isSignedIn
    }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);