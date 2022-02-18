import React from 'react';
import Search from './Search';
import QuickSearch from './QuickSearch';
import Header from '../Header';

const Home = () => {
    return(
        <div>
            <Header homeHeader={1}/>
            <Search/>
            <QuickSearch/>
        </div>
    )
}

export default Home;