import React,{Component} from 'react'
import { Field, reduxForm} from 'redux-form'


class StreamForm extends Component{

    renderError=({error,touched})=>{
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    //formProps
    //input,label,meta
    renderInput=({input,label,meta})=>{
        return(
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        ) 
    }
    onSubmit=(formValues)=>{
        this.props.onSubmit(formValues)
    }
    render(){
        return(
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form" className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues)=>{
    const errors = {}

    if(!formValues.title){
         errors.title='You Must Enter a Title to Proceed'
    }

    if(!formValues.description){
        errors.description='You Must Enter a Description to Proceed'
    }

    return errors
}

export default (reduxForm({
    form: 'streamForm',
    validate
})(StreamForm))