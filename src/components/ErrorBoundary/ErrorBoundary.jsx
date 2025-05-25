import React from "react";

class ErrorBoundry extends React.Component{
    constructor(props){
        super(props);
        this.state={hasError:false, error: null};
    }

    static getDerivedStatefromError(Error){
        return {hasError:true, Error}
    }

    componentDidCatch(err, errInfo){
        console.error("ErrorBoundary caught an error",err,errInfo);
        
    }
    render(){
        if(this.state.hasError){
            return(
                <div className="p-5  flex justify-center items-center">
                    <h2>Something went wrong</h2>
                    <p>{this.state.error?.message}</p>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundry;