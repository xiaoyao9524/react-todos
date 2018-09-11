import React from 'react'

class Footer extends React.Component {
  constructor () {
    super();
    this.state = {
      isSelectAll: false // true为全选
    }
  }

  selectAll (ev) {
    let isSelectAll = ev.target.checked;
    this.setState({
      isSelectAll
    }, function () {
      this.props.selectAll(isSelectAll);
    })
  }

  render () {
    return (
      <footer>
        <span>全选:<input checked={this.state.isSelectAll} type="checkbox" onChange={(ev) => {this.selectAll(ev)}} />
        </span><span>已完成：{this.props.originList.filter((item) => item.isDone === true).length}项</span>
        <span>一共：{this.props.originList.length}项</span>
      </footer>
    )
  }
}

export default Footer;