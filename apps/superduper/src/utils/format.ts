export const formatAmount = (amount: number, decimals?: number) => {
  if (amount) {
    let result = '';
    if (decimals) result = amount.toFixed(decimals).toString();
    else result = amount.toString();
    result = result.replace(/\d+/, (n) => {
      return n.replace(/(\d)(?=(\d{3})+$)/g, ($1) => {
        return `${$1},`;
      });
    });
    return result;
  }
  return '0';
};
