import React,{Component} from 'react'
import Modal from '../Modal'
import history from '../../history'
import {connect} from 'react-redux'
import {fetchStream,deleteStream} from '../../actions/index'
import {Link} from 'react-router-dom'



class StreamDelete extends Component{

    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)
    }

    onDelete=()=>{
        this.props.deleteStream(this.props.match.params.id)
    }

    renderActions=()=>{
        return (
            <React.Fragment>
                <button onClick={this.onDelete} className="ui button negative">DELETE</button>
                <Link to="/" className="ui button">CANCEL</Link>
            </React.Fragment>
        )
        
    }

    render(){
        if(!this.props.stream){
            return <div>Loading</div>
        }
        return(
            <Modal
                 header="DELETE STREAM"
                 content={this.props.stream.title}
                 actions={this.renderActions()}
                 onDismiss={()=>history.push('/')}/>  
            
        )
    }
}

const mapStateToProps=(state,ownProps)=>{
    //console.log('In map state', ownProps);
    
    return {stream: state.streams[ownProps.match.params.id]}
}


export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete)