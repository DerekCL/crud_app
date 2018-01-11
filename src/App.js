import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import axios from 'axios';
import './App.css';

import './react-bootstrap-table-all.min.css';

class App extends Component {
    constructor(){
        super()
        this.state = {
            items: []
        }
        this.Insert = this.Insert.bind(this);
        this.Update = this.Update.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    componentDidMount() {        
        axios.get("http://www.localhost:8080/student")
            .then(res => {
                this.setState({
                    items: res.data
                });
            })
            .catch(e => {
                console.log("ERROR ", e);
            })
    }

    Insert(row){
        axios.post('http://www.localhost:8080/student', {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    Update(row){
        axios.put('http://www.localhost:8080/student/' + row.id, {
            id: row.id,
            firstName: row.firstName,
            lastName: row.lastName
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }
    Delete(row){
        axios.delete('http://www.localhost:8080/student/' + row)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    
    render() {
        const options = {
            afterInsertRow: row=>this.Insert(row),   // A hook for after insert row
            afterDeleteRow: row=>this.Delete(row)
        };
        const selectRowProp = {
            mode: 'radio'
        };
        const cellEditProp = {
            mode: 'click',
            afterSaveCell: row=>this.Update(row)
        };
        return(
            <div>
                <BootstrapTable 
                    data={this.state.items} 
                    height='500' 
                    striped hover 
                    scrollTop={ 'Bottom' }
                    insertRow={ true } 
                    deleteRow={ true }
                    selectRow={ selectRowProp }
                    cellEdit={ cellEditProp }
                    options={ options }
                >
                    <TableHeaderColumn 
                        isKey
                        dataField='id'
                        dataSort={ true }
                    >
                        ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='firstName'
                        editable={true}
                        dataSort={ true }
                    >
                        First Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        dataField='lastName'
                        editable={true}
                        dataSort={ true }
                    >
                        Last Name
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default App;
