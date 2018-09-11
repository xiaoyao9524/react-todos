import React from 'react'

class List extends React.Component {

  renderItem () {

  }

  onChange = (ev, index) => {    
    this.props.modifyItemSelect(index, ev.target.checked);
  }

  render () {
    let originList = this.props.originList.slice();
    for (let i = 0; i < originList.length; i++) {
      originList[i].index = i;
    }

    let mode = this.props.mode;
    let list = this.props.list.slice();
    if (mode === 'completed') { // 已完成
      list = originList.filter((item) => item.isDone === true);
    } else
    if (mode === 'unfinished') { // 未完成
      list = originList.filter((item) => item.isDone === false);
    } else
    if (mode === 'all') { // 全部
      list = originList.slice();
    }

    const Items = list.map((item, index) => {
      let done = item.isDone ? 'done' : '';
      return (
        <li 
          className={['item', done].join(' ')} 
          index={item.index} 
          key={item.id}
        >
          <input 
            className="check"
            onChange={(ev) => {
              this.onChange(ev, item.index);
            }} 
            checked={item.isDone} 
            type="checkbox"
          />
          <div 
            className="content"
          >{item.title}</div>
          <button 
            onClick={() => {
              this.props.deleteItem(item.index);
            }} 
            className="del"
          >删除</button>
        </li>
      )
    })

    return (
      <div className="list-wrapper">
        <h3>任务列表：</h3>
        <ul className="todo-list">
        {Items}
      </ul>
      </div>
    )
  }
}

export default List;