<?php

class Template {
	var $file;
	var $filters;
    var $value;
	var $prepend;
	var $append; /// Holds all the template variables

    /**
     * Constructor
     *
     * @param $file string the file name you want to load
     */
    function __construct($file = null) {
        $this->file = $file;
    }

    /**
     * Set a template variable.
     */
    function set($name, $value) {
		$this->value[$name] = is_object($value) && @function_exists(array($value, 'Template')) ? $value->fetch() : $value;
    }

    function append($name, $value) {
		if (isset($this->append[$name]))
			$this->append[$name] .= is_object($value) && @function_exists(array($value, 'Template')) ? $value->fetch() : $value;
		else
			$this->append[$name] = is_object($value) && @function_exists(array($value, 'Template')) ? $value->fetch() : $value;
    }

    function prepend($name, $value) {
		if (isset($this->prepend[$name]))
			$this->prepend[$name] .= is_object($value) && @function_exists(array($value, 'Template')) ? $value->fetch() : $value;
		else
			$this->prepend[$name] = is_object($value) && @function_exists(array($value, 'Template')) ? $value->fetch() : $value;
    }

	function filter($function) {
		$this->filters[] = $function;
	}

	function get($name) {
		return $this->value[$name];
	}

    /**
     * Open, parse, and return the template file.
     *
     * @param $file string the template file name
     */
    function fetch($file = null) {
        if(!$file) $file = $this->file;

		if (is_array($this->prepend)) {
			while(list($k,) = each($this->prepend)) {
				if (isset($this->value[$k]))
					$this->value[$k] = $this->prepend[$k] . $this->value[$k];
				else
					$this->value[$k] = $this->prepend[$k];
			}
		}

		if (is_array($this->append)) {
			while(list($k,) = each($this->append)) {
				if (isset($this->value[$k]))
					$this->value[$k] = $this->value[$k] . $this->append[$k];
				else
					$this->value[$k] = $this->append[$k];
			}
		}

		if (is_array($this->value)) {
         	extract($this->value);
		}
									   // Extract the vars to local namespace

		ob_start();                    // Start output buffering
        include($file);                // Include the file
        $contents = ob_get_contents(); // Get the contents of the buffer
        ob_end_clean();                // End buffering and discard

		// Execute any registered filters...
		if (is_array($this->filters)) {
			while(list(,$f) = each($this->filters)) {
				$contents = call_user_func($f, $contents, $this);
			}
		}

		return $contents;              // Return the contents
    }
}