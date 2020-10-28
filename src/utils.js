export const formatCurrency = (num) => {
  return 'HK$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};
