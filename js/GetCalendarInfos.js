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
    
    
    public_.GetCalendarLanguage = function(calendarLoader){
        var languageAttr = 'data-lalo-calendar-language';
        var languageSelector = calendarLoader.querySelector('['+languageAttr+']');
        
        if(languageSelector){
            var language = languageSelector.getAttribute(languageAttr);
            switch(language){
                case 'english':
                case 'spanish':
                case 'french':
                    return language;
            }
        }
        return 'english'; // default language if nothing was provided
    }
    
    
    public_.DisplayActualDateOnLoad = function(calendarLoader){
        var dateOnLoadAttraRef = 'data-lalo-calendar-display-date-onload';
        try {
            var selector = calendarLoader.querySelector('['+dateOnLoadAttraRef+']');
            var attrValue = selector.getAttribute(dateOnLoadAttraRef);

            switch(attrValue){
                case 'true': 
                    return true;
                    
                case 'false': 
                    return false;
            }
        }catch(e){
            // selector was not provided
        }
        return true; // show date by default
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
        if(currentMonthIndex <= 0){
            newIndex = monthsLastElementIndex; // select december
        } else {
            newIndex = parseInt(currentMonthIndex) - 1;
        }

        return newIndex;
    }

    
    
    public_.GetTheCurrentSavedDateSoFar = function(calendarLoader){
        var selector = private_.CalendarSelectors.GetSelectorHoldingLastSavedDate(calendarLoader);
        var savedDate = selector.getAttribute('data-get-date-displayed');
        return JSON.parse(savedDate);
    }

    
    return public_;
}