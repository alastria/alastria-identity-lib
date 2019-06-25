export var toHex = (input)=>{return input.toString(16)}

export var leftPad = function leftPad(string, chars, sign) {
    var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^0x/i, '');
    var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
    return (hasPrefix ? '0x' : '') + new Array(padding).join(sign || '0') + string;
  };
export var rightPad = function rightPad(string, chars, sign) {
    var hasPrefix = /^0x/i.test(string) || typeof string === 'number';
    string = string.toString(16).replace(/^0x/i, '');
    var padding = chars - string.length + 1 >= 0 ? chars - string.length + 1 : 0;
    return (hasPrefix ? '0x' : '') + string + new Array(padding).join(sign || '0');
  };