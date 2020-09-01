import React, { Component } from 'react';
import Nav from './components/Nav';
import { Switch, Route } from 'react-router-dom';
import Main from './components/Main';
import Amacimiz from './components/Amacimiz';
import Kaynaklar from './components/Kaynaklar';
import Telegram from './components/Telegram';
import Projeler from './components/Projeler';
import Iletisim from './components/Iletisim';
import Footer from './components/Footer';
import Sidenav from './components/Sidenav';
import Gizlilik from './components/Gizlilik';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

import './index.scss'

class App extends Component {
  render() {
    return (
      <Switch>
        <div className="App">
          <Nav />
          <Sidenav />
          <Route exact path='/' component={Main} />
          <Route path='/amacimiz' component={Amacimiz} />
          <Route path='/kaynaklar' component={Kaynaklar} />
          <Route path='/telegram-gruplari' component={Telegram} />
          <Route exact path='/blog' component={Blog} />
          <Route exact path='/blog/:id' component={BlogPost} />
          <Route path='/projeler' component={Projeler} />
          <Route path='/iletisim' component={Iletisim} />
          <Route path='/gizlilik-politikasi' component={Gizlilik} />
          <Footer />
        </div>
      </Switch>
    );
  }
}

export default App;
