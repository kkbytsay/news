function formatDate(date) {
  return new Date(date).toISOString().split("T")[0].replace(/-/g, "/");
}

export default formatDate;
