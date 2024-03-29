import React, { useState, useEffect } from 'react';
import { Menu, Icon, Row, Button } from 'antd';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { ReactComponent as GlassIcon } from '../../assets/icons/glass.svg';
import { ReactComponent as LemonIcon } from '../../assets/icons/lemon.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/home.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/icons/categories.svg';
import { ReactComponent as RandomIcon } from '../../assets/icons/random.svg';
import { ReactComponent as LogoIcon } from '../../assets/logo.svg';
import useWindowWidth from '../../hooks/useWindowWidth';

import './NavBar.sass';

interface MenuItem {
  to: string;
  text: string;
  iconComponent: any;
}

const links: MenuItem[] = [
  { to: '/', text: 'Home', iconComponent: HomeIcon },
  { to: '/categories', text: 'Categories', iconComponent: CategoriesIcon },
  { to: '/ingredients', text: 'Ingredients', iconComponent: LemonIcon },
  { to: '/glasses', text: 'Glasses', iconComponent: GlassIcon },
  { to: '/random', text: 'Random', iconComponent: RandomIcon },
];

const renderMenuItem = ({ to, text, iconComponent }: MenuItem) => (
  <Menu.Item style={{ height: 64, lineHeight: '64px', fontSize: 16 }} key={to}>
    <Link to={to}>
      <Icon
        style={{ fontSize: 24 }}
        component={iconComponent}
      />
      {text}
    </Link>
  </Menu.Item>
);

const NavBar: React.FC<RouteComponentProps> = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const width = useWindowWidth();

  useEffect(() => {
    if (width >= 680) {
      setIsOpen(false);
    }
  }, [width]);

  return (
    <>
      <Row type="flex" align="middle" justify="end" style={{ flexWrap: 'nowrap' }}>
        {width < 900 && (
          <Button
            style={{ marginLeft: 16 }}
            className="hamburger"
            icon="menu"
            onClick={() => setIsOpen(true)}
          />
        )}
        <Link to="/" className="logo">
          <Icon
            style={{ fontSize: 24, marginRight: 8 }}
            component={LogoIcon as any}
          />
          Cocktails And Chill
        </Link>
        <nav className={`nav ${isOpen ? 'nav--open' : ''}`}>
          <div className="nav__transparent-bg" onClick={() => setIsOpen(false)}>
            <Menu
              className="nav__menu"
              selectedKeys={[props.location.pathname]}
              mode={width >= 900 ? 'horizontal' : 'vertical'}
            >
              {links.map(renderMenuItem)}
            </Menu>
          </div>
        </nav>
      </Row>
    </>
  );
};

export default withRouter(NavBar);
