import React,{Component} from 'react'
import {connect} from 'react-redux'
import {signIn,signOut} from '../actions/index'

class GoogleAuth extends Component{
    //state= {isSignedIn: null}

    componentDidMount(){
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId:'1046623760958-871bspm6p5cbp2tib4spivqa1r11ml9b.apps.googleusercontent.com',
                scope: 'email'
            }).then(()=>{
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange=(isSignedIn)=>{
        if(isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        }
        else{
            this.props.signOut()
        }
    }

    onSignInClick=()=>{
        this.auth.signIn();
    }

    onSignOutClick=()=>{
        this.auth.signOut();
    }

    renderAuthButton(){
        if(this.props.isSignedIn===null){
            return null
        }
        else if(this.props.isSignedIn===true){
            return (
               
                <button onClick={this.onSignOutClick} className="ui red google button" >
                    <i className="google icon"/>
                    Sign Out
                </button>
                
            )
        }
        else{
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            )
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        )
    }
}

const myStateToProps=(state)=>{
    return{isSignedIn: state.auth.isSignedIn}
}

export default connect(myStateToProps,{signIn,signOut})(GoogleAuth)