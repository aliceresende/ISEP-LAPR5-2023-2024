%liga(edificio1,edificio2) -> Um edificio liga ao outro com passagem
liga(b,c).
liga(a,b).

%pisos(edificio,[pisos]). -> Lista de pisos de um edificio
pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).

%elevador(edificio,[pisos_elevador]). -> Lista de pisos que o elevador de um edificio serve
elevador(b,[b1,b2,b3],cel(5,4)).

%passagem(ed1,ed2,col1,lin1,col2,lin2). -> Pisos dos edificios que estão ligados com passagem
passagem(a,b,a1,b1,cel(6,3),cel(1,3)).

%salas(edificio,piso,[salas]).
salas(a,a1,[a101,a102]).
salas(b,b1,[b104,b106]).
salas(b,b2,[b202,b204]).
salas(c,c1,[c101,c103]).


%porta_sala(Sala,cleporta).
porta_sala(a101,cel(2,2)).
porta_sala(b204,cel(2,2)).
porta_sala(b106,cel(3,3)).
porta_sala(b104,cel(4,3)).
porta_sala(b202,cel(2,2)).
porta_sala(a102,cel(4,3)).

%============================== FIM BASE CONHECIMENTO ======================================================
%==============================================================================================================
%Encontra um caminho entre edificios
%
%?- caminho_edificios(a,c,LEdCam). Retorna LEdCam preenchida

caminho_edificios(EdOr,EdDest,LEdCam):-caminho_edificios2(EdOr,EdDest,[EdOr],LEdCam).
caminho_edificios2(EdX,EdX,LEdInv,LEdCam):-!,reverse(LEdInv,LEdCam).
caminho_edificios2(EdAct,EdDest,LEdPassou,LEdCam):-(liga(EdAct,EdInt);liga(EdInt,EdAct)),\+member(EdInt,LEdPassou),
                                                               caminho_edificios2(EdInt,EdDest,[EdInt|LEdPassou],LEdCam).

%==============================================================================================================
%Encontra todos os caminhos entre dois edificios [Usa o predicado de cima varias vezes]
%
%?- todos_caminhos_edificios(a,c,LTCamEd). Retorna LTCameEd preenchida com várias listas

todos_caminhos_edificios(EdOr,EdDest,LTCamEd):-findall(LEdCam,caminho_edificios(EdOr,EdDest,LEdCam),LTCamEd).

%==============================================================================================================
%Encontra um caminho entre pisos de edificios usando corredores e elevadores
%
% ?- caminho_pisos(j2,g4,LEdCam,LLig).
% LEdCam = [j, i, b, g],
% LLig = [cor(j2, i2), elev(i2, i3), cor(i3, b3), cor(b3, g3), elev(g3,g4)] ;

% Recebe Piso Origem, Piso Destino
% Com os factos pisos, vai buscar a lista de pisos de cada um
% e verifica se o piso passado como argumento pertence a essa lista e retira o Edificio do piso.
%
% Com os Edificios dos pisos (EdOr e EdDest), vai buscar um caminho
% Com o segue_pisos vai buscar (pelo caminho determinado), a lista de movimentos(elevadores ou passagens)

caminho_pisos(PisoOr,PisoDest,LEdCam,LLig):-pisos(EdOr,LPisosOr),member(PisoOr,LPisosOr),
                                 pisos(EdDest,LPisosDest),member(PisoDest,LPisosDest),
                                 caminho_edificios(EdOr,EdDest,LEdCam),
                                 segue_pisos(PisoOr,PisoDest,LEdCam,LLig).

segue_pisos(PisoDest,PisoDest,_,[]).

% Regra para movimento de elevador ---------------------------------------
segue_pisos(PisoDest1,PisoDest,[EdDest],[elev(PisoDest1,PisoDest)]):-
    PisoDest\==PisoDest1,
    elevador(EdDest,LPisos,_), member(PisoDest1,LPisos), member(PisoDest,LPisos).

% Regra para movimento de passagem ----------------------------------------
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[cor(PisoAct,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct,PisoSeg,_,_);passagem(EdSeg,EdAct,PisoSeg,PisoAct,_,_)),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).

% Regra para movimento de elevador e passagem ----------------------------
segue_pisos(PisoAct,PisoDest,[EdAct,EdSeg|LOutrosEd],[elev(PisoAct,PisoAct1),cor(PisoAct1,PisoSeg)|LOutrasLig]):-
    (passagem(EdAct,EdSeg,PisoAct1,PisoSeg,_,_);passagem(EdSeg,EdAct,PisoSeg,PisoAct1,_,_)),PisoAct1\==PisoAct,
    elevador(EdAct,LPisos,_),member(PisoAct,LPisos),member(PisoAct1,LPisos),
    segue_pisos(PisoSeg,PisoDest,[EdSeg|LOutrosEd],LOutrasLig).


%Escolha do caminho que envolve menos utilizacoes de elevadores (Predicado Fornecido)

melhor_caminho_pisos(PisoOr,PisoDest,LLigMelhor):-
    findall(LLig,caminho_pisos(PisoOr,PisoDest,_,LLig),LLLig),
    menos_elevadores(LLLig,LLigMelhor,_,_).

menos_elevadores([LLig],LLig,NElev,NCor):-conta(LLig,NElev,NCor).
menos_elevadores([LLig|OutrosLLig],LLigR,NElevR,NCorR):-
    menos_elevadores(OutrosLLig,LLigM,NElev,NCor),
    conta(LLig,NElev1,NCor1),
    (((NElev1<NElev;(NElev1==NElev,NCor1<NCor)),!,NElevR is NElev1, NCorR is NCor1,LLigR=LLig);
     (NElevR is NElev,NCorR is NCor,LLigR=LLigM)).

conta([],0,0).
conta([elev(_,_)|L],NElev,NCor):-conta(L,NElevL,NCor),NElev is NElevL+1.
conta([cor(_,_)|L],NElev,NCor):-conta(L,NElev,NCorL),NCor is NCorL+1.

%==============================================================================================================
%PREDICADO DESENVOLVIDO PARA CAMINHO ENTRE SALAS
%==============================================================================================================
caminho_salas(SalaOr,SalaDest,Ligs,Weight,LCamFinal):-
    salas(EdOr, PiOr, LSalasOr),
    member(SalaOr, LSalasOr),
    porta_sala(SalaOr, CelPortaOr),

    salas(EdDest, PiDest, LSalasDest),
    member(SalaDest, LSalasDest),
    porta_sala(SalaDest, CelPortaDest),

    melhor_caminho_pisos(PiOr, PiDest, Ligs),!,

    caminho_pisosInternos(CelPortaOr,PiOr,CelPortaDest,PiDest,Ligs,LCamFinal,Weight).

%-----------------------------------------------------------------------------------------------------------
%Caso Base -> Todas as ligacoes foram percorridas e portanto vamos calcular o ultimo caminho interno
caminho_pisosInternos(CelAct, PiAct, CelDest, PiDest, [], [Cam], FinalWeight):-
    aStarPath(CelAct, CelDest, PiDest, Cam, Custo),
    %dfs(CelAct, CelDest, Cam,PiDest, Custo),
    FinalWeight is Custo,
    !.

%Regra ligacao de passagem---------------------------------------------------------------------------------
caminho_pisosInternos(CelAct, PiAct, CelDest, PiDest, [cor(PisoOr, PisoDestInt)|RestLigs], [Cam|RestoCams], TotalWeight):-
    (passagem(_, _, PisoOr, PiDestInt, CelOr, CelDestInt);passagem(_, _, PiDestInt, PisoOr, CelDestInt, CelOr)),

    %Calcular caminho entre célula atual e a célula do inicio da ligacao
    aStarPath(CelAct, CelOr, PisoDestInt, Cam, Weight),
    %dfs(CelAct, CelOr, Cam, PisoDestInt, Weight),

    %Volto a chamar o predicado com a segunda cel da ligacao
    caminho_pisosInternos(CelDestInt, PiDestInt, CelDest, PiDest, RestLigs, RestoCams, CalcWeight),

    TotalWeight is Weight + CalcWeight + 5,
    ground(TotalWeight),  % Ensure TotalWeight is ground (instantiated)
    !.

%Regra ligacao de elevador----------------------------------------------------------------------
caminho_pisosInternos(CelAct, PiAct, CelDest, PiDest, [elev(PisoOr, PisoDest)|RestLigs], [Cam|RestoCams], TotalWeight):-
    elevador(_, LElevPisos, CelElev),
    member(PisoDest, LElevPisos),

    %Calcular caminho entre célula atual e a célula de entrada do elevador
    aStarPath(CelAct, CelElev, PisoOr, Cam, Weight),
    %dfs(CelAct, CelElev, Cam, PisoOr, Weight),

    %Volto a chamar o predicado com a segunda cel da ligacao
    caminho_pisosInternos(CelElev, PisoDest, CelDest, PiDest, RestLigs, RestoCams, CalcWeight),

    TotalWeight is Weight + CalcWeight + 30,
    !.

%=========================================================================================================================

%==========================================================================================================================
:-dynamic ligacel/4.

% a - a202 cel(2,3)
%
%linha 1:1,1,1,1,1,1,
%linha 2:0,0,0,0,0,0,
%linha 3:0,0,0,0,0,0,
%linha 4:1,1,1,1,0,0,
%linha 5:1,1,1,1,1,1,
%coluna :1,2,3,4,5,6,


% m(edificio,piso,col,lin,valor).
m(a,a1,1,1,1).
m(a,a1,2,1,1).
m(a,a1,3,1,1).
m(a,a1,4,1,1).
m(a,a1,5,1,1).
m(a,a1,6,1,1).

m(a,a1,1,2,0).
m(a,a1,2,2,0).
m(a,a1,3,2,0).
m(a,a1,4,2,0).
m(a,a1,5,2,0).
m(a,a1,6,2,0).


m(a,a1,1,3,0).
m(a,a1,2,3,0).
m(a,a1,3,3,0).
m(a,a1,4,3,0).
m(a,a1,5,3,0).
m(a,a1,6,3,0).


m(a,a1,1,4,1).
m(a,a1,2,4,1).
m(a,a1,3,4,1).
m(a,a1,4,4,1).
m(a,a1,5,4,0).
m(a,a1,6,4,0).


m(a,a1,1,5,1).
m(a,a1,2,5,1).
m(a,a1,3,5,1).
m(a,a1,4,5,1).
m(a,a1,5,5,1).
m(a,a1,6,5,1).

% b - b202 cel(4,3)
%
%linha 1:1,1,1,1,1,1,
%linha 2:0,0,0,0,0,0,
%linha 3:0,0,0,0,0,0,
%linha 4:1,1,1,1,0,0,
%linha 5:1,1,1,1,1,1,
%coluna :1,2,3,4,5,6,
%
m(b,b1,1,1,1).
m(b,b1,2,1,1).
m(b,b1,3,1,1).
m(b,b1,4,1,1).
m(b,b1,5,1,1).
m(b,b1,6,1,1).

m(b,b1,1,2,0).
m(b,b1,2,2,0).
m(b,b1,3,2,0).
m(b,b1,4,2,0).
m(b,b1,5,2,0).
m(b,b1,6,2,0).

m(b,b1,1,3,0).
m(b,b1,2,3,0).
m(b,b1,3,3,0).
m(b,b1,4,3,0).
m(b,b1,5,3,0).
m(b,b1,6,3,0).

m(b,b1,1,4,1).
m(b,b1,2,4,1).
m(b,b1,3,4,1).
m(b,b1,4,4,1).
m(b,b1,5,4,0).
m(b,b1,6,4,0).

m(b,b1,1,5,1).
m(b,b1,2,5,1).
m(b,b1,3,5,1).
m(b,b1,4,5,1).
m(b,b1,5,5,1).
m(b,b1,6,5,1).

% b - b202 cel(4,3)
%
%linha 1:1,1,1,1,1,1,
%linha 2:0,0,0,0,0,0,
%linha 3:0,0,0,0,0,0,
%linha 4:1,1,1,1,0,0,
%linha 5:1,1,1,1,1,1,
%coluna :1,2,3,4,5,6,
%
m(b,b2,1,1,1).
m(b,b2,2,1,1).
m(b,b2,3,1,1).
m(b,b2,4,1,1).
m(b,b2,5,1,1).
m(b,b2,6,1,1).

m(b,b2,1,2,0).
m(b,b2,2,2,0).
m(b,b2,3,2,0).
m(b,b2,4,2,0).
m(b,b2,5,2,0).
m(b,b2,6,2,0).

m(b,b2,1,3,0).
m(b,b2,2,3,0).
m(b,b2,3,3,0).
m(b,b2,4,3,0).
m(b,b2,5,3,0).
m(b,b2,6,3,0).

m(b,b2,1,4,1).
m(b,b2,2,4,1).
m(b,b2,3,4,1).
m(b,b2,4,4,1).
m(b,b2,5,4,0).
m(b,b2,6,4,0).

m(b,b2,1,5,1).
m(b,b2,2,5,1).
m(b,b2,3,5,1).
m(b,b2,4,5,1).
m(b,b2,5,5,1).
m(b,b2,6,5,1).

cria_grafo(_,0,_):-!.
cria_grafo(Col,Lin,Floor):-cria_grafo_lin(Col,Lin,Floor),Lin1 is Lin-1,cria_grafo(Col,Lin1,Floor).

cria_grafo_lin(0,_,_):-!.
cria_grafo_lin(Col,Lin,Floor):-m(_,Floor,Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
	% Horizontal e Vertical
	% Horizontal e Vertical
    ((m(_,Floor,ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin),1,Floor));true)),
    ((m(_,Floor,ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin),1,Floor));true)),
    ((m(_,Floor,Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS),1,Floor));true)),
    ((m(_,Floor,Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA),1,Floor));true)),

    % Diagonal
	((m(_,Floor,ColS,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinS),sqrt(2),Floor));true)),
    ((m(_,Floor,ColA,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinS),sqrt(2),Floor));true)),
    ((m(_,Floor,ColS,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinA),sqrt(2),Floor));true)),
    ((m(_,Floor,ColA,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinA),sqrt(2),Floor));true)),

    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin,Floor).

cria_grafo_lin(Col,Lin,Floor):-Col1 is Col-1,cria_grafo_lin(Col1,Lin,Floor).


%==============================================================================================================

dfs(cel(Y,X),cel(Y1,X1),Cam,P,C):-
	dfs2(Orig,Dest,[Orig],Cam,P,C).

dfs2(Dest,Dest,LA,Cam,_,0):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam,P,C):-
	ligacel(Act,X,C1,P),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam,P,C2),C is C1+C2.

%==============================================================================================================
aStarPath(CelAct, CelDest, PisoDest, Cam, Custo):-
    aStarPath2(CelDest, [(0, [CelAct], CelAct, 0)], PisoDest, Cam, Custo).

aStarPath2(CelDest, [(_, Cam, CelDest, Custo)|_], _, Cam, Custo).

aStarPath2(CelDest, [(Cost, Path, CelAct, Custo)|Rest], PisoDest, Cam, FinalCusto):-
    findall((NewCost, [NewCel|Path], NewCel, NewCusto),
        (ligacel(CelAct, NewCel, EdgeCost, PisoDest),
        NewCusto is Custo + EdgeCost,
        heuristic(NewCel, CelDest, H),
        NewCost is NewCusto + H),
        NextSteps),

    append(NextSteps, Rest, AllSteps),
    sort(AllSteps, SortedSteps),
    aStarPath2(CelDest, SortedSteps, PisoDest, Cam, FinalCusto).

% Heurística Euclidiana para estimativa de custo
heuristic(cel(X1, Y1), cel(X2, Y2), Estimativa):-
    Estimativa is sqrt((X1 - X2)^2 + (Y1 - Y2)^2).