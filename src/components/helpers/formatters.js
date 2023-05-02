export const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + ' K' : Math.sign(num)*Math.abs(num)
}

export const bytesFormatter = (x) => {
const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let l = 0, n = parseInt(x, 10) || 0
  while(n >= 1000 && ++l){
    n = n/1000
  }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0)+' '+units[l])
}