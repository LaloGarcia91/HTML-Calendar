function CalendarSelectors(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 

    /*
    *
    */

    private_.selectorsReferences = CalendarReferences().selectorsReferences;
    
    /*
    *
    */
    
    public_.GetCalendarWrapper = function(calendarLoader){
        var calendarWrapperRef = private_.selectorsReferences.calendarWrapper.class;
        return calendarLoader.querySelector('.'+calendarWrapperRef);
    }
    
    
    public_.GetCalendarOpener = function(calendarLoader){
        var calendarOpenerRef = private_.selectorsReferences.openerSelector.attr;
        return calendarLoader.querySelector('['+calendarOpenerRef+']');
    }
    
    
    public_.GetMonthSelector = function(calendarLoader){
        var monthSelector = private_.selectorsReferences.monthSelector.attrs.monthIndex;
        return calendarLoader.querySelector('['+monthSelector+']');
    }
    
    
    public_.GetYearSelector = function(calendarLoader){
        var yearSelector = private_.selectorsReferences.yearSelector.attr;
        return calendarLoader.querySelector('['+yearSelector+']');
    } 
    
    
    public_.GetMonthDaySelector = function(calendarLoader){
        var monthDayHighlightRef = 
            private_.selectorsReferences.monthDaysSelectors.selectedDay.highlight.class;
        var monthDaySelector = calendarLoader.querySelector('.'+monthDayHighlightRef);

        // if there is NO month day clicked by user so far...
        if(!monthDaySelector){
            // choose the actual month day we are at...
            var currentMonthDayAttrRef = 'data-actual-month-day-cell';
            monthDaySelector = calendarLoader.querySelector('['+currentMonthDayAttrRef+']');
        }

        return monthDaySelector;
    }
    
    return public_;
}