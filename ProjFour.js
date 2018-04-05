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
  lcurly = '{';
  rcurly = '}';
	period = '.';
  comma = ',';
  semicolon = ';';
  colon = ':';
  assignment = ':=';
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

Tokens
  id = id;
  number = digit+;
  anychars = anychars;
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
  rcurly = rcurly;
  lcurly = lcurly;
	period = period;
	quotes = quotes ;
  comma = comma;
  semicolon = semicolon;
  colon = colon;
  assignment = assignment;
  if = if;
  then = then;
  while = while;
  else = else;
  increment = increment;
  decrement = decrement;
  get = get;
  new = new;
  return = return;
  parens = parens;
  put = put;
  for = for;
  switch = switch;
  break = break;
  case = case;
  tclass = tclass;
  default = default;
  begin = begin;
  end = end;
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
		| {boolean} boolean
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
		//| {string} string
		;
	varlisttwo =
		{exprstring} commaexprstring exprstring
    | {emptyproduction}
		;
	commaexprstring =
  	{optlcommaexprstr} exprstring comma commaexprstring
  	| {onecommaexprstr} exprstring
  	;
  varlist =
    {idarray} commaidarray id semicolon type idarray
    | {emptyproduction}
    ;
  commaidarray =
    {optlcommaidarr} id semicolon type idarray commaidarray
    | {oneidarray} id semicolon type idarray
    ;
  stmt =
    {exprassignment} id idarray assignment expr semicolon
    | {expranychar} id idarray assignment [quoteone]:quotes anychars
        [quotetwo]:quotes semicolon
    | {idlist} optlidlist colon type idarray semicolon
    | {withoutelse} withoutelse
    | {withelse} withelse
    | {while} while lparen boolean rparen lcurly stmtseq rcurly
    | {for} for lparen optionaltype id assignment expr [firstsemicolon]:semicolon
        boolean [secondsemicolon]:semicolon orstmts rparen lcurly stmtseq rcurly
    | {get} id idarray assignment get semicolon
    | {put} put lparen id idarray rparen semicolon
    | {increment} id idarray increment semicolon
    | {decrement} id idarray decrement semicolon
    | {newassignment} [firstid]:id idarray assignment new [secondid]:id parens semicolon
    | {idvarlisttwo} id lparen varlisttwo rparen semicolon
    | {multiplevarlisttwo}[firstid]:id idarray period [secondid]:id lparen
        varlisttwo rparen optlidvarlisttwo semicolon
    | {return} return expr semicolon
    | {idboolean} id idarray assignment boolean semicolon
    | {switch} switch [firstlparen]:lparen expr [firstrparen]:rparen lcurly
        case [secondlparen]:lparen int [secondrparen]:rparen [firstcolon]:colon
        [firststmtseq]:stmtseq optlbreak optionalswitchcases default [secondcolon]:colon
        [secondstmtseq]:stmtseq rcurly
    ;
  optlidlist =
    {commaidlist} comma id optlidlist
    | {emptyproduction}
    ;
  withoutelse =
    if lparen boolean rparen then lcurly stmt rcurly
    ;
  withelse =
    if lparen boolean rparen then [firstlcurly]:lcurly [firststmtseq]:stmtseq
        [firstrcurly]:rcurly else [secondlcurly]:lcurly [secondstmtseq]:stmtseq
        [secondrcurly]:rcurly
    ;
  optionaltype =
    {type} type
    | {emptyproduction}
    ;
  optlidvarlisttwo =
    {nonempty} period id lparen varlisttwo rparen optlidvarlisttwo
    | {emptyproduction}
    ;
  orstmts =
    {increment} id increment
    | {decrement} id decrement
    | {assignment} id assignment expr
    ;
  optlbreak =
    {break} break semicolon
    | {emptyproduction}
    ;
  optionalswitchcases =
    {caselist} case lparen int rparen colon stmtseq optlbreak optionalswitchcases
    | {emptyproduction}
    ;
  stmtseq =
    {oneormore} stmt stmtseq
    | {emptyproduction}
    ;
  methodstmtseq =
    {typevarlist} type id lparen varlist rparen lcurly stmtseq rcurly
    | {idtype} id optlidlist colon type semicolon
    ;
  methodstmtseqs =
    {oneormore} methodstmtseqs methodstmtseq
    | {emptyproduction}
    ;
  classmethodstmt =
    {classdecl} tclass id lcurly methodstmtseqs rcurly
    | {typevarliststmt} type id lparen varlist rparen lcurly stmtseq rcurly
    | {idlisttype} id optlidlist colon type semicolon
    ;
  classmethodstmts =
    {nonempty} classmethodstmts classmethodstmt
    | {emptyproduction}
    ;
  prog =
    begin classmethodstmts end
    ;
