//
//
//
//
//

function CalendarLaloGarcia_AddEventsAfterCreatingHTML(){
    // this function will add events to the calendars 'instances' once the calendar HTML already exist in the DOM tree

    var references = CalendarLaloGarcia_SelectorsReferences();

    var mainWrapperClassRef = references.mainWrapper.mainReference;
    var allCallendarsThatExistsInDOM = document.querySelectorAll(references.mainWrapper.mainReference);


    Array.prototype.forEach.call(allCallendarsThatExistsInDOM, function(calendarMainWrapper){

        // calendar close btn
        var closeBtn = calendarMainWrapper.querySelector(references.closeCalendarBtn.mainReference);
        var checkBtn = calendarMainWrapper.querySelector(references.checkBtn.mainReference);


        var monthSelector_rightBtn = calendarMainWrapper.querySelector(references.monthBtns.rightBtn.mainReference);

        var monthSelector_leftBtn = calendarMainWrapper.querySelector(references.monthBtns.leftBtn.mainReference);

        var yearChange_rightBtn = calendarMainWrapper.querySelector(references.yearBts.rightBtn.mainReference);
        var yearChange_leftBtn = calendarMainWrapper.querySelector(references.yearBts.leftBtn.mainReference);


        // when changing month to the right
        monthSelector_rightBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_ChangeMonth(e.target);
        }, false);

        // when changing month to the left
        monthSelector_leftBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_ChangeMonth(e.target);
        }, false);



        // when changing year (right btn)
        yearChange_rightBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_ChangeYear(e.target);
        }, false);


        // when changing year (left btn)
        yearChange_leftBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_ChangeYear(e.target);
        }, false);



        // when clicking the close btn
        closeBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_ClearCalendarDateDisplayed(calendarMainWrapper);
        }, false); 
        
        
        // when clicking the check btn
        checkBtn.addEventListener('click', function(e){
            CalendarLaloGarcia_CloseCalendar(calendarMainWrapper);
        }, false);


        // if window is resized (for any reason)
        window.addEventListener('resize', function(e){
            CalendarLaloGarcia_PositionCalendarInPlace(calendarMainWrapper);
        }, false);

        // if window starts scrolling
        /*window.addEventListener('scroll', function(e){
            CalendarLaloGarcia_PositionCalendarInPlace(calendarMainWrapper);
        }, false);
        */

        // when clicking inside the calendar main wrapper
        calendarMainWrapper.querySelector(references.tbody.mainReference).addEventListener('click', function(e){
            CalendarLaloGarcia_WhenClickingADayInMonth(e.target);
        }, false);


    });


    // add events to the selectors that are meant to open a calendar
    CalendarLaloGarcia_EventsToOpenTheCalendars();

}

//
//
//
//
//

function CalendarLaloGarcia_EventsToOpenTheCalendars(){
    // this function will apply the events to open the calendars instances for each HTML element that have the calendar reference

    //
    var references = CalendarLaloGarcia_SelectorsReferences();

    //
    var mainAttrRefNameToOpenCalendars = references.selectorThatOpensCalendar.attributes.mainReference;
    var allSelectorsThatOpenCalendars = document.querySelectorAll('['+mainAttrRefNameToOpenCalendars+']');

    //
    var calendarLoaderMainAttrRef = references.calendarLoader.attributes.mainReference;
    var calendarMainReference = references.mainWrapper.mainReference;


    //
    Array.prototype.forEach.call(allSelectorsThatOpenCalendars, function(selectorThatTriggersCalendar){

        selectorThatTriggersCalendar.addEventListener('click', function(e){

            CalendarLaloGarcia_CloseAllCalendarsNow();

            // select the correct calendar regarding the selector that openes it
            var thisCalendarLoader = FindParentSelector(this, 'attribute', calendarLoaderMainAttrRef);

            var calendarItself = thisCalendarLoader.querySelector(calendarMainReference);


            // update the calendar date to make sure the calendar is selected in correct date once opened
            CalendarLaloGarcia_ShowSelectedDateInCalendarWhenOpening(calendarItself);

            // make element opacity 0 'temporary'
            calendarItself.style.opacity=0;

            // now, show the calendar
            calendarItself.style.display='block';

            // make element opacity 1 again
            calendarItself.style.opacity=1;

            // position the calendar in the correct place in the browser
            CalendarLaloGarcia_PositionCalendarInPlace(calendarItself);

            // apply a sligh different type of highlight to the calendar date (inside the calendar), if the actual date is selected
            CalendarLaloGarcia_HighlightDateIfIsActual(calendarItself);


        }, false);

    });
}

//
//
//
//
//
