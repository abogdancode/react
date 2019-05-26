import React, { Component } from 'react'

export class DropItems extends Component {
  state = {
    itemTitle: '',
    propsToStateLoaded:false
  };

  handleChange = (e) => {
    e.preventDefault();
    const itemDescription = this.currentDescription(e.target.children)
    const data = {
      itemTitle: e.target.value,
      itemDescription
    }
    this.props.passData(data)
  }

  componentDidMount() {
    
    if (!this.state.propsToStateLoaded) {
      const itemType = this.props.itemType
      const itemDescription = this.props.items[0].description
      const data = {
        itemTitle: this.props.items[0][itemType.slice(0, -1)+ 'Title'],
        itemDescription: itemDescription
      }
      this.props.passData(data)
      this.setState({
        propsToStateLoaded:true
      })
    }
  }
  currentDescription = (elements) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected)
        return elements[i].getAttribute('description')
    }
  }

  render() {
    const itemType = this.props.itemType
    const itemTypeWithoutS = itemType.slice(0, -1)
    return (
        <label>
          Выберите критерий
          <select className='display-block'  onChange={this.handleChange}>
          {this.props.items.map(item => {
            return (
              <option key={'o' + item[itemTypeWithoutS+'Id']}
                  description={item.description}
                value={item[itemTypeWithoutS + 'Title']}

                >{item[itemTypeWithoutS + 'Title']}</option>
              )
            })
          }
          </select>
        </label>
    );
  }
}
