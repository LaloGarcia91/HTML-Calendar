

function FindParentSelector(elementReference, referenceType, parentSelectorReferenceToFind) {

    try {

        // IMPORTANT: element reference will be converted into the parent node we are trying to find
        while ( elementReference = elementReference.parentNode ){

            if(elementReference != document){
                switch(referenceType){
                    case 'tag':
                        if(elementReference.tagName.toLowerCase() == parentSelectorReferenceToFind){
                            return elementReference;
                        }
                        break;

                    case 'class':
                        if(elementReference.classList.contains(parentSelectorReferenceToFind)){
                            return elementReference;
                        }
                        break;

                    case 'attribute':
                        if(elementReference.hasAttribute(parentSelectorReferenceToFind)){
                            return elementReference;
                        }
                        break;

                    default:
                        return false;
                }
            } else {
                return false;
            }

        }


    } catch (e) {
        console.log("Parent selector class wasn't found.");
        return false;
    }
}

//
//
//
//
//

function RemoveCharacters(fromStart, fromEnd, thisStr){
    // this function will remove either characters from the start or the end of a string and return it

    if(isNaN(fromEnd)){
        fromEnd = 0;
    }

    thisStr = thisStr.slice(fromStart, thisStr.length-fromEnd);

    return thisStr;
}

//
//
//
//
//

function CapitalizeFirstLetter(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
