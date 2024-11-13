"use client"
import { useEffect, useState } from 'react';

import {
  getFacebookLoginStatus,
  initFacebookSdk,
  fbLogin,
} from '../facebook'
import { Button } from '@nextui-org/react';
const Adds = ({admin}) => {
  const [pageInfo, setPageInfo] = useState(null);
  const [pageMedia, setPageMedia] = useState(null);
 
  useEffect(() => {
    console.log("Started use effect");
    initFacebookSdk().then(() => {
      getFacebookLoginStatus().then((response) => {
        if (response == null) {
          console.log("No login status for the person");
        } else {
          console.log(response);
        }
      });
    });
  }, []);

  function login() {
    console.log("reached log in button");
    fbLogin().then((response) => {
      console.log(response);
      if (response.status === "connected") {
        console.log("Person is connected");
      } else {
        // something
      }
    });
  }

  return (
    <div>
   <Button color='primary' onPress={login}>התחבר עם</Button>
  </div>
  );
}

export default Adds