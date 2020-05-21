
function AlterCalendarGUI(){
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private; 

    
    private_.CalendarReferences = CalendarReferences();
    private_.SaveCalendarInfos = SaveCalendarInfos();
    private_.GetCalendarInfos = GetCalendarInfos();
    private_.PositionCalendar = PositionCalendar();
    private_.CalendarSelectors = CalendarSelectors();
    //private_.MainCalendarStructureGUI = MainCalendarStructureGUI();
    
    
    public_.Init = function(){
        public_.DisplayActualDateInAllCalendars();
    }
    
    
    
    public_.DisplayActualDateInAllCalendars = function(){
        var allCalendarsLoaders = document.querySelectorAll('[data-lalo-calendar]');

        for(var i=0; i<allCalendarsLoaders.length; i++){
            var calendarLoader = allCalendarsLoaders[i];
            public_.DisplayActualDateInCalendar(calendarLoader);
        }
    }
    
    
    
    public_.DisplayActualDateInCalendar = function(calendarLoader){
        var calendarReferences = private_.CalendarReferences;
        
        var calendarWrapper = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var currentDate = calendarReferences.currentDateAsNumeric;

        var monthIndex = currentDate.monthIndex;
        var year = currentDate.year;
        public_.DisplayMonthDays(calendarWrapper, monthIndex, year);

        public_.DisplayActualDateInSelector(calendarLoader);
    }



    public_.HighlightDateIfIsCurrent = function(calendarWrapper){
        public_.HighlightMonthIfIsCurrentMonth(calendarWrapper);
        public_.HighlightYearIfIsCurrentYear(calendarWrapper);
        public_.IfDisplayedMonthAndYearAreCurrent(calendarWrapper);
    }



    public_.ShowCalendarDateInSelectorDisplay = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);

        if( private_.GetCalendarInfos.CheckIfAMonthDayIsSelected(calendar) ){
            var calendarReferences = private_.CalendarReferences;
            var currentDateInCalendar = 
                private_.GetCalendarInfos.GetCurrentCalendarDateSelected(calendarLoader);
            var monthIndex = currentDateInCalendar.monthIndex;
            var monthDay = currentDateInCalendar.monthDay;
            var year = currentDateInCalendar.year;
            var weekDayIndex = currentDateInCalendar.weekDayIndex;

            public_.UpdateDateInSelectorDisplay(calendarLoader, monthIndex, monthDay, year, weekDayIndex);
        }
    }


    
    public_.DisplayMonthDays = function(calendarWrapper, monthIndex, year){
        public_.ClearCurrentCalendarDays(calendarWrapper);

        var allMonthWeeksRows = calendarWrapper.querySelectorAll('.js-lalo-calendar-table--weeks-rows');
        var monthSinceDay1 = GetThisDateInfo(null, monthIndex, 1, year, 'object-numeric');
        var daysInThisMonth = DaysInThisMonth(monthIndex, year);
        var cellIndexToAffect = monthSinceDay1.weekDayIndex;
        var day = 1;

        for(var i=0; i<allMonthWeeksRows.length; i++){
            var currentRow = allMonthWeeksRows[i];
            var allRowCells = currentRow.querySelectorAll('.js-lalo-calendar-table--weeks-days-cells');

            while((currentCell != currentRow.lastChild) && (day <= daysInThisMonth)){
                var currentCell = allRowCells[cellIndexToAffect];
                currentCell.setAttribute('data-belongs-to-week-day-index', cellIndexToAffect);
                currentCell.setAttribute('data-belongs-to-month-day', day);
                currentCell.textContent = day;
                cellIndexToAffect++;
                day++;
            }
            cellIndexToAffect = 0;
        }

        public_.RemoveCalendarLastRowIfEmpty(calendarWrapper);
        public_.HighlightDateIfIsCurrent(calendarWrapper);
    }

    
    
    public_.RemoveCalendarLastRowIfEmpty = function(calendarWrapper){
        var monthDaysTbody = calendarWrapper.querySelector('.js-lalo-calendar--table-tbody');

        if (monthDaysTbody.lastChild.firstChild.innerHTML == ''){
            monthDaysTbody.removeChild(monthDaysTbody.lastChild);
        }
    }

    
    
    public_.ClearCurrentCalendarDays = function(calendar){
        var allDaysCells = calendar.querySelectorAll('.js-lalo-calendar-table--weeks-days-cells');
        for(var i=0; i<allDaysCells.length; i++){
            allDaysCells[i].textContent = '';
        }
    }


    

    public_.DisplayActualDateInSelector = function(calendarLoader){
        var calendarReferences = private_.CalendarReferences;

        var actualDate = calendarReferences.currentDateAsNumeric;
        var monthIndex = parseInt(actualDate.monthIndex);
        var day = parseInt(actualDate.monthDay);
        var weekDayIndex = parseInt(actualDate.weekDayIndex);
        var year = parseInt(actualDate.year);

        public_.UpdateDateInSelectorDisplay(calendarLoader, monthIndex, day, year, weekDayIndex);
    }
    
    
    
    public_.UpdateDateInSelectorDisplay = function(calendarLoader, monthIndex, day, year, weekDayIndex){

        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var selectorThatDisplaysDate = calendarLoader.querySelector('[data-lalo-calendar-display-format]');
        var typeOfDisplay = selectorThatDisplaysDate.tagName.toLowerCase();
        var formatedDate = public_.FormatThisDate(calendarLoader, monthIndex, day, year, weekDayIndex);

        if(typeOfDisplay == 'input'){
            // value
            selectorThatDisplaysDate.value = formatedDate;
        } else {
            // text
            selectorThatDisplaysDate.textContent = formatedDate;
        }
        
        private_.SaveCalendarInfos.SaveCalendarDateInDateSelectorDisplay(calendarLoader);
    }

    

    public_.GetFormatChoosedForCalendar = function(calendarLoader){
        var formatChoosedAttrRef = 'data-lalo-calendar-display-format';
        var formatChoosedSelector = calendarLoader.querySelector('['+formatChoosedAttrRef+']');
        var formatChoosed = formatChoosedSelector.getAttribute(formatChoosedAttrRef);

        return formatChoosed;
    }




    public_.FormatThisDate = function(calendarLoader, monthIndex, monthDay, year, weekDayIndex){
        var formatChoosed = public_.GetFormatChoosedForCalendar(calendarLoader);
        var language = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);
        var monthsArray = MonthsArray(language);
        var weekDaysArray = DaysOfWeekArray(language);

        switch(formatChoosed){
            case 'numeric':
                return monthDay + " / " + (parseInt(monthIndex)+1) + " / " + year;

            case 'short-words':
                var weekDayName = weekDaysArray[weekDayIndex].substring(0,3);
                var monthName = monthsArray[monthIndex].substring(0,3);
                return weekDayName + ' ' + monthDay + ', ' + monthName + ' ' + year;

            case 'long-words':
                var weekDayName = weekDaysArray[weekDayIndex];
                var monthName = monthsArray[monthIndex];
                return weekDayName + ' ' + monthDay + ', ' + monthName + ' ' + year;
        }
    }



    public_.HighlightMonthIfIsCurrentMonth = function(calendarWrapper){
        var calendarReferences = private_.CalendarReferences;

        var monthIndexAttr = 'data-get-month-name-displayed-index';
        var monthSelector = calendarWrapper.querySelector('['+monthIndexAttr+']');
        var isCurrentMonthDisplayed = 
            private_.GetCalendarInfos.isDisplayedMonthCurrentMonth(calendarWrapper); 

        if( isCurrentMonthDisplayed ){
            monthSelector.classList.add('css-js-highlight-month');
        } else {
            monthSelector.classList.remove('css-js-highlight-month');
        }
    }

    
    
    public_.IfDisplayedMonthAndYearAreCurrent = function(calendarWrapper){
        var calendarReferences = private_.CalendarReferences;

        var actualDate = calendarReferences.currentDateAsNumeric;
        var displayedMonthIsCurrent = 
            private_.GetCalendarInfos.isDisplayedMonthCurrentMonth(calendarWrapper);
        var displayedYearIsCurrent = 
            private_.GetCalendarInfos.isDisplayedYearCurrentYear(calendarWrapper);

        if (displayedMonthIsCurrent && displayedYearIsCurrent){
            var monthDaySelector = calendarWrapper.querySelector('[data-belongs-to-month-day="'+actualDate.monthDay+'"]');
            monthDaySelector.classList.add('css-js-highlight-actual-month-day');
            monthDaySelector.setAttribute('data-actual-month-day-cell', actualDate.monthDay);
        }
    }



    public_.HighlightYearIfIsCurrentYear = function(calendarWrapper){
        var calendarReferences = private_.CalendarReferences;

        var yearSelector = calendarWrapper.querySelector('[data-current-year-displayed]');
        var isCurrentYearDisplayed = 
            private_.GetCalendarInfos.isDisplayedYearCurrentYear(calendarWrapper);

        if(isCurrentYearDisplayed){
            yearSelector.classList.add('css-js-highlight-year');
        } else {
            yearSelector.classList.remove('css-js-highlight-year');
        }
    }

    
    
    public_.HighlightClickedMonthDay = function(calendarLoader, monthDayClicked){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);

        var monthDayAttrRef = 'data-belongs-to-month-day';
        var css_selectedDay = 'css-js-selected-day-highlight';

        if(monthDayClicked.hasAttribute(monthDayAttrRef)){
            if(monthDayClicked.classList.contains(css_selectedDay)){
                monthDayClicked.classList.remove(css_selectedDay);
            } else {
                public_.RemoveHighlightedMonthDaysInCalendar(calendar);
                monthDayClicked.classList.add(css_selectedDay);
            }
        }

        public_.HideCalendar(calendarLoader);
        public_.ShowCalendarDateInSelectorDisplay(calendarLoader);
    }
    
    
    
    public_.HideCalendar = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        calendar.style.display = 'none';
    }



    public_.ShowCalendar = function(calendarLoader){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        calendar.style.display = 'block'; // needs to be called first
        public_.DisplayCurrentSavedAndShownDateInCalendar(calendarLoader);
        private_.PositionCalendar.PositionCalendarWhenOpened(calendarLoader);
        calendar.style.opacity = 1; // needs to be called last
    }



    public_.RemoveHighlightedMonthDaysInCalendar = function(calendar){
        var monthDayAttrRef = 'data-belongs-to-month-day';
        var css_selectedDay = 'css-js-selected-day-highlight';
        var allHighlightedDays = calendar.querySelectorAll('['+monthDayAttrRef+']');

        for(var i=0; i<allHighlightedDays.length; i++){
            allHighlightedDays[i].classList.remove(css_selectedDay);
        }
    }



    public_.DisplayCurrentSavedAndShownDateInCalendar = function(calendarLoader){
        public_.DisplaySavedDateMonthInCalendar(calendarLoader);
        public_.DisplaySavedDateYearInCalendar(calendarLoader);
    }



    public_.DisplaySavedDateMonthInCalendar = function(calendarLoader){
        var calendar = calendarLoader.querySelector('.js-lalo-calendar--wrapper');
        var language = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);
        var savedDate = private_.GetCalendarInfos.GetTheCurrentSavedDateSoFar(calendarLoader);
        var monthNumberAsIndex = (savedDate.month-1);

        public_.DisplayNewMonthInCalendar(calendar, language, monthNumberAsIndex);
        public_.HighlightMonthdayInCalendar(calendar, savedDate.day);
    }



    public_.DisplaySavedDateYearInCalendar = function(calendarLoader){
        var calendar = calendarLoader.querySelector('.js-lalo-calendar--wrapper');
        var savedDate = private_.GetCalendarInfos.GetTheCurrentSavedDateSoFar(calendarLoader);

        public_.DisplayNewYearInCalendar(calendar, savedDate.year);
        public_.HighlightMonthdayInCalendar(calendar, savedDate.day);
    }



    public_.HighlightMonthdayInCalendar = function(calendar, thisDay){
        var monthDayAttrRef = 'data-belongs-to-month-day';
        var monthDayCell = calendar.querySelector('['+monthDayAttrRef+'="'+thisDay+'"]');
        var monthDayHighlightClassRef = 'css-js-selected-day-highlight';
        monthDayCell.classList.add(monthDayHighlightClassRef);
    }


    public_.ChangeMonthToNext = function(calendar, language){
        var calendarLoader = private_.CalendarSelectors.GetCalendarLoader(calendar);
        var currentMonthIndex = private_.GetCalendarInfos.GetCalendarCurrentMonthIndex(calendarLoader);
        var allMonthsNames = MonthsArray(language);
        var newMonthIndex = private_.GetCalendarInfos.GetNextMonthIndex(currentMonthIndex, language);
        public_.DisplayNewMonthInCalendar(calendar, language, newMonthIndex);
        public_.HighlightTheAlreadySavedMonthDayInCalendar(calendarLoader);
    }



    public_.ChangeMonthToPrevious = function(calendar, language){
        var calendarLoader = private_.CalendarSelectors.GetCalendarLoader(calendar);
        var currentMonthIndex = private_.GetCalendarInfos.GetCalendarCurrentMonthIndex(calendarLoader);
        var allMonthsNames = MonthsArray(language);
        var newMonthIndex = private_.GetCalendarInfos.GetPreviousMonthIndex(currentMonthIndex, language);
        public_.DisplayNewMonthInCalendar(calendar, language, newMonthIndex);
        public_.HighlightTheAlreadySavedMonthDayInCalendar(calendarLoader);
    }

    

    public_.DisplayNewMonthInCalendar = function(calendar, language, newMonthIndex){
        var allMonthsNames = MonthsArray(language);
        var monthNameSelectorAttr = 'data-get-month-name-displayed';
       
        var monthIndexAttr = 'data-get-month-name-displayed-index';
        var monthSelector = calendar.querySelector('['+monthNameSelectorAttr+']');
        var newMonthName = allMonthsNames[newMonthIndex];

        monthSelector.setAttribute(monthNameSelectorAttr, newMonthName);
        monthSelector.setAttribute(monthIndexAttr, newMonthIndex);
        monthSelector.textContent = newMonthName;
  
        public_.currentIndexOfDisplayedMonth = parseInt(newMonthIndex);
        public_.UpdateMonthDaysGUI(calendar);
    }



    public_.DisplayNewYearInCalendar = function(calendar, newYear){
        var yearSelectorAttr = 'data-current-year-displayed';
        var yearSelector = calendar.querySelector('['+yearSelectorAttr+']');

        yearSelector.setAttribute(yearSelectorAttr, newYear);
        yearSelector.textContent = newYear;

        public_.currentYearDisplayed = parseInt(newYear);
        public_.UpdateMonthDaysGUI(calendar);
    }



    public_.ChangeYearToNext = function(calendar){
        var calendarLoader = private_.CalendarSelectors.GetCalendarLoader(calendar);
        var currentYearAttr = 'data-current-year-displayed';
        var currentYearSelector = calendar.querySelector('['+currentYearAttr+']');
        currentYearDisplayed = currentYearSelector.getAttribute(currentYearAttr);

        var newYear = parseInt(currentYearDisplayed) + 1;
        currentYearSelector.setAttribute(currentYearAttr, newYear);
        currentYearSelector.textContent = newYear;

        public_.currentYearDisplayed = parseInt(newYear);
        public_.UpdateMonthDaysGUI(calendar);
        public_.HighlightTheAlreadySavedMonthDayInCalendar(calendarLoader);
    }



    public_.ChangeYearToPrevious = function(calendar){
        var calendarLoader = private_.CalendarSelectors.GetCalendarLoader(calendar);
        var currentYearAttr = 'data-current-year-displayed';
        var currentYearSelector = calendar.querySelector('['+currentYearAttr+']');
        currentYearDisplayed = currentYearSelector.getAttribute(currentYearAttr);

        var newYear = parseInt(currentYearDisplayed) - 1;
        currentYearSelector.setAttribute(currentYearAttr, newYear);
        currentYearSelector.textContent = newYear;

        public_.currentYearDisplayed = parseInt(newYear);
        public_.UpdateMonthDaysGUI(calendar);
        public_.HighlightTheAlreadySavedMonthDayInCalendar(calendarLoader);
    }



    public_.UpdateMonthDaysGUI = function(calendar){
        var currentMonthIndex = public_.GetCurrentMonthIndexDisplayedInCalendar(calendar);
        var currentYear = public_.GetCurrentYearDisplayedInCalendar(calendar);
        MainCalendarStructureGUI().DisplayNewDateInCalendar(calendar, currentMonthIndex, currentYear);
    }



    public_.GetCurrentYearDisplayedInCalendar = function(calendar){
        var currentYearAttrRef = 'data-current-year-displayed';
        var currentYearSelector = calendar.querySelector('['+currentYearAttrRef+']');
        return currentYearSelector.getAttribute(currentYearAttrRef);
    }



    public_.GetCurrentMonthIndexDisplayedInCalendar = function(calendar){
        var currentMonthAttrRef = 'data-get-month-name-displayed-index';
        var currentMonthSelector = calendar.querySelector('['+currentMonthAttrRef+']');
        return currentMonthSelector.getAttribute(currentMonthAttrRef);
    }

    
    public_.SetNewDateInCalendarAndSelectorDisplay = function(calendarLoader, monthDay, monthIndex, year){
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var language = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);
        var getThisDate = GetThisDateInfo(language, monthIndex, monthDay, year, 'object-numeric');
        var weekDayIndex = getThisDate.weekDayIndex;

        // set a new month, day and year in the calendar itself
        public_.DisplayNewMonthInCalendar(calendar, language, monthIndex);
        public_.DisplayNewYearInCalendar(calendar, year);
        MainCalendarStructureGUI().DisplayNewDateInCalendar(calendar, monthIndex, year);
        public_.HighlightMonthdayInCalendar(calendar, monthDay);
        
        // display the selected calendar date in the "display date" selector
        public_.UpdateDateInSelectorDisplay(calendarLoader, monthIndex, monthDay, year, weekDayIndex);
    }
    
    
    
    public_.HighlightTheAlreadySavedMonthDayInCalendar = function(calendarLoader){
        // this function is more likely to be used when changing calendar months and/or years. So we can highlight the month-day in the calendar if we go back to the date that we have already displayed/saved on the HTML that displays the date to the user.
        
        var calendar = private_.CalendarSelectors.GetCalendarWrapper(calendarLoader);
        var currentDavedDate = private_.GetCalendarInfos.GetTheCurrentSavedDateSoFar(calendarLoader);

        var currentMonthIndexInCalendar = 
            private_.GetCalendarInfos.GetCalendarCurrentMonthIndex(calendar);
        var currentYearInCalendar = private_.GetCalendarInfos.GetCurrentYear(calendarLoader);

        var monthsAreTheSame = (currentDavedDate.month-1) == currentMonthIndexInCalendar;
        var yearsAreTheSame = (currentDavedDate.year) == currentYearInCalendar;


        if( monthsAreTheSame && yearsAreTheSame ){
            public_.HighlightMonthdayInCalendar(calendar, currentDavedDate.day);   
        }
    }
    
    
    
    return public_; 
}