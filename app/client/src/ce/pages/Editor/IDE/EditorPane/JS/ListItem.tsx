import React from "react";
import type { EntityItem } from "ee/IDE/Interfaces/EntityItem";
import { JSEntityItem } from "pages/Editor/IDE/EditorPane/JS/EntityItem/JSEntityItem";

export const JSEntity = (props: { item: EntityItem }) => {
  return <JSEntityItem {...props} />;
};
