import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Link,withRouter} from 'react-router-dom';

export class Result extends Component {
    componentDidMount(){
        if(this.props.searchResult === undefined){
            this.props.history.push('/');
        }
    }

    render() {
        const {searchResult,timeTaken} = this.props;
        let resultData = ''
        if(searchResult && searchResult.status === 'success'){
            resultData = <div>
                <p> Success! Congratulations on Finding Falcone. King Shan is mighty pleased.</p>
                <p> Time taken: { timeTaken }</p> 
                <p> Planet found: { searchResult.planet_name }</p>
            </div>
        } else if(searchResult && searchResult.status === 'false'){
            resultData = <div><p> Failed to find Falcone!</p></div>
        }

        return (
            <>
                <div className='row text-center mt-3'>
                    <div className='col-12'>
                        <img src='./images/eagle.png' className='logo1' alt='Falcon' />
                    </div>
                    <div className='col-12'>
                        <h2>Finding Falcone!</h2>  
                    </div>
                    <div className='col-12'>
                        {resultData}
                    </div>
                </div>
                <div className='row text-center my-3'>
                    <div className='col-12'>
                        <Link to="/" className='btn btn-primary'>Start Again</Link>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    searchResult: state.searchResult,
    timeTaken: state.timeTaken
});

export default withRouter(connect(mapStateToProps)(Result));
