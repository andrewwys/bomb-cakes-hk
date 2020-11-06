export const formatCurrency = (num) => {
  return 'HK$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const genOrderNum = () => {
  // Temp solution: order no. based on time to the millisecond
  const now = new Date();
  let num = (now.getFullYear() - 2000).toString(); // e.g. 20
  num += (now.getMonth() < 10 ? '0' : '') + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
  num += (now.getDate() < 10 ? '0' : '') + now.getDate().toString(); // pad with a 0
  num += (now.getHours() < 10 ? '0' : '') + now.getHours().toString();
  num += (now.getMinutes() < 10 ? '0' : '') + now.getMinutes().toString();
  num += (now.getSeconds() < 10 ? '0' : '') + now.getSeconds().toString();
  num +=
    (now.getMilliseconds() < 100 ? '0' : '') +
    (now.getMilliseconds() < 10 ? '0' : '') +
    now.getMilliseconds().toString();
  return num;
};
