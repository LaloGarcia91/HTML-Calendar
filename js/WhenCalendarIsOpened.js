//
//
//
//
//

function CalendarLaloGarcia_ShowSelectedDateInCalendarWhenOpening(calendarMainWrapper){
    // this function will make sure of showing the correct date in the calendar. Since every time the calendar is opened, the user might be changing the dated on the calendar itself just to see other dates, and when he closes the calendar and then open it again later on, the calendar might be pre-selected in a wrong date.


    //
    var references = CalendarLaloGarcia_SelectorsReferences();
    var calendarLanguage = calendarMainWrapper.getAttribute(references.languageSelected.attributes.mainReference);

    //
    var dateSavedSoFar = CalendarLaloGarcia_GetLastDateInCalendar(calendarMainWrapper);
    var monthNamesArray = MonthsArray(calendarLanguage);
    var weekDaysArray = DaysOfWeekArray(calendarLanguage);


    var weekDayIndex = dateSavedSoFar.weekDayIndex;
    var weekDayName = weekDaysArray[weekDayIndex];


    var monthIndex = dateSavedSoFar.monthIndex;
    var monthName = monthNamesArray[monthIndex];

    var monthDay = dateSavedSoFar.monthDay;

    var year = dateSavedSoFar.year;


    //
    var monthDisplaySelector = calendarMainWrapper.querySelector(references.month.mainReference);

    var yearDisplaySelector = calendarMainWrapper.querySelector(references.year.mainReference);

    monthDisplaySelector.setAttribute('data-clg-current-month-index', monthIndex);
    monthDisplaySelector.textContent = monthName;

    yearDisplaySelector.textContent = year;


    var calendarRulesGiven = {
        calendarWrapper:calendarMainWrapper,
        table:calendarMainWrapper.querySelector('table'),
        tbody:calendarMainWrapper.querySelector('tbody'),
        language:calendarLanguage,
        month:monthName,
        year:year
    };


    GUI_CreateMonthDays(calendarRulesGiven);

}

//
//
//
//
//

function CalendarLaloGarcia_ChangeYear(eTarget){
    // this function will run when changing the years

    var references = CalendarLaloGarcia_SelectorsReferences();

    // 
    var rightBtnClassReference = references.yearBts.rightBtn.mainReference;
    var leftBtnClassReference = references.yearBts.leftBtn.mainReference;


    // remove the dots at the begining
    if(rightBtnClassReference[0] == '.'){
        rightBtnClassReference = RemoveCharacters(1,0,rightBtnClassReference);
    }

    if(leftBtnClassReference[0] == '.'){
        leftBtnClassReference = RemoveCharacters(1,0,leftBtnClassReference);
    }


    var yearCellParent = FindParentSelector(eTarget, 'tag', 'td');
    var currentYearSelector;


    // if it is the right btn
    if( eTarget.classList.contains( rightBtnClassReference ) ){

        if(yearCellParent){

            //
            currentYearSelector = yearCellParent.querySelector(references.year.mainReference);
            currentYearSelector.textContent = parseInt(currentYearSelector.textContent)+1;

            GUI_CalendarLaloGarcia_WhenChangingMonthOrYear(eTarget);
        }

    }



    // if it is the left btn
    if( eTarget.classList.contains( leftBtnClassReference ) ){

        if(yearCellParent){

            //
            currentYearSelector = yearCellParent.querySelector(references.year.mainReference);
            currentYearSelector.textContent = parseInt(currentYearSelector.textContent)-1;

            GUI_CalendarLaloGarcia_WhenChangingMonthOrYear(eTarget);
        }
    }

}

//
//
//
//
//


function CalendarLaloGarcia_ChangeMonth(eTarget){
    // this function will run when changing the month (clicking the month btns)

    var references = CalendarLaloGarcia_SelectorsReferences();


    // we add a try/catch statement because some of the codes below may throw errors since some selectors does not exist at the begining of the program (when browser loads). The try/catch may not be necessary for the whole code below, but I start it from the top just because.

    try {

        //
        var calendarWrapperClassRef = references.mainWrapper.mainReference;

        if(calendarWrapperClassRef[0] == '.'){
            calendarWrapperClassRef = RemoveCharacters(1,0,calendarWrapperClassRef);
        }

        var calendarWrapper = FindParentSelector(eTarget,'class',calendarWrapperClassRef);
        //
        var calendarLanguage = calendarWrapper.getAttribute(references.languageSelected.attributes.mainReference);


        //
        var allMonthsArray = MonthsArray(calendarLanguage);
        var currentMonthIndexAttrRefName = "data-clg-current-month-index";
        var lastMonthNameIndex = calendarWrapper.querySelector(references.month.mainReference).getAttribute(currentMonthIndexAttrRefName);


        // 
        var rightBtnClassReference = references.monthBtns.rightBtn.mainReference;
        var leftBtnClassReference = references.monthBtns.leftBtn.mainReference;

        //
        var rightBtnSelector = calendarWrapper.querySelector(references.monthBtns.rightBtn.mainReference);
        var leftBtnSelector = calendarWrapper.querySelector(references.monthBtns.leftBtn.mainReference);


        //
        var nextMonthNameIndex = parseInt(lastMonthNameIndex)+1;
        var nextMonth_rightBtnClicked = allMonthsArray[ nextMonthNameIndex ];

        var previousMonthNameIndex = parseInt(lastMonthNameIndex)-1;
        var previousMonth_leftBtnClicked = allMonthsArray[ previousMonthNameIndex ];



        // remove the dots at the begining
        if(rightBtnClassReference[0] == '.'){
            rightBtnClassReference = RemoveCharacters(1,0, rightBtnClassReference);
        }

        if(leftBtnClassReference[0] == '.'){
            leftBtnClassReference = RemoveCharacters(1,0, leftBtnClassReference);
        }



        var monthCellParent = FindParentSelector(eTarget, 'tag', 'td');
        var currentMonthSelector = monthCellParent.querySelector(references.month.mainReference);


        if(monthCellParent){

            // if it is the right btn
            if( eTarget.classList.contains( rightBtnClassReference ) ){

                // check if valid month selected
                if( (nextMonthNameIndex >= 0) && (nextMonthNameIndex <= 11) ){
                    currentMonthSelector.textContent = nextMonth_rightBtnClicked;

                    currentMonthSelector.setAttribute(currentMonthIndexAttrRefName, nextMonthNameIndex);
                }

            }


            // if it is the left btn
            if( eTarget.classList.contains( leftBtnClassReference ) ){

                // check if valid month selected
                if( (previousMonthNameIndex >= 0) && (previousMonthNameIndex <= 11) ){
                    currentMonthSelector.textContent = previousMonth_leftBtnClicked;

                    currentMonthSelector.setAttribute(currentMonthIndexAttrRefName, previousMonthNameIndex);
                }

            }


            GUI_CalendarLaloGarcia_WhenChangingMonthOrYear(eTarget);
        }


    }catch(e){

    }


    return false;
}

//
//
//
//
//