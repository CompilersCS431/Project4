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
	hid = letter (letter | digit | '_')*;





Tokens
	tint = 'INT';
	treal = 'REAL';
	tstring = 'STRING';
	tbool = 'BOOLEAN';
	tvoid = 'VOID';
	if = 'IF';
	then = 'THEN';
	while = 'WHILE';
	else = 'ELSE';
	increment = '++';
	decrement = '--';
	get = 'GET()';
	new = 'NEW';
	return = 'RETURN';
	parens = '()';
	put = 'PUT';
	for = 'FOR';
	switch = 'SWITCH';
	break = 'BREAK';
	case = 'CASE';
	tclass = 'CLASS';
	default = 'DEFAULT';
	begin = 'BEGIN';
	end = 'END';
	true = 'TRUE';
	false = 'FALSE';
	lparen = '(';
	rparen = ')';
	lsquare = '[';
	rsquare = ']';
	lcurly = '{';
	rcurly = '}';
	period = '.';
	comma = ',';
	semicolon = ';';
	colon = ':';
	assignment = ':=';
	quotes = '"' | 34;
	id = hid;
	number = digit+;
	anychars = anychars;
	whitespace = sp+ | tab ;
	eol = cr | lf | cr lf ;
	real = (digit)+'.'(digit)+;
	int = digit ( digit )*;
	underscore = '_';
	tdigit = digit;
	tletter = letter;	

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
	
Ignored Tokens
	whitespace, eol;

Productions
	prog =
		begin classmethodstmts end
		;	
	classmethodstmts =
		{nonempty} classmethodstmts classmethodstmt
		| {emptyproduction}
		;
	classmethodstmt =
		{classdecl} tclass id lcurly methodstmtseqs rcurly
		| {typevarliststmt} type id lparen varlist rparen lcurly stmtseq rcurly
		| {idlisttype} id optlidlist colon type semicolon
		; 
	methodstmtseqs =
		{oneormore} methodstmtseqs methodstmtseq
		| {emptyproduction}
		;
	methodstmtseq =
		{typevarlist} type id lparen varlist rparen lcurly stmtseq rcurly
		| {idtype} id optlidlist colon type semicolon
		; 
	stmtseq =
		{oneormore} stmt stmtseq
		| {emptyproduction}
		; 
	stmt = 
		{exprassignment} id optionalidarray assignment expr semicolon
		| {expranychar} id optionalidarray assignment [quoteone]:quotes anychars [quotetwo]:quotes semicolon
		| {idlist} id optlidlist colon type optionalidarray semicolon
    | {ifstmt} if factor then optionalelse 
		| {while} while factor lcurly stmtseq rcurly
		| {for} for lparen optionaltype id assignment expr [firstsemicolon]:semicolon boolean [secondsemicolon]:semicolon orstmts rparen lcurly stmtseq rcurly
		| {get} id optionalidarray assignment get semicolon
		| {put} put lparen id optionalidarray rparen semicolon
		| {increment} id optionalidarray increment semicolon
		| {decrement} id optionalidarray decrement semicolon
		| {newassignment} [firstid]:id optionalidarray assignment new [secondid]:id parens semicolon
		| {idvarlisttwo} id lparen varlisttwo rparen semicolon
		| {multiplevarlisttwo}[firstid]:id optionalidarray period [secondid]:id lparen	    varlisttwo rparen optlidvarlisttwo semicolon
		| {return} return expr semicolon
		| {idboolean} id optionalidarray assignment boolean semicolon
		| {switch} switch  factor lcurly case lparen int rparen [firstcolon]:colon [firststmtseq]:stmtseq optlbreak optionalswitchcases default [secondcolon]:colon [secondstmtseq]:stmtseq rcurly
		;
	optlidlist =
		{commaidlist} comma id optlidlist
		| {emptyproduction}
		;
  optionalelse = 
    {noelse} lcurly stmtseq rcurly
    | {else} [firstlcurly]:lcurly [firststmtseq]:stmtseq
			[firstrcurly]:rcurly else [secondlcurly]:lcurly [secondstmtseq]:stmtseq
			[secondrcurly]:rcurly
    ;
  optionalswitchcases =
		{caselist} case lparen int rparen colon stmtseq optlbreak optionalswitchcases
		| {emptyproduction}
		;
	optlbreak =
		{break} break semicolon
		| {emptyproduction}
		;
	orstmts =
		{increment} id increment
		| {decrement} id decrement
		| {assignment} id assignment expr
		;
	optlidvarlisttwo =
		{nonempty} period id lparen varlisttwo rparen optlidvarlisttwo
		| {emptyproduction} 
		;
	optionaltype =
		{type} type
		| {emptyproduction}
		; 
	varlist =
		{multiple} commaidarray id semicolon type optionalidarray
		| {single} id semicolon type optionalidarray
		| {emptyproduction}  
		;
  commaidarray =
		{optlcommaidarr} comma id semicolon type optionalidarray commaidarray
		| {oneidarray} comma id semicolon type optionalidarray
		; 
	varlisttwo =
		{multiple} commaexprstring expr 
		| {single} expr
		| {emptyproduction} 
		; 
	commaexprstring =
	  	{optlcommaexprstr} commaexprstring expr comma 
		| {single} expr comma
	  	;  
	expr =
		{multiple} expr addop term
    | {single} term
		;
	term =
		{termmultop} term multop factor
    | {factor} factor
		;
	factor =
		{parenexpr} lparen expr rparen
		| {minusfactor} minus factor
		| {int} int
		| {real} real
		| {boolean} lparen boolean rparen
		| {idarray} id lsquare int rsquare
		| {idarrayvarlisttwo} id lparen lsquare varlisttwo rsquare rparen
		| {idarrvarlisttwo} [firstuniqueid]:id lsquare int rsquare period [seconduniqueid]:id lparen 	varlisttwo rparen
		| {idvarlisttwo} [firstuniqueid]:id period [seconduniqueid]:id lparen varlisttwo rparen
		;
	optionalidarray =
		{array} lsquare int rsquare
		| {emptyproduction}
		;
	boolean =
		{true} true
		| {false} false
		| {condexpr} [firstexpr]:expr condeq [secondexpr]:expr
		| {id} id
		;
	cond = 
		{equal} condeq 
		| {notequal} condneq 
		| {geq} condgeq 
		| {leq} condleq 
		| {lt} condlt 
		| {gt} condgt 
		;
	addop = 
		{plus} plus 
		| {mius} minus
		;
	multop = 
		{multiply} multiply 
		| {divide} divide
		;
	letterordigit =
		{letter} tletter letterordigit 
		| {digit} tdigit letterordigit
		;
	type = 
		{int} tint 
		| {real} treal 
		| {string} tstring 
		| {bool} tbool 
		| {void} tvoid 
		| {id} id
		;
	
	
	
	
	
	
	
  
  
 
  
  

  
  
  
  
  
  
