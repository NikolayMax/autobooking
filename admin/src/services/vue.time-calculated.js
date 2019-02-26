export default {
    stringToMinutes: function (string) {
        if (string && string.match(/(\d{2}):(\d{2})/)) {
            return (Number(RegExp.$1) * 60 + Number(RegExp.$2));
        }
        return Number.NaN;
    },
    minutesToString: function (number) {
        var hours = Math.floor(number / 60);
        if (hours.toString().length === 1) {
            hours = '0' + hours;
        }
        var minutes = number % 60;
        if (minutes.toString().length === 1) {

            minutes = '0' + minutes;
        }
        return hours + ":" + minutes;
    },
    declOfNum: function (number, titles) {
        var cases = [2, 0, 1, 1, 1, 2];
        return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
    },
    minutesFormatted:function(time){
        var arr = time.split(":");
        var result_minutes = parseInt(arr[1]) || 0;
        var need_minutes = result_minutes > 0;
        var result = '';
        var result_hours = parseInt(arr[0]) || 0;
        if (result_hours == 0)
            return result_minutes + ' мин.';
        result += result_hours + ' ' + this.declOfNum(result_hours, ['час', 'часа', 'часов']);
        if (need_minutes) result += ' ' + result_minutes + ' мин.';
        return result;
    }
}