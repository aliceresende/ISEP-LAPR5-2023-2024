:-dynamic ligacel/3.
:-dynamic m/5.
:-dynamic nlin/1.
:-dynamic melhor_sol_dfs/2.

%linha 1:1,1,1,1,1,1,1,1
%linha 2:0,0,0,0,0,0,0,1
%linha 3:0,0,0,0,0,0,0,1
%linha 4:0,0,0,0,0,0,0,1
%linha 5:1,1,1,1,0,0,0,1
%linha 6:1,1,1,1,0,0,0,1
%linha 7:1,1,1,1,0,0,0,1
%coluna :1,2,3,4,5,6,7,8


m(a,a1,1,1,1).
m(a,a1,2,1,1).
m(a,a1,3,1,1).
m(a,a1,4,1,1).
m(a,a1,5,1,1).
m(a,a1,6,1,1).
m(a,a1,7,1,1).
m(a,a1,8,1,1).

m(a,a1,1,2,0).
m(a,a1,2,2,0).
m(a,a1,3,2,0).
m(a,a1,4,2,0).
m(a,a1,5,2,0).
m(a,a1,6,2,0).
m(a,a1,7,2,0).
m(a,a1,8,2,1).

m(a,a1,1,3,0).
m(a,a1,2,3,0).
m(a,a1,3,3,0).
m(a,a1,4,3,0).
m(a,a1,5,3,0).
m(a,a1,6,3,0).
m(a,a1,7,3,0).
m(a,a1,8,3,1).

m(a,a1,1,4,0).
m(a,a1,2,4,0).
m(a,a1,3,4,0).
m(a,a1,4,4,0).
m(a,a1,5,4,0).
m(a,a1,6,4,0).
m(a,a1,7,4,0).
m(a,a1,8,4,1).

m(a,a1,1,5,1).
m(a,a1,2,5,1).
m(a,a1,3,5,1).
m(a,a1,4,5,1).
m(a,a1,5,5,0).
m(a,a1,6,5,0).
m(a,a1,7,5,0).
m(a,a1,8,5,1).

m(a,a1,1,6,1).
m(a,a1,2,6,1).
m(a,a1,3,6,1).
m(a,a1,4,6,1).
m(a,a1,5,6,0).
m(a,a1,6,6,0).
m(a,a1,7,6,0).
m(a,a1,8,6,1).

m(a,a1,1,7,1).
m(a,a1,2,7,1).
m(a,a1,3,7,1).
m(a,a1,4,7,1).
m(a,a1,5,7,0).
m(a,a1,6,7,0).
m(a,a1,7,7,0).
m(a,a1,8,7,1).

cria_matriz:-
	retractall(m(_,_,_,_,_,_)),
	retractall(ligacel(_,_,_)),
	write('Numero de Colunas: '),read(NCol),nl,
	write('Numero de Linhas: '),read(NLin),nl,asserta(nlin(NLin)),
	cria_matriz_0(NCol,NLin),cria_grafo(NCol,NLin),retract(nlin(_)).


cria_matriz_0(1,1):-!,asserta(m(_,_,1,1,0)).
cria_matriz_0(NCol,1):-!,asserta(m(_,_,NCol,1,0)),NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin).
cria_matriz_0(NCol,NLin):-asserta(m(_,_,NCol,NLin,0)),NLin1 is NLin-1,cria_matriz_0(NCol,NLin1).

cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-1,cria_grafo(Col,Lin1).

cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-m(_,_,Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,

	% Horizontal e Vertical
    ((m(_,_,ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin),1));true)),
    ((m(_,_,ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin),1));true)),
    ((m(_,_,Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS),1));true)),
    ((m(_,_,Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA),1));true)),

    % Diagonal
	((m(_,_,ColS,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinS),sqrt(2)));true)),
    ((m(_,_,ColA,LinS,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinS),sqrt(2)));true)),
    ((m(_,_,ColS,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColS,LinA),sqrt(2)));true)),
    ((m(_,_,ColA,LinA,0),assertz(ligacel(cel(Col,Lin),cel(ColA,LinA),sqrt(2)));true)),

    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin).

cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).



dfs(Orig, Dest, Cam, Peso,T):-
 get_time(Ti),
    dfs2(Orig, Dest, [Orig], Cam, 0, Peso),
    get_time(Tf),
    write(Cam), nl,
    T is Tf-Ti.

dfs2(Dest, Dest, LA, Cam, PesoTotal, PesoTotal):-
    reverse(LA, Cam).

dfs2(Act, Dest, LA, Cam, PesoTotal, PesoFinal):-
    ligacel(Act, X, PesoEdge),
    \+ member(X, LA),
    PesoAct is PesoTotal + PesoEdge,
    dfs2(X, Dest, [X|LA], Cam, PesoAct, PesoFinal).

all_dfs(Orig,Dest,LCam):-findall(Cam-Peso,dfs(Orig,Dest,Cam,Peso),LCam).


better_dfs(Orig,Dest,Cam):-all_dfs(Orig,Dest,LCam), shortlist(LCam,Cam,_).


better_dfs1(Orig,Dest,LCaminho_minlig):-
		get_time(Ti),
		(better_dfs11(Orig,Dest);true),
		retract(melhor_sol_dfs(LCaminho_minlig,_)),
		get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.

better_dfs11(Orig,Dest):-
		asserta(melhor_sol_dfs(_,10000)),
		dfs(Orig,Dest,LCaminho),
		atualiza_melhor_dfs(LCaminho),
		fail.

atualiza_melhor_dfs(LCaminho):-
		melhor_sol_dfs(_,N),
		length(LCaminho,C),
		C<N,retract(melhor_sol_dfs(_,_)),
		asserta(melhor_sol_dfs(LCaminho,C)).


shortlist([L],L,N):-!,length(L,N).
shortlist([L|LL],Lm,Nm):-shortlist(LL,Lm1,Nm1),
				length(L,NL),
			((NL<Nm1,!,Lm=L,Nm is NL);(Lm=Lm1,Nm is Nm1)).

bfs(Orig,Dest,Cam):-
get_time(Ti),
bfs2(Dest,[[Orig]],Cam),
get_time(Tf),
T is Tf-Ti,
write('Tempo de geracao da solucao:'),write(T),nl.

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X,_),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).



aStarPath(CelAct, CelDest, Cam, Custo):-
    get_time(Ti),
    aStarPath2(CelDest, [(0, [CelAct], CelAct, 0)],Cam, Custo),
    get_time(Tf),
	T is Tf-Ti,
	write('Tempo de geracao da solucao:'),write(T),nl.

aStarPath2(CelDest, [(_, Cam, CelDest, Custo)|_], _, Cam, Custo).

aStar2(Dest, [(_, Custo, [Dest|T])|_], Cam, Custo):-
    reverse([Dest|T], Cam).

aStar2(Dest, [(Est, Ca, LA)|Outros], Cam, Custo):-
    LA = [cel(Col, Lin)|_],
    findall((EstX, CaX, [X|LA]),
        (Dest \== cel(Col, Lin),
         ligacel(cel(Col, Lin), cel(ColX, LinX), CustoX),
         \+ member(cel(ColX, LinX), LA),
         CaX is CustoX + Ca,
         estimativa(cel(Col, Lin), cel(ColX, LinX), EstX),
         HeurX is CaX + EstX),  % Use a separate variable for the heuristic
        Novos),

    append(Outros, Novos, Todos),
    sort(Todos, TodosOrd),
    aStar2(Dest, TodosOrd, Cam, Custo).



estimativa(cel(Col1, Lin1), cel(Col2, Lin2), _):-
    m(_, _, Col1, Lin1, _),
    m(_, _, Col2, Lin2, _).



%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%555555
aStarPath(CelAct, CelDest, Cam, Custo):-
    get_time(Ti),
    aStarPath2(CelDest, [(0, [CelAct], CelAct, 0)],Cam, Custo),
    get_time(Tf),
    		T is Tf-Ti,
    		write('Tempo de geracao da solucao:'),write(T),nl.

aStarPath2(CelDest, [(_, Cam, CelDest, Custo)|_], Cam, Custo).

aStarPath2(CelDest, [(Cost, Path, CelAct, Custo)|Rest], Cam, FinalCusto):-
    findall((NewCost, [NewCel|Path], NewCel, NewCusto),
        (ligacel(CelAct, NewCel, EdgeCost),
        NewCusto is Custo + EdgeCost,
        heuristic(NewCel, CelDest, H),
        NewCost is NewCusto + H),
        NextSteps),

    append(NextSteps, Rest, AllSteps),
    sort(AllSteps, SortedSteps),

    aStarPath2(CelDest, SortedSteps, Cam, FinalCusto).


% Heurística Euclidiana para estimativa de custo
heuristic(cel(X1, Y1), cel(X2, Y2), Estimativa):-
    Estimativa is sqrt((X1 - X2)^2 + (Y1 - Y2)^2).
