import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import * as api from "./usersApi";

const UserForm = ({ user, setIsEditing }) => {
  const [fields, setFields] = useState({ ...user });

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation(api.updateUser, {
    // onMutate: (updatedUser) => {},
    onSuccess: (data) => {
      queryClient.setQueryData(["user", user._id], data);
      setIsEditing(false);
      // trigger the old data to be updated
      // queryClient.invalidateQueries(["user", user._id]);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(fields);
  };

  if (isLoading) {
    return "Saving your changes";
  }

  return (
    <div style={{ marginVertical: 50 }}>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input
          type="text"
          name="username"
          value={fields.username}
          onChange={handleChange}
          style={{ width: "50%", marginBottom: 20 }}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserForm;
