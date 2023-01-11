import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ChanglePassword from './ChanglePassword';
import History from './History';
import UserInfo from './UserInfo';
import './style/main.scss'
export default function Profile() {
    return (
        <div className='container profile-container'>
            <Tabs
                defaultActiveKey="user-info"
                transition={false}
                id="noanim-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="user-info" title="User Information">
                    <UserInfo />
                </Tab>
                <Tab eventKey="changle-password" title="Change Password">
                    <ChanglePassword />
                </Tab>
                <Tab eventKey="history" title="History">
                    <History />
                </Tab>
            </Tabs>

        </div>
    )
}
