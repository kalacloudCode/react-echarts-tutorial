import axios from "axios";

const apiKey = "B8XHZFRRAIWTAMDHZXWSNHB0IHVT1HGF7JS6DPHA";

export const request = axios.create({
  baseURL: "https://data.mifengcha.com",
  headers: { "X-API-KEY": apiKey },
});

function formatDateTime(timeStamp) { 
  var date = new Date();
  date.setTime(timeStamp * 1000);
  var y = date.getFullYear();    
  var m = date.getMonth() + 1;    
  m = m < 10 ? ('0' + m) : m;    
  var d = date.getDate();    
  d = d < 10 ? ('0' + d) : d;    
  return y + '-' + m + '-' + d  
};  
console.log(formatDateTime(1495157126));