import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            hasError:false
        }
    }

static getDerivedStateFromError(err){
    //console.log(err)
    return{hasError:true}
}
     render() {
        if(this.state.hasError){
            return <>
            <h3 style={{textAlign:"center"}}>Something Went Worng !</h3>
            </>
        }
        return this.props.children
    }
}

export default ErrorBoundary;