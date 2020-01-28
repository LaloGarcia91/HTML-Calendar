

//
//
//
//
//

function GUI_GenerateTheMonthPrototypeHTML(calendarRulesGiven){
    // this function will create the html prototype of a given month, meaning.. how the html of the months is displayed on the calendar.

    var references = CalendarLaloGarcia_SelectorsReferences();

    // the main outer wrapper of the calendar (month view), the highest parent of the calendar itself
    var calendarMainWrapper = createNewElement({
        element:'div',
        classes:references.mainWrapper.classes,
        attributes:[
            ['data-clg-last-date-in-calendar','']
        ],
        insertElements:[
            
            {
                element:'div',
                classes:[
                  'calendar-top-btns-main-wrapper'  
                ],
                insertElements:[
                    
                    // create the close btn of the calendar
                    {
                        element:'span',
                        html:'&#10006;',
                        classes:references.closeCalendarBtn.classes
                    },
                    
                    // create the check btn
                    {
                        element:'span',
                        html:'&#10003;',
                        classes:references.checkBtn.classes
                    }
                    
                ]
            }
            
        ]
    });

    // the inner wrapper of the calendar, its parent is the main wrapper
    var calendarInnerWrapper = createNewElement({
        element:'div',
        classes:references.innerWrapper.classes
    });


    // month table
    var table = CreateTable({
        classes:references.table.classes
    });


    // add the new properties to object
    calendarRulesGiven.calendarWrapper = calendarMainWrapper;
    calendarRulesGiven.table = table;

    //
    GUI_GenerateTheMonthTheadHTML(calendarRulesGiven);

    //
    GUI_GenerateTheMonthTbodyHTML(calendarRulesGiven);

    // append the table to the inner wrapper of the calendar
    calendarInnerWrapper.appendChild(calendarRulesGiven.table);

    // append the inner wrapper to the main wrapper
    calendarMainWrapper.appendChild( calendarInnerWrapper );


    // return calendar obj
    return calendarMainWrapper;

}

//
//
//
//
//

function GUI_GenerateTheMonthTheadHTML(calendarRulesGiven){

    var references = CalendarLaloGarcia_SelectorsReferences();
    var allMonthsArray = MonthsArray(calendarRulesGiven.language);

    var selectedMonthIndex = allMonthsArray.indexOf(calendarRulesGiven.month);
    var weekDays = DaysOfWeekArray(calendarRulesGiven.language);


    // month area
    var thead = CreateThead({
        classes:references.thead.classes,

        rows:[
            
            // month select main cell
            {   
                cells:[
                    //
                    {
                        classes:[
                            'months-cell-wrapper-calendar-lalo-garcia'  
                        ],
                        attributes:[
                            ['colspan', '7']  
                        ],
                        insertElements:[
                            //
                            {
                                element:'p',
                                classes:references.month.classes,
                                attributes:[
                                    ['data-clg-current-month-index', selectedMonthIndex]  
                                ],
                                text: calendarRulesGiven.month
                            },

                            // right btn
                            {
                                element:'button',
                                html:'&rarr;',
                                classes:references.monthBtns.rightBtn.classes
                            },

                            // left btn
                            {
                                element:'button',
                                html:'&larr;',
                                classes:references.monthBtns.leftBtn.classes
                            }

                        ]
                    }
                ]
            },



            // years select main cell
            {   
                cells:[
                    {
                        classes:[
                            'years-cell-wrapper-calendar-lalo-garcia'
                        ],
                        attributes:[
                            ['colspan', '7']  
                        ],
                        insertElements:[

                            // main display of year number
                            {
                                element:'p',
                                classes:references.year.classes,
                                text: calendarRulesGiven.year
                            },


                            // right btn
                            {
                                element:'button',
                                html:'&rarr;',
                                classes:references.yearBts.rightBtn.classes
                            },

                            // left btn
                            {
                                element:'button',
                                html:'&larr;',
                                classes:references.yearBts.leftBtn.classes
                            }
                        ]
                    }
                ]
            },



            // write the week days row
            {
                classes:[''],

                // write the week days names (prefixes) in their given cells
                cells:[
                    {
                        text:weekDays[0].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[1].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[2].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[3].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[4].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[5].slice(0,3),
                        classes:references.weekDaysNames.classes
                    },

                    {
                        text:weekDays[6].slice(0,3),
                        classes:references.weekDaysNames.classes
                    }
                ]
            }
        ]
    });


    calendarRulesGiven.table.appendChild(thead);

}

//
//
//
//
//

function GUI_GenerateTheMonthTbodyHTML(calendarRulesGiven){

    var references = CalendarLaloGarcia_SelectorsReferences();

    // month table tbody
    var tbody = CreateTbody({
        classes:references.tbody.classes
    });

    calendarRulesGiven.table.appendChild(tbody);

    calendarRulesGiven.tbody = tbody;
    calendarRulesGiven.month = CurrentDate('object', calendarRulesGiven.language).month;
    calendarRulesGiven.year = CurrentDate('object', calendarRulesGiven.language).year;

    //
    GUI_CreateMonthDays(calendarRulesGiven);
}

//
//
//
//
//

function GUI_CreateMonthDays(calendarRulesGiven){
    // this function will create the month days inside the tbody

    var references = CalendarLaloGarcia_SelectorsReferences();

    //
    var calendarWrapper = calendarRulesGiven.calendarWrapper;
    var table = calendarRulesGiven.table;
    var thead = table.querySelector('thead');
    var tbody = table.querySelector('tbody');


    // empty tbody html (if any)
    tbody.innerHTML = '';


    // 
    var yearSelected = thead.querySelector(references.year.mainReference).textContent;

    //
    var currentDate = CurrentDate('object', calendarRulesGiven.language);


    // year selected
    var selected_year = calendarRulesGiven.year;


    var selected_month_index;
    if( typeof calendarRulesGiven.month == 'string' ){
        selected_month_index = DetectMonthLanguageAnd_ReturnIndex(calendarRulesGiven.month);
    } else {
        selected_month_index = calendarRulesGiven.month;
    }



    // index 0 is Sunday
    var weekDaysArray = DaysOfWeekArray(calendarRulesGiven.language);
    var getFirstWeekDayOfMonth = GetThisDateInfo(calendarRulesGiven.language, calendarRulesGiven.month, 1, calendarRulesGiven.year, 'object').weekDay;

    var selected_weekDay_index = DetectWeekDayLanguageAnd_ReturnIndex(getFirstWeekDayOfMonth);


    // days in current/selected month
    var daysInSelectedMonth = DaysInThisMonth(selected_month_index, yearSelected);    


    // create the first tbody row with its respective cells
    GUI_CreateTbodyRowsAndCells( calendarRulesGiven );



    var selectedRowIndex = 0;
    for(var i=0; i<daysInSelectedMonth; i++){  

        var currentRowInIteration, currentCellInIteration, currentMonthDay;


        try {
            //
            currentRowInIteration = tbody.querySelectorAll('tr')[selectedRowIndex];
            currentCellInIteration = currentRowInIteration.children[selected_weekDay_index]; 

            // display the month day on the current week day cell index
            currentCellInIteration.textContent = i+1;

            // add a reference of the day number
            currentCellInIteration.setAttribute('data-clg-belong-to-this-month-day-number', i+1);

            // increment the week day cell index
            selected_weekDay_index++;

        }catch(e){

            // create a new row in the table, to fit more month days
            GUI_CreateTbodyRowsAndCells( calendarRulesGiven )

            // jump to the next row
            selectedRowIndex++;

            // restart week day index
            selected_weekDay_index = 0;

            // restart selectors
            currentRowInIteration = tbody.querySelectorAll('tr')[selectedRowIndex];
            currentCellInIteration = currentRowInIteration.children[selected_weekDay_index]; 

            // get back 1 month day in iteration, since it was lost on the previous iteration.
            i--;
        }

    }


    // only highlight the month day if the already displayed/saved month and year match the month and year currently selected on the calendar itself
    CalendarLaloGarcia_HighlightDisplayedDateOnCalendar(calendarWrapper);

}

//
//
//
//
//

function GUI_CreateTbodyRowsAndCells(calendarRulesGiven){
    // this function will create the tbody rows of the month

    var newRow = CreateTableRow({
        classes:[
            'calendar-lalo-garcia-month-rows'
        ]
    }); 

    var weekDaysArray = DaysOfWeekArray(calendarRulesGiven.language);

    for(var i=0; i<weekDaysArray.length; i++){
        var currentWeekDay = weekDaysArray[i];


        // now append the cells to the row
        newRow.appendChild(CreateTableCell({
            classes:[
                'cells-calendar-lalo-garcia', 
                'JS-MONTH-DAYS-REF'
            ],

            attributes:[
                // add a reference of which week day is that this month day cell belongs
                ['data-clg-belongs-to-this-week-day-index', DetectWeekDayLanguageAnd_ReturnIndex(currentWeekDay)]
            ]
        }));

    }


    calendarRulesGiven.tbody.appendChild(newRow);

}

//
//
//
//
//

function GUI_CalendarLaloGarcia_WhenChangingMonthOrYear(eTarget){

    //
    var references = CalendarLaloGarcia_SelectorsReferences();


    //
    var mainWrapperClassReference = references.mainWrapper.mainReference;
    //
    var calendarLoaderMainRef = 'data-clg-loader-ref';


    var calendarLoaderSelector = FindParentSelector(eTarget, 'attribute', calendarLoaderMainRef);
    var calendarMainWrapper = calendarLoaderSelector.querySelector(mainWrapperClassReference);

    //
    var languageChoosed = CalendarLaloGarcia_ReturnChoosedLanguage(calendarMainWrapper);


    var table = calendarMainWrapper.querySelector('table');
    var thead = table.querySelector('thead');
    var tbody = table.querySelector('tbody');

    var monthSelected = calendarMainWrapper.querySelector(references.month.mainReference).textContent;
    var yearSelected = calendarMainWrapper.querySelector(references.year.mainReference).textContent;


    if( CheckIfYearSelectedIsInRange(yearSelected) ){

        var calendarRulesGiven = {
            calendarWrapper:calendarMainWrapper,
            table:table,
            tbody:tbody,
            month:monthSelected,
            year:yearSelected,
            language:languageChoosed
        };


        GUI_CreateMonthDays(calendarRulesGiven);
    }


    //
    CalendarLaloGarcia_HighlightDateIfIsActual(calendarMainWrapper);

}

//
//
//
//
//

