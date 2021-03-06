import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions';
import { PRODSERVER, LOCALSERVER } from '../../api.json';

class StreamShow extends Component {
    constructor(props) {
        super(props)
        this.videoRef = React.createRef();
        this.state = {
            url: ''
        }
    }

    componentWillMount() {
        var url = '';
        if (window.location.host.match(/localhost/)) {
            // console.log('match...', window.location.host.match)
            url = LOCALSERVER
        } else {
            url = PRODSERVER
        }

        this.setState({ url });
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.fetchStream(id);
        this.buildPlayer();

    }
    componentDidUpdate() {
        this.buildPlayer();
    }
    componentWillUnmount() {
        /* this.player.destroy(); */
    }



    buildPlayer() {
        const { id } = this.props.match.params;
        if (this.player || !this.props.stream) {
            return;
        }

        this.player = flv.createPlayer({
            type: 'flv',
            /* url: `https://streamy-server.herokuapp.com/live/${id}.flv` */
            url: `${this.state.url}/live/${id}.flv`
        })
        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }
    render() {
        if (!this.props.stream) {
            return <div>Loading....</div>
        }
        const { title, description } = this.props.stream;
        return (
            <div>
                <video ref={this.videoRef} style={{ width: '100%' }} controls />
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