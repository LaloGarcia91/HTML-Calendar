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
    
    public_.GetCalendarLoader = function(selectorReference){
        var calendarLoader;
        while(calendarLoader = selectorReference.parentNode){
            if(calendarLoader.hasAttribute('data-lalo-calendar')){
                return calendarLoader;
            }
        }
    }
    
    
    public_.GetCalendarWrapper = function(calendarLoader){
        try {
            var calendarWrapperRef = private_.selectorsReferences.calendarWrapper.class;
            return calendarLoader.querySelector('.'+calendarWrapperRef);
        }catch(e){
            return false;
        }
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
    
    
    public_.GetSelectorHoldingLastSavedDate = function(calendarLoader){
        return calendarLoader.querySelector('[data-get-date-displayed]');
    }
    
    
    
    public_.HideAllCalendars = function(){
        var allCalendars = document.querySelectorAll('.js-lalo-calendar--wrapper');
        for(var i=0; i<allCalendars.length; i++){
            var calendar = allCalendars[i];
            calendar.style.display = 'none';
        }
    }
    
    
    return public_;
}