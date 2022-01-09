import React, { useEffect, useState } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import Footer from '../SharedComponents/Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserHome/UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import CreateMoveEvent from '../CreateMoveEvent/CreateMoveEvent';
import ManageEvent from '../ManageMoveEvent/ManageMoveEvent';
import MoveEventHome from '../MoveEventHome/MoveEventHome';
import CreateNewItem from '../CreateNewItem/CreateNewItem';
import NewItemConfirmation from '../NewItemConfirmation/NewItemConfirmation';
import ItemSearchResults from '../ItemSearchResults/ItemSearchResults'
import ItemInfo from '../ItemInfo/ItemInfo';
import ItemEdit from '../ItemEdit/ItemEdit';
import CreateNewBox from '../CreateNewBox/CreateNewBox';
import NewBoxConfirmation from '../NewBoxConfirmation/NewBoxConfirmation';
import BoxSearchResults from '../BoxSearchResults/BoxSearchResults';
import BoxInfo from '../BoxInfo/BoxInfo';
import BoxContents from '../BoxContents/BoxContents';
import BoxEdit from '../BoxEdit/BoxEdit';
import Contact from '../Contact/Contact';
import ContactUs from '../Contact/ContactUs/ContactUs';
import ContactThankYou from '../Contact/ContactThankYou/ContactThankYou';
import MoveEventReport from '../MoveEventReport/MoveEvent Report';
import Menu from '../SharedComponents/Nav/Menu';



import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);


  const theme = createTheme({
    palette: {
      primary: {
        light: '#6573c3',
        main: '#3f51b5',
        dark: '#2c387e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffcf33',
        main: '#ffc400',
        dark: '#b28900',
        contrastText: '#696969',
      },
    },
  });

  return (
    <div className='appDiv'>
      <ThemeProvider theme={theme}>
      <Router>
        <div className='base'>
          <div className='menuDiv'>
          <Menu />
          </div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/login" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

              {/* INFO ROUTE */}
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            {/* EVENT REPORT */}
            <ProtectedRoute
              // show a list of all items on for a move event
              exact
              path="/report"
            >
              <MoveEventReport />
            </ProtectedRoute>

            {/* CREATE MOVE EVENT ROUTE */}
            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/create_move_event"
            >
              <CreateMoveEvent />
            </ProtectedRoute>

            {/* MANAGE EVENT ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/manage_event"
            >
            <ManageEvent />
            </ProtectedRoute>

            {/* MOVE EVENT HOME ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/move_event_home"
            >
            <MoveEventHome />
            </ProtectedRoute>

            {/* CREATE NEW ITEM ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/create_new_item"
            >
            <CreateNewItem />
            </ProtectedRoute>

            {/* NEW ITEM CONFIRMATION ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/new_item_confirmation"
            >
            <NewItemConfirmation />
            </ProtectedRoute>

            {/* ITEM SEARCH RESULTS ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/item_search_results"
            >
            <ItemSearchResults />
            </ProtectedRoute>

            {/* ITEM INFO ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/item_info"
            >
            <ItemInfo />
            </ProtectedRoute>

            {/* ITEM EDIT ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/item_edit"
            >
            <ItemEdit />
            </ProtectedRoute>

            {/* CREATE NEW BOX ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/create_new_box"
            >
            <CreateNewBox />
            </ProtectedRoute>

            {/* NEW BOX CONFIRMATION ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/new_box_confirmation"
            >
            <NewBoxConfirmation />
            </ProtectedRoute>

            {/* BOX SEARCH RESULTS ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/box_search_results"
            >
            <BoxSearchResults />
            </ProtectedRoute>

            {/* BOX INFO ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/box_info"
            >
            <BoxInfo />
            </ProtectedRoute>

            {/* BOX EDIT ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/box_edit"
            >
            <BoxEdit />
            </ProtectedRoute>

            {/* BOX CONTENTS ROUTE */}
            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/box_contents"
            >
            <BoxContents />
            </ProtectedRoute>

            {/* LOGIN ROUTE */}
            <Route
              exact
              path="/login"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the login page
                <LoginPage />
              }
            </Route>

              {/* REGISTRATION ROUTE */}
            <Route
              exact
              path="/registration"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the registration page
                <RegisterPage />
              }
            </Route>

            {/* CONTACT US ROUTE */}
            <Route
              exact
              path="/contact_us"
              >
              
              <ContactUs/>
            </Route>

            <Route
              exact
              path="/contact"
              >
              
              <Contact/>
            </Route>

            {/* CONTACT THANK YOU ROUTE */}
            <Route
              exact
              path="/contact_thank_you"
              >
              
              <ContactThankYou/>
            </Route>

            {/* HOME ROUTE */}
            <Route
              exact
              path="/home"
            >
              {user.id ?
                // If the user is already logged in, 
                // redirect them to the /user page
                <Redirect to="/user" />
                :
                // Otherwise, show the Landing page
                <LandingPage />
              }
            </Route>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <h1>404</h1>
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
    </div>
  );
}

export default App;
