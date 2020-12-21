import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStreams} from '../../actions/index'

class MyStream extends Component{

    componentDidMount(){
        this.props.fetchStreams()
    }

    renderMyStreams(){
        return this.props.streams.map((stream)=>{
            if(stream.userId===this.props.currentUserId){
                return(
                    <div className="item">
                        <i className="large middle aligned icon camera"/>
                        <div className="content">
                            {stream.title}
                        <div className="description">{stream.description}</div>
                        </div>
                    </div>
                )
            }
        })
    }

    render(){
        return(
            <div>
                <h2>MY STREAMS</h2>
                <div className="ui celled list">
                    {this.renderMyStreams()}
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {streams: Object.values(state.streams),
            currentUserId: state.auth.userId}
}

export default connect(mapStateToProps,{fetchStreams})(MyStream)