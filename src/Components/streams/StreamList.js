import React,{Component} from 'react'
import {connect} from 'react-redux'
import {fetchStreams} from '../../actions/index'
import {Link} from 'react-router-dom'

class StreamList extends Component{

    componentDidMount(){
        this.props.fetchStreams()
    }

    renderAdmin=(stream)=>{
        if(stream.userId===this.props.currentUserId){
            
            return(
                <div className="right floated button">
                    {/* <button className="ui button primary">
                        EDIT
                    </button> */}
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">
                        EDIT
                    </Link>

                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        DELETE
                    </Link>
                </div>
            ) 
        }
    }

    renderStreams(){
        return this.props.streams.map((stream)=>{
            return(
                <div className="item" key={stream.id}>
                    <div>{this.renderAdmin(stream)}</div>
                        <i className="large middle aligned icon camera"/>
                        <div className="content">
                            <Link to={`/streams/show/${stream.id}`} className="header">
                                {stream.title}
                            </Link>
                            <div className="description">{stream.description}</div>
                        </div>
                </div>
             ) 
        })
    }

    renderCreateButton=()=>{
        if(this.props.isSignedIn){
            return (
                <button className="positive ui button">Create Stream</button>
            )
        }
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <h2>ALL STREAMS</h2>
                <div className="ui celled list">
                    {this.renderStreams()}
                </div>
                <Link to="/streams/new">{this.renderCreateButton()}</Link>

            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return{streams: Object.values(state.streams),
           currentUserId: state.auth.userId,
            isSignedIn: state.auth.isSignedIn}
}


export default connect(mapStateToProps,{fetchStreams})(StreamList)