% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_open)).

:- set_setting(http:cors, [*]).

% Bibliotecas JSON
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_json)).
:- use_module(library(http/json)).

:- initialization(startServer(5050)).

:- consult('sprintB-ALGAV.pl').

%==============SERVER==================================================================
% Definicao do json [prolog to json]
:- json_object planning(path:list(string),cost:float,executionTime:float).

% Pedidos http e predicados que os processam:
:- http_handler('/api/pathRooms', pathRooms, []).

% Criacao de servidor HTTP no porto 'Port':
startServer(Port) :-
    http_server(http_dispatch, [port(Port)]),
    asserta(port(Port)).

% Encerramento do servidor:
stopServer:-
    retract(port(Port)),
    http_stop_server(Port,_).

%--------Importar Informações----------------------------------------------


%===================================================================================================================
pathRooms(Request) :- cors_enable,
                    remove_facts,
                    add_facts,
                    caminho_salas(SO,SD,LLIG,W,LCAM),
                    Reply = planning(SO,SD,LLIG,W,LCAM),
                    prolog_to_json(Reply, JSONObject),
                    reply_json(JSONObject, [json_object(dict)]).


%===============================================================================================================


adicionarArmazens():-
	http_open('https://localhost:5001/api/Armazens', ResultJSON, []),
	json_read_dict(ResultJSON, ResultObj),
	armazensInfo(ResultObj, ResultValue),
	criarArmazensDinamicamente(ResultValue),
	close(ResultJSON).

armazensInfo([],[]).
armazensInfo([H|T],[H.id,H.designacaoArmazem.designacao|L]):-
	armazensInfo(T, L).

criarArmazensDinamicamente([]).
criarArmazensDinamicamente([I,D|L]):-
	assert(idArmazem(I,D)),
	criarArmazensDinamicamente(L).

eliminarArmazens():-
    retract(idArmazem(_,_)),
    fail.

:- dynamic elevador/3.
:- dynamic elevador/2.
:- dynamic passagem/6.
:- dynamic salas/3.
:- dynamic liga/2.

%--------URL's------------------------------------
buildings_url("http://localhost:3000/api/buildings").
rooms_url("http://localhost:3000/api/rooms").
passages_url("http://localhost:3000/api/passages").
robots_url("http://localhost:3000/api/robots").
robotTypes_url("http://localhost:3000/api/robotTypes").


%----------------------ELEVATORS------------------------------------
% elevador(edificio,[pisos_elevador]). -> Lista de pisos que o elevador de um edificio serve
% elevador(b,[b1,b2,b3],cel(5,4)).
elevators_url("https://robdronego63.azurewebsites.net/api/elevators/allElevators").

postElevators :- 
    getElevators(Data),
    parseElevators(Data).

getElevators(Data):- elevators_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseElevators([]).
parseElevators([Elevator|Rest]) :- parseElevator(Elevator),parseElevators(Rest).

parseElevator(Elevator) :- 
    asserta(elevador(
        Elevator.get(building),
        Elevator.get(floors),
        cel(Elevator.get(y), Elevator.get(x))
    )).  

%==============================FLOORS=============================================================
floors_url("https://robdronego63.azurewebsites.net/api/floors/listFloors").

postFloors:-
    getFloors(Data),
    parseFloors(Data).

getFloors(Data):-
    floors_url(URL), 
    setup_call_cleanup(
        http_open(URL, In, [request_header('Accept'='application/json')]),
        json_read_dict(In, Data),
        close(In)
    ).

parseFloors([]).
parseFloors([Floor | Rest]) :-
    parseFloor(Floor),
    parseFloors(Rest).

% Predicado para analisar um piso específico e criar o facto "pisos"
parseFloor(Floor) :-
    extract_floor_building(Floor, FloorBuilding),
    assertz(pisos(
        FloorBuilding,
        Floor.get(floorNumbers)
    )).

% Predicado auxiliar para extrair o floorBuilding de um termo
extract_floor_building(Floor, FloorBuilding) :-
    FloorBuilding = Floor.get(floorBuilding).

%===========================================================================================


