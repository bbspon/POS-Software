module.exports = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysLeft = (expiry - now) / (1000 * 60 * 60 * 24);

  if (daysLeft < 0) return "Expired";
  if (daysLeft <= 30) return "Near Expiry";
  return "Active";
};
