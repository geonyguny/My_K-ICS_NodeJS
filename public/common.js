// 천단위 콤마
exports.commaFunc = function(param){
    var regexp = /\B(?=(\d{3})+(?!\d))/g;
    return param.toString().replace(regexp,',');
}