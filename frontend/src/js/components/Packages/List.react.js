import { applicationsStore } from "../../stores/Stores"
import React, { PropTypes } from "react"
import { Row, Col } from "react-bootstrap"
import _ from "underscore"
import ModalButton from "../Common/ModalButton.react"
import Item from "./Item.react"

class List extends React.Component {

  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.state = {
      channels: applicationsStore.getCachedChannels(props.appID),
      packages: applicationsStore.getCachedPackages(props.appID)
    }
  }

  static propTypes: {
    appID: React.PropTypes.string.isRequired
  };

  componentDidMount() {
    applicationsStore.addChangeListener(this.onChange)
  }

  componentWillUnmount() {
    applicationsStore.removeChangeListener(this.onChange)
  }

  onChange() {
    this.setState({
      channels: applicationsStore.getCachedChannels(this.props.appID),
      packages: applicationsStore.getCachedPackages(this.props.appID)
    })
  }

  render() {
    const channels = this.state.channels ? this.state.channels : [],
          packages = this.state.packages ? this.state.packages : []

    let entries = ""

    if (_.isEmpty(packages)) {
      entries = <div className="emptyBox">This application does not have any package yet</div>
    } else {
      entries = _.map(packages, (packageItem, i) => {
        return <Item key={packageItem.id} packageItem={packageItem} channels={channels} />
      })
    }

    return (
      <div>
        <Row>
          <Col xs={12}>
            <h1 className="displayInline mainTitle">Packages</h1>
            <ModalButton icon="plus" modalToOpen="AddPackageModal" data={{channels: channels, appID: this.props.appID}} />
          </Col>
        </Row>
        <div className="groups--packagesList">
          {entries}
        </div>
      </div>
    )
  }

}

export default List
