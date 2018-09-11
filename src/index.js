import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import Header from './header'
import Add from './add'
import List from './list'
import tool from './common/js/tool'


// function getHash (key) {
//   let hash = window.location.hash.slice(1);
//   let arr = hash.split('&');
//   for (let i = 0; i < arr.length; i++) {
//     let item = arr[i].split('=');
//     let name = item[0];
//     if (name == key) {
//       return item[1];
//     }
//   }
//   return ''
// }

let originList = [
  {
    id: tool.createID(),
    title: '学习React',
    isDone: false
  },
  {
    id: tool.createID(),
    title: '学习Vue',
    isDone: true
  }
];



class Todo extends React.Component {
  constructor() {
    super();
    this.state = {
      mode: 'all',
      originList,
      list: originList.slice()
    }
  }

  componentDidMount () {
    // window.addEventListener('hashchange', () => {
    //   console.log('hash改变了：', window.location.hash.slice(1))
    //   this.setState({
    //     mode: window.location.hash.slice(1)
    //   })
    // });
  }

  addItem = (item) => {
    let list = this.state.originList.slice();
    item.id = tool.createID();
    item.isDone = false;
    list.push(item);
    this.setState({
      originList: list
    }, this.renderList)
  }

  modifyItemSelect = (index, flag) => { // 修改某一项选中状态
    let originList = this.state.originList.slice();
    originList[index].isDone = flag;
    this.setState({
      originList
    }, this.renderList)
  }

  deleteItem = (index) => { // 删除某一项
    let originList = this.state.originList.slice();
    originList.splice(index, 1);
    this.setState({
      originList
    }, this.renderList)
  }
  
  setMode = (mode) => {
    this.setState({
      mode: mode ? mode : this.state.mode
    }, this.renderList)
  }

  renderList = () => {
    let mode = this.state.mode;
    let originList = this.state.originList.slice();
    let list = this.state.list.slice();
    if (mode === 'completed') { // 已完成
      list = originList.filter((item) => item.isDone === true);
    } else
    if (mode === 'unfinished') { // 未完成
      list = originList.filter((item) => item.isDone === false);
    } else
    if (mode === 'all') { // 全部
      list = originList.slice();
    }
    this.setState({
      list
    })
    return list;
  }

  selectAll = (flag) => {
      let originList = this.state.originList.slice();
      for (let i = 0; i < originList.length; i++) {
        originList[i].isDone = flag;
      }
      this.setState({
          originList
        }, this.renderList)
  }

  render () {
    return (
      <div className="todo">
        <Header />
        <Add 
          addItem={this.addItem} 
          setMode={this.setMode}
          originList={this.state.originList}
        />
        <List 
          mode={this.state.mode}
          originList={this.state.originList}
          list={this.state.list} 
          modifyItemSelect={this.modifyItemSelect}
          deleteItem={this.deleteItem}
        />
      </div>
    )
  }
}

ReactDOM.render(<Todo/>, document.getElementById('root'));
