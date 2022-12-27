import React, { useState } from 'react'

export default function DisplayInfo(props) {
  const { listUsers } = props;
  const [showList, setShowList] = useState(true);

  const handleShowListUsers = () => {
    // alert('Show list users');
    setShowList(!showList);
  }
  return (
    <div>
      <div>
        <span onClick={() => handleShowListUsers()}>
          {showList === true ? 'Hide list users' : 'Show list users'}
        </span>
      </div>
      {showList &&
      <>
          {listUsers && listUsers.length > 0 && listUsers.map(item => {

            return (
              <div key={item.id} className={+item.age > 18 ? "green" : "red"}>
                <div className='d-flex justify-content-center align-items-center'>
                  <div>{item.name} - {item.age}</div>
                  <span><button onClick={() => props.onClick(item)}>Delete</button></span>

                </div>

              </div>
            )
          })}

      </>
      
      }
    </div>
  )
}
