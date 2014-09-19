_.mixin({
   getValueDeep: function(source,path,defaultVal,formatter) {
           /*

            Get value of an object that may or may not be defined.

            - path = string of what object you are looking for i.e. "settings.config.value"
            - defaultVal = string of what you want to return if the obj returns nothing.
            - Returns empty string by default
            - formatter = callback function to format the return value if it's not an empty string (i.e. if you wanted to add currency formatting to any non-blank value)

            */

           defaultVal = (typeof defaultVal == "undefined" ? '' : defaultVal);

           if (typeof source == "undefined") return defaultVal; //kick out early if there is no source

           var value = recLookup(source,path);
           function recLookup(obj, path) {
               var parts = path.split(".");
               if ( parts.length==1 && obj[parts[0]] !== null){
                   //we have reached our target value
                   return obj[parts[0]];
               } else if ( obj[parts[0]] == null || typeof obj[parts[0]] == "undefined" ) {
                   //it's either not set, or null or the parent object is not set or null
                   return defaultVal;
               } else {
                   //onward to the next level!
                   return recLookup(obj[parts[0]], parts.slice(1).join("."));
               }
           }

       return value;
   }
});