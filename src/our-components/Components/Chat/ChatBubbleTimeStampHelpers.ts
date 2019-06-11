import { getTimeValue } from "../../../redux/actions/conversations";

const getTimePassedValueInMinutes = (conversationCreated: string) => {
  let timePassed =
    (getTimeValue(new Date().toString()) - getTimeValue(conversationCreated)) /
    1000;
  return Math.floor(timePassed / 60);
};

const hoursAgoF = (timePassedInMinutes: number) => {
  let hoursAgo = timePassedInMinutes / 60;
  hoursAgo = Math.floor(hoursAgo);

  let minutesAgo = timePassedInMinutes % 60;
  minutesAgo = Math.floor(minutesAgo);

  return {
    hoursAgo,
    minutesAgo
  };
};

export const getTimePassedValue = (conversationCreated: string) => {
  const timePassedInMinutes = getTimePassedValueInMinutes(conversationCreated);
  if (timePassedInMinutes < 1) {
    return "NOW";
  }

  if (timePassedInMinutes >= 1 && timePassedInMinutes <= 59) {
    return `${timePassedInMinutes} minutes ago`;
  }

  /**
   * 24 hours = 1440 minutes
   * 23 hours 59 minutes = 1439 minutes
   */
  if (timePassedInMinutes >= 60 && timePassedInMinutes <= 1439) {
    const { hoursAgo, minutesAgo } = hoursAgoF(timePassedInMinutes);

    let strToReturn = "";
    if (hoursAgo > 1) {
      strToReturn += `${hoursAgo} hours `;
    } else {
      strToReturn += `${hoursAgo} hour `;
    }
    if (minutesAgo > 0) {
      strToReturn += `${minutesAgo} minutes `;
    }

    strToReturn += "ago";
    return strToReturn;
  }

  if (timePassedInMinutes > 1439) {
    const { hoursAgo } = hoursAgoF(timePassedInMinutes);
    let daysAgo = hoursAgo / 24;
    daysAgo = Math.floor(daysAgo);

    if (daysAgo > 1) {
      return `${daysAgo} days ago`;
    } else {
      return `${daysAgo} day ago`;
    }
  }
};
