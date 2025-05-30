import React from 'react'
import { DownOutlined, SettingOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';

const PushdownMenu = () => {
    const user = useSelector(state => state.username.value);
    const items = [
        {
            type: 'divider',
        },
        {
            key: '1',
            label: (
                <Link to="/orders" className="flex items-center space-x-3 py-2 px-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <span className="font-medium">Orders</span>
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <Link to="/sales" className="flex items-center space-x-3 py-2 px-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="font-medium">Sales</span>
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to="/" className="flex items-center space-x-3 py-2 px-1 text-red-600 hover:text-red-700 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Logout</span>
                </Link>
            ),
        },
    ];
    return (
        <Dropdown 
            menu={{ items }}
            overlayClassName="custom-dropdown"
            trigger={['click']}
            placement="bottomRight"
            overlayStyle={{
                background: 'white',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                minWidth: '180px',
                padding: '8px 0'
            }}
        >
            <div className="relative">
                <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
                               text-white px-6 py-2.5 rounded-full cursor-pointer 
                               transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg
                               border border-blue-400/30 backdrop-blur-sm
                               flex items-center space-x-3 min-w-[120px] justify-between"
                    onClick={e => e.preventDefault()}
                >
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-white">
                                {user?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>
                        <span className="text-white font-medium text-sm truncate max-w-[100px]">
                            {user}
                        </span>
                    </div>
                    <div className="text-white/80 transition-transform duration-200 group-hover:rotate-180">
                        <DownOutlined className="text-xs" />
                    </div>
                </div>
            </div>
        </Dropdown>
    )
}

export default PushdownMenu