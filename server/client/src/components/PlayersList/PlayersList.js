import * as React from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { loadTeams } from '../../store/team/Team.actions';
import { useEffect, useState } from 'react';
import { calcularEdad } from '../../apis/player';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {field:'fullName', headerName: 'NOM', sortable: false, flex: 1},
  {field: 'team', headerName: 'EQ', flex: 1 , align: 'right', headerAlign: 'right'},
  {field: 'position', headerName: 'POS', flex: 1, align: 'right', headerAlign: 'right'},
  {field: 'height', headerName: 'ALT (cm)', flex: 1, align: 'right', headerAlign: 'right'},
  {field: 'age', headerName: 'EDAD', flex: 1, align: 'right', headerAlign: 'right'},
  {
    field: 'value',
    headerName: 'VALOR',
    flex: 1,
    align: 'right',
    headerAlign: 'right',
    type: 'number', // Establecer el tipo de columna como número
    valueFormatter: (params) => (params.value ? params.value.toLocaleString() : null),
  }
]


export default function PlayersList({ players }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const teams = useSelector(state => state.teams);


  useEffect(()=>{
      dispatch( loadTeams());
  }, [dispatch]);

  const data = players
    ? Object.keys(players)
        .map(key => players[key])
        .sort((a, b) => a.team_id - b.team_id)
        .map(player => ({
          id: player.id,
          fullName: `${player.first_name} ${player.last_name}`,
          team: teams[player.team_id]?.name,
          position: player.position,
          height: player.height,
          age: calcularEdad(player.age),
          value: player.value,
        }))
    : [];

  return (
    <Paper>
      <Box>
        <DataGrid
          rows={data}
          getRowId={(row) => row.id}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          autoHeight
          sx={{width: "90vw"}}
          onRowClick={(row)=> navigate(`${row.id}`)}
        />
      </Box>
    </Paper>
  );
}