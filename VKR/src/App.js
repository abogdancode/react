import React, { Component } from 'react';
import { BroserRouter, Switch, Route } from 'react-router-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProject from './components/projects/CreateProject'
import CriterionSettings from './components/securityTools/CriterionSettings'
import AddSecurityTool from './components/securityTools/AddSecurityTool'



class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route path='/type/:id' component={ProjectDetails} />
            <Route path='/signIn' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create' component={CreateProject} />
            <Route path='/updateType/:id' component={CreateProject} />
            <Route exact path='/AddSecurityTool/:toolTypeId' component={AddSecurityTool} />
            <Route path='/AddSecurityTool/:toolTypeId/:toolId' component={AddSecurityTool} />
            <Route path='/AddSecurityTool' component={AddSecurityTool} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
