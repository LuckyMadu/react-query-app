import React, { useState } from "react";
import { useQuery } from "react-query";
import UserForm from "./UserForm";
import * as api from "./usersApi";

const UserDetail = ({ userId }) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery(["user", userId], () => api.getUser(userId), {
    enabled: Boolean(userId),
  });

  if (!userId) {
    return "select user!";
  }

  if (isLoading) {
    return "Loading user...";
  }

  if (isError) {
    return "Error!";
  }

  return (
    <div>
      {/* {isFetching && "Background refetching..."} */}

      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? "CANCEL" : "EDIT"}
      </button>

      {isEditing ? (
        <UserForm user={user} setIsEditing={setIsEditing} />
      ) : (
        <>
          <h1>{user?.username}</h1>
          <h2>{user?.email}</h2>
        </>
      )}
    </div>
  );
};

export default UserDetail;
