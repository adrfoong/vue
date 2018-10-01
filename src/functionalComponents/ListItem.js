import Vue from "vue";
import "./ListItem.css";
import DeletableListItem from "../components/DeletableListItem";

export default {
  functional: true,
  props: {
    label: String,
    deleteHandler: Function,
    editLabel: Function
  },
  render: (h, { props }) => {
    return (
      <DeletableListItem
        label={props.label}
        editLabel={props.editLabel}
        deleteHandler={props.deleteHandler}
      />
    );
  }
};
