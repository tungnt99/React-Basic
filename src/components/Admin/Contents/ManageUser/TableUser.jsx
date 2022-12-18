
export default function TableUser(props) {
    const {listUsers} = props;
  
    return (
        <>
            <table className="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return(
                            <tr key={index + 1}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className='mx-2 btn btn-info'>View</button>
                                    <button className='mx-2 btn btn-warning' onClick={() => props.handleModalUpdateUser(item)}>Edit</button>
                                    <button className='mx-2 btn btn-danger'>Delete</button>

                                </td>

                            </tr>
                        )
                    })}
                    {listUsers && listUsers.length === 0 && <tr><td colSpan={'4'}>Not found data</td></tr>}
                    
                </tbody>
            </table>

        </>
    )
}
