import React, { Component } from 'react';
import Nav from './components/Nav';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './components/Main';
import Amacimiz from './components/Amacimiz';
import Kaynaklar from './components/Kaynaklar';
import Telegram from './components/Telegram';
import Klavuzlar from './components/Klavuzlar';
import Projeler from './components/Projeler';
import Kariyer from './components/Kariyer';
import Iletisim from './components/Iletisim';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav />
          <Route exact path='/' component={Main} />
          <Route path='/amacimiz' component={Amacimiz} />
          <Route path='/kaynaklar' component={Kaynaklar} />
          <Route path='/telegram-gruplari' component={Telegram} />
          <Route path='/klavuzlar' component={Klavuzlar} />
          <Route path='/projeler' component={Projeler} />
          <Route path='/is-ilanlari' component={Kariyer} />
          <Route path='/iletisim' component={Iletisim} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
