Package ProjFour;

Helpers
    sp  = ' ';
    digit = ['0'..'9'];
    letter = ['a'..'z'] | ['A'..'Z'];
    alphanumeric = letter | digit;
	anychars = [35 .. 255];
	tab = 9;
	cr = 12;
	lf = 10;
	quotes = '"' | 34;
	tint = 'INT';
	treal = 'REAL';
	tstring = 'STRING';
	tbool = 'BOOLEAN';
	tvoid = 'VOID';
	id = letter (letter | digit | '_')*;
	plus = '+';
	minus = '-';
	multiply = '*';
	divide = '/';
	condeq = '==';
	condneq = '!==';
	condgeq = '>=';
	condleq = '<=';
	condlt = '<';
	condgt = '>';
	true = 'TRUE';
	false = 'FALSE';
	lparen = '(';
	rparen = ')';
	lsquare = '[';
	rsquare = ']';
	period = '.';
  comma = ',';

Tokens
    id = id;
    number = digit+;
    whitespace = sp+ | tab ;
	eol = cr | lf | cr lf ;
	real = (digit)+'.'(digit)+;
	int = digit ( digit )*;
	underscore = '_';
	tint = tint;
	treal = treal;
	tstring = tstring;
	tbool = tbool;
	tvoid = tvoid;
	type = tint | treal | tstring | tbool | tvoid | id;
	plus = plus;
	minus = minus;
	multiply = multiply;
	divide = divide;
	addop = plus | minus;
	multop = multiply | divide;
	condeq = condeq;
	condneq = condneq;
	condgeq = condgeq;
	condleq = condleq;
	condlt = condlt;
	condgt = condgt;
	cond = condeq | condneq | condgeq | condleq | condlt | condgt ;
	true = true;
	false = false;
	lparen = lparen;
	rparen = rparen;
	lsquare = lsquare;
	rsquare = rsquare;
	period = period;
	quotation = quotes ;
  	comma = comma;
	string = quotes (letter | digit)* quotes;

Ignored Tokens
	whitespace, eol;

Productions
   /* prog = {first} id digit |
    	   {second} lotnumbers |
    	   {third} [eachsymbolisuniqueinaproduction]:id [secondid]:id [digitone]:digit [digittwo]:digit ;
    lotnumbers = digit morenumbers;
    morenumbers = {fourth} digit morenumbers |
    		  {emptyproduction} ;*/

	boolean =
		{true} true
		| {false} false
		| {condexpr} [firstexpr]:expr cond [secondexpr]:expr
		| {id} id
		;
	idarray =
		{array} lsquare int rsquare
		;
	factor =
		{parenexpr} lparen expr rparen
		| {minusfactor} minus factor
		| {int} int
		| {real} real
		| {bool} boolean
		| {idarray} id idarray
		| {idarrayvarlisttwo} id lparen lsquare varlisttwo rsquare rparen
		| {idarrvarlisttwo} [firstuniqueid]:id idarray period [seconduniqueid]:id lparen varlisttwo rparen
		| {idvarlisttwo} [firstuniqueid]:id period [seconduniqueid]:id lparen varlisttwo rparen
		| {string} string
		;
	term =
		{termmultop} term multop factor
		| {factor} factor
		;
	expr =
		{expraddop} expr addop term
		| {term} term
		;
	exprstring =
		{expr} expr
		| {string} string
		;
	varlisttwo =
		{exprstring} exprstring commaexprstring
		| {emptyproduction}
		;
  	commaexprstring =
    	{optlcommaexprstr} comma exprstring commaexprstring
    	| {emptyproduction}
    	;
