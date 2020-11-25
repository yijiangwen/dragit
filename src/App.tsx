import React, { useEffect } from 'react';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { useDispatch, useSelector } from 'react-redux'

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loading from 'admin/common/Loading'
import {thunkIntl} from 'store/intl/thunks';
import { RootState } from 'store';

import Layout from 'admin/Layout';
import ModuleManager from 'designer/ModuleManager';
import useThemeSettings from 'store/theme/useThemeSettings';
import useShadows from 'store/theme/useShadows';
import DrawerEditor from 'designer/DrawerEditor';
import SuccessAlertBar from 'base/SuccessAlertBar';
import Login from 'admin/views/Login';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App Init');
    dispatch(thunkIntl());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const themeSettings = useThemeSettings();
  
  const theme = responsiveFontSizes(createMuiTheme({
    palette: {
      type: themeSettings.themeMode as any,
      primary:{
        main: themeSettings.primary,
      },

    },

    shadows:[...useShadows()] as any
  }));


  const selectIntl = (state: RootState) => state.intl
  const intLang = useSelector(selectIntl)

  return (
    intLang.loading?
      (<Loading />)
    :
      (<ThemeProvider theme={theme}>
        <BrowserRouter>
          <Switch> 
            <Route path="/login" component={Login}></Route>
            <Route path="/admin" component={Layout}></Route>
            <Route path="/design" component={ModuleManager}></Route>
            <Route path="/drawer-edit" component={DrawerEditor}></Route>
            <Redirect to="/login" from='/' /> 
          </Switch>
        </BrowserRouter>
        <SuccessAlertBar />
      </ThemeProvider>)
  );
}

export default App;
