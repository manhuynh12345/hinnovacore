
export function sqlite2json(data) {
    const json = Array<Object>();
    for (let i = 0; i < data.values.length; i++) {
        const temp = new Object();
        const numofKey = Object.keys(data.values[i]).length;
        for (let j = 0; j < numofKey; j ++) {
            temp[data.columns[j]] = data.values[i][j];
        }
        json.push(temp);
    }
    return json;
}
export function getFormattedDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return day + '-' + month + '-' + year;
  }
  export function formatNumber(number: string) {
    number = number.toString();
    let str = number;
    let value = '';
    if (number.indexOf(',') !== -1) {
      str = number.split(',')[0];
    }
    const arr = [];
    const num = parseInt((str.length / 3).toString(), 10);
    const du = str.length % 3;
    if (du !== 0) {
      arr.push(str.substr(0, du));
    }
    let index = 0;
    while (index < num) {
      arr.push(str.substr(du + index * 3, 3));
      index++;
    }

    for (let i = 0; i < arr.length; i++) {
      value += arr[i];
      if (arr.length - 1 !== i) {
        value += '.';
      }
    }
    if (number.indexOf(',') !== -1) {
      value = value + ',' + number.split(',')[1];
    }
    return value;
  }
  export function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');
    return str;
}
export function ReplaceAll(orig, search, replacement) {
  const target = orig;
  const result = target.replace(new RegExp(search, 'g'), replacement);
  return result.toString();
}
