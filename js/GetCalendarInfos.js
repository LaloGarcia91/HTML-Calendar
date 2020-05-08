function GetCalendarInfos(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 
    
    public_.allCalendarsLoaders = document.querySelectorAll('[data-lalo-calendar]');
    private_.CalendarReferences = CalendarReferences();
    private_.CalendarSelectors = CalendarSelectors();
    private_.currentDateAsNumeric = private_.CalendarReferences.currentDateAsNumeric;
    
    

    public_.GetCurrentCalendarDateSelected = function(calendarLoader){
        var monthIndex = public_.GetCalendarCurrentMonthIndex(calendarLoader);
        var monthDay = public_.GetCurrentMonthDay(calendarLoader);
        var year = public_.GetCurrentYear(calendarLoader);
        var weekDayIndex = public_.GetCalendarCurrentWeekdayIndex(calendarLoader);

        return {
            monthIndex:monthIndex,
            monthDay:monthDay,
            year:year,
            weekDayIndex:weekDayIndex
        };
    }

    
    public_.GetCurrentMonthDay = function(calendarLoader){
        var currentMonthDaySelector = private_.CalendarSelectors.GetMonthDaySelector(calendarLoader);
        return currentMonthDaySelector.textContent;
    }
    
    
    public_.GetCurrentYear = function(calendarLoader){
        var currentYearSelector = private_.CalendarSelectors.GetYearSelector(calendarLoader);
        var yearSelectorAttrRef = private_.CalendarReferences.selectorsReferences.yearSelector.attr;
        return currentYearSelector.getAttribute(yearSelectorAttrRef);
    }


    public_.isDisplayedMonthCurrentMonth = function(calendarWrapper){
        var actualDate = private_.currentDateAsNumeric;
        var monthIndexAttr = 'data-get-month-name-displayed-index';
        var monthSelector = calendarWrapper.querySelector('['+monthIndexAttr+']');
        var isCurrentMonthDisplayed = 
            actualDate.monthIndex == monthSelector.getAttribute(monthIndexAttr);

        if(isCurrentMonthDisplayed){
            return true;
        }
        return false;
    }



    public_.isDisplayedYearCurrentYear = function(calendarWrapper){
        var actualDate = private_.currentDateAsNumeric;
        var yearNumberAttr = 'data-current-year-displayed';
        var yearSelector = calendarWrapper.querySelector('['+yearNumberAttr+']');
        var isCurrentMonthDisplayed = 
            actualDate.year == yearSelector.getAttribute(yearNumberAttr);

        if(isCurrentMonthDisplayed){
            return true;
        }
        return false;
    }
    
    
    
    public_.GetDateObjAsIndex = function(monthIndex, monthDay, year, weekDayIndex){
        return {
            whatIsThis:'This property returns the calendar date as index format. Meaning, January and Sunday are index 0... This is used this way because JS understands dates as index numbers starting from zero for months and week days.',
            month:monthIndex,
            day:monthDay,
            year:year,
            weekDay:weekDayIndex
        };
    }



    public_.GetDateObjAsNumeric = function(monthIndex, monthDay, year, weekDayIndex){
        var monthNumber = monthIndex+1;
        var weekDayNumber;
        if(weekDayIndex == 0){
            weekDayNumber = 7;  
        }

        return {
            whatIsThis:'This property returns the calendar date as numeric, January is month # 1, Monday is week day # 1',
            month:monthNumber,
            day:monthDay,
            year:year,
            weekDay:weekDayNumber
        };
    }



    public_.GetDateObjAsLongWords = function(language, monthIndex, monthDay, year, weekDayIndex){
        var monthsArray = MonthsArray(language);
        var weekDaysArray = DaysOfWeekArray(language);

        return {
            whatIsThis:'This property returns the calendar date as long words: January, February.. Sunday, Monday..',
            month:monthsArray[monthIndex],
            day:monthDay,
            year:year,
            weekDay:weekDaysArray[weekDayIndex]
        };
    }



    public_.GetDateObjAsShortWords = function(language, monthIndex, monthDay, year, weekDayIndex){
        var monthsArray = MonthsArray(language);
        var weekDaysArray = DaysOfWeekArray(language);

        return {
            whatIsThis:'This property returns the calendar date as short words: Jan, Feb.. Sun, Mon..',
            month:monthsArray[monthIndex].substring(0, 3),
            day:monthDay,
            year:year,
            weekDay:weekDaysArray[weekDayIndex].substring(0, 3)
        };
    }
    
    
    public_.GetCalendarLanguage = function(calendarLoader){
        var languageAttr = 'data-lalo-calendar-language';
        var languageSelector = calendarLoader.querySelector('['+languageAttr+']');
        return languageSelector.getAttribute(languageAttr);
    }
    
    
    public_.GetCalendarCurrentMonthIndex = function(calendarLoader){
        var monthSelector = private_.CalendarSelectors.GetMonthSelector(calendarLoader);
        var monthIndexAttrRef = 
            private_.CalendarReferences.selectorsReferences.monthSelector.attrs.monthIndex;
        var monthIndex = monthSelector.getAttribute(monthIndexAttrRef);
        return parseInt(monthIndex);
    }

    
    public_.GetCalendarCurrentWeekdayIndex = function(calendarLoader){
        var monthDaySelector = private_.CalendarSelectors.GetMonthDaySelector(calendarLoader);
        return monthDaySelector.getAttribute('data-belongs-to-week-day-index');
    }

    
    public_.CheckIfAMonthDayIsSelected = function(calendar){
        return calendar.querySelectorAll('.css-js-selected-day-highlight').length == 1;
    }

    

    public_.GetNextMonthIndex = function(currentMonthIndex, language){
        var allMonthsNames = MonthsArray(language);
        var monthsLastElementIndex = allMonthsNames.length -1;

        var newIndex;
        if(currentMonthIndex >= monthsLastElementIndex){
            newIndex = 0;
        } else {
            newIndex = parseInt(currentMonthIndex) + 1;
        }

        return newIndex;
    }



    public_.GetPreviousMonthIndex = function(currentMonthIndex, language){
        var allMonthsNames = MonthsArray(language);
        var monthsLastElementIndex = allMonthsNames.length -1;

        var newIndex;
        if(currentMonthIndex == 0){
            newIndex = monthsLastElementIndex;
        } else {
            newIndex = parseInt(currentMonthIndex) - 1;
        }

        return newIndex;
    }


    
    return public_;
}