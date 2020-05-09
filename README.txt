HTML CALENDAR BY LALO GARCIA
V.2.0


You might don't need to read this file if you saw the examples in index.html ... Although, here it is:

***** How to use the Calendar: *****


1. Create a Div and add the attribute: "data-lalo-calendar='' "


2. To change the calendar language (english, spanish, french):
    Create a <span> or <p> or <div> element inside that Div, and add the attribute: 
        " data-lalo-calendar-language= 'spanish' " 
    
    *The default language is English, you don't need to add this element unless you want another language.


3. Display the date in an HTML selector:
    Create an 'input element (type='text')' or 'p' or 'div' element and add the attributes: 
        a) Options:
            a) data-lalo-calendar-display-format='numeric'
            b) data-lalo-calendar-display-format='short-words'
            c) data-lalo-calendar-display-format='long-words'

        b) data-lalo-calendar-opener='' (in case you want this element to be the one that opens the calendar, otherwise just create another element like a <button> and add this attribute to it.)
    
    Add an id to this element so you can reference the date later on. Example: id='my-calendar'
    

4. Final Example:

    <div data-lalo-calendar>
        <p data-lalo-calendar-language="spanish"></p>
        <input data-lalo-calendar-display-format="long-words" data-lalo-calendar-opener='' id='my-calendar'>
    </div>





