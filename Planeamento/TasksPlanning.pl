:-dynamic geracoes/1.
:-dynamic populacao/1.
:-dynamic prob_cruzamento/1.
:-dynamic prob_mutacao/1.
:- use_module(library(lists)).
:- use_module(library(random)).

%Tarefas otimização
% deslocamento_entre_tarefas(robot,ti,tf,tempoDistancia).
% robot_tarefaI(robot,ti,tempoDistancia).
% robot_tarefaF(robot,tf,tempoDistancia).

% tarefa(Id,sala inicial,sala final,robot da tarefa).
tarefa(t1,a101,b204,walle).
tarefa(t2,b106,b204,walle).
tarefa(t3,a101,b106,walle).
tarefa(t4,a101,b204,walle).
tarefa(t5,a101,b202,walle).

% tarefas(NTarefas).
tarefas(5).
%robot_base(id, piso,celula).
robot_base(walle,a1,cel(2,2)).

start():-
	cria_grafo(6,5,b1),
	cria_grafo(6,5,b2),
	cria_grafo(6,5,a1),
	set_tempo_tarefas().

:-dynamic robot_base/2.
:-dynamic tarefa/3.
:-dynamic tarefas/1.
:-dynamic robot_tarefaF/2.
:-dynamic robot_tarefaI/2.
:-dynamic deslocamento_entre_tarefas/3.
% parameterizacao AG
% inicia os dados de numero de geracoes, dimensao da populacao, probabilidade de cruzamento e probabilidade de mutacao
inicializa:-write('Numero de novas Geracoes: '),read(NG), 			
    (retract(geracoes(_));true), asserta(geracoes(NG)),
	write('Dimensao da Populacao: '),read(DP),
	(retract(populacao(_));true), asserta(populacao(DP)),
	write('Probabilidade de Cruzamento (%):'), read(P1),
	PC is P1/100, 
	(retract(prob_cruzamento(_));true), asserta(prob_cruzamento(PC)),
	write('Probabilidade de Mutacao (%):'), read(P2),
	PM is P2/100, 
	(retract(prob_mutacao(_));true), asserta(prob_mutacao(PM)).

n_estabilizacao(2).

% inicializa os parametros do algoritmo genético
% gera Pop inicial, avalia, ordena e inicia o processo de geração de geracoes
gera:-
	inicializa,
	gera_populacao(Pop),
	write('Pop='),write(Pop),nl,
	avalia_populacao(Pop,PopAv),!,
	write('PopAv='),write(PopAv),nl,
	ordena_populacao(PopAv,PopOrd),
	geracoes(NG),
	gera_geracao(0,NG,PopOrd,0).
%------------------------------------------------------------------------------------------
% Gera populacao de individuos
gera_populacao(Pop):-
	populacao(TamPop),
	tarefas(NumT),
	findall(Tarefa,tarefa(Tarefa,_,_,_),ListaTarefas),
	gera_populacao(TamPop,ListaTarefas,NumT,Pop).

% Caso base -> tamanho = 0
gera_populacao(0,_,_,[]):-!.
% Gerar populacao com individuos distintos
gera_populacao(TamPop,ListaTarefas,NumT,[Ind|Resto]):-
	TamPop1 is TamPop-1,
	gera_populacao(TamPop1,ListaTarefas,NumT,Resto),
	gera_individuo(ListaTarefas,NumT,Ind),
	not(member(Ind,Resto)).
gera_populacao(TamPop,ListaTarefas,NumT,L):-
	gera_populacao(TamPop,ListaTarefas,NumT,L).
%------------------------------------------------------------------------------------------
% Gera individuo com todas as tarefas -> Cada tarefa é um gene, individuo cromossoma

%Caso base -> tarefas = 1
gera_individuo([G],1,[G]):-!.

gera_individuo(ListaTarefas,NumT,[G|Resto]):-
	NumTemp is NumT + 1, % To use with random
	random(1,NumTemp,N),
	retira(N,ListaTarefas,G,NovaLista),
	NumT1 is NumT-1,
	gera_individuo(NovaLista,NumT1,Resto).

% retira elemento da lista
retira(1,[G|Resto],G,Resto).
retira(N,[G1|Resto],G,[G1|Resto1]):-
	N1 is N-1,
	retira(N1,Resto,G,Resto1).
%------------------------------------------------------------------------------------------´
% Avalia todos os individuos da populacao | 1 individuo = lista com todas as tarefas + V dos atrasos
% L1 = [Tarefas] | L2=[Tarefas*V]

avalia_populacao([],[]):-!.
avalia_populacao([Ind|Resto],[Ind*V|Resto1]):-
	write('Ind='),write(Ind),nl,
	Ind = [H|_],
	reverse(Ind, SeqInv),
	SeqInv = [F | _],
	robot_tarefaI(_,H, Ti),
	robot_tarefaF(_,F, Tf),
	avaliar_sequencia1(Ind, TempoAtual),
	V is TempoAtual + Ti + Tf, 
	avalia_populacao(Resto,Resto1),!.


%------------------------------------------------------------------------------------------´
% Ordena a populacao por ordem crescente das avaliações, pela soma pesada de atraso
ordena_populacao(PopAv,PopAvOrd):-
	bsort(PopAv,PopAvOrd).

bsort([X],[X]):-!.
bsort([X|Xs],Ys):-
	bsort(Xs,Zs),
	btroca([X|Zs],Ys).

btroca([X],[X]):-!.

btroca([X*VX,Y*VY|L1],[Y*VY|L2]):-
	VX>VY,!,
	btroca([X*VX|L1],L2).

btroca([X|L1],[X|L2]):-btroca(L1,L2).

%------------------------------------------------------------------------------------------´
% Criadas novas gerações após o cruzamento, mutacao e avaliacao dos novos individuos

gera_geracao(G,_,Pop,Estabilizacao):-
	n_estabilizacao(V),
	(Estabilizacao == V),!,
	write('Geracao '), write(G), write(':'), write(Pop), nl,
	write('Populacao Estabilizada'),nl.

gera_geracao(G,G,Pop,_):-!,
	write('Geracao '), write(G), write(':'), write(Pop), nl,
	write('Tamanho geracao atingido!').

gera_geracao(N,G,Pop,GeraIguaisAnterior):-
	write('Geracao '), write(N), write(':'), write(Pop), nl,
	% 2 - Evitar cruzamento sequências já definidas
	random_permutation(Pop, PopAl),

	cruzamento(PopAl,NPop1),
	mutacao(NPop1,NPop),
	avalia_populacao(NPop,NPopAv),
	% 1- Garantir que pelo menos o melhor individuo passa
	append(Pop,NPopAv,Populacao),
	sort(Populacao,PopOrd),
	ordena_populacao(PopOrd,NPopOrd),
	% P=2 -> (P maior ou igual a 1 para garantir quepassam os P melhores, valores como 20% ou 30% de N são adequados)
	P is 2,
	selecao_melhores(NPopOrd,Melhores,Resto,P),
	% Tratamento dos Resto da população
	probabilidade_resto(Resto,PopResto),
	ordena_pop_probabilidade(PopResto,PopRestoOrd),
	populacao(TamPop),
	Restantes is TamPop-P,
	extrair_n_elements(PopRestoOrd,Restantes,LMelhores),

	append(Melhores,LMelhores,NGera),
	ordena_populacao(NGera,NGeraOrd),

	% 3 - Método não puramente elitista
	N1 is N+1,
	% Condicoes termino alternativas
	verificar_estabilizacao(Pop,NGeraOrd,GeraIguaisAnterior,GeraIguaisActual),
	gera_geracao(N1,G,NGeraOrd,GeraIguaisActual).

% Predicado para obter os N primeiros elementos de uma lista
extrair_n_elements(_, 0, []).
extrair_n_elements([H*T*V | Tail], N, [H*T | Result]) :-
    N > 0,
    N1 is N - 1,
    extrair_n_elements(Tail, N1, Result).

probabilidade_resto([],[]).
probabilidade_resto([H*T|Restantes],[H*T*Prob|PopResto]):-
	probabilidade_resto(Restantes,PopResto),
	random(0.0, 1.0, Al),
	Prob is Al*T.

%== Condicao Termino =================================================================================================

%predicado para verificar a estabilizacao da populacao
verificar_estabilizacao(Pop,NGeraOrd,GeraIguaisAnterior,GeraIguaisActual):-
	((geracoes_iguais(Pop,NGeraOrd), !, GeraIguaisActual is GeraIguaisAnterior+1);
	(GeraIguaisActual is 0)).

% Predicado que verifica se duas geracoes são iguais
geracoes_iguais([], []):-!.
geracoes_iguais([X|Resto1], [X|Resto2]) :-
    geracoes_iguais(Resto1, Resto2).

%------------------------------------------------------------------------------------------´
% 
gerar_pontos_cruzamento(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

gerar_pontos_cruzamento1(P1,P2):-
	tarefas(N),
	NTemp is N+1,
	random(1,NTemp,P11),
	random(1,NTemp,P21),
	P11\==P21,!,
	((P11<P21,!,P1=P11,P2=P21);(P1=P21,P2=P11)).

gerar_pontos_cruzamento1(P1,P2):-
	gerar_pontos_cruzamento1(P1,P2).

%------------------------------------------------------------------------------------------´
% Cruzamento de dois individuos sucessivos da populacao
cruzamento([],[]).
cruzamento([Ind*_],[Ind]).
cruzamento([Ind1*_,Ind2*_|Resto],[NInd1,NInd2|Resto1]):-
	gerar_pontos_cruzamento(P1,P2),
	prob_cruzamento(Pcruz),random(0.0,1.0,Pc),
	((Pc =< Pcruz,!,
        cruzar(Ind1,Ind2,P1,P2,NInd1),
	  	cruzar(Ind2,Ind1,P1,P2,NInd2))
	;
	(NInd1=Ind1,NInd2=Ind2)),
	cruzamento(Resto,Resto1).

% Predicados auxiliares para o cruzamento order crossover-----------------------------------
preencheh([],[]).

preencheh([_|R1],[h|R2]):-
	preencheh(R1,R2).


sublista(L1,I1,I2,L):-
	I1 < I2,!,
	sublista1(L1,I1,I2,L).

sublista(L1,I1,I2,L):-
	sublista1(L1,I2,I1,L).

sublista1([X|R1],1,1,[X|H]):-!,
	preencheh(R1,H).

sublista1([X|R1],1,N2,[X|R2]):-!,
	N3 is N2 - 1,
	sublista1(R1,1,N3,R2).

sublista1([_|R1],N1,N2,[h|R2]):-
	N3 is N1 - 1,
	N4 is N2 - 1,
	sublista1(R1,N3,N4,R2).

rotate_right(L,K,L1):-
	tarefas(N),
	T is N - K,
	rr(T,L,L1).

rr(0,L,L):-!.

rr(N,[X|R],R2):-
	N1 is N - 1,
	append(R,[X],R1),
	rr(N1,R1,R2).


elimina([],_,[]):-!.

elimina([X|R1],L,[X|R2]):-
	not(member(X,L)),!,
	elimina(R1,L,R2).

elimina([_|R1],L,R2):-
	elimina(R1,L,R2).

insere([],L,_,L):-!.
insere([X|R],L,N,L2):-
	tarefas(T),
	((N>T,!,N1 is N mod T);N1 = N),
	insere1(X,N1,L,L1),
	N2 is N + 1,
	insere(R,L1,N2,L2).


insere1(X,1,L,[X|L]):-!.
insere1(X,N,[Y|L],[Y|L1]):-
	N1 is N-1,
	insere1(X,N1,L,L1).

cruzar(Ind1,Ind2,P1,P2,NInd11):-
	sublista(Ind1,P1,P2,Sub1),
	tarefas(NumT),
	R is NumT-P2,
	rotate_right(Ind2,R,Ind21),
	elimina(Ind21,Sub1,Sub2),
	P3 is P2 + 1,
	insere(Sub2,Sub1,P3,NInd1),
	eliminah(NInd1,NInd11).


eliminah([],[]).

eliminah([h|R1],R2):-!,
	eliminah(R1,R2).

eliminah([X|R1],[X|R2]):-
	eliminah(R1,R2).

%------------------------------------------------------------------------------------------´
% Mutacao sobre cada individuo da populacao -> Faz-se se a probabilidade de mutacao for
% maior que o nº gerado aleaotriamente entre 0 e 1
mutacao([],[]).
mutacao([Ind|Rest],[NInd|Rest1]):-
	prob_mutacao(Pmut),
	random(0.0,1.0,Pm),
	((Pm < Pmut,!,mutacao1(Ind,NInd));NInd = Ind),
	mutacao(Rest,Rest1).

mutacao1(Ind,NInd):-
	gerar_pontos_cruzamento(P1,P2),
	mutacao22(Ind,P1,P2,NInd).

mutacao22([G1|Ind],1,P2,[G2|NInd]):-
	!, P21 is P2-1,
	mutacao23(G1,P21,Ind,G2,NInd).
mutacao22([G|Ind],P1,P2,[G|NInd]):-
	P11 is P1-1, P21 is P2-1,
	mutacao22(Ind,P11,P21,NInd).

mutacao23(G1,1,[G2|Ind],G2,[G1|Ind]):-!.
mutacao23(G1,P,[G|Ind],G2,[G|NInd]):-
	P1 is P-1,
	mutacao23(G1,P1,Ind,G2,NInd).

%*******************************************************************************************************************
%======================== NOVOS PREDICADOS =========================

selecao_melhores([H|NPopOrd],[],[H|NPopOrd],0).
selecao_melhores([H|NPopOrd],[H|Melhores],Resto,P):-
	P1 is P-1,
	selecao_melhores(NPopOrd,Melhores,Resto,P1).

ordena_pop_probabilidade(PopAv,PopAvOrd):-
	bsort_probabilidade(PopAv,PopAvOrd).

bsort_probabilidade([X],[X]):-!.
bsort_probabilidade([X|Xs],Ys):-
	bsort_probabilidade(Xs,Zs),
	btroca_probabilidade([X|Zs],Ys).

btroca_probabilidade([X],[X]):-!.

btroca_probabilidade([X*VX*VZ,Y*VY*VW|L1],[Y*VY*VW|L2]):-
	VZ>VW,!,
	btroca_probabilidade([X*VX*VZ|L1],L2).

btroca_probabilidade([X|L1],[X|L2]):-
	btroca_probabilidade(L1,L2).


% PLANO ATENDIMENTO PERMUTACAO ==============================================================================
:-consult('AlgorithmPathCost.pl').

plano_atendimento_permutacao(Robot,MelhorSequencia,MelhorTempo):-
	% encontra todas as tarefas
	get_time(Ti),
	findall(Tar,tarefa(Tar,_,_,Robot),Tarefas),
	write(Tarefas),nl,

	% encontra todas as sequencias possiveis
	findall(Seq,permutation(Tarefas,Seq),TodasSequencias),
	write(TodasSequencias),nl,

	% encontra a sequencia com o melhor tempo
	avaliar_sequencias(TodasSequencias,MelhorSequencia,MelhorTempo),
	get_time(Tf),
		T is Tf-Ti,
		write('Tempo de geracao da solucao:'),write(T),nl.


% Predicado para avaliar e escolher a melhor sequência
min_tempo(Seq1, Tempo1, Seq2, Tempo2, MinSeq, MinTempo) :-
    (Tempo1 < Tempo2 -> 
        MinSeq = Seq1, 
        MinTempo = Tempo1
    ; 
        MinSeq = Seq2, 
        MinTempo = Tempo2
    ).

avaliar_sequencias([Seq], Seq, Tempo) :-
	Seq = [H | _],
	reverse(Seq, SeqInv),
	SeqInv = [F | _],
	robot_tarefaI(_,H, Ti),
	robot_tarefaF(_,F, Tf),
    avaliar_sequencia1(Seq, Te),
	Tempo is Ti+Tf+Te,!.

avaliar_sequencias([Seq | Resto], MelhorSequencia, MelhorTempo) :-
	avaliar_sequencias(Resto, MelhorSequencia1, MelhorTempo1),
	Seq = [H | _],
	reverse(Seq, SeqInv),
	SeqInv = [F | _],
	robot_tarefaI(_,H, Ti),
	robot_tarefaF(_,F, Tf),
	avaliar_sequencia1(Seq, TempoAtual),
		
	% Assign values to Ti and Tf
	Ttotal is TempoAtual + Ti + Tf,  % Update this line
	min_tempo(Seq, Ttotal, MelhorSequencia1, MelhorTempo1, MelhorSequencia, MelhorTempo).

% Predicado para calcular o tempo total de uma sequência
avaliar_sequencia1([T], 0).
avaliar_sequencia1([T1, T2], Tempo) :-
    deslocamento_entre_tarefas(_,T1, T2, T1T2),
    Tempo is T1T2.
avaliar_sequencia1([T1, T2 | R], Tempo) :-
    deslocamento_entre_tarefas(_,T1, T2, T1T2),
    avaliar_sequencia1([T2 | R], Tempo1),
    Tempo is Tempo1 + T1T2.

%********************************************************************************************************************
% Predicado Auxiliar
set_tempo_tarefas():-
	% encontra todas as tarefas
	findall(Tar,tarefa(Tar,_,_,_),Tarefas),
	findall(Robots,robot_base(Robots,_,_),AllRobots),
	
	forall(member(Robot, AllRobots), (
		%Calcula tempo de inicio e fim das tarefas
		tempo_inicioFim_tarefas(Tarefas,Robot),
		% calcula tempo de todas as tarefas
		tempo_tarefa_tarefa(Tarefas,Robot)
	)).

% Predicado para calcular o tempo relativamente a cada tarefa
tempo_inicioFim_tarefas([],_):-!.
tempo_inicioFim_tarefas([Tarefa|Resto],Robot):-
	avalia_robot_tarefa(Robot,Tarefa),
	tempo_inicioFim_tarefas(Resto, Robot).

avalia_robot_tarefa(Robot,I):-
	tarefa(I,Or,Dest,Robot),
	robot_base(Robot,Floor,Cel),

	retractall(robot_tarefaI(Robot,I,_)),
	retractall(robot_tarefaF(Robot,I,_)),

	% predicado para obter a porta da sala do inicio da primeira tarefa
	salas(EdOr, PiOr, LSalasOr),
    member(Or, LSalasOr),
    porta_sala(Or, CelPortaOr),
	melhor_caminho_pisos(Floor,PiOr,LigsI),!,
	caminho_pisosInternos(Cel,Floor,CelPortaOr,PiOr,LigsI,_,TempoI),
	Ti is round(TempoI),
	assertz(robot_tarefaI(Robot,I,Ti)),

	% predicado para obter a porta da sala do fim da ultima tarefa
    salas(EdDest, PiDest, LSalasDest),
    member(Dest, LSalasDest),
    porta_sala(SalaDest, CelPortaDest),
    melhor_caminho_pisos(PiDest,Floor, LigsF),!,
    caminho_pisosInternos(CelPortaDest,PiDest,Cel,Floor,LigsF,_,TempoF),
	Tf is round(TempoF),
	assertz(robot_tarefaF(Robot,I,Tf)).

% Predicado para calcular o tempo entre tarefas
tempo_tarefa_tarefa([_],_).
tempo_tarefa_tarefa([H,T|Resto],Robot):-
	tarefa(H,Or1,Des1,Robot),
	tarefa(T,Or2,Des2,Robot),
	retractall(deslocamento_entre_tarefas(Robot,H,T,_)),
	retractall(deslocamento_entre_tarefas(Robot,T,H,_)),
	((Des1 == Or2, Cost1 is 0) ; caminho_salas(Des1, Or2, _, Cost1, _)),
	((Des1 == Or2, Cost2 is 0) ; caminho_salas(Des2, Or1, _, Cost2, _)),
	RoundedCost1 is round(Cost1),
	RoundedCost2 is round(Cost2),
	assertz(deslocamento_entre_tarefas(Robot,H,T,RoundedCost1)),
	assertz(deslocamento_entre_tarefas(Robot,T,H,RoundedCost2)),
	tempo_tarefa_tarefa([H|Resto],Robot),
	tempo_tarefa_tarefa([T|Resto],Robot).	
%********************************************************************************************************************
%===============================================================================


	