import React,{Component} from 'react';
import './App.css';
import loading from './loader.gif';
class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state=({
      isLoaded:false,
      items:[],
      newConfirmed:'',
      totalConfirmed:'',
      newDeaths:'',
      totalDeaths:'',
      totalRecovered:'',
      currentDate:''
    })
  }
  componentDidMount()
  {
    fetch('https://api.covid19api.com/summary')
    .then(res => res.json())
    .then(json => {
      // console.log(typeof(json));
      console.log(json.Date);
     
      this.setState({
       isLoaded:true,
       items:json.Countries,
       newConfirmed: json && json.Global && json.Global.NewConfirmed? json.Global.NewConfirmed : 0,
       totalConfirmed:json.Global.TotalConfirmed,
       newDeaths:json.Global.NewDeaths,
       totalDeaths:json.Global.TotalDeaths,
       totalRecovered:json.Global.TotalRecovered,
       currentDate:json.Date,
      })
     
    })
  }
  gettableData = () => {
    console.log(this.state.items,'myitem')
    return(
      this.state.items.map(item => {
        return(
          <tr>
        <td>{item.Country ? item.Country: 'NA' }</td>
        <td>{item.NewConfirmed}</td>
        <td>{item.TotalConfirmed}</td>
        <td>{item.TotalDeaths}</td>
        </tr>
        )
        
      })
    )

  }
  render()
  {
    var apiDate = new Date(this.state.currentDate).toDateString();
    var items = this.state.items
    console.log(this.state.items.Country)

    return(
      
      <div className="App">
        {this.state.isLoaded ? 
      <div className="container">
        <div className='heading'>COVID-19 Corona Tracker</div>
        <div className="short_summary">

            <div className="box">
            <h2>New Confirmed</h2>
    <div className='count'>{this.state.newConfirmed}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box">
            <h2>Total Confirmed</h2>
            <div className='count'>{this.state.totalConfirmed}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box">
            <h2>New Deaths</h2>
            <div className='count'>{this.state.newDeaths}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box total_death">
            <h2>Total Deaths</h2>
            <div className='count'>{this.state.totalDeaths}</div>
            <div className="date">{apiDate}</div>
            </div>

            <div className="box total_recovered">
            <h2>Total Recovered</h2>
            <div className='count'>{this.state.totalRecovered}</div>
            <div className="date">{apiDate}</div>
            </div>

        </div>

        <table className="summary_table">
          <thead>
              <tr>
                <th>Country</th>
                <th>New Confirmed</th>
                <th>Total Confirmed</th>
                <th>Total Deaths</th>
                </tr>
                </thead>

               <tbody>
               {this.gettableData()}
               
                </tbody>
                

                {/* <tr>
                 <td>aa</td>
                 <td>121212</td>
                 <td>23333</td>
                 <td>455545</td>
                </tr>

                <tr>
                 <td>aa</td>
                 <td>121212</td>
                 <td>23333</td>
                 <td>455545</td>
                </tr> */}
                {/* </tbody> */}
              </table>
              
      </div>
      :<div className="loading"><img src={loading} alt="loading"/></div> 
  }
        </div>
    );
  }
}

export default App;