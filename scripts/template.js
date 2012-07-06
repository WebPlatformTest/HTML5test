

(function() {
	window.t = function(s) { return (translation[s] ? translation[s] : s); };
	
	if(document.addEventListener) {
	    document.addEventListener("DOMContentLoaded", function()
	    {
	        document.removeEventListener( "DOMContentLoaded", arguments.callee, false);
	        translate();
	    }, false);
	}
	else if(document.attachEvent) {
	    document.attachEvent("onreadystatechange", function()
	    {
	        if(document.readyState === "complete") {
	            document.detachEvent("onreadystatechange", arguments.callee);
	            translate();
	        }
	    });
	}
	
	function translate() {
		var elements = document.querySelectorAll('[data-i18n]');
		for (var i = 0; i < elements.length; i++) {
			var id = elements[i].getAttribute('data-i18n');
			if (id == '') id = elements[i].innerHTML;
			if (id && translation[id]) elements[i].innerHTML = translation[id];
		}
	}
})();



var tim = (function(){
    var starts  = "{{",
        ends    = "}}",
        path    = "[a-z0-9_][\\.a-z0-9_]*", // e.g. config.person.name
        pattern = new RegExp(starts + "("+ path +")" + ends, "gim"),
        undef;
    
    return function(template, data, notFound){
        // Merge the data into the template string
        return template.replace(pattern, function(tag, ref){
            var path = ref.split("."),
                len = path.length,
                lookup = data,
                i = 0;

            for (; i < len; i++){
                lookup = lookup[path[i]];
                
                // Error handling for when the property is not found
                if (lookup === undef){
                    // If specified, substitute with the "not found" arg
                    if (notFound !== undef){
                        return notFound;
                    }
                    // Throw error
                    throw "Tim: '" + path[i] + "' not found in " + tag;
                }
                
                // Success! Return the required value
                if (i === len - 1){
                    return lookup;
                }
            }
        });
    };
}());