"use client";

import React, { useEffect, useState } from "react";
import UserContext from "./userContext";
import { currentUser } from "@/services/userServices";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function GetData() {
      try {
        const currentuser = await currentUser();
        setUser({ ...currentuser });
      } catch (err) {}
    }
    GetData();
  }, []);
  const state = {
    user,
    refresh: async () => {
      const currentuser = await currentUser();
      setUser({ ...currentuser });
    },
    logout: () => {
      setUser({});
    },
  };
  return (
    <UserContext.Provider value={{ state }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
