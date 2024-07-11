:- dynamic elevador/3.
:- dynamic passagem/6.
:- dynamic salas/3.
:- dynamic liga/2.

% Bibliotecas
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_open)).

%--------URL's------------------------------------
buildings_url("http://localhost:3000/api/buildings").
floors_url("http://localhost:3000/api/floors").
elevators_url("https://robdronego63.azurewebsites.net/api/elevators/allElevators").
rooms_url("http://localhost:3000/api/rooms").
passages_url("http://localhost:3000/api/passages").

robots_url("http://localhost:3000/api/robots").
robotTypes_url("http://localhost:3000/api/robotTypes").


adicionarBaseConhecimento:-postBuildings,postFloors,postElevators,postRooms,postPassages.

removerBaseConhecimento:- retractall(),).

%==================================================
%liga(edificio1,edificio2) -> Um edificio liga ao outro com passagem
liga(b,c).
liga(a,b).

%pisos(edificio,[pisos]). -> Lista de pisos de um edificio
pisos(a,[a1,a2]).
pisos(b,[b1,b2,b3]).
pisos(c,[c1,c2,c3,c4]).

%--------------BUILDINGS----------------------

postBuildings:- getBuildings(Data), parseBuildings(Data).

getBuildings(Data):- buildings_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseBuildings([]).
parseBuildings([H|Data]):-asserta(building(H.get(name),H.get(y),H.get(y)),parseBuildings(Data).

%-----------FLOORS------------------------------

postFloors:- getFloors(Data), parseFloors(Data).

getFloors(Data):- floors_url(URL),
                    setup_call_cleanup(
                        http_open(URL, In, [request_header('Accept'='application/json')]),
                        json_read_dict(In, Data),
                        close(In)
                    ).

parseFloors([]).
parseFloors([H|Data]):- asserta(floor(H.get(buildingName),H.get(floorNumber)).

%----------------------ELEVATORS------------------------------------
% elevador(edificio,[pisos_elevador]). -> Lista de pisos que o elevador de um edificio serve
% elevador(b,[b1,b2,b3],cel(5,4)).

postElevators:- getElevators(Data), parseElevators(Data).

getElevators(Data):- elevators_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseElevators([]).
parseElevators([H|Data]):- asserta(elevador(H.get(buildingName),H.get(floorsNumbers),cel(H.get(x),H.get(y)).

%--------------------ROOMS------------------------------------------------------
%salas(edificio,piso,[salas]).
%salas(a,a1,[a101,a102]).
%porta_sala(Sala,cleporta).
%porta_sala(a101,cel(2,2)).

postRooms:-getRooms(Data), parseRooms(Data).

getRooms(Data):- rooms_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseRooms([]).
%parseRooms([H|Data]):- asserta(salas(H.get(building),H.get(floorName),H.get(name)),porta_sala(H.get(name),cel(H.get(doory),H.get(doorx))))).
                    

%--------------------PASSAGES-------------------------------------------------
%passagem(ed1,ed2,col1,lin1,col2,lin2). -> Pisos dos edificios que estão ligados com passagem
%passagem(a,b,a1,b1,cel(6,3),cel(1,3)).

postPassages:-getPassages(Data), parsePassages(Data).

getPassages(Data):- passages_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parsePassages([]).
parsePassages([H|Data]):- asserta(passagem(H.get(building1),H.get(building2),H.get(floor1Name),H.get(floor2Name),)).

%--------ROBOTS---------------------------------------------------------------------------------------

postRobots:-getRobots(Data), parseRobots(Data).

getRobots(Data):- robots_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseRobots([]).
parseRobots([H|Data]):- asserta(robot()).

%---------- ROBOT TYPES --------------------------------------------------------------------------
postRobotTypes:-getRobotTypes(Data), parseRobotTypes(Data).

getRobotTypes(Data):- robotTypes_url(URL),
                     setup_call_cleanup(
                            http_open(URL, In, [request_header('Accept'='application/json')]),
                            json_read_dict(In, Data),
                            close(In)
                     ).

parseRobotTypess([]).
parseRobotTypess([H|Data]):- asserta(robot_type()).