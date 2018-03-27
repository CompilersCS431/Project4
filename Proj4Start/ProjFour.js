Package ProjFour;

Helpers
    sp  = ' ';
    number = ['0'..'9'];
    letter = ['a'..'z'] | ['A'..'Z'];
    alphanumeric = letter | number;
	tab = 9 ;
	cr = 12 ;
	lf = 10; 
	period = '.' ;
	left = '<<' ;
	right = '>>' ;
	add = '+' ;
	sub = '-' ;
	mul = '*' ;
	div = '/' ;
	mod = '%' ;
	quotation = '"' | 34;
    
Tokens
    id = letter (letter | number)*;
    digit = number+;
    whitespace = sp+;
	lparen = '(' ;
	rparen = ')' ;
	lcurly = '{';
	rcurly = '}';
	lsquare = '[';
	rsquare = ']';
	colon = ':';
	comma = ',' ;
	semicolon = ';' ;
	id = letter+ ;
	number = digit+ ;
	echo = 'echo' ;
	unaryop = left
	| right
	;
	addop = add
	| sub
	;
	multop = mul
	| div
	;
	string = quotation (letter | number)* quotation;
	true = 'TRUE';
	false = 'FALSE';
	cond = '==' 
		| '!='
		| '>='
		| '<='
		| '>'
		| '<'
		;
	type = 'INT' 
		| 'REAL'
		| 'STRING'
		| 'BOOLEAN'
		| 'VOID'
		| id
		;
	int = digit(digit)*;
	real = (digit)+'.'(digit)+;
	anychars = alphanumeric;
	assign = ':=';
Ignored Tokens
  whitespace;

Productions
/*
    prog = {first} id digit |
    	   {second} lotnumbers |
    	   {third} [eachsymbolisuniqueinaproduction]:id [secondid]:id [digitone]:digit [digittwo]:digit ;
    lotnumbers = digit morenumbers;
    morenumbers = {fourth} digit morenumbers |
    		  {emptyproduction} ;
	*/
	
	prog = 
		'BEGIN' classmethodstmts 'END';
	classmethodstmts = 
		{one}classmethodstmts classmethodstmt 
		| {empty} ;
	classmethodstmt = 
		{class} 'CLASS' id lcurly methodstmtseqs rcurly
		| {type} type id lparen varlist rparen lcurly stmtseq rcurly
		| id (comma id)* colon type semicolon
		;
	methodstmtseqs = 
		{one} methodstmtseqs methodstmtseq
		| {empty}
		;
	methodstmtseq = 
		{type} type id lparen varlist rparen lcurly stmtseq rcurly
		| id (comma id)* colon type semicolon
		;
	stmtseq = 
		{one} stmt stmtseq
		| {empty}
		;
	stmt = 
		{assignstmts} assignmentstmt
		| id (comma id)* colon type (lsquare int rsquare)? semicolon
		| {condstmt} conditional
		| {loop} loop
		| {getstmt} get 
		| {putstm} 'PUT' lparen id lsquare int rsquare rparen semicolon
		| {increment} incrementop 
		| {new} newstmt
		| {varlisttwo} varlisttwo 
		| {multvarlisttwo} multvarlisttwo 
		| {return} 'RETURN' expression
		| {boolassign} boolassign 
		| {switch} 'SWITCH' lparen expression rparen rcurly 'CASE' lparen int rparen 
			semicolon stmtseq ('BREAK' semicolon)? ('CASE' lparen int rparen semicolon 
			stmtseq ('BREAK' semicolon)?)* 'DEFAULT' colon stmtseq rcurly
		;
	
	//From Project3 for expressions		  
	expression = 
		{term} term
		| {binopexp} expression addop term
		| {unaryopexp} expression unaryop
		;
	term = 
		{single} value
		| {multiple} term multop value
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
	//End of productions from Project 3