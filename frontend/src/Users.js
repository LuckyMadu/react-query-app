import React from "react";
import { useQuery } from "react-query";
import * as api from "./usersApi";

const Users = ({ setUserId }) => {
  const { data, isLoading, isError, error } = useQuery("users", api.getUsers, {
    retry: false,
  });

  if (isLoading) {
    return "Loading users...";
  }

  if (isError) {
    return "Error!";
  }

  return (
    <div className="users">
      <ul>
        {data &&
          data.data?.map((user) => (
            <li key={user._id}>
              {user.email}{" "}
              <button onClick={() => setUserId(user._id)}>VIEW</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Users;
