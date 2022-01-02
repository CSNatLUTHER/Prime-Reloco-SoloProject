import React, { Component } from 'react';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu'
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton'
import './Menu.css'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.

// YOU CANNOT USE HOOKS IN CLASS COMPONENTS -- usually Higher Order Components are used instead
// Class Components have different syntax, including `this`
class HeaderClass extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }


  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }

  render () {
    return (
        <Menu 
          right
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
          <img className='navLogo' src="/images/logo.png" alt="" />
          {/* If no user is logged in, show these links */}
          {this.props.store.user.id != null?
            // If there's no user, show login/registration links
            <></>:
            <>
              <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink"  to="/login">
                Login / Register
              </Link>
            </>
          }

          {/* If a user is logged in, show these links */}
          {this.props.store.user.id && (
            <>
              <Link onClick={() => this.closeMenu()} className="navLink" to="/user">HOME</Link>
              <br />
             
            </>
          )}
          {this.props.store.active_event.id && (
            <>
             <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink"  to="/move_event_home">EVENT PAGE</Link>
            <br />
            <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink" to="/move_event_home">SEARCH</Link>
            <br />
            <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink" to="/move_event_home">NEW BOX/ITEM</Link>
            </>
          )}
          <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink" to="/about">
              ABOUT
              </Link>
          <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink" to="/contact">CONTACT</Link>
          {this.props.store.user.id && (
          <Link onClick={() => this.closeMenu()} className="menu-item" className="navLink" to="/home">
            <LogOutButton className="navLink" />
          </Link>
          )}
        </Menu>
    )
  }
}

const mapStoreToProps = (reduxStore) => {
  return {
    store: reduxStore,
  };
};

export default connect(mapStoreToProps)(HeaderClass);
