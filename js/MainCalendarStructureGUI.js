
function MainCalendarStructureGUI(){
    // this class will create the default HTML structures for any calendar loaders out there. This class runs everytime the website loads.
    
    var classPrototype = ClassPrototype();
    var public_ = classPrototype.members.public;
    var private_ = classPrototype.members.private;   

    /*
    *
    */

    private_.CalendarReferences = CalendarReferences();
    private_.GetCalendarInfos = GetCalendarInfos();
    private_.AlterCalendarGUI = AlterCalendarGUI();
    
    private_.calendarLanguage = null;

    /*
    *
    */
    
    public_.Init = function(){
        private_.CreateAllCalendarsStructure();
    }
    
    

    private_.CreateAllCalendarsStructure = function(){
        var allCalendarsLoaders = document.querySelectorAll('[data-lalo-calendar]');

        for(var i=0; i<allCalendarsLoaders.length; i++){
            var calendarLoader = allCalendarsLoaders[i];
            var calendar = public_.GetCalendarPrototype(calendarLoader);
            calendarLoader.appendChild(calendar);
        }
    }
    
    
    
    public_.GetCalendarPrototype = function(calendarLoader){
        private_.calendarLanguage = private_.GetCalendarInfos.GetCalendarLanguage(calendarLoader);
        var calendarWrapper = private_.Wrapper();
        var table = private_.BuildCalendarTable();

        private_.MakeDateDisplayedAsReadOnly(calendarLoader);
        calendarWrapper.appendChild(table);
        return calendarWrapper;
    }


    
    private_.BuildCalendarTable = function(){
        var table = private_.MainTable();
        var thead = private_.THead();
        var tbody = private_.TBody();
        
        table.appendChild(thead);
        table.appendChild(tbody);
        
        return table;
    }



    private_.Wrapper = function(){
        var wrapper = createNewElement({
            element:'div', 
            classes:[
                'lalo-calendar-wrapper',
                'js-lalo-calendar--wrapper'
            ]
        });
        wrapper.appendChild(private_.GetCloseBtn());
        return wrapper;
    }



    private_.GetCloseBtn = function(){
        return createNewElement({
            element:'span', 
            classes:[
                'lalo-calendar-close-btn',
                'js-lalo-calendar--close-btn'
            ],
            html: '&#10006;'
        });
    }



    private_.MainTable = function(){
        return createNewElement({
            element:'table', 
            classes:[
                'lalo-calendar-table'
            ]
        });
    }



    private_.THead = function(){
        var thead = createNewElement({
            element:'thead', 
            classes:[
                'lalo-calendar-table-thead'
            ]
        });

        thead.appendChild( private_.CreateTheadMonthArea() );
        thead.appendChild( private_.CreateTheadYearArea() );
        thead.appendChild( private_.THeadWeekDaysRow() );

        return thead;
    }



    private_.TBody = function(){
        var tbody = createNewElement({
            element:'tbody', 
            classes:[
                'lalo-calendar-table-tbody',
                'js-lalo-calendar--table-tbody'
            ]
        });
        private_.CreateMonthWeeksRowsAndCells(tbody);
        return tbody;
    }
    
    
    private_.GetWeekDaysRow = function(){
        return createNewElement({
            element:'tr', 
            classes:[
                'lalo-calendar-table-weeks-rows',
                'js-lalo-calendar-table--weeks-rows'
            ]
        });
    }


    
    private_.CreateTheadMonthArea = function(){
        var row = private_.GetTheadMonthRow();
        var cell = private_.GetTheadMonthCell();

        row.appendChild(cell);
        return row;
    }



    private_.GetTheadMonthRow = function(){
        return createNewElement({
            element:'tr', 
            classes:[
                'lalo-calendar-month-row'
            ]
        });
    }



    private_.GetTheadMonthCell = function(){
        var actualDateAsNumeric = private_.CalendarReferences.currentDateAsNumeric;
        var actualMonthIndex = actualDateAsNumeric.monthIndex;
        var actualMonthName = MonthsArray(private_.calendarLanguage)[actualMonthIndex];
   
        var monthCell = createNewElement({
            element:'td', 
            classes:[
                'lalo-calendar-all-cells',
                'lalo-calendar-month-cell'
            ],
            attributes:[
                ['colspan', '7']  
            ]
        });

        var monthDisplay = createNewElement({
            element:'div',
            classes:[
                'lalo-calendar-months-display'
            ],
            attributes:[
                ['data-get-month-name-displayed', actualMonthName],
                ['data-get-month-name-displayed-index', actualMonthIndex]
            ],
            text: actualMonthName
        });

        monthCell.appendChild(private_.GetMonthRightButton());
        monthCell.appendChild(private_.GetMonthLeftButton());

        monthCell.appendChild(monthDisplay);
        return monthCell;
    }
    


    private_.CreateTheadYearArea = function(){
        var row = private_.GetCreateTheadYearArea();
        var cell = private_.GetTheadYearCell();

        row.appendChild(cell);
        return row;
    }



    private_.GetCreateTheadYearArea = function(){
        return createNewElement({
            element:'tr', 
            classes:[
                'lalo-calendar-year-row'
            ]
        });
    }



    private_.GetTheadYearCell = function(){
        var yearCell = createNewElement({
            element:'td', 
            classes:[
                'lalo-calendar-all-cells',
                'lalo-calendar-year-cell'
            ],
            attributes:[
                ['colspan', '7']  
            ]
        });

        var yearDisplay = createNewElement({
            element:'div',
            classes:[
                'lalo-calendar-years-display'
            ],
            attributes:[
                ['data-current-year-displayed', private_.CalendarReferences.currentDateAsNumeric.year]  
            ],
            text: private_.CalendarReferences.currentDateAsNumeric.year
        });


        yearCell.appendChild(private_.GetYearRightButton());
        yearCell.appendChild(private_.GetYearLeftButton());

        yearCell.appendChild(yearDisplay);
        return yearCell;
    }



    private_.THeadWeekDaysRow = function(){
        var weekDays = DaysOfWeekArray(private_.calendarLanguage);

        var row = createNewElement({
            element:'tr', 
            classes:[
                'lalo-calendar-weekdays-names-row'
            ]
        });

        for(var i=0; i<weekDays.length; i++){
            var cell = createNewElement({
                element:'td', 
                classes:[
                    'lalo-calendar-all-cells',
                    'lalo-calendar-weekdays-name-display'
                ],
                text:weekDays[i].substring(0, 3)
            });
            row.appendChild(cell);
        }

        return row;
    }
    
    

    private_.GetMonthRightButton = function(){
        return createNewElement({
            element:'button',
            classes:[
                'lalo-calendar-month-year-btns',
                'lalo-calendar-month-year-right-btn',
                'js-lalo-calendar--month-right-btn'
            ],
            html:'&rarr;'
        });
    }



    private_.GetMonthLeftButton = function(){
        return createNewElement({
            element:'button',
            classes:[
                'lalo-calendar-month-year-btns',
                'lalo-calendar-month-year-left-btn',
                'js-lalo-calendar--month-left-btn'
            ],
            html:'&larr;'
        });
    }



    private_.GetYearRightButton = function(){
        return createNewElement({
            element:'button',
            classes:[
                'lalo-calendar-month-year-btns',
                'lalo-calendar-month-year-right-btn',
                'js-lalo-calendar--year-right-btn'
            ],
            html:'&rarr;'
        });
    }



    private_.GetYearLeftButton = function(){
        return createNewElement({
            element:'button',
            classes:[
                'lalo-calendar-month-year-btns',
                'lalo-calendar-month-year-left-btn',
                'js-lalo-calendar--year-left-btn'
            ],
            html:'&larr;'
        });
    }



    private_.MakeDateDisplayedAsReadOnly = function(calendarLoader){
        var attrRefString = 'data-lalo-calendar-display-format';
        try {
            calendarLoader.querySelector('['+attrRefString+']').setAttribute('readonly', 'true');
        }catch(e){
            // not an input element
        }
    }
    

    private_.CreateCellsInWeekRow = function(thisRow){
        var daysInWeek = 7;
        for(var x=0; x<daysInWeek; x++){
            thisRow.appendChild(createNewElement({
                element:'td', 
                classes:[
                    'lalo-calendar-table-weeks-days-cells',
                    'js-lalo-calendar-table--weeks-days-cells'
                ]
            }));
        }
    }

    
    private_.CreateMonthWeeksRowsAndCells = function(tbody){
        var rowQuant = 6;
        var daysInWeek = 7;

        for(var i=0; i<rowQuant; i++){
            var newRow = private_.GetWeekDaysRow();
            private_.CreateCellsInWeekRow(newRow);
            tbody.appendChild(newRow);
        }
    }

    
    /*
    * PUBLIC METHODS
    */
    
    
    public_.DisplayNewDateInCalendar = function(calendar, monthIndex, year){
        var calendarTable = calendar.querySelector('table');
        var monthsTbody = calendarTable.querySelector('tbody');
        monthsTbody.innerHTML = '';

        private_.CreateMonthWeeksRowsAndCells(monthsTbody);

        calendarTable.appendChild(monthsTbody);
        private_.AlterCalendarGUI.DisplayMonthDays(calendar, monthIndex, year);
    }
    
    

    return public_;
}
