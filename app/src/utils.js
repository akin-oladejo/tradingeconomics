// any utils will be written here

export function parseDate(dateString) {
    const parsedDate = new Date(Date.parse(dateString));
  
    return parsedDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
      day: "numeric",
    });
  }