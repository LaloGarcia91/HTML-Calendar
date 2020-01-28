CreateNewCalendars();

//
//
//
//
//

function CreateNewCalendars(){
    var references = CalendarLaloGarcia_SelectorsReferences();


    // selectors ref where calendars will be appended
    var calendarLoadersAttrRefName = references.calendarLoader.attributes.mainReference;
    var allCalendarLoaders = document.querySelectorAll('['+calendarLoadersAttrRefName+']');

    if(allCalendarLoaders.length < 1){
        // there are no calendars called in the program
        return false;
    }


    // selector that trigger the calendar to open
    var mainAttrRefNameToOpenCalendars = references.selectorThatOpensCalendar.attributes.mainReference;

    // selector that displays the date
    var mainAttrRefNameToDisplayDate = references.selectorThatDisplayDate.attributes.mainReference;


    // for each selector that holds the selector that triggers a calendar to open
    Array.prototype.forEach.call(allCalendarLoaders, function(calendarLoader, index){  

        // this language
        var languageAttrRef = references.languageSelected.attributes.mainReference;
        var languageChoosed = calendarLoader.querySelector('['+languageAttrRef+']').getAttribute(languageAttrRef);


        //
        var currentDate = CurrentDate('object',languageChoosed);

        // info needed to proceed
        var calendarRulesGiven = {
            month:currentDate.month,
            year:currentDate.year
        };


        //
        calendarRulesGiven.language = languageChoosed;


        // this is the selector that opens the calendar when clicked
        var selectorThatOpensCalendar = calendarLoader.querySelector('['+mainAttrRefNameToOpenCalendars+']');


        // this is the selector that displays the date
        var selectorThatDisplaysCalendar = calendarLoader.querySelector('['+mainAttrRefNameToDisplayDate+']');
        if(!selectorThatDisplaysCalendar){
            return false;
        }

        selectorThatDisplaysCalendar.setAttribute('readonly',true);


        // check if the element that opens the calendar is a valid element
        var checkIfValidElement = CalendarLaloGarcia_VerifyCalendarOpenerTagName(selectorThatOpensCalendar);

        if(!checkIfValidElement){
            return false;
        }

        //////////
        // here, we receive the actual calendar html obj
        //////////
        var calendarItself = GUI_GenerateTheMonthPrototypeHTML( calendarRulesGiven );

        // add the language attribute to the calendar main wrapper
        calendarItself.setAttribute(languageAttrRef, languageChoosed);


        // append the calendar in correct position of the document
        calendarLoader.appendChild(calendarItself);


        //
        CalendarLaloGarcia_PositionCalendarInPlace(calendarItself);

        //
        CalendarLaloGarcia_HighlightDateIfIsActual(calendarItself);

        //
        CalendarLaloGarcia_SaveFullDateSelected(calendarItself);

        //
        CalendarLaloGarcia_DisplayActualDateOnPageLoad(calendarItself);

    });


    //
    // AFTER ALL THE CALENDAR (OR CALENDARS) HTML HAVE BEEN CREATED (EXIST IN DOM)
    //

    // add events to each calendar
    CalendarLaloGarcia_AddEventsAfterCreatingHTML();
}

//
//
//
//
//

function CalendarLaloGarcia_PositionCalendarInPlace(calendarItself){
    // this function will position the calendar in the correct place

    //
    var references = CalendarLaloGarcia_SelectorsReferences();

    //
    var calendarMainLoader = FindParentSelector(calendarItself, 'attribute', 'data-clg-loader-ref');

    //
    var selectorThatOpensCalendar = calendarMainLoader.querySelector('['+references.selectorThatOpensCalendar.attributes.mainReference+']');

    // get the position of the HTML element that triggers the calendar instance
    var selectorThatOpensCalendar_distanceToTop = selectorThatOpensCalendar.offsetTop;

    calendarItself.style.top = selectorThatOpensCalendar_distanceToTop.top+20+'px';


    switch( CLG_CheckWhereCalendarFitsWindow(calendarItself) ){
        case 'right-to-left':
            calendarItself.style.right = 10+'px';
            break;

        case 'left-to-right':
            calendarItself.style.left = 10+'px';
            break;

        default:
            return false;
    }


}

//
//
//
//
//

function CalendarLaloGarcia_HighlightDateIfIsActual(calendarMainWrapper){
    // this function will highlight the date month day if is the one selected

    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLanguage = calendarMainWrapper.getAttribute(references.languageSelected.attributes.mainReference);

    //
    var currentDate = CurrentDate('object', calendarLanguage);


    try {

        //
        var currentMonth = currentDate.month;
        var currentMonthDay = currentDate.monthDay;
        var currentYear = currentDate.year;
        var currentWeekDay = currentDate.weekDay;


        // current selected month and year in calendar
        var currentMonthSelector = calendarMainWrapper.querySelector(references.month.mainReference);
        var currentMonthSelectorValue = currentMonthSelector.textContent;

        var currentYearSelector = calendarMainWrapper.querySelector(references.year.mainReference);
        var currentYearSelectorValue = currentYearSelector.textContent;

        var monthDayCellReferenceName = "data-clg-belong-to-this-month-day-number";
        var monthDayCellReferenceSelectorString = "["+monthDayCellReferenceName+"='"+currentMonthDay+"']";
        var monthDayCellInTable = calendarMainWrapper.querySelector(monthDayCellReferenceSelectorString);
        var monthDayCellNumber = monthDayCellInTable.getAttribute('data-clg-belong-to-this-month-day-number');


        // correct date
        var correctMonthOrYearRefClass = 'calendar-lalo-garcia-correct-month-and-year-select';
        var correctMonthDayRefClass = 'calendar-lalo-garcia-correct-month-day-select';


        // verify
        var varifyMonth = currentMonthSelectorValue == currentMonth;
        var varifyYear = currentYearSelectorValue == currentYear;

        if(varifyMonth){
            // add highlight to the month and year elements
            currentMonthSelector.classList.add(correctMonthOrYearRefClass);
        } else {
            currentMonthSelector.classList.remove(correctMonthOrYearRefClass);
        }
        
        
        if(varifyYear){
            // add highlight to the month and year elements
            currentYearSelector.classList.add(correctMonthOrYearRefClass);
        } else {
            currentYearSelector.classList.remove(correctMonthOrYearRefClass);
        }
        

        if(varifyMonth && varifyYear){
            // highlight the correct month day, if the current month and year are selected in the calendar
            monthDayCellInTable.classList.add(correctMonthDayRefClass);
        }


    }catch(e){

    }

}

//
//
//
//
//

function CalendarLaloGarcia_CloseCalendar(thisCalendar){

    var references = CalendarLaloGarcia_SelectorsReferences();

    // cerrar el calendario
    thisCalendar.style.display='none';
}

//
//
//
//
//

function CalendarLaloGarcia_ClearCalendarDateDisplayed(thisCalendar){
    // borrar la fecha del calendario, es decir: del selector donde la muestra

    // check if there is actually a date displayed
    var aDateIsDisplayed = CheckIfADateIsDisplayedFromThisCalendarToASelector(thisCalendar);

    //
    if( !aDateIsDisplayed ){
        alert('There is no date to be cleared.')
        return false;
    }
    

    var msg = 'Reset/Clear date?';

    if( confirm(msg) ){

        var references = CalendarLaloGarcia_SelectorsReferences();
        
        var calendarLoader = FindParentSelector(thisCalendar, 'attribute', references.calendarLoader.attributes.mainReference);
        var caendarOpener = calendarLoader.querySelector('['+references.selectorThatOpensCalendar.attributes.mainReference+']');
        var calendarLanguage = thisCalendar.getAttribute(references.languageSelected.attributes.mainReference);


        //
        RemoveDateDisplayedInThisSelector(thisCalendar);

        //
        CalendarLaloGarcia_CloseCalendar(thisCalendar);

        // ponemos la fecha actual otra vez
        var actualDate = CurrentDate('object-numbers', calendarLanguage);

        SaveThisDateInCalendar(thisCalendar, JSON.stringify({
            weekDayIndex:actualDate.weekDayIndex,
            monthIndex:actualDate.monthIndex,
            monthDay:actualDate.monthDay,
            year:actualDate.year
        }));

        // removemos algunas referencias 
        EmptySelectedDateAttributesReferences(caendarOpener);
    }

}

//
//
//
//
//

function CalendarLaloGarcia_WhenClickingADayInMonth(eTarget){
    // this function will act when a day of the month is clicked

    var references = CalendarLaloGarcia_SelectorsReferences();

    //
    var mainCalendarWrapperClass = references.mainWrapper.mainReference;

    if(mainCalendarWrapperClass[0] == '.'){
        mainCalendarWrapperClass = RemoveCharacters(1,0, mainCalendarWrapperClass);
    }


    var affectThisCalendar = FindParentSelector(eTarget, 'class', mainCalendarWrapperClass);
    var monthDaysCellsClassRef = 'JS-MONTH-DAYS-REF';
    var selectedDayClass = 'css-js-calendar-lalo-garcia-selected-day';



    if( eTarget.classList.contains( monthDaysCellsClassRef ) && eTarget.textContent != ''){
        //
        CalendarLaloGarcia_RemoveSelectedDayIfExist( affectThisCalendar );
        //
        eTarget.classList.add(selectedDayClass);
        //
        CalendarLaloGarcia_SaveFullDateSelected(affectThisCalendar);
        //
        CalendarLaloGarcia_DisplayDateInCorrectSelector(affectThisCalendar);
        //
        CalendarLaloGarcia_CloseCalendar(affectThisCalendar);
        
        //
        CalendarLaloGarcia_SaveChoosedDateInTheCalendarOpener(affectThisCalendar);
    }

}

//
//
//
//
//

function CalendarLaloGarcia_RemoveSelectedDayIfExist(affectThisCalendar){
    // this function will remove the selected day from a month (if any)

    var allDaysCells = affectThisCalendar.querySelectorAll('.JS-MONTH-DAYS-REF');
    var classToRemove = 'css-js-calendar-lalo-garcia-selected-day';


    Array.prototype.forEach.call(allDaysCells, function(dayCell){
        dayCell.classList.remove(classToRemove);
    });
}

//
//
//
//
//

function CalendarLaloGarcia_HighlightDisplayedDateOnCalendar(calendarWrapper){
    // this function will highlight the already displayed date, on the calendar (assuming correct month and year are selected). If they are not, the month day won't be highlighted on the next/previous month

    //
    var references = CalendarLaloGarcia_SelectorsReferences();


    try {
        //
        var monthNameSelector = calendarWrapper.querySelector(references.month.mainReference);
        var currentMonthIndexInCalendar = monthNameSelector.getAttribute('data-clg-current-month-index');
        //
        var yearSelector = calendarWrapper.querySelector(references.year.mainReference);
        var currentYearInCalendar = yearSelector.textContent;


        var lastDateSavedObj = CalendarLaloGarcia_GetLastDateInCalendar(calendarWrapper);
        //
        var monthIndexSaved = lastDateSavedObj.monthIndex;
        var monthDaySaved = lastDateSavedObj.monthDay;
        var yearSaved = lastDateSavedObj.year;


        if(currentMonthIndexInCalendar == monthIndexSaved && currentYearInCalendar == yearSaved){

            var lastMonthDaySaved = monthDaySaved;
            var monthDayCellsNumberAttrName = "data-clg-belong-to-this-month-day-number";
            var thisMonthDayCellSelectorString = "["+monthDayCellsNumberAttrName+"='"+lastMonthDaySaved+"']";
            var thisMonthDayCellSelector = calendarWrapper.querySelector(thisMonthDayCellSelectorString);

            thisMonthDayCellSelector.classList.add('css-js-calendar-lalo-garcia-selected-day');
        }

    }catch(e){
    }

}

//
//
//
//
//

function CalendarLaloGarcia_CloseAllCalendarsNow(){
    // this function will close every calendar existing in the DOM

    //
    var references = CalendarLaloGarcia_SelectorsReferences();

    //
    var allCalendarsSelectors = document.querySelectorAll(references.mainWrapper.mainReference);

    //
    Array.prototype.forEach.call(allCalendarsSelectors, function(calendar){
        calendar.style.display='none'; 
    });

}

//
//
//
//
//

function CalendarLaloGarcia_VerifyCalendarOpenerTagName(selectorThatOpensCalendar){
    // this function will see if the element that triggers the calendar to open is a valid element

    var selectorTagName = selectorThatOpensCalendar.tagName.toLowerCase();
    var validTags = ['input','p','span','div','button', 'td', 'tr'];

    //
    if( validTags.indexOf(selectorTagName) >= 0){

        //
        if(selectorTagName == 'input'){
            var selectorType = selectorThatOpensCalendar.getAttribute('type');

            //
            if(!selectorType || selectorType == '' || selectorType == 'text'){
                return selectorTagName;
            }
        } else {

            // if it is another tag name different than "input"
            return selectorTagName;   
        }

    }

    console.log('Ops! Valid tag names are: '+validTags.join(', ')+'.');
    return false;
}

//
//
//
//
//

function CalendarLaloGarcia_DisplayActualDateOnPageLoad(calendarMainWrapper){
    // this function checks if the user selected to show actual date on page load for the calendar

    var references = CalendarLaloGarcia_SelectorsReferences();

    // calendar loader
    var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', 'data-clg-loader-ref');

    try {

        var selectorAttrName = 'data-display-actual-date-on-load';

        //
        var displayActualDateOnLoad_selector = calendarLoader.querySelector('['+selectorAttrName+']').getAttribute(selectorAttrName);


        if(displayActualDateOnLoad_selector == 'yes'){
            CalendarLaloGarcia_DisplayDateInCorrectSelector(calendarMainWrapper);
        }

    }catch(e){

    }


}

//
//
//
//
//

function CalendarLaloGarcia_DisplayDateInCorrectSelector(calendarMainWrapper){
    // this function will display the selected date by the user in the correct HTML element (since there can be more than 1 calendar called in the HTML)

    //
    var references = CalendarLaloGarcia_SelectorsReferences();
    //
    var calendarLanguage = calendarMainWrapper.getAttribute(references.languageSelected.attributes.mainReference);
    //
    var monthsArray = MonthsArray(calendarLanguage);
    var weekDaysArray = DaysOfWeekArray(calendarLanguage);


    try {

        // calendar loader
        var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', 'data-clg-loader-ref');
        //
        var selectorThatDisplaysDate = calendarLoader.querySelector('['+references.selectorThatDisplayDate.attributes.mainReference+']');
        //
        var tagNameOf_selectorThatDisplaysDate = selectorThatDisplaysDate.tagName.toLowerCase();
        //
        var useThisFormat = CalendarLaloGarcia_DateFormatsToDisplayDate(calendarMainWrapper);



        if(tagNameOf_selectorThatDisplaysDate == 'input'){
            // if the selector that opens the calendar is an input (accepts value)
            selectorThatDisplaysDate.value = useThisFormat;

        } else {
            // if it is NOT an input (accepts text)
            selectorThatDisplaysDate.textContent = useThisFormat;
        }

        //
        CalendarLaloGarcia_SaveChoosedDateInTheCalendarOpener(calendarMainWrapper);

    }catch(e){

    }
}

//
//
//
//
//

function CalendarLaloGarcia_DateFormatsToDisplayDate(calendarMainWrapper){
    // this function will return the correct date format requested by the HTML that triggers the calendar to open (user)

    //
    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLanguage = calendarMainWrapper.getAttribute(references.languageSelected.attributes.mainReference);

    //
    var monthsArray = MonthsArray(calendarLanguage);
    var weekDaysArray = DaysOfWeekArray(calendarLanguage);

    //
    var savedDate = CalendarLaloGarcia_GetLastDateInCalendar(calendarMainWrapper);

    // numeric month (used to display short dates)
    var monthNameNumber = parseInt(savedDate.monthIndex)+1;

    // long date
    var month = CapitalizeFirstLetter(monthsArray[savedDate.monthIndex]);
    var monthDay = savedDate.monthDay;
    var weekDay = CapitalizeFirstLetter( weekDaysArray[savedDate.weekDayIndex] );
    var year = savedDate.year;



    // calendar loader
    var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', 'data-clg-loader-ref');
    //
    var selectorThatDisplayDate = calendarLoader.querySelector('['+references.selectorThatDisplayDate.attributes.mainReference+']');

    //
    var displayDateFormat = selectorThatDisplayDate.getAttribute('data-clg-date-format-display');

    switch(displayDateFormat){
        case 'numeric':
            return monthDay+' / '+monthNameNumber+' / '+year;

        case 'words-complete':
            return weekDay+', '+monthDay+' '+month+', '+year;

        default:
        case 'words-short':
            return weekDay.substring(0,3)+', '+monthDay+' '+month.substring(0,3)+', '+year;
    }

}

//
//
//
//
//

function CalendarLaloGarcia_ReturnChoosedLanguage(calendarMainWrapper){
    var references = CalendarLaloGarcia_SelectorsReferences();
    var languageAttrRef = references.languageSelected.attributes.mainReference;

    try {
        var calendarLoaderAttrRef = references.calendarLoader.attributes.mainReference;
        var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', calendarLoaderAttrRef);
        return calendarLoader.querySelector('['+languageAttrRef+']').getAttribute(languageAttrRef);

    }catch(e){
        console.log(e)
        console.log("This function instance, didn't found a language for the calendar.")
    }


    return false;
}

//
//
//
//
//

function CLG_CheckWhereCalendarFitsWindow(calendarMainWrapper){
    // this function will return from where is that the calendar will appear, acording to how far/near it is from the browser window borders

    var references = CalendarLaloGarcia_SelectorsReferences();

    var calendarLoaderMainAttrRef = references.calendarLoader.attributes.mainReference;
    var calendarLoader = FindParentSelector(calendarMainWrapper, 'attribute', calendarLoaderMainAttrRef);

    var calendarOpenerMainAttrRef = references.selectorThatOpensCalendar.attributes.mainReference;
    var calendarOpenerSelector = calendarLoader.querySelector('['+calendarOpenerMainAttrRef+']');


    // measurements
    var calendarWidth = calendarMainWrapper.offsetWidth;
    var calendarHeight = calendarMainWrapper.offsetHeight;
    var calendarBounds = calendarMainWrapper.getBoundingClientRect();

    var calendarOpenerWidth = calendarOpenerSelector.offsetWidth;
    var calendarOpenerHeight = calendarOpenerSelector.offsetHeight;
    var calendarOpenerBounds = calendarOpenerSelector.getBoundingClientRect();

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;




    if(calendarOpenerBounds.left + calendarWidth > windowWidth){
        return 'right-to-left';
    }

    if(calendarOpenerBounds.left - calendarWidth < 0){
        return 'left-to-right';
    }


    return false;
}

//
//
//
//
//

function ReturnCalendarHTML_Object(instructionsObj){
    // this function will return an Calendar HTML object, so it can be appended to another HTML node
    
    // instructions that need to be received in the parameter
    var finalInstructionsObj = {
        calendarTagHTML: instructionsObj.calendarTagHTML, // string
        showActualDateOnLoad: instructionsObj.showActualDateOnLoad, // string (yes, no)
        language: instructionsObj.language, // string
        dateFormat: instructionsObj.dateFormat, // string
        cssClasses: instructionsObj.cssClasses // array of strings
    };


    // this is the calendar loader
    var calendarLoaderRef = createNewElement({
        element:'div',
        classes:[
            ''
        ],
        attributes:[
            ['data-clg-loader-ref','']
        ]
    });


    // the actual HTML element that either displays and opens the calendar
    var elementThatDisplaysAndOpensCalendar = createNewElement({
        element:function(){
            if(finalInstructionsObj.calendarTagHTML == ''){
                return 'input';
            }

            return finalInstructionsObj.calendarTagHTML;
        }(),
        classes:finalInstructionsObj.cssClasses,
        attributes:[
            ['data-clg-date-opener',''],
            ['data-clg-date-format-display', finalInstructionsObj.dateFormat],
            ['data-clg-date-language',finalInstructionsObj.language],
            ['data-display-actual-date-on-load', finalInstructionsObj.showActualDateOnLoad]
        ]
    });



    // choose if the HTML element accepts text or value
    switch(finalInstructionsObj.calendarTagHTML){
        case 'div':
        case 'p':
        case 'span':

            switch(finalInstructionsObj.showActualDateOnLoad){
                case false:
                case 'no':
                default:
                    elementThatDisplaysAndOpensCalendar.textContent = '-';
                    break;
            }

            break;


        case 'input':

            switch(finalInstructionsObj.showActualDateOnLoad){
                case false:
                case 'no':
                default:
                    elementThatDisplaysAndOpensCalendar.value = '-';
                    break;
            }

            break;
    }

    calendarLoaderRef.appendChild(elementThatDisplaysAndOpensCalendar);

    return calendarLoaderRef;
}

//
//
//
//
//

function CheckIfADateIsDisplayedFromThisCalendarToASelector(thisCalendar){
    // this function will check if there is an actual date displayed in the selector that displays the calendar date

    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLoaderAttrRef = references.calendarLoader.attributes.mainReference;
    var calendarLoader = FindParentSelector(thisCalendar, 'attribute', calendarLoaderAttrRef);
    
    var selectorThatDisplaysDateAttrRef = references.selectorThatDisplayDate.attributes.mainReference;
    var selectorWhereCalendarDisplaysDate = calendarLoader.querySelector('['+selectorThatDisplaysDateAttrRef+']');
    
    var thisTagName = selectorWhereCalendarDisplaysDate.tagName.toLowerCase();

    //

    switch(thisTagName){
        case 'input':
            return selectorWhereCalendarDisplaysDate.value.length > 2;

        default:
            return selectorWhereCalendarDisplaysDate.textContent.length > 2;
    }
}

//
//
//
//
//

function RemoveDateDisplayedInThisSelector(thisCalendar){
    // this function will remove the date displayed in the HTML selector of 'x' calendar
    
    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLoaderAttrRef = references.calendarLoader.attributes.mainReference;
    var calendarLoader = FindParentSelector(thisCalendar, 'attribute', calendarLoaderAttrRef);

    var selectorThatDisplaysDateAttrRef = references.selectorThatDisplayDate.attributes.mainReference;
    var selectorWhereCalendarDisplaysDate = calendarLoader.querySelector('['+selectorThatDisplaysDateAttrRef+']');

    var thisTagName = selectorWhereCalendarDisplaysDate.tagName.toLowerCase();
    
    //
    switch(thisTagName){
        case 'input':
            selectorWhereCalendarDisplaysDate.value = '';
            return true;

        default:
            selectorWhereCalendarDisplaysDate.textContent = '';
            return true;
    }
}

//
//
//
//
//



