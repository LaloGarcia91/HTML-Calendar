
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

        var calendarLanguage = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);
        var finalObjToSave = {
            language: calendarLanguage,
            dateFormats:{
                as: {}
            }  
        };

        
        finalObjToSave.dateFormats.as['index'] = 
            private_.GetCalendarInfos.GetDateObjAsIndex(monthIndex, monthDay, year, weekDayIndex);

        finalObjToSave.dateFormats.as['numeric'] = 
            private_.GetCalendarInfos.GetDateObjAsNumeric(monthIndex, monthDay, year, weekDayIndex);

        finalObjToSave.dateFormats.as['shortWords'] = 
            private_.GetCalendarInfos.GetDateObjAsShortWords(calendarLanguage, monthIndex, monthDay, year, weekDayIndex);

        finalObjToSave.dateFormats.as['longWords'] = 
            private_.GetCalendarInfos.GetDateObjAsLongWords(calendarLanguage, monthIndex, monthDay, year, weekDayIndex);

        selectorThatDisplaysDate.setAttribute('data-get-date-displayed', JSON.stringify(finalObjToSave));
    }

    
    return public_;
}

