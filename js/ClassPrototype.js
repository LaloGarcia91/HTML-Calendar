function ClassPrototype(){
    var all = {
        members:{
            public:{},
            private:{}
        }
    };


    Object.seal(all);
    return all;
}