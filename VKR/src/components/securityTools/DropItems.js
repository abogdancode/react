import React, { Component } from 'react'

export class DropItems extends Component {
  state = {
    itemTitle: '',
    propsToStateLoaded: false,
    currentDescValue: '',
  };

  handleChange = (e) => {
    e.preventDefault();
    
    const itemDescription = this.currentProperty(e.target.children,'description')
    const typeOfItemId = this.currentProperty(e.target.children, 'typeofitemid')
    const data = {
      itemTitle: e.target.value,
      itemDescription,
      typeOfItemId
    }
    this.props.passData(data)
    this.setState({
      currentDescValue: itemDescription
    })
  }

  componentDidMount() {
    
    if (!this.state.propsToStateLoaded && this.props.items.length) {
  
      const itemType = this.props.itemType
      const itemDescription = this.props.items[0].description
      const typeOfItemId = this.props.items[0][itemType.slice(0, -1)+'Id']
      const data = {
        itemTitle: this.props.items[0][itemType.slice(0, -1)+ 'Title'],
        itemDescription: itemDescription,
        typeOfItemId
      }
      this.props.passData(data)
      this.setState({
        propsToStateLoaded: true,
        currentDescValue: itemDescription
        
      })
    }
  }
  currentProperty = (elements, propertyType) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].selected)
        return elements[i].getAttribute(propertyType)
    }
  }

  render() {
    const itemType = this.props.itemType
    const itemTypeWithoutS = itemType.slice(0, -1)
    return (
      <div>
        <label>
          Выберите критерий
          <select className='display-block' onChange={this.handleChange}>
            {this.props.items.map(item => {
              if (item) {
                return (
                  <option key={'o' + item[itemTypeWithoutS + 'Id']}
                    description={item.description}
                    value={item[itemTypeWithoutS + 'Title']}
                    typeofitemid={item[itemTypeWithoutS + 'Id']}
                  >{item[itemTypeWithoutS + 'Title']}</option>
                )
              }
            })
            }
          </select>
        </label>
        <div className='card'>
          <span className='card-title'>Описание </span>
          <p>{this.state.currentDescValue}</p>
        </div>
      </div>
        
    );
  }
}
