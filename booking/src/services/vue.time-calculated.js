export default {
    stringToMinutes(time){
        let splitTime = time.split(':');

        let hours = splitTime[0]*1;
        let minutes = splitTime[1]*1;

        return (hours*60)+minutes;
    }
}