import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '707029166853-76eieeklgai5ab55ls0vo9892b3esrfp.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange.bind(this))
            })
        })
    }

    onAuthChange(isSignedIn) {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut()
        }
    }
    onSignedInClick() {
        if (this.auth) {
            this.auth.signIn()
        }

    }
    onSignedOutClick() {
        if (this.auth) {
            this.auth.signOut()
        }

    }
    renderButton() {
        if (this.props.auth.isSignedIn === null) {
            return null;
        } else if (this.props.auth.isSignedIn === true) {
            return <button onClick={this.onSignedOutClick.bind(this)} className='ui red google button'>
                <i className='google icon' />
                Sign Out
            </button>
        } else {
            return <button onClick={this.onSignedInClick.bind(this)} className='ui red google button'>
                <i className='google icon' />
                Sign In with google
        </button>
        }
    }
    render() {
        return (
            <div>
                {this.renderButton()}
            </div>
        )
    }
}
const mapStateToProps = ({ auth }) => {
    return { auth }
}
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);