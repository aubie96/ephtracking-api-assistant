import React, { Component, Fragment } from 'react';

import CodeBlock from '../../components/CodeBlock';
import Preview from '../../components/Preview';
import SelectContentArea from '../../containers/SelectContentArea';

class Indicators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentAreaId: null,
      getChildMeasure: false,
      getMultiMeasure: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setContentAreaId = this.setContentAreaId.bind(this);
  }

  setContentAreaId(contentAreaId) {
    this.setState({ contentAreaId });
  }

  handleInputChange(event) {
    const { name, checked } = event.target;
    this.setState({
      [name]: checked
    });
  }

  render() {
    const { getChildMeasure, getMultiMeasure, contentAreaId } = this.state;
    const validUrl = contentAreaId !== null;
    const url = `https://ephtracking.cdc.gov/apigateway/api/v1/indicators/${contentAreaId}/${
      getChildMeasure ? 1 : 0
    }/${getMultiMeasure ? 1 : 0}`;
    return (
      <Fragment>
        <h1 className="title">Retrieving List of all Content Areas</h1>
        <h5 className="title is-5">Usage</h5>
        <CodeBlock>
          https://ephtracking.cdc.gov/apigateway/api/{'{'}version{'}'}/indicators/{
            '{'
          }contentAreaId{'}'}/{'{'}getChildMeasure{'}'}/{'{'}getMultiMeasure{
            '}'
          }/{'{'}returnType{'}'}[?apiToken]
        </CodeBlock>
        <hr />
        <h5 className="title is-5">Set parameters</h5>
        <SelectContentArea handleSelect={this.setContentAreaId} />
        <div className="field">
          <label className="checkbox">
            <input
              name="getChildMeasure"
              type="checkbox"
              checked={this.state.getChildMeasure}
              onChange={this.handleInputChange}
              className="input-checkbox"
            />
            getChildMeasure
          </label>
        </div>
        <div className="field">
          <label className="checkbox">
            <input
              name="getMultiMeasure"
              type="checkbox"
              checked={this.state.getMultiMeasure}
              onChange={this.handleInputChange}
              className="input-checkbox"
            />
            getMultiMeasure
          </label>
        </div>
        <hr />
        <Preview url={url} validUrl={validUrl} />
      </Fragment>
    );
  }
}

export default Indicators;
