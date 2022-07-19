// use ant design, based on reactJS.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Table, Popconfirm, Button, DatePicker,} from 'antd';
import './index.css';

class Database extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data:[{    
        Name: 'Example',
        Date: new Date(),
        Text: 'HelloWorld',
        Created_Date: new Date().toString(),
        ID: 0}],
      }
    this.input = {
        Name: 'Example',
        Date: new Date(),
        Text: 'HelloWorld',
        ID: 0,
      }
  }
  handleChangeName = (e) => this.input.Name = e.target.value
  handleChangeDate = (date) => this.input.Date = date
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
        Created_Date: new Date().toString(),
        ID: input.ID,
      }]});
    }
    else{
      this.setState({data:data.concat([{
        Name: input.Name,
        Date: input.Date,
        Text: input.Text,
        Created_Date: new Date().toString(),
        ID: input.ID,
      }])});
  }
    console.log(this.input.Date);
    this.input.ID++;
  };

  handleRemoveItem = (count) => {
   console.warn(count);
    const data = this.state.data;
    this.setState({data:data.filter((item) => item.ID !== count)});
    console.log(this.state);
  };
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.Name - b.Name,
      },
      {
        title: 'Date',
        dataIndex: 'Date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime(),
      },
      {
        title: 'Text',
        dataIndex: 'Text',
      },
      {
        title: 'Created Date',
        dataIndex: 'Created_Date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.Created_Date).getTime() - new Date(b.Created_Date).getTime(),
      },
      {
          title: 'Actions',
          render: (record) => {
            return (
              <Popconfirm title="Delete?" onConfirm={() => this.handleRemoveItem(record.ID)}>
                <Button>Delete</Button>
              </Popconfirm>
            );
          },
      }
  ]
    const data = this.state.data;
    data.length > 0?data.forEach(record => record.Date = record.Date.toString()):data.concat();
    console.log(this.state.data);
    return (
      <>
      <div className = "Inputs">
        <label>Name: </label>
        <input className = "Name" type="text"  onChange={this.handleChangeName} />
        <label>Date: </label>
        <DatePicker onChange={this.handleChangeDate} />
        <label>Text: </label>
        <input className = "Text" type="text"  onChange={this.handleChangeText} />
        <Button onClick={this.handleClick} type = "primary">comfirm</Button>
      </div>
      <Table dataSource={this.state.data} columns = {columns}/>
        </>
    );
  }
  }
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Database />);
