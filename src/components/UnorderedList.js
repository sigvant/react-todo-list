import React from 'react'

function UnorderedList({ list, deleteItem }) {
    
    return (
        <ul>
            {list.map(item => {
              return (
                <li key={item.id}>
                  {item.value}
                  <button onClick={() => deleteItem(item.id)}>
                    X
                  </button>
                </li>
              )
            })}
          </ul>
    )
}

export default UnorderedList
