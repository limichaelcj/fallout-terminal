# Fallout Terminal
A simple terminal, styled like Bethesda's Fallout consoles.

Run javascript code directly in the console or from external files, do simple math, or simply type. Terminal commands must be preceded by a colon and local variables must be surrounded by the modulo when called.

### Terminal Commands
* :out exp        -- Prints the value of an expression to the console.
* :set var = exp  -- Sets a variable equal to the expression value. Call the variable in an expression with %var%.
* :var (reset)    -- Displays (or resets) all local variables.
* :run path       -- Runs a javascript file (.js) at the given file path.
* :clear          -- Clears all terminal lines.

Note: Local variables can store basic variables and arrays, but not objects or functions.

__*NOTE*__: This app is mainly aesthetic, and very primitive. It is merely a fun practice project for myself as I learn web development. Feel free to add new features if you like the design!
