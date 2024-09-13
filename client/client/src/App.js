import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './components/Login';
import CategoryOfBooks from './components/CategoryOfBooks';
import Transactions from './components/User/Transactions';
import MaintenanceMenu from './components/Admin/MaintenanceMenu';
import ReportsMenu from './components/Admin/ReportsMenu';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/categories" component={CategoryOfBooks} />
            <Route path="/transactions" component={Transactions} />
            <Route path="/admin/maintenance" component={MaintenanceMenu} />
            <Route path="/admin/reports" component={ReportsMenu} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;