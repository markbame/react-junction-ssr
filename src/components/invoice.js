import React, { Component } from 'react';
import { createJunction } from 'junctions';
import { Link } from 'react-junctions';

const junction = createJunction({
  Invoice: {
    path: '/:invoiceId',
    paramTypes: {
      invoiceId: { required: true },
    },
  },
  Delete: {
    path: '/delete/:invoiceId',
    paramTypes: {
      invoiceId: { required: true },
    },
  },
  Add: {},
});

class Invoice extends Component {
  static junction = junction

  render() {
    const route = this.props.route;
    const locate = this.props.locate;

    return (
      <div>
        <ul>
        <li><Link to={locate(junction.createRoute('Add'))}>Add Invoice</Link></li>
          <li><Link to={locate(junction.createRoute('Invoice', { invoiceId: 1 }))}>Invoice 1</Link></li>
          <li><Link to={locate(junction.createRoute('Invoice', { invoiceId: 2 }))}>Invoice 2</Link></li>
          <li><Link to={locate(junction.createRoute('Delete',{ invoiceId: 1 }))}>Delete 1</Link></li>
          <li><Link to={locate(junction.createRoute('Delete',{ invoiceId: 2 }))}>Delete 2</Link></li>
        </ul>
        {route &&
          <div>
            {route.key} <small>{route.params.invoiceId}</small>
          </div>
        }
      </div>
    );
  }
}

export default Invoice;
