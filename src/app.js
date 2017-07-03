import React, { Component } from 'react';
import { connect } from 'react-redux';
//
import {createBrowserHistory, createMemoryHistory} from 'history';
import { createJunction } from 'junctions';
import { Link, Router } from 'react-junctions';
import Invoice from './components/invoice';

var history;
if (typeof(window) !== 'undefined'){
    history = createBrowserHistory();
}
else {
    history = createMemoryHistory();
}

const junction = createJunction({
  Dashboard: {
    default: true,
  },
  Invoices: {
    next: Invoice.junction,
  },
});

class AppContent extends Component {
  renderRoute(route, locate) {
    switch (route && route.key) {
      case 'Invoices':
        return <Invoice route={route.next} locate={route.locate} />

      case undefined:
        return <h1>404</h1>

      default:
        return <h1>{route.key}</h1>
    }
  }

  render() {
    return (
      <div>
        <div style={{fontSize:'20px'}}>{this.props.title}</div>
        <nav>
          <Link to={{pathname: "/dashboard"}}>Dashboard</Link><br/>
          <Link to={{pathname: "/invoices"}}>Invoices</Link>
        </nav>
        {this.renderRoute(this.props.route, this.props.locate)}
      </div>
    )
  }
}

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      initialMessage: 'Test Content',
    };
  }

  render() {
    const { initialMessage } = this.state;
    return (
      <Router
        history={history}
        junction={junction}
        render={<AppContent title='Junctions' />}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data,
  };
}

export default connect(mapStateToProps)(App)
