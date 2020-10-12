import React from 'react';
import Axios from 'axios';
import './App.css';
import Fade from 'react-reveal';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      location : {
        latitude : 0,
        longitude : 0
      },
      data : {},
      loading:true,
      search : "bangalore"
    }
  }
  handleclick(){
    try{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
          Axios.get(`http://api.weatherstack.com/current?access_key={YOUR_API_KEY}&query=${position.coords.latitude},${position.coords.longitude}`).then((res) => {
            console.log(res);
            let weather_data = {
              temperature : res.data.current.temperature,
              icons : res.data.current.weather_icons,
              weather_des : res.data.current.weather_descriptions,
              country : res.data.location.country,
              region : res.data.location.region,
              city : res.data.location.name,
              time : res.data.location.localtime.toString().slice(11,16),
              date : res.data.location.localtime.toString().slice(0,11)
            }
            this.setState({data : weather_data,loading:false});
          })
          
        })
      }
      
    }
    catch(e){
      console.error('Click on Allow to use your location or turn on your gps',e);
    }
  } 
  handlechange(event){
    var ele = event.currentTarget.value;
    this.setState({
      search : ele
    })

  }
  handleclick2(){
    try{
      Axios.get(`http://api.weatherstack.com/current?access_key={YOUR_API_KEY}&query=${this.state.search}`).then((res)=>{
        try{
          let weather_data = {
              temperature : res.data.current.temperature,
              icons : res.data.current.weather_icons,
              weather_des : res.data.current.weather_descriptions,
              country : res.data.location.country,
              region : res.data.location.region,
              city : res.data.location.name,
              time : res.data.location.localtime.toString().slice(11,16),
              year : res.data.location.localtime.toString().slice(0,11)
            }
          this.setState({data : weather_data,loading:false});
        }
        catch(e){
          Axios.get(`http://api.weatherstack.com/current?access_key={YOUR_API_KEY}&query=bangalore`).then((res)=>{

          let weather_data = {
            temperature : 'not found',
            icons : 'not found',
            weather_des : 'not found',
            country : 'not found',
            region : 'not found',
            city : 'not found',
            time : 'not found',
            year : 'not found'
          }
          this.setState({data : weather_data,loading:false});
          })
        }
      })
    }
    catch(e){
      console.error('ERROR',e);      
    }
  }

  render(){
    
    return(
      <div className = 'overlay'>
        <div className = 'container'>
        <Fade top>
            <h1 className = 'mt-5'><center>weather forecast</center></h1>
            <div className = 'row mt-5'>
              <div className = 'col-12 col-sm-12'><center><input type = 'text' onChange = {(event)=> this.handlechange(event)} placeholder = 'SEARCH CITY' className = 'textar'></input></center></div>
            </div>
            <center><button className = 'btn textl col-sm-2 mt-3' onClick = {this.handleclick2.bind(this)}>Search</button></center>
            <center><button className = 'btn textl mt-2 col-sm-2' onClick = {this.handleclick.bind(this)}>Current Location</button></center>

              {this.state.loading?<div></div>:
                  <div className = 'row col-12 mt-5'>
                    <div className = 'col-sm-6 weather'>
                      <img src = {this.state.data.icons} alt = 'weather icon' width = '15%'/>
                      <h1 className = 'temp'>{this.state.data.temperature}<span className = 'tempC'>&#8451;</span></h1><h2 className = 'weather'>{this.state.data.weather_des}</h2>
                    </div>
                    <div className = 'col-sm-6 weather2'>
                      <h1>{this.state.data.city}</h1>
                      <h3>{this.state.data.region}</h3>
                      <h4>{this.state.data.country}</h4>
                      <h3>{this.state.data.time}</h3>
                      <h3>{this.state.data.year}</h3>
                    </div>
                  </div>
                }
            
        </Fade>
        </div>
      </div>
    );
  }
}


export default App;
