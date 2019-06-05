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
import SystemDesigner from './components/sistemDesigner/SystemDesigner'
import SystemDashboard from './components/systemDashboard/SystemDashboard'
import DataProcesor from './components/sistemDesigner/DataProcessor'



class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path='/' component={Navbar} />
          </Switch>

          <Switch>
            <Route exact path='/' component={SystemDashboard} />
            <Route path='/toolTypeDashboard/:systemId' component={ Dashboard} />

            <Route path='/toolType/:systemId/:id' component={ProjectDetails} />
            

            <Route path='/signIn' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/create/:systemId' component={CreateProject} />
            <Route path='/updateType/:systemId/:id' component={CreateProject} />
            <Route path='/copyType/:systemId/:id' component={CreateProject} />
            <Route exact path='/AddSecurityTool/:toolTypeId' component={AddSecurityTool} />
            <Route exact path='/AddSecurityToolItems/:toolTypeId/:toolId' component={AddSecurityTool} />
            {/* <Route exact path='/AddSecurityTool' component={AddSecurityTool} /> */}
            <Route path='/systemDesigner' component={SystemDesigner} />
            
            <Route path='/report/:systemId/:toolTypeId' component={DataProcesor} />

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
