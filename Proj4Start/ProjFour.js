Package ProjFour;

Helpers
    sp  = ' ';
    digit = ['0'..'9'];
    letter = ['a'..'z'] | ['A'..'Z'];
    alphanumeric = letter | digit;
    //from proj 3
    tab = 9 ;
    cr = 12 ;
    lf = 10; 
    sp = ' ';
    period = '.' ;
    left = '<<' ;
    right = '>>' ;
    add = '+' ;
    sub = '-' ;
    mul = '*' ;
    div = '/' ;
	 mod = '%' ;
    
Tokens
    id = letter (letter | number)*;
    number = digit+;
    whitespace = sp+;
    //from proj 3
    lparen = '(' ;
    rparen = ')' ;
    assignment = '<--' ;
    comma = ',' ;
    semicolon = ';' ;
    id = letter+ ;
    number = digit+ ;
    echo = 'echo' ;
    unaryop = left
    | right
    ;
    addsub = add
    | sub
    ;
    muldivmod = mul
    | div
    | mod
    ;
Ignored Tokens
  whitespace;

Productions
    prog = {first} id number |
    	   {second} lotnumbers |
    	   {third} [eachsymbolisuniqueinaproduction]:id [secondid]:id [digitone]:number [digittwo]:digit ;
    lotnumbers = number morenumbers;
    morenumbers = {fourth} number morenumbers |
    		  {emptyproduction} ;
    expression = 
            {term} term
            | {binopexp} expression addsub term
            | {unaryopexp} expression unaryop
            ;
            term = 
            {single} value
            | {multiple} term muldivmod value
            ;
            value = 
            {id} id
            | {number} number
            ;
            explist = 
            {multiple} expression comma explist
            | {single} expression
            ;
            stmt = 
            {assignval} id assignment expression
            | {printstmt} echo lparen explist rparen
            ;
            stmts = 
            {multiple} stmt semicolon stmts
            | {single} stmt
;