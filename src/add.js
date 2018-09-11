import React from 'react'

class Add extends React.Component {

  constructor () {
    super();
    this.state = {
      isFocus: false,
      title: ''
    }
  }

  onKeyDown (ev) {
    if (ev.keyCode !== 13 || !this.state.isFocus || !this.state.title) {return};
    let item = {
      title: this.state.title
    }
    this.props.addItem(item);
    this.setState({
      title: ''
    })
  }

  componentDidMount () {
    document.addEventListener('keydown', (ev) => {
      this.onKeyDown(ev);
    })
  }

  onFocus () {
    this.setState({
      isFocus: true
    })
  }

  onInput (ev) {
    this.setState({
      title: ev.target.value
    })
  }

  onBlur (ev) {
    this.setState({
      isFocus: false
    })
  }

  render () {
    return (
        <div className="add">
          <h3 className="add-title">添加任务:</h3>
          <input
            className="add-input"
            onFocus={(ev) => {
              this.onFocus(ev);
            }}
            onInput={(ev) => {
              this.onInput(ev);
            }}
            onBlur={(ev) => {
              this.onBlur(ev);
            }}
            type="text" 
            value={this.state.title}
            placeholder="你想做什么"
          />
          <div className="information-wrapper clearfix">
            <span className="information">{this.props.originList.filter((item) => item.isDone === false).length}个未完成任务</span>
            <div className="button-box">
              <button onClick={() => {this.props.setMode('all')}}>全部</button>
              <button onClick={() => {this.props.setMode('unfinished')}}>未完成</button>
              <button onClick={() => {this.props.setMode('completed')}}>已完成</button>
            </div>
          </div>
        </div>
    )
  }
}

export default Add;