/*
This is a small library created by Eduardo Garcia Guajardo. It serves to facilitate dynamic HTML tables with vanilla JS (although it can also be used with other libraries but there are some libraries that make this "dynamic table" easier to create I believe). 

- This file also contains some examples of how to use the library, which is VERY easy, if you know how a JSON format works, you'll get it right away. If not, well, I recomend you do some research on JSON.
*/




function CreateTable(objParamProperties){
    
    // if no parameters are passed, still create the table
    if(!objParamProperties){
        var objParamProperties = {};
    }
    

    // create table
    
    /* assign what element is going to be created. Since it is a function to create a table, the element will obviously be a table, this will server the createNewElement() function to know which element to return */
    objParamProperties.element = 'table';
    
    
    
    // create the actual table element
    var table = createNewElement(objParamProperties);


    if(objParamProperties.thead){
        var thead = CreateThead(objParamProperties.thead);
        table.appendChild(thead);
        //console.log('Table has a thead element.');
    }

    if(objParamProperties.tbodies){
        var tbodies = CreateTbody(table, objParamProperties.tbodies);
    }

    if(objParamProperties.tfoot){
        var tfoot = CreateTfoot(objParamProperties.tfoot);
        table.appendChild(tfoot);
        //console.log('Table has a tfoot element.');
    }
    
    
    return table;

}

//
//
//
//
//

function CreateThead(objParamProperties){

    /* Create and return the element and its  
    respective childs and grandchilds and so on... */

    return Thead_or_Tbody_or_Tfoot('thead', objParamProperties);
}

//
//
//
//
//

function CreateTbodies(appendTbodiesHere, objParamProperties){

    /* Create and return the element and its  
    respective childs and grandchilds and so on... */

    Array.prototype.forEach.call(objParamProperties, function(tbody){
        var appendTbody = Thead_or_Tbody_or_Tfoot('tbody', tbody); 

        appendTbodiesHere.appendChild(appendTbody);
    });

}

//
//
//
//
//

function CreateTbody(objParamProperties){

    /* Create and return the element and its  
    respective childs and grandchilds and so on... */

    return Thead_or_Tbody_or_Tfoot('tbody', objParamProperties);
}

//
//
//
//
//

function CreateTfoot(objParamProperties){

    /* Create and return the element and its  
    respective childs and grandchilds and so on... */

    return Thead_or_Tbody_or_Tfoot('tfoot', objParamProperties);
}


//
//
//
//
//

function CreateTableRow(objParamProperties){
    objParamProperties.element = 'tr';
    var tr = createNewElement(objParamProperties);
    
    if(objParamProperties.cells){
        appendCellsToRows(tr, objParamProperties.cells);
    }

    return tr;
}

//
//
//
//
//

function CreateTableCell(objParamProperties){
    objParamProperties.element = 'td';
    var td = createNewElement(objParamProperties);

    return td;
}

//
//
//
//
//

function Thead_or_Tbody_or_Tfoot(elementToCreate, TTT_Info_Param){
    /*
        This function receives either the thead, tbody or tfoot info. In order to start creating the actual elements. The object paramer is NOT the actual thead, tbody or tfoot. They just CONTAIN the information that will be used in order to create the actual HTML element (thead, tbody or tfoot). The parameter also contains the info of the child rows and cells (aussiming they wer set on the object)
        */



    try {
        /* We use a try/catch since the program might throw and error because of 'missing' properties on the JSON objects. This properties are not really 'missing', example:
            Someone created a table and its stuff, but you didn't used the (lets say ID) property to give that element an CSS ID. The program expects you too use all of the object properties allowed (but is not a must, obviously). Some of the properties names are: classes, id, attributes, insertElements etc...
            */


        //create thead, tbody or tfoot
        if(TTT_Info_Param){
            TTT_Info_Param.element = elementToCreate;


            // create the element (thead, tbody or tfoot), depeding on the parameters
            var TTT_already_created = createNewElement(TTT_Info_Param);



            /*
                SELECT THE ROWS INDICATED IN THE THEAD, TBODY OR TFOOT:

                This will/should be received as an array of JSON objs, those JSON objs will THEN be used to call  the function CreateNewElement(), in order to actually CREATE them. 

                By default, each and every JSON obj of this array (which are not Row elements YET), will be appended to either a thead, tbody or tfoot of the table created
                */
            var Thead_or_Tbody_or_Tfoot_rows = TTT_Info_Param.rows;

            
            
            /* check if the element comes with rows to append, 
            it doesn't come with rows, it will throw an error */
            if(Thead_or_Tbody_or_Tfoot_rows){
                
                /* Now, append each of those 'rows infos' (not the actual row yet) to either the thead, tbody or tfoot (depeding on parameters). */
                Array.prototype.forEach.call(Thead_or_Tbody_or_Tfoot_rows, function(rowElementObjectInfo){

                    /* In here, we receive an object as parameter. This object is NOT a row element, yet. It only has/should have the object properties/keys that WILL be THEN used to create the actual row element. With help of the function createNewElement() */
                    rowElementObjectInfo['element'] = 'tr';

           

                    /* And now, we are creating the actual row HTML element based on the object information received. */
                    var newRow = createNewElement(rowElementObjectInfo);
                    TTT_already_created.appendChild(newRow);

            
                    /* Now, we create AND append the cells given to the thead, tbody or tfoot (if exists) with the following function.
                The function receives 2 parameters, the row currently created, and the cells property info that the row element info has in it. Notice, the rows don't come from the -new row element- we just created, that element does NOT have rows YET. */
                    if(rowElementObjectInfo.cells){
                        appendCellsToRows(newRow, rowElementObjectInfo.cells);   
                    }

                });
            }



            // return the thead, tbody or tfoot created
            return TTT_already_created;

        }

    }catch(e){
        console.log('There was a problem while trying to create the Dynamic Table. This should have not happened. Please verify the code.');
    }


}

//
//
//
//
//

function appendCellsToRows(thisRow, thisCellsArray){
    /*
        Usually, if a row is created is because cells will be inside. This is pretty much a MUST since a table row with no cells inside won't do anything. 

        IMPORTANT:
        There is NO need to return anything in this function, since we are using appendChild() and it will append the cells directly to the correct row element in the DOM.

        */
    Array.prototype.forEach.call(thisCellsArray, function(cell){
        cell.element = 'td';

        var newCell = createNewElement(cell);

        thisRow.appendChild(newCell);
    });
}

//
//
//
//
//

/* HERE ARE 2 EXAMPLES OF HOW TO USE THIS DYNAMIC TABLE */

function DynamicTableExample(){
    /*
    Run this function, first select where this table is going to be loaded. 

    This function does NOT return anything (is a VOID function), since we are declaring where the table is going to load right here. Although you can return the table variable at the end of the function instead and use it elsewhere if you want to.
    */

    
    // load the table HERE
    var loadTable = document.querySelector('.loadTableRightHere');


    var table = CreateTable({

        // start table attributes
        classes:[
            'table_class_1_example',
            'table_class_2_example'
        ],
        id:'table_id_example',
        attributes:[
            ['data-table-example-1', 'value of table attribute example 1'],
            ['data-table-example-2', 'value of table attribute example 2']
        ],
        // end table attributes
        //
        //
        //
        // start thead
        thead:{
            classes:[
                'thead_class_1_example',
                'thead_class_2_example'
            ],
            id:'thead_id_example',
            attributes:[
                ['data-thead-example-1', 'value of thead attribute example 1'],
                ['data-thead-example-2', 'value of thead attribute example 2']
            ],

            // start inserting rows in thead
            rows:[

                // start first row
                {
                    classes:[
                        'thead_row_number_1_class_example_1',
                        'thead_row_number_1_class_example_2'
                    ],
                    id:'thead_row_number_1_id_example',
                    attributes:[
                        ['data-thead-row-1-example-1', 'value of thead row 1, attribute example 1'],
                        ['data-thead-row-1-example-2', 'value of thead row 1, attribute example 2']
                    ],

                    // start row cells
                    cells:[

                        // cell 1
                        {
                            id:'thead_row_number_1_cell_1_id_example',
                            attributes:[
                                ['data-thead-row-1-cell-1', 'You can use all of the rest of the properties too. (classes, id, attributes, inserElements, text, html...)']
                            ],
                            text: 'thead row 1, cell 1'
                        },


                        // cell 2
                        {
                            id:'thead_row_number_1_cell_2_id_example',
                            text: 'thead row 1, cell 2 with text-center class',
                            classes:['text-center']
                        },


                        // cell 3
                        {
                            id:'thead_row_number_1_cell_3_id_example',
                            text: 'thead row 1, cell 3'
                        }

                    ]// end row cells
                }// end first row


            ]// end thead rows array


        },// end thead


        // start tbody
        tbodies:[
            
            // start first tbody
            {
            id:'tbody_id',
            rows:[
                {
                    classes:[
                        'tbody_row_class'
                    ],
                    cells:[
                        {
                            classes:[
                                'tbody_cells'
                            ],
                            text: 'cell 1 text',
                            insertElements:[
                                {
                                    element:'h6',
                                    html:'H6 inserted/appended element 1'
                                },
                                {
                                    element:'h6',
                                    html:'H6 inserted/appended element 2'
                                }
                            ]
                        },

                        {
                            classes:[
                                'tbody_cells'
                            ],
                            text: 'cell 2 text',
                            insertElements:[
                                {
                                    element:'h2',
                                    html:'H2 inserted/appended element 1'
                                },
                                {
                                    element:'h2',
                                    html:'H2 inserted/appended element 2'
                                }
                            ]
                        },

                        {
                            classes:[
                                'tbody_cells'
                            ],
                            text: 'cell 3 text',
                            insertElements:[
                                {
                                    element:'h3',
                                    html:'H3 inserted/appended element 1'
                                },
                                {
                                    element:'h3',
                                    html:'H3 inserted/appended element 2 with a text-center class',
                                    classes:['text-center']
                                }
                            ]
                        }
                    ]
                }
            ]
                // end first tbody
        }
        
        ]
        // end tbodies

    });// end table element


    console.log(table)
    loadTable.appendChild(table);

    // you can return the table also instead, if that is the case, please remove the lines above.
    // return table;

}

//
//
//
//
//

function DynamicTableElementsExample(){
    /*
    You can also create individual table elements and use them as you want. I believe is not necessary but still, here is how you can use them.
    */
    
    // there should be a table element first
    var tableElement = document.querySelector('.tableExample');

    
    var thead = CreateThead({
        classes:['thead_class_1', 'thead_class_2'],
        id:'thead_id'
    });

    var tr = CreateTableRow({
        classes:['tr_class_1', 'tr_class_2'],
        id:'tr_id'
    });

    var td = CreateTableCell({
        classes:['td_class_1', 'td_class_2'],
        id:'td_id',
        text:'this is a text from a cell',
        insertElements:[
            {
                element:'p',
                text:'this is a P element inside the cell',
                attributes:[
                    ['style','color:orangered']
                ]
            }
        ]
    });

    tr.appendChild(td);
    thead.appendChild(tr);


    tableElement.appendChild(thead);
}







