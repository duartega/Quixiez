import React from "react";
import { format, getMinutes, getHours, parse } from "date-fns";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

type Props = {
  status: string;
  statusColor: string;
  id: number;
  Minutes: string;
  Hours: string;
};

type Status =
  | "CONSTRUCT_ORDER"
  | "COMPLETE"
  | "IN_PROGRESS"
  | "CONSUMER_CANCELLED"
  | "COMPANY_REJECTED"
  | "COMPANY_COMPLETE";

type CreatingAccountStatus =
  | "NOT_STARTED"
  | "FIRST_NAME"
  | "LAST_NAME"
  | "ADDRESS"
  | "CONSUMER_TYPE"
  | "DL_IMAGE"
  | "REC_IMAGE";

type Color = "primary" | "warning" | "danger" | "success";
type ReturnType = [string, Color];

const isCreatingAccount = (status: CreatingAccountStatus): boolean => {
  return (
    status ===
    ("NOT_STARTED" ||
      "FIRST_NAME" ||
      "LAST_NAME" ||
      "ADDRESS" ||
      "CONSUMER_TYPE" ||
      "DL_IMAGE" ||
      "REC_IMAGE")
  );
};

export const changeStatusMessage = (
  status: Status | CreatingAccountStatus
): ReturnType => {
  switch (status) {
    case "CONSTRUCT_ORDER":
      return ["PENDING", "primary"];
    case "COMPLETE":
      return ["NEW ORDER", "success"];
    case "IN_PROGRESS":
      return ["IN PROGRESS", "warning"];
    case "CONSUMER_CANCELLED":
      return ["CANCELLED", "warning"];
    case "COMPANY_REJECTED":
      return ["REJECTED", "danger"];
    case "COMPANY_COMPLETE":
      return ["COMPLETED", "success"];
    default:
      return isCreatingAccount(status)
        ? ["CREATING ACCOUNT", "primary"]
        : ["ERROR", "danger"];
  }
};

export const updateButton = (status: Status) => {
  return (
    <Button
      className="btn-simple"
      color={status[1]}
      disabled
      style={{ maxWidth: "300px", minWidth: "150px" }}
    >
      {status[0]}
    </Button>
  );
};

export const calculateTime = (timeReceived: string | Date) => {
  // Using Date-FNS, it automatically converts the UTC to your local time zone
  let hour = getHours(new Date(timeReceived));
  let minutes: string = getMinutes(new Date(timeReceived)) + "";

  let amPm = false;
  // Set the PM tag to true if it is 12 PM
  if (hour > 11) {
    amPm = true;
  }

  // Convert the time format to 12 hour format
  if (hour > 12) {
    hour %= 12;
  }

  // Format minutes to show 10:07 instead of 10:7
  minutes = format(new Date(timeReceived), "mm");

  // Finally put together the timestamp
  let time = hour + ":" + minutes;

  // Append the AM or PM based on the time bool
  if (amPm) {
    time += " PM";
  } else {
    time += " AM";
  }
  return time;
};
