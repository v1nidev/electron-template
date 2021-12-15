const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export function getMonthAbbr(date: Date) {
  return monthNames[date.getMonth()].slice(0,3)
}

export function getFullFormatedDate(date: Date) {
  return `${getMonthAbbr(date)}, ${date.getDate()} ${date.getFullYear()} ${date.getHours() || '00'}:${date.getMinutes() || '00'}:${date.getSeconds() || '00'}`
}