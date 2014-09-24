_.mixin({
   getValueDeep: function(source,path,defaultVal) {
           /*

			Based on http://stackoverflow.com/questions/8817394/javascript-get-deep-value-from-object-by-passing-path-to-it-as-string
            Extends to look at the path recursively and return default value if it can't get to the object it needs

            Get value of an object that may or may not be defined.

            - path = string of what object you are looking for i.e. "settings.config.value"
            - defaultVal = string of what you want to return if the obj returns nothing.
            - Returns empty string by default

            */

           defaultVal = (typeof defaultVal == "undefined" ? '' : defaultVal);

           //kick out early if there is no source set for some reason
           if (
               typeof source == "undefined"  // not set
               || source == null             // null...
               || typeof source !== "object" // has no properties
               || source.length == 0         // empty object or array
           ) return defaultVal;

           var value = recLookup(source,path);
           
           function recLookup(obj, path) {
               var parts = path.split(".");
               if ( parts.length==1 && obj[parts[0]] !== null && typeof obj[parts[0]] !== "undefined"){
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