import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import GoogleAuth from './GoogleAuth'
import {connect} from 'react-redux'



class Header extends Component{

    renderMyStreams=()=>{
        if(this.props.isSignedIn){
            return (
                <div>My Streams</div>
            )
        }
    }

    render(){
        return(
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Streams
                </Link>
                <div  className="right-menu">
                    <Link to="/" className="item">
                        All Streams
                    </Link>
             
                    
                </div>
                  <div>
                      <Link to="./streams/MyStream" className="item">
                      {this.renderMyStreams()}
                      </Link>
                  </div>  

                <div className="right-menu">
                    <GoogleAuth/>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{isSignedIn: state.auth.isSignedIn,
            currentUserId: state.auth.userId,
            streams: Object.values(state.streams)}
}

export default connect(mapStateToProps)(Header)