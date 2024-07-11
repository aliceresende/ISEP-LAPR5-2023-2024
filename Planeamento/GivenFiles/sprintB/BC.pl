% Helper predicate to create the matrix
create_matrix(Celulas, Matriz) :-
    findall(Row, (
        between(1, 6, RowNum),
        create_row(RowNum, Celulas, Row, 8) % Keeping 8 columns
    ), Rows),
    reverse(Rows, Matriz).

% Helper predicate to create each row of the matrix
create_row(RowNum, Celulas, Row, NumCols) :-
    findall(Value, (
        between(1, NumCols, ColNum), % Use NumCols to generate the specified number of columns
        (member(cel(ColNum, RowNum), Celulas) -> Value = 1; Value = 0)
    ), Row).

print_matrix([]).
print_matrix([Row|Matrix]) :-
    writeln(Row),
    print_matrix(Matrix).

% Example facts
elevador_piso(a, a1, cel(8, 2)).
passagem_piso(a, h, a1, h2, cel(0, 2)).
salas_piso(a, a1, [
    sala(a105, dimensoes(0, 0, 4, 1), porta(3, 2)),
    sala(a107, dimensoes(5, 0, 7, 1), porta(6, 2)),
    sala(a109, dimensoes(0, 4, 5, 6), porta(6, 4))
]).

% Predicate to generate the floor matrix
gerar_matriz_piso(Piso, Matriz) :-
    findall(cel(X, Y), (
        elevador_piso(_, Piso, cel(X, Y));
        passagem_piso(_, _, Piso, _, cel(X, Y));
        salas_piso(_, Piso, Salas),
        member(sala(_, dimensoes(X1, Y1, X2, Y2), _), Salas),
        between(X1, X2, X), between(Y1, Y2, Y)
    ), Celulas),
    create_matrix(Celulas, Matriz).
