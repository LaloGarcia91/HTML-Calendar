//
//
//
//
//

function CalendarLaloGarcia_SaveFullDateSelected(calendarItself){
    // this function will get the current date in the calendar

    //
    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLanguage = calendarItself.getAttribute(references.languageSelected.attributes.mainReference);
    var monthsArray = MonthsArray(calendarLanguage);
    var weekDaysArray = DaysOfWeekArray(calendarLanguage);


    var monthDay, weekDay, thisMonthIndex;
    try {
        thisMonthIndex = calendarItself.querySelector(references.month.mainReference).getAttribute('data-clg-current-month-index');
        
        var monthDaySelector = calendarItself.querySelector('.css-js-calendar-lalo-garcia-selected-day');

        // if a date is actually selected in the calendar (meaning: month, month day and year)
        monthDay = monthDaySelector.getAttribute('data-clg-belong-to-this-month-day-number');
        weekDay = monthDaySelector.getAttribute('data-clg-belongs-to-this-week-day-index');

    }catch(e){

        // get the actual date (this happens only at start up, meaning when the website first loads)
        //
        var actualDate = CurrentDate('object-numbers', calendarLanguage);
        
        thisMonthIndex = actualDate.monthIndex;
        monthDay = actualDate.monthDay;
        weekDay = actualDate.weekDayIndex;

    }

    //
    var year = calendarItself.querySelector(references.year.mainReference).textContent;


    var currentDateSelected = FormatTheDateToSaveAsJson({
        weekDayIndex:weekDay,
        monthIndex:thisMonthIndex,
        monthDay:monthDay,
        year:year
    });

    
    SaveThisDateInCalendar(calendarItself, currentDateSelected);

    return true;
}

//
//
//
//
//

function FormatTheDateToSaveAsJson(thisDateInfo){
    // this function will return a the whole date already formatted and ready to be saved as JSON
    
    return JSON.stringify({
        weekDayIndex:thisDateInfo.weekDayIndex,
        monthIndex:thisDateInfo.monthIndex,
        monthDay:thisDateInfo.monthDay,
        year:thisDateInfo.year
    });
}

//
//
//
//
//

function SaveThisDateInCalendar(calendarItself, thisDateInfo){
    // this function will save a new date passed as parameter in the calendar attribute
    
    calendarItself.setAttribute('data-clg-last-date-in-calendar', thisDateInfo);
}

//
//
//
//
//

function CalendarLaloGarcia_SaveChoosedDateInTheCalendarOpener(calendarMainWrapper){
    // this function will save the choosed date in the calendar opener a a data-attribute. The date format will be a numeric date, so if the date is displayed a a non-numeric date, we can still get the numeric date from the calendar opener selector.

    // Example of how date will be saved:
    // If month is Janurary, the month will be saved as 1
    // MOnth-day, year and week day will also be saved as numeric


    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLoaderAttrName = references.calendarLoader.attributes.mainReference;

    var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', calendarLoaderAttrName);
    var currentSavedDate = CalendarLaloGarcia_GetLastDateInCalendar(calendarMainWrapper);

    var calendarOpenerAttrRef = references.selectorThatOpensCalendar.attributes.mainReference;
    var calendarOpener = calendarLoader.querySelector('['+calendarOpenerAttrRef+']');

    var monthNumberIndex = parseInt(currentSavedDate.monthIndex);
    var monthDay = currentSavedDate.monthDay;
    var year = currentSavedDate.year;
    var weekDayIndex = parseInt(currentSavedDate.weekDayIndex);



    calendarOpener.setAttribute('data-clg-selected-month-index', monthNumberIndex);
    calendarOpener.setAttribute('data-clg-selected-monthDay', monthDay);
    calendarOpener.setAttribute('data-clg-selected-year', year);
    calendarOpener.setAttribute('data-clg-selected-weekDay-index', weekDayIndex);
}

//
//
//
//
//

function EmptySelectedDateAttributesReferences(thisSelector){
    // this function will remove the data-attributes that save the selected date as separate attributes, not as 1 single
    
    thisSelector.removeAttribute('data-clg-selected-month-index');
    thisSelector.removeAttribute('data-clg-selected-monthDay');
    thisSelector.removeAttribute('data-clg-selected-year');
    thisSelector.removeAttribute('data-clg-selected-weekDay-index');
}

//
//
//
//
//

function CalendarLaloGarcia_GetLastDateInCalendar(calendarMainWrapper){
    var savedDate = calendarMainWrapper.getAttribute('data-clg-last-date-in-calendar');

    return JSON.parse(savedDate);
}

//
//
//
//
//

