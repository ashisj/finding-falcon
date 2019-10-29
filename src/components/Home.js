import React, { Component } from 'react';
import axios from 'axios';
import '../css/Home.css';
import {removePlanet,addPlanet,resetAll} from '../store/actions'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
             planets:[]
        }
    }

    async componentDidMount(){
        this.props.resetAll();
        await axios.get('https://findfalcone.herokuapp.com/planets')
                    .then(response => this.setState({
                        planets: response.data
                    }));
                    
    }
    
    changeSelection = (index, planet) => {
        if(planet.selected){
            const selectPlanet = this.state.planets[index]
            selectPlanet.selected = false;
            this.props.removePlanet(planet);
            this.setState({
                planet: selectPlanet
            });
        } else if(this.props.selectedPlanets.length < 4){
            const selectPlanet = this.state.planets[index]
            selectPlanet.selected = true;
            this.props.addPlanet(planet);
            this.setState({
                planet: selectPlanet
            });
        }
    }

    render() {
        const planets = this.state.planets;
        const selectedPlanets = this.props.selectedPlanets || [] ;
        let nextLink = '';
        
        const showPlanets = planets.map((planet,index) => (
            <div className='planet'  key={index} onClick={() => this.changeSelection(index,planet)}>
                { planet.selected && <div className='selected'> <p>selected</p> </div> }
                <img src={`./images/planets/${planet.name}.png`} alt=''/>
                <h3> { planet.name } </h3>
                <p> <b>Distance</b> - { planet.distance } megamiles </p>
            </div>
        ));

        if(selectedPlanets.length === 4){
            nextLink = <Link to='/assignvehicles' className='btn btn-primary d-block text-center'>Now select vehicles to send to these planets</Link>
        }

        return (
            <>
                <div className='text-center mt-3'>
                    <h2> Select planets you want to search in: </h2>
                    <p> You can only choose 4 planets </p>
                </div>
                <div className='planetslist text-center'>
                    {showPlanets}
                </div>
                {nextLink}
            </>
        )
    }
}

const mapStateToProps = state => ({
    selectedPlanets: state.selectedPlanets
});

export default connect(mapStateToProps,{addPlanet,removePlanet,resetAll})(Home);