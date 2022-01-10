import React from 'react'
import './header.css';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Divider } from 'antd';

function Header({ handleLogout, monthTimeSpend, currentTimeSpend, activities, lastActivities, currentTask }) {

    const menu = (
        <Menu>
            <Menu.ItemGroup title="My last activities">
                {lastActivities.map((item, i) => {
                    return (
                        <Menu.Item key={i}>
                            <span className="menu-item__svg">
                                <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="pause-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm-88-532h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8zm224 0h-48c-4.4 0-8 3.6-8 8v304c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V360c0-4.4-3.6-8-8-8z"></path></svg>
                            </span>
                            <span className="menu-item__svg svg-play-button">
                                <svg viewBox="0 0 1024 1024" focusable="false" class="" data-icon="caret-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M715.8 493.5L335 165.1c-14.2-12.2-35-1.2-35 18.5v656.8c0 19.7 20.8 30.7 35 18.5l380.8-328.4c10.9-9.4 10.9-27.6 0-37z"></path></svg>
                            </span>
                            <a href="#">{item.name}</a>
                            <span>({item.activity})</span>
                        </Menu.Item>
                    )
                })}
            </Menu.ItemGroup>
            {/* <Menu.ItemGroup title="Current team activities">
                <Menu.Item>3rd menu item</Menu.Item>
            </Menu.ItemGroup> */}
        </Menu>
    );

    return (
        <div className="header">
            <div className="header-wrap">
                <div className="header-logo">
                    <a className="header-logo__title" href="#">Gearheart</a>
                </div>

                <div className="header-right">
                    {currentTask &&
                        <div className="header-right-task">
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="flag" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 305H624V192c0-17.7-14.3-32-32-32H184v-40c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8V640h248v113c0 17.7 14.3 32 32 32h416c17.7 0 32-14.3 32-32V337c0-17.7-14.3-32-32-32zM184 568V232h368v336H184zm656 145H504v-73h112c4.4 0 8-3.6 8-8V377h216v336z"></path></svg>
                            <span className="header-right-task__text task-name">{currentTask.name}</span>
                            <span className="header-right-task__text">({currentTask.activity})</span>
                        </div>
                    }
                    <Divider type="vertical" />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <a href="#" className="ant-dropdown-link" onClick={() => activities()}>
                            Last Activities <DownOutlined />
                        </a>
                    </Dropdown>
                    <Divider type="vertical" />
                    <div className="header-timer">
                        <div className="header-timer__item">
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="hourglass" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M742 318V184h86c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H196c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h86v134c0 81.5 42.4 153.2 106.4 194-64 40.8-106.4 112.5-106.4 194v134h-86c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h632c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8h-86V706c0-81.5-42.4-153.2-106.4-194 64-40.8 106.4-112.5 106.4-194zm-72 388v134H354V706c0-42.2 16.4-81.9 46.3-111.7C430.1 564.4 469.8 548 512 548s81.9 16.4 111.7 46.3C653.6 624.1 670 663.8 670 706zm0-388c0 42.2-16.4 81.9-46.3 111.7C593.9 459.6 554.2 476 512 476s-81.9-16.4-111.7-46.3A156.63 156.63 0 01354 318V184h316v134z"></path></svg>
                            <span className="header-timer__time">{currentTimeSpend}</span>
                        </div>
                        <div className="header-timer__item">
                            <svg viewBox="64 64 896 896" focusable="false" class="" data-icon="calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path></svg>
                            <span className="header-timer__time">{monthTimeSpend}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="header-button">
                <button className="header-button__logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;