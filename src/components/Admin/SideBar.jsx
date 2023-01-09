import React from 'react'
import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaGem, FaGithub } from 'react-icons/fa';
import sidebarBg from './assets/bg2.jpg';
import { DiReact } from 'react-icons/di';
import { MdDashboard } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function SideBar(props) {
    // translation
    const { t } = useTranslation();
    // end translation
    const navigate = useNavigate();
    const handleBackHome = () => {
        navigate('/')
    }
    const { collapsed, toggled, handleToggleSidebar } = props;
    // const [name, setName] = useState('')
    const account = useSelector(state => state.user.account);
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleBackHome()}
                    >
                        <DiReact size={'3em'} color={"#00bfff"} />
                        <span className='text-capitalize'>{account.username}</span>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                        >
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title={t('sidebar.manage')}
                        >
                            <MenuItem>{t('sidebar.manageuser')}
                                <Link to="/admin/manage-user" />
                            </MenuItem>
                            <MenuItem>{t('sidebar.managequiz')}
                                <Link to="/admin/manage-quiz" />
                            </MenuItem>
                            <MenuItem>{t('sidebar.managequestion')}
                                <Link to="/admin/manage-question" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>
                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/azouaoui-med/react-pro-sidebar"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                Thanh Tùng
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}
