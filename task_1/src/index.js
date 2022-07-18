import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data:[{    
        Name: 'Example',
        Date: new Date("1999-12-30"),
        Text: 'HelloWorld',
        ID: 0}],
      }
    this.input = {
        Name: 'Example',
        Date: new Date("1999-12-30"),
        Text: 'HelloWorld',
        ID: 0,
      }
  }
  handleChangeName = (e) => this.input.Name = e.target.value
  handleChangeDate = (e) => this.input.Date = e.target.value
  handleChangeText = (e) => this.input.Text = e.target.value
  handleClick = (e) => {
    // Use updater function when new state is derived from old
    const data = this.state.data;
    const input = this.input;
    console.log(data);
    console.log(this.input);
    if(this.input.ID == 0){
      this.setState({data:[{
        Name: input.Name,
        Date: input.Date,
        Text: input.Text,
        ID: input.ID,
      }]});
    }
    else{
      this.setState({data:data.concat([{
        Name: input.Name,
        Date: input.Date,
        Text: input.Text,
        ID: input.ID,
      }])});
  }
    console.log(this.input.Date);
    console.log(new Date(this.input.Date).getTime());
    this.input.ID++;
  };

  handleRemoveItem = (e,count) => {
   console.warn(count);
    const data = this.state.data;
    this.setState({data:data.filter((item) => item.ID !== count)});
    console.log(this.state);
  };
  handleSortName = (e) => {
    var data = this.state.data;
    data.sort((a,b) => a.Name - b.Name);
    this.setState({data:data});
  };
  handleSortDate= (e) => {
    var data = this.state.data;
    data.sort((a,b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
    this.setState({data:data});
  };
  handleSortID = (e) => {
    var data = this.state.data;
    data.sort((a,b) => a.ID - b.ID);
    this.setState({data:data});
  };
  render() {
    return (
      <>
      <div className = "Inputs">
        <label>Name: </label>
        <input className = "Name" type="text"  onChange={this.handleChangeName} />
        <label>Date: </label>
        <input className = "Date" type="date" onChange={this.handleChangeDate} />
        <label>Text: </label>
        <input className = "Text" type="text"  onChange={this.handleChangeText} />
        <button onClick={this.handleClick}>comfirm</button>
      </div>
        <div className = "dropdown">
          <span>sorting attributes</span>
          <div className ='dropdown-content'>
            <p onClick={this.handleSortName}>
              Name
            </p>
            <p onClick = {this.handleSortDate} >
              Date
            </p>
            <p onClick = {this.handleSortID}>
              ID
            </p>
          </div>
        </div>

        <DataList data={this.state.data} onClick = {this.handleRemoveItem}/>
        </>
    );
  }
  }
  function DataList(props){
    const data = props.data;
    const items = data.map((item) => 
      <span key={item.ID} className = "Item">
        <ul className = "N">{item.Name}   </ul>
        <ul className = "D">{item.Date.toString()}   </ul>
        <ul className = "T">{item.Text}</ul>
        <button className = "close" onClick={(e) => props.onClick(e,item.ID) }>x</button>
      </span>
      );
    return <span>{items}</span>;
  }

  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Database />);
