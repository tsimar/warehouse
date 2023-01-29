import React from "react";

export default function DeleteApI({ id, data, api }) {
  const newData = data;
  const index = data.findIndex((contact) => contact.id === id);

  newData.splice(index, 1);

  api.delete(`/${id}`);
  return newData;
}
