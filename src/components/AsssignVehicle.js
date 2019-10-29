import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { updateToken,updateSearchResult,updateTimeTaken } from '../store/actions';
import { withRouter } from 'react-router-dom';
import '../css/AssignVehicle.css';

export class AsssignVehicle extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            selectedPlanets: this.props.selectedPlanets || [],
            vehicles: [],
            assignedVehicles: [null,null,null,null],
            totalTime: 0
        }
    }
    
    async componentDidMount(){
        if(this.state.selectedPlanets.length === 0 )
            return this.props.history.push('/')
        
        await axios.get('https://findfalcone.herokuapp.com/vehicles')
                    .then(response => this.setState({
                        vehicles: response.data
                    }))
                    .catch(err => console.log(err))

        await axios.post('https://findfalcone.herokuapp.com/token',null,{headers:{'Accept' : 'application/json'}})
                    .then(response => this.props.updateToken(response.data.token))
                    .catch(err => console.log(err));
    }

    assignVehicle = (vehicleIndex, planetIndex, vehicleObj) => {
        
        const {selectedPlanets,assignedVehicles} = this.state;
        
        const planet = selectedPlanets[planetIndex];
        
        const newSelectedPlanets = [...selectedPlanets];
        let newAssignedVehicles = [...assignedVehicles];
         

        if(this.findOccurences(assignedVehicles, vehicleObj) < vehicleObj.total_no){
          planet.vehicle = vehicleObj;
          newSelectedPlanets[planetIndex] = planet;
          newAssignedVehicles[planetIndex] = vehicleObj  
          this.setState({
            selectedPlanets:newSelectedPlanets,
            assignedVehicles: newAssignedVehicles
          }); 
        }
  
        this.updateTotalTimeToReachAlFalcone();
    }

    findOccurences(dataset, search){
        const occurrences = dataset.filter(function(val) {
            return val === search;
        }).length;
        return occurrences;
    }

    updateTotalTimeToReachAlFalcone = () => {
        let totalTime = 0;
        for(let planet of this.state.selectedPlanets){
          if(planet.vehicle !== undefined){
            totalTime = totalTime + (planet.distance/planet.vehicle.speed);
          }
        }
        this.setState({
            totalTime
        })
    }

    assignedVehiclesLength = () => {
        let count = 0;
        for(let planet of this.state.assignedVehicles){
            if(planet !== null)
                count+=1;
        }
        return count; 
    }

    extractData = () => {
        var data = {}
        data.token = this.props.token;
        data.planet_names = [];
        data.vehicle_names = [];

        for(let planet of this.state.selectedPlanets){
            data.planet_names.push(planet.name);
            data.vehicle_names.push(planet.vehicle.name)
        }
        return data;
    }

    findFalcon = async () => {
        const headers = {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            
        };

        const data = this.extractData();
        const {updateSearchResult,updateTimeTaken,history} = this.props;
        await axios.post('https://findfalcone.herokuapp.com/find',data,{headers : headers})
                    .then(response => {
                        if(response.data.status === 'success'){
                            updateSearchResult(response.data);
                            updateTimeTaken(this.state.totalTime);
                            history.push('/result');
                        } else if(response.data.status === 'false'){
                            updateSearchResult(response.data);
                            history.push('/result');
                        }
                    })
                    .catch(err => console.log(err))
    }

    render() {
        const {totalTime,vehicles,selectedPlanets} = this.state;

        const planets = selectedPlanets.map((planet,index1) => {
            return (
                <div className='planet' key={index1}>
                    <img src={`./images/planets/${planet.name}.png`} alt=''/>
                    <h3> { planet.name } </h3>
                    <p> <b>Distance</b> - { planet.distance } megamiles </p>

                    <div className='vehiclesList'>
                        <p><b>Assign vehicle</b></p>

                        {
                            vehicles.map((vehicle,index2) => (
                                planet.distance <= vehicle.max_distance ? 
                                    <div className='vehicle' key={index2} onClick={() => this.assignVehicle(index2, index1, vehicle)}>
                                        <div></div>
                                        <span>{ vehicle.name }</span>
                                        {vehicle === planet.vehicle ? <img src='./images/tick.png' alt=''/> : ''} 
                                    </div>
                                :''
                            ))
                        }
                    </div>
                </div>
            )
        });
        

        return (
            <>
                <h2 className='text-center'> Assign vehicles to your planets </h2>
                {totalTime !==0 ? <p className='text-center'>Total time to reach all the planets : { totalTime } </p> : ''}
                <div className='planetslist'>
                    {planets}
                </div>
                { selectedPlanets.length === this.assignedVehiclesLength() ? 
                    <div className="d-block text-center"> 
                        <button className='btn btn-primary' onClick={this.findFalcon} >Find Falcone</button>
                    </div>: ''
                }
            </>
        )
    }
}

const mapStateToProps = state =>({
    selectedPlanets: state.selectedPlanets,
    token : state.token
});

export default withRouter(connect(mapStateToProps,{updateToken,updateSearchResult,updateTimeTaken})(AsssignVehicle));
