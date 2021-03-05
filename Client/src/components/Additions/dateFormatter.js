// eslint-disable-next-line import/no-anonymous-default-export
export default (date)=> {
    let out;
    let oldDate = new Date(date);
    let currentDate = new Date();
    if(oldDate.getFullYear() === currentDate.getFullYear()){
        if(oldDate.getMonth() === currentDate.getMonth() && oldDate.getDay() === currentDate.getDay()){
          out = oldDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        }else{
          out = oldDate.toLocaleTimeString([], {day: '2-digit',month: 'short' , hour: '2-digit', minute:'2-digit'});
        }
    }else{
      out = oldDate.toLocaleTimeString([], {day: '2-digit',month: 'short' , hour: '2-digit', year: 'numeric', minute:'2-digit'});
    }

    return out;
}