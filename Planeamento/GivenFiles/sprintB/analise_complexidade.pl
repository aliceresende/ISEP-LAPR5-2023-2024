:-dynamic ligacel/2.
:-dynamic m/3.
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
%
cria_matriz:-
	retractall(m(_,_,_)),
	retractall(ligacel(_,_)),
	write('Numero de Colunas: '),read(NCol),nl,
	write('Numero de Linhas: '),read(NLin),nl,asserta(nlin(NLin)),
	cria_matriz_0(NCol,NLin),cria_grafo(NCol,NLin),retract(nlin(_)).


cria_matriz_0(1,1):-!,asserta(m(1,1,0)).
cria_matriz_0(NCol,1):-!,asserta(m(NCol,1,0)),NCol1 is NCol-1,nlin(NLin),cria_matriz_0(NCol1,NLin).
cria_matriz_0(NCol,NLin):-asserta(m(NCol,NLin,0)),NLin1 is NLin-1,cria_matriz_0(NCol,NLin1).

cria_grafo(_,0):-!.
cria_grafo(Col,Lin):-cria_grafo_lin(Col,Lin),Lin1 is Lin-1,cria_grafo(Col,Lin1).


cria_grafo_lin(0,_):-!.
cria_grafo_lin(Col,Lin):-m(Col,Lin,0),!,ColS is Col+1, ColA is Col-1, LinS is Lin+1,LinA is Lin-1,
    ((m(ColS,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColS,Lin)));true)),
    ((m(ColA,Lin,0),assertz(ligacel(cel(Col,Lin),cel(ColA,Lin)));true)),
    ((m(Col,LinS,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinS)));true)),
    ((m(Col,LinA,0),assertz(ligacel(cel(Col,Lin),cel(Col,LinA)));true)),
    Col1 is Col-1,
    cria_grafo_lin(Col1,Lin).
cria_grafo_lin(Col,Lin):-Col1 is Col-1,cria_grafo_lin(Col1,Lin).



dfs(Orig,Dest,Cam):-
	dfs2(Orig,Dest,[Orig],Cam).

dfs2(Dest,Dest,LA,Cam):-
	reverse(LA,Cam).

dfs2(Act,Dest,LA,Cam):-
	ligacel(Act,X),
        \+ member(X,LA),
	dfs2(X,Dest,[X|LA],Cam).


all_dfs(Orig,Dest,LCam):-findall(Cam,dfs(Orig,Dest,Cam),LCam).


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


bfs(Orig,Dest,Cam):-bfs2(Dest,[[Orig]],Cam).

bfs2(Dest,[[Dest|T]|_],Cam):-
	reverse([Dest|T],Cam).

bfs2(Dest,[LA|Outros],Cam):-
	LA=[Act|_],
	findall([X|LA],
		(Dest\==Act,ligacel(Act,X),\+ member(X,LA)),
		Novos),
	append(Outros,Novos,Todos),
	bfs2(Dest,Todos,Cam).