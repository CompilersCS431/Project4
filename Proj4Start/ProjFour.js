Package ProjFour;

Helpers
    sp  = ' ';
    digit = ['0'..'9'];
    letter = ['a'..'z'] | ['A'..'Z'];
    alphanumeric = letter | digit;
	anychars =
		[35..255]+
		;
    //from proj 3
    tab = 9 ;
    cr = 12 ;
    lf = 10; 
	underscore = '_';
    period = '.';
	quote = '"';
    
    
Tokens
   // id = letter (letter | digit)*;
   // number = digit+;	
	period = period;
	id = letter ( letter | digit | underscore )*;
	int = digit ( digit )*;
	real = (digit)+ period (digit)+;
    whitespace = sp+ | lf | cr ;
	begin = 'BEGIN';
	end = 'END';
	class = 'CLASS';
	tint = 'INT';
	treal = 'REAL';
	tstring = 'STRING';
	tbool = 'BOOLEAN';
	tvoid = 'VOID';
	true = 'TRUE';
	false = 'FALSE';
	for = 'FOR';
	if = 'IF';
	then = 'THEN';
	while = 'WHILE';
	else = 'ELSE';
	switch = 'SWITCH';
	case = 'CASE';
	break = 'BREAK';
	default = 'DEFAULT';
	return = 'RETURN';
	new = 'NEW';
	get = 'GET()';
	put = 'PUT';
    //from proj 3
	parens = '()';
    lparen = '(' ;
    rparen = ')' ;
	lcurly = '{';
	rcurly = '}';
	lsquare = '[';
	rsquare = ']';
    assignment = ':=' ;
    comma = ',' ;
    semicolon = ';' ;
	quote = quote;
	colon = ':';
    echo = 'echo' ;
	increment = '++';
	decrement = '--';
	condeq = '==';
	condneq = '!=';
	condleq = '<=';
	condgeq = '>=';
	condlt = '<';
	condgt = '>';
	mul = '*' ;
    div = '/' ;
    left = '<<' ;
    right = '>>' ;
    add = '+' ;
    sub = '-' ;
Ignored Tokens
  whitespace
	;

Productions
/*
	prog = begin classmethodstmts end
		;
	classmethodstmts = 
		{non_empty} classmethodstmts classmethodstmt
		| {emptyproduction}
		;
	classmethodsmt = 
		{first} class id lcurly methodstmtseqs rcurly 
		| {second} type id lparen varlist rparen lcurly stmtseq rcurly
		| {third} [firstid]:id (comma [optionalid]:id)* colon type semicolon
		;
	methodstmtseqs =
		{first} methodstmtseqs methodstmtseq
		| {emptyproduction}
		;
	methodstmtseq =
		{first} type id lparen varlist rparen lcurly stmtseq rcurly
		| {second} [firstid]:id (comma [optionalid]:id)* colon type semicolon
		;
	stmtseq =
		{first} stmt stmtseq
		| {emptyproduction}
		;
	stmt = 
		{first} id (lsquare int rsquare)? assignment expr semicolon
		| {second} id (lsquare int rsquare)? assignment quote anychars quote semicolon
		| {third} [firstid]:id (comma [optionalid]:id)* colon type (lsquare int rsquare)? semicolon
		| {fourth} if lparen boolean rparen then lcurly stmtseq rcurly 
		| {fifth} if lparen boolean rparen then lcurly stmtseq rcurly else lcurly stmtseq rcurly
		| {sixth} while lparen boolean rparen lcurly stmtseq rcurly
		| {seventh} for lparen (type)? [firstid]:id assignment expr semicolon boolean semicolon ( [incrementid]:id increment | [decrementid]:id decrement | [assignid]:id assignment expr) rparen lcurly stmtseq rcurly
		| {eighth} id (lsquare int rsquare)? assignment get semicolon
		| {ninth} put lparen id (lsquare int rsquare)? ) semicolon
		| {tenth} id (lsquare int rsquare)? ) increment semicolon
		| {eleventh} id (lsquare int rsquare)? ) decrement semicolon
		| {twelvth} id (lsquare int rsquare)? ) assignment new id parens semicolon
		| {thirtheenth} id lparen varlisttwo rparen semicolon
		| {fourteenth} [firstid]:id (lsquare int rsquare)? ) period [secondid]:id lparen [firstvartwo]:varlisttwo rparen (period [optionalid]:id lparen [optionalvartwo]:varlisttwo rparen)* semicolon
		| {fifteenth} return expr semicolon
		| {sixteenth} id (lsquare int rsquare)? ) assignment boolean semicolon
		| {seventeenth} switch lparen expr rparen lcurly case lparen int rparen colon [firststmtseq]:stmtseq (break semicolon)? (case lparen int rparen colon [casestmtseq]:stmtseq (break semicolon)?)* default colon [defaultstmstseq]:stmsteq rcurly
		;
	varlist =
		( [firstid]:id colon type (lsquare int rsquare)? (comma [optionaalid]:id colon type (lsquare int rsquare)?)* )?
		;
	varlisttwo =
		([outerexprstr]:exprstring (comma [innerexprstr]:exprstring)*)?
		;
	exprstring =
		{first} expr
		| {second} string 
		; 
	expr = 
		{first} expr addop term
		| {second} term
		;
	term =
		{first} term multop factor
		| {second} factor
		;
	factor =
		{first} lparen expr rparen
		| {second} sub factor
		| {third} int 
		| {fourth} real
		| {fifth} boolean
		| {sixth} id (lsquare int rsquare)?
		| {seventh} id lparen varlisttwo rparen
		| {eighth} [firstid]:id (lsquare int rsquare)? period [secondid]:id lparen varlisttwo rparen
		| {ninth} string
		;*/
	string =
		quote ( letter | digit )* quote
		; 
	boolean =
		{first} true
		| {second} false
		//| {third} [firstexpr]:expr cond [secondexpr]:expr
		| id 
		;
	cond =
		{first} condeq 
		| {second} condneq
		| {third} condgeq
		| {fourth} condleq
		| {fifth} condgt
		| {sixth} condlt
		;
	addop =
		{first} add
		| {second} sub
		;
	multop = 
		{first} mul
		| {second} div
		;
	type =
		{first} tint 
		| {second} treal
		| {third} tstring
		| {fourth} tbool
		| {fifth} tvoid
		| {sixth} id
		;
	
