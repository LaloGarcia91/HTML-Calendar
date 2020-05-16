
function SaveCalendarInfos(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 
    
    /*
    *
    */
    
    private_.GetCalendarInfos = GetCalendarInfos();
    
    

    public_.SaveCalendarDateInDateSelectorDisplay = function(calendarLoader){
        var getCalendarInfos = private_.GetCalendarInfos;
        var currentDateInCalendar = getCalendarInfos.GetCurrentCalendarDateSelected(calendarLoader);
        var selectorThatDisplaysDate = calendarLoader.querySelector('[data-lalo-calendar-display-format]');

        var monthIndex = parseInt(currentDateInCalendar.monthIndex);
        var monthDay = parseInt(currentDateInCalendar.monthDay);
        var year = parseInt(currentDateInCalendar.year);
        var weekDayIndex = parseInt(currentDateInCalendar.weekDayIndex);
        
        if(weekDayIndex == 0) weekDayIndex = 7;

        var finalObjToSave = {
            whatIsThis: "This is the date as numeric. Ex: (January = 1, December = 12 and so on...) (Monday is day 1 in the week, Sunday is day 7 and so on...)",
            month:(monthIndex+1),
            day:monthDay,
            year:year,
            weekDay:weekDayIndex // monday is day # 1
        };
        
        selectorThatDisplaysDate.setAttribute('data-get-date-displayed', JSON.stringify(finalObjToSave));
    }

    
    return public_;
}

