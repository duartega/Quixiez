import React from "react";
import { format, getMinutes, getHours } from "date-fns";
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
}

type Status = "CONSTRUCT_ORDER" | "COMPLETE" | "IN_PROGRESS" |
"CONSUMER_CANCELLED" | "COMPANY_REJECTED" | "COMPANY_COMPLETE" ;

type Color = "primary" | "warning" | "danger" | "success" ;
type ReturnType = [string, Color]


  
export const changeStatusMessage = (status: Status): ReturnType => {
  // Set the status message and the status color
  let convertString: string = "";
  let statusColor: Color;
  if (status === "CONSTRUCT_ORDER") {
    convertString = "PENDING";
    statusColor = "primary";
  } else if (status === "COMPLETE") {
    convertString = "NEW ORDER";
    statusColor = "success";
  } else if (status === "IN_PROGRESS") {
    convertString = "IN PROGRESS";
    statusColor = "warning";
  } else if (status === "CONSUMER_CANCELLED") {
    convertString = "CANCELLED";
    statusColor = "warning";
  } else if (status === "COMPANY_REJECTED") {
    convertString = "REJECTED";
    statusColor = "danger";
  } else if (status === "COMPANY_COMPLETE") {
    convertString = "COMPLETE";
    statusColor = "success";
  } else {
    convertString = "ERROR";
    statusColor = "danger";
  };
  return [convertString, statusColor];
}


export const updateButton = (status: Status) => {
  return (
    <Button className="btn-simple" color={status[1]} disabled>
      {status[0]}
    </Button>
  )
}


export const calculateTime = (timeReceived: string) => {
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
}