// for getCoreHolder
// provides filter with StateFips and CountyFips
// based on measureId and geographicType

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import CountyFIPS from '../CountyFIPS';
import StateFIPS from '../../containers/StateFIPS';
import SelectState from '../../containers/SelectState';

class GeographicFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateFips: null
    };
    this.setStateFips = this.setStateFips.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleCountyChange = this.handleCountyChange.bind(this);
  }

  setStateFips(stateFips) {
    console.log(stateFips);
    this.setState({ stateFips: parseInt(stateFips, 10) });
  }

  handleStateChange(event) {
    console.log(event);
    if (event.length === 0 || event[0] === 'ALL') {
      // no filter selected or all states selected
      this.props.handleSelect({
        geographicTypeIdFilter: 'ALL',
        geographicItemsFilter: 'ALL'
      });
    } else {
      this.props.handleSelect({
        geographicTypeIdFilter: '1',
        geographicItemsFilter: event
      });
    }
  }

  handleCountyChange(event) {
    if (event.length === 0 || event[0] === 'ALL') {
      // no filter selected or all counties selected
      this.props.handleSelect({
        geographicTypeIdFilter: 'ALL',
        geographicItemsFilter: 'ALL'
      });
    } else {
      this.props.handleSelect({
        geographicTypeIdFilter: '2',
        geographicItemsFilter: event
      });
    }
  }

  render() {
    const { measureId, geographicTypeId } = this.props;

    // two cases: geographic can be state or county
    return (
      <Fragment>
        {
          geographicTypeId === '2' &&
            <div>
              <SelectState measureId={measureId} handleSelect={this.setStateFips} />
              <CountyFIPS stateFips={this.state.stateFips} handleCheck={this.handleCountyChange} />
            </div>
        }
        {
          geographicTypeId === '1' &&
            <StateFIPS measureId={measureId} handleCheck={this.handleStateChange} />
        }
      </Fragment>
    )
  }
}

GeographicFilter.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  measureId: PropTypes.string,
  geographicTypeId: PropTypes.string
}

export default GeographicFilter;
